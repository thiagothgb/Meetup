import Sequelize, { Model } from 'sequelize';

class Meets extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'banner_id',
      as: 'banner',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'manager',
    });
    this.hasMany(models.Subscription, {
      foreignKey: 'meet_id',
      constraints: true,
      scope: {
        commentable: 'subscribed',
      },
    });
  }
}

export default Meets;
