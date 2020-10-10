"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class BaseRepository {
    static findAll(table, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield table.findAll(query);
        });
    }
    static findOne(table, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield table.findOne(query);
        });
    }
    static getAll(table, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield table.findAndCountAll(query);
        });
    }
    static getById(table, id, association = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield table.findByPk(id, association);
        });
    }
    static create(table, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield table.create(params);
        });
    }
    static update(table, params, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield table.update(params, query);
        });
    }
    static query(table, sql, QueryTypes = {}, sqlCount = '', QueryTypesCount = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield table.sequelize.query(sql, QueryTypes);
                if (sqlCount !== '') {
                    const count = yield table.sequelize.query(sqlCount, QueryTypesCount);
                    return { count: count[0]['count(*)'], rows: results, };
                }
                return { rows: results };
            }
            catch (e) {
                return { error: e };
            }
        });
    }
}
exports.default = BaseRepository;
