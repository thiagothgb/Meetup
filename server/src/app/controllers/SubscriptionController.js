import * as Yup from 'yup';
import { Op } from 'sequelize';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../Jobs/SubscriptionMail';
import Subscription from '../models/Subscription';
import Meets from '../models/Meet';
import File from '../models/File';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    try {
      const { userId } = req;
      const { page = 1 } = req.query;

      const subscriptions = await Subscription.findAndCountAll({
        where: {
          user_id: userId,
        },
        attributes: ['id'],
        offset: (page - 1) * 10,
        limit: 10,
        order: [[{ model: Meets, as: 'meet' }, 'date']],
        include: [
          {
            model: Meets,
            as: 'meet',
            attributes: ['id', 'title', 'description', 'location', 'date'],
            where: {
              date: { [Op.gte]: new Date() },
            },
            include: [
              {
                model: File,
                as: 'banner',
                attributes: ['id', 'url', 'path'],
              },
              {
                model: User,
                as: 'manager',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });

      return res.json(subscriptions);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async store(req, res) {
    try {
      const { userId } = req;
      const { meet_id } = req.body;

      const schema = Yup.object().shape({
        meet_id: Yup.number()
          .integer()
          .positive(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const meet = await Meets.findByPk(meet_id, {
        include: [
          {
            model: User,
            as: 'manager',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      if (!meet) {
        return res.status(400).json({ error: 'Meet does not exists' });
      }

      if (meet.user_id === userId) {
        return res
          .status(400)
          .json({ error: 'You can not subscribe on your own event.' });
      }

      const alreadySubscribed = await Subscription.findOne({
        where: {
          user_id: userId,
          meet_id,
        },
      });

      if (alreadySubscribed) {
        return res
          .status(400)
          .json({ error: 'You can not subscribe twice on the same meeting.' });
      }

      const hasAnotherSubscribeAtSameTime = await Subscription.findOne({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Meets,
            as: 'meet',
            where: {
              date: meet.date,
            },
          },
        ],
      });

      if (hasAnotherSubscribeAtSameTime) {
        return res.status(400).json({
          error: 'You already have a subscription at this time.',
        });
      }

      const subscription = await Subscription.create({
        user_id: userId,
        meet_id,
      });

      const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email'],
      });

      Queue.add(SubscriptionMail.key, { meet, user });

      return res.json(subscription);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;
      const { idSubscription } = req.params;

      const subscription = await Subscription.findOne({
        where: {
          user_id: userId,
          id: idSubscription,
        },
      });

      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      subscription.destroy();

      return res.send();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new SubscriptionController();
