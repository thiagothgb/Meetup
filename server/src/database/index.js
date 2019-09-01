import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import Meet from '../app/models/Meet';
import Subscription from '../app/models/Subscription';
import databaseConfig from '../config/database';

const models = [User, File, Meet, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
