"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const method_override_1 = tslib_1.__importDefault(require("method-override"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const session_file_store_1 = tslib_1.__importDefault(require("session-file-store"));
const csurf_1 = tslib_1.__importDefault(require("csurf"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const express_1 = tslib_1.__importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
require("express-async-errors");
const cors_config_1 = tslib_1.__importDefault(require("../config/cors.config"));
const isAuthorized_1 = tslib_1.__importDefault(require("./middlewares/isAuthorized"));
const Header_1 = tslib_1.__importDefault(require("./middlewares/Header"));
const Auth_1 = tslib_1.__importDefault(require("./middlewares/Auth"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
const app = express_1.default();
const useDomainForCookies = process.env.DOMAIN || false;
const host = process.env.HOST || 'localhost';
const corsMiddleware = cors_1.default(cors_config_1.default);
const FileStore = session_file_store_1.default(express_session_1.default);
const store = new FileStore({
    path: path_1.default.resolve(__dirname, '../tmp')
});
const privateKey = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../public/private.pem'), 'utf8');
const csrfProtection = csurf_1.default({
    cookie: {
        key: '_csrf',
        sameSite: true,
        httpOnly: true,
        domain: useDomainForCookies ? host : undefined
    }
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '200mb' }));
app.use(body_parser_1.default.json({ limit: '200mb' }));
app.disable('x-powered-by');
app.use(method_override_1.default('X-HTTP-Method-Override'));
app.use(express_1.default.static('public'));
app.use(express_1.default.static("doc"));
app.use(compression_1.default());
app.use(corsMiddleware);
app.options('*', corsMiddleware);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1.default());
}
if (process.env.NODE_ENV !== 'test') {
    app.use(express_session_1.default({
        name: "SESSION_ID",
        secret: privateKey,
        resave: false,
        saveUninitialized: true,
        unset: 'destroy',
        store: store,
        cookie: {
            sameSite: true,
            domain: useDomainForCookies ? host : undefined
        }
    }));
}
app.use(Header_1.default);
app.post('/api/authenticate', Auth_1.default);
app.get('/api', (req, res) => {
    res.json({ message: 'Node BFF' });
});
if (process.env.NODE_ENV !== 'test') {
    app.use(isAuthorized_1.default);
    app.use('/api/v1', csrfProtection, routes_1.default);
}
if (process.env.NODE_ENV === 'test') {
    app.use('/api/v1', routes_1.default);
}
app.use((err, req, res, next) => {
    Logger_1.default.error(err.message, err);
    return res.status(http_status_codes_1.NOT_FOUND).json({
        errors: err,
    });
});
exports.default = app;
