"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const user_1 = tslib_1.__importDefault(require("../repository/user"));
const Auth = (req, res, privateKey) => {
    const fields = 'id, first_name, login, password';
    const where = `WHERE User.login = :username`;
    const sql = `SELECT ${fields} FROM Users AS User ${where}`;
    const queryTypes = {
        nest: true,
        replacements: { username: req.body.username.trim() },
        type: sequelize_1.QueryTypes.SELECT
    };
    user_1.default.query(sql, queryTypes)
        .then((result) => {
        if (result.rows) {
            const data = Object.assign({}, result.rows[0]);
            if (data.password === req.body.password) {
                const token = jsonwebtoken_1.default.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: delete data.password
                }, privateKey, { algorithm: 'HS256' });
                res.cookie('x-access-token', token);
                res.setHeader('x-access-token', `Bearer ${token}`);
                return res.send({ message: "successfull authentication", response: data });
            }
        }
        return res.json({ error: {}, message: "authentication failed", response: [] });
    })
        .catch((err) => res.status(403).json({ error: err, message: "authentication failed", response: [] }));
};
exports.default = Auth;
