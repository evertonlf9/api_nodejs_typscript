"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatetRegisterUser = exports.Update = exports.Query = exports.GetUsers = exports.GetById = exports.Insert = void 0;
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const Errors_1 = tslib_1.__importDefault(require("../middlewares/Errors"));
const user_1 = tslib_1.__importDefault(require("../controllers/user"));
exports.Insert = {
    validations: [
        express_validator_1.body('first_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('last_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('cpf')
            .trim()
            .isLength({ min: 14, max: 14 }),
        express_validator_1.body('rg')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 12, max: 12 }),
        express_validator_1.body('login')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('email')
            .isEmail()
            .normalizeEmail(),
        express_validator_1.body('password')
            .not().isEmpty()
            .isLength({ min: 5, max: 255 })
    ],
    handler: (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return Errors_1.default(res, 422, errors.array());
        user_1.default.createUser(req, res);
    })
};
exports.GetById = {
    validations: [
        express_validator_1.param('id')
            .not().isEmpty()
            .isNumeric()
    ],
    handler: (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return Errors_1.default(res, 422, errors.array());
        user_1.default.GetById(req, res);
    })
};
exports.GetUsers = {
    validations: [
        express_validator_1.query('page').optional()
            .if(express_validator_1.query('page').exists())
            .isNumeric(),
        express_validator_1.query('size').optional()
            .if(express_validator_1.query('size').exists())
            .isNumeric(),
        express_validator_1.query('search').optional()
            .if(express_validator_1.query('search').exists())
            .isString()
            .trim()
            .isLength({ min: 0, max: 255 })
    ],
    handler: (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return Errors_1.default(res, 422, errors.array());
        user_1.default.GetUsers(req, res);
    })
};
exports.Query = {
    validations: [
        express_validator_1.query('page').if(express_validator_1.query('page').exists())
            .isNumeric(),
        express_validator_1.query('size').if(express_validator_1.query('size').exists())
            .isNumeric(),
        express_validator_1.query('search').if(express_validator_1.query('search').exists())
            .isString()
            .trim()
            .isLength({ min: 0, max: 255 })
    ],
    handler: (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return Errors_1.default(res, 422, errors.array());
        user_1.default.query(req, res);
    })
};
exports.Update = {
    validations: [
        express_validator_1.body('first_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('last_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('cpf')
            .trim()
            .isLength({ min: 14, max: 14 }),
        express_validator_1.body('rg')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 12, max: 12 }),
        express_validator_1.body('login')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('email')
            .isEmail()
            .normalizeEmail(),
        express_validator_1.body('password')
            .not().isEmpty()
            .isLength({ min: 5, max: 255 })
    ],
    handler: (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return Errors_1.default(res, 422, errors.array());
        user_1.default.edit(req, res);
    }),
};
exports.UpdatetRegisterUser = {
    validations: [
        express_validator_1.body('first_name').if(express_validator_1.body('first_name').exists())
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('last_name').if(express_validator_1.body('last_name').exists())
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('cpf').if(express_validator_1.body('cpf').exists())
            .trim()
            .isLength({ min: 14, max: 14 }),
        express_validator_1.body('rg').if(express_validator_1.body('rg').exists())
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 12, max: 12 }),
        express_validator_1.body('login').if(express_validator_1.body('login').exists())
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        express_validator_1.body('email').if(express_validator_1.body('email').exists())
            .isEmail()
            .normalizeEmail(),
        express_validator_1.body('password').if(express_validator_1.body('password').exists())
            .not().isEmpty()
            .isLength({ min: 5, max: 255 })
    ],
    handler: (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return Errors_1.default(res, 422, errors.array());
        user_1.default.update(req, res);
    }),
};
