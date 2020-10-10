"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        first_name: DataTypes.STRING(200),
        last_name: DataTypes.STRING(200),
        email: DataTypes.STRING(200),
        rg: DataTypes.STRING(20),
        cpf: DataTypes.STRING(20),
        login: DataTypes.STRING(100),
        password: DataTypes.STRING(50)
    });
    User.associate = (models) => {
        User.hasMany(models.AddressModel, {
            foreignKey: 'user_id',
            as: 'addresses'
        });
        User.belongsToMany(models.TechModel, {
            foreignKey: 'user_id',
            through: 'user_techs',
            as: 'techs'
        });
    };
    return User;
};
exports.default = UserModel;
