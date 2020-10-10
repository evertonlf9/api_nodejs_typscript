"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = tslib_1.__importDefault(require("../../models"));
const baseRepository_1 = tslib_1.__importDefault(require("./baseRepository"));
const { AddressModel, UserModel } = models_1.default;
class AdressRepository {
    static getAnddress(id, association = {}) {
        return new Promise((resolve, reject) => baseRepository_1.default
            .getById(UserModel, id, association)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
}
exports.default = AdressRepository;
