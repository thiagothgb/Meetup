import Sequelize, { Model } from 'sequelize';
import bycrypt from 'bcryptjs';
import Subscription from './Subscription';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bycrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Subscription, {
      foreignKey: 'meet_id',
      constraints: true,
      scope: {
        commentable: 'registrations',
      },
    });
  }

  checkPassword(password) {
    return bycrypt.compare(password, this.password_hash);
  }
}

export default User;
