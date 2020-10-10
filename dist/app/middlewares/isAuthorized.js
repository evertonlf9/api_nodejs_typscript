"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const Errors_1 = tslib_1.__importDefault(require("./Errors"));
const IsAuthorized = (req, res, next) => {
    if (typeof req.headers['x-access-token'] !== "undefined" || req.cookies['x-access-token'] !== "undefined") {
        let token = req.cookies['x-access-token'] && req.cookies['x-access-token'].split(" ")[1] || req.cookies['x-access-token'];
        const privateKey = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../../public/private.pem'), 'utf8');
        const callBack = (err) => {
            if (err) {
                res.clearCookie("x-access-token");
                return Errors_1.default(res, 401, err);
            }
            return next();
        };
        jsonwebtoken_1.default.verify(token, privateKey, { algorithms: ["HS256"] }, callBack);
    }
    else {
        res.clearCookie("x-access-token");
        return Errors_1.default(res, 401);
    }
};
exports.default = IsAuthorized;
