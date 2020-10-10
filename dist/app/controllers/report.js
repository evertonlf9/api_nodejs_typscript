"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const report_1 = tslib_1.__importDefault(require("../repository/report"));
const operatorsAliases_config_1 = tslib_1.__importDefault(require("../../config/operatorsAliases.config"));
class ReportController {
    static show(req, res) {
        const query = {
            attributes: ['name', 'email'],
            where: {
                email: {
                    [operatorsAliases_config_1.default.$iLike]: '%@rocketseat.com.br'
                }
            },
            include: [
                {
                    association: 'addresses',
                    where: {
                        street: 'Rua Guilherme Gembala'
                    }
                },
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [operatorsAliases_config_1.default.$iLike]: 'React%'
                        }
                    }
                },
            ]
        };
        report_1.default.findAll(query)
            .then((result) => res.json(result))
            .catch((error) => res.json(error));
    }
}
exports.default = ReportController;
