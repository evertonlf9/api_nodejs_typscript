
import { Sequelize, DataTypes } from 'sequelize';
import configs from '../config/database';

import User from './user';
import Address  from './address';
import Tech  from './tech';

const models: any = [
  User,
  Address,
  Tech
];

// const config = configs[process.env.NODE_ENV || 'development'];
const config = configs.development;
const db: any = {};
let sequelize: any = null;
const files: any = [];
sequelize = new Sequelize(config);

const list: any = {};
models.map((model: any) => {
  list[model.name] = model(sequelize, DataTypes);
  return model;
});

models.map((model: any) => {
  if(list[model.name].associate) list[model.name].associate(list);
  return model;
});

Object.keys(list).forEach(modelName => {
    db[modelName] = list[modelName];
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;