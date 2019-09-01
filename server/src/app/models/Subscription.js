import { Model } from 'sequelize';
import User from './User';
import Meets from './Meet';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'subscribed',
    });
    this.belongsTo(models.Meets, {
      foreignKey: 'meet_id',
      as: 'meet',
    });
  }
}

export default Subscription;
