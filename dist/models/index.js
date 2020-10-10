"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const database_1 = tslib_1.__importDefault(require("../config/database"));
const user_1 = tslib_1.__importDefault(require("./user"));
const address_1 = tslib_1.__importDefault(require("./address"));
const tech_1 = tslib_1.__importDefault(require("./tech"));
const models = [
    user_1.default,
    address_1.default,
    tech_1.default
];
const config = database_1.default[process.env.NODE_ENV || 'development'];
const db = {};
let sequelize = null;
let files = [];
sequelize = new sequelize_1.Sequelize(config);
let list = {};
models.map((model) => {
    list[model.name] = model(sequelize, sequelize_1.DataTypes);
    return model;
});
models.map((model) => {
    if (list[model.name].associate)
        list[model.name].associate(list);
    return model;
});
Object.keys(list).forEach(modelName => {
    db[modelName] = list[modelName];
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
