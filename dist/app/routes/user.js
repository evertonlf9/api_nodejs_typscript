"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../validators/user");
const router = express_1.Router();
router.get('/query', user_1.Query.validations, user_1.Query.handler);
router.get('/', user_1.GetUsers.validations, user_1.GetUsers.handler);
router.get('/:id', user_1.GetById.validations, user_1.GetById.handler);
router.post('/', user_1.Insert.validations, user_1.Insert.handler);
router.put('/:id', user_1.Update.validations, user_1.Update.handler);
router.patch('/:id', user_1.UpdatetRegisterUser.validations, user_1.UpdatetRegisterUser.handler);
exports.default = router;