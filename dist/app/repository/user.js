"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = tslib_1.__importDefault(require("../../models"));
const baseRepository_1 = tslib_1.__importDefault(require("./baseRepository"));
const { User } = models_1.default;
class UserRepository {
    static query(sql, queryTypes, sqlCount, queryTypesCount) {
        return new Promise((resolve, reject) => baseRepository_1.default
            .query(models_1.default, sql, queryTypes, sqlCount, (queryTypesCount || queryTypes))
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
    static getUsers(query) {
        return new Promise((resolve, reject) => baseRepository_1.default
            .getAll(User, query)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
    static getById(id) {
        return new Promise((resolve, reject) => baseRepository_1.default
            .getById(User, id)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
    static createUser(params) {
        return new Promise((resolve, reject) => baseRepository_1.default
            .create(User, params)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
    static update(params, query) {
        return new Promise((resolve, reject) => baseRepository_1.default
            .update(User, params, query)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
}
exports.default = UserRepository;
