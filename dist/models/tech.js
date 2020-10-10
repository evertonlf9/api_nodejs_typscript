"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TechModel = (sequelize, DataTypes) => {
    const TechModel = sequelize.define('Tech', {
        name: DataTypes.STRING(100),
    });
    TechModel.associate = (models) => {
        TechModel.belongsToMany(models.TechModel, {
            foreignKey: 'tech_id',
            through: 'user_techs',
            as: 'users'
        });
    };
    return TechModel;
};
exports.default = TechModel;
