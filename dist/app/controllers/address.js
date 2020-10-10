"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const address_1 = tslib_1.__importDefault(require("../repository/address"));
class AddressController {
    static GetAddress(req, res) {
        address_1.default.getAnddress(req.params.id, { include: { association: 'addresses' } })
            .then((registers) => res.json(registers))
            .catch((error) => res.json(error));
    }
}
exports.default = AddressController;
