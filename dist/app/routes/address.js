"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const address_1 = tslib_1.__importDefault(require("../controllers/address"));
const router = express_1.Router();
router.get('/user/:id/', address_1.default.GetAddress);
exports.default = router;
