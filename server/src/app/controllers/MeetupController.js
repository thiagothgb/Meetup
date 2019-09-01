import * as Yup from 'yup';
import {
  isBefore,
  setHours,
  endOfDay,
  isValid,
  isSameDay,
  parseISO,
  getHours,
  format,
} from 'date-fns';
import { Op } from 'sequelize';
import Meets from '../models/Meet';
import File from '../models/File';
import User from '../models/User';
import Subscription from '../models/Subscription';

class MeetController {
  async index(req, res) {
    try {
      const { userId } = req;

      const { page = 1, date } = req.query;

      if (date.length !== 10)
        return res.status(401).json({
          error: 'Date format inválid',
        });

      const [year, month, day] = date.split('-');

      const dateFormatted = new Date(year, month, day, 0, 0, 0, 0);

      if (!(await isValid(dateFormatted))) {
        return res.status(403).json({ error: 'Invalid date parameter' });
      }

      const minimunDate = isSameDay(dateFormatted, new Date())
        ? setHours(dateFormatted, getHours(new Date()))
        : dateFormatted;

      const subscribed = await Subscription.findAll({
        where: {
          user_id: userId,
        },
        attributes: ['meet_id'],
        raw: true,
      }).then(response => response.map(item => item.meet_id));

      const meets = await Meets.findAndCountAll({
        where: {
          id: { [Op.notIn]: subscribed },
          user_id: { [Op.ne]: userId },
          date: {
            [Op.between]: [minimunDate, endOfDay(dateFormatted)],
          },
        },
        offset: (page - 1) * 10,
        limit: 10,
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'url'],
          },
          {
            model: User,
            as: 'manager',
            attributes: ['id', 'name'],
          },
        ],
      });

      return res.send(meets);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(req, res) {
    const { userId } = req;

    const schema = Yup.object().shape({
      banner_id: Yup.number()
        .integer()
        .positive(),
      title: Yup.string().min(3),
      description: Yup.string().min(5),
      location: Yup.string().min(3),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const formattedDate = format(
      parseISO(req.body.date),
      "yyyy-MM-dd'T'k':00:00'"
    );

    if (isBefore(formattedDate, new Date())) {
      return res.status(403).json({ error: 'Past dates are not allowed' });
    }

    try {
      const meet = await Meets.create({
        ...req.body,
        date: formattedDate,
        user_id: userId,
      });
      return res.json(meet);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    const { userId } = req;
    const { idMeet } = req.params;

    const schema = Yup.object().shape({
      title: Yup.string().min(3),
      description: Yup.string().min(5),
      location: Yup.string().min(3),
      date: Yup.date().required(),
      banner_id: Yup.number()
        .integer()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const meet = await Meets.findOne({
        where: {
          id: idMeet,
          user_id: userId,
        },
      });

      if (!meet) {
        return res.status(401).json({
          error: 'You can not update this meet or it does not exists!',
        });
      }

      const formattedDate = parseISO(req.body.date);

      if (isBefore(formattedDate, parseISO(meet.date))) {
        return res
          .status(401)
          .json({ error: 'You can not update past meets.' });
      }

      const banner = await File.findByPk(req.body.banner_id);

      if (!banner) {
        return res.status(400).json({ error: 'Banner is invalid.' });
      }

      await meet.update({
        ...req.body,
        date: formattedDate,
      });

      return res.json(meet);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    const { userId } = req;
    const { idMeet } = req.params;

    try {
      const meet = await Meets.findOne({
        where: {
          id: idMeet,
          user_id: userId,
        },
      });

      if (!meet) {
        return res.status(401).json({
          error: 'You can not delete this meet or it does not exists!',
        });
      }

      const formattedDate = parseISO(req.body.date);

      if (isBefore(formattedDate, parseISO(meet.date))) {
        return res
          .status(401)
          .json({ error: 'You can not delete past meets.' });
      }

      await meet.destroy();

      return res.send();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new MeetController();
