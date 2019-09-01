import Meets from '../models/Meet';
import File from '../models/File';

class ManagerController {
  async index(req, res) {
    const { userId } = req;

    try {
      const meets = await Meets.findAll({
        attributes: ['id', 'title', 'description', 'location', 'date'],
        where: {
          user_id: userId,
        },
        include: {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        order: [['date']],
      });

      return res.json(meets);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error.',
      });
    }
  }

  async show(req, res) {
    const { userId } = req;
    const { idMeet } = req.params;

    try {
      const meet = await Meets.findOne({
        attributes: ['id', 'title', 'description', 'location', 'date'],
        where: {
          id: idMeet,
          user_id: userId,
        },
        include: {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        order: [['date', 'DESC']],
      });

      return res.json(meet);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error.',
      });
    }
  }
}

export default new ManagerController();
