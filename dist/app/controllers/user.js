"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const user_1 = tslib_1.__importDefault(require("../repository/user"));
const operatorsAliases_config_1 = tslib_1.__importDefault(require("../../config/operatorsAliases.config"));
class UserController {
    static query(req, res) {
        let field = 'id', order = 'ASC';
        if (req.query.orderby && req.query.orderby !== "") {
            const orderBy = req.query.orderby.split(',');
            field = orderBy[0];
            order = orderBy[1].toUpperCase();
        }
        const paginate = `LIMIT ${(parseInt(req.query.page) * parseInt(req.query.size) || 0)}, ${parseInt(req.query.size) || 100}`;
        const orderBy = `ORDER BY User.${field} ${order}`;
        const fields = 'id, first_name, last_name, email, rg, cpf, login, password';
        const where = `WHERE (User.first_name LIKE 'Schmidt' OR User.last_name LIKE '${req.query.search}')`;
        const sql = `SELECT ${fields} FROM Users AS User ${(req.query.search && req.query.search !== '') ? where : ''.trim()} ${orderBy} ${paginate}`;
        const queryTypes = { nest: true, type: sequelize_1.QueryTypes.SELECT };
        const sqlCount = "select count(*) from Users";
        user_1.default.query(sql, queryTypes, sqlCount)
            .then((registers) => res.json(registers))
            .catch((error) => res.json(error));
    }
    static GetUsers(req, res) {
        let field = 'id', order = 'ASC';
        if (req.query.orderby && req.query.orderby !== "") {
            const orderBy = req.query.orderby.split(',');
            field = orderBy[0];
            order = orderBy[1].toUpperCase();
        }
        let where = {};
        if (req.query.search && req.query.search !== '') {
            where = {
                [operatorsAliases_config_1.default.$or]: [
                    { first_name: { [operatorsAliases_config_1.default.$like]: req.query.search } },
                    { last_name: { [operatorsAliases_config_1.default.$like]: req.query.search } },
                ]
            };
        }
        const query = {
            attributes: ['id', 'first_name', 'last_name', 'email', 'rg', 'cpf', 'login', 'password'],
            where: where,
            limit: parseInt(req.query.size) || 100,
            offset: (parseInt(req.query.page) * parseInt(req.query.size) || 0),
            order: [[field, order]]
        };
        user_1.default.getUsers(query)
            .then((registers) => res.json(registers))
            .catch((error) => res.json(error));
    }
    static GetById(req, res) {
        user_1.default.getById(req.params.id)
            .then((registers) => res.json(registers))
            .catch((error) => res.json(error));
    }
    static createUser(req, res) {
        user_1.default.createUser(req.body)
            .then((registers) => res.json(registers))
            .catch((error) => res.status(201).json(error));
    }
    static edit(req, res) {
        const query = { where: { id: req.params.id } };
        user_1.default.update(Object.assign({}, req.body), query)
            .then((result) => UserController.GetById(req, res))
            .catch((error) => res.json(error));
    }
    static update(req, res) {
        const query = { where: { id: req.params.id } };
        user_1.default.update(Object.assign({}, req.body), query)
            .then((result) => UserController.GetById(req, res))
            .catch((error) => res.json(error));
    }
}
exports.default = UserController;
