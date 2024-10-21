import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { env as _env } from 'process';
import Account from './Account';
import Blog from './Blog';
import BlogContent from './BlogContent';
import ContentApp from './ContentApp';
import ContentWeb from './ContentWeb';
import ServiceApp from './ServiceApp';
import ServiceWeb from './ServiceWeb';
import Notification from './Notification';
import NotiDetail from './NotiDetail';

export interface SequelizeConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: string;
  use_env_variable?: string;
}

const basename = _basename(__filename);
const env = _env.NODE_ENV || 'production';
const config: SequelizeConfig = require(__dirname + '/../config/config.json')[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable] as string, {dialect: 'mysql'});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {dialect: 'mysql'});
}

const db: { [key: string]: any; sequelize?: Sequelize; Sequelize?: typeof Sequelize } = {
  sequelize,
  Sequelize,
  Account,
  Blog,
  BlogContent,
  ContentApp,
  ContentWeb,
  ServiceApp,
  ServiceWeb,
  Notification,
  NotiDetail
}

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;