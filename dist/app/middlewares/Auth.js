"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const auth_1 = tslib_1.__importDefault(require("../controllers/auth"));
const Auth = (req, res, next) => {
    const data = req.body;
    if ((!data.username || !data.password) || (data.username === "" || data.password === "")) {
        return res.status(422).json({ error: '', message: "", response: [] });
    }
    auth_1.default(req, res, fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../../public/private.pem'), 'utf8'));
};
exports.default = Auth;
