"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressModel = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        zipcode: DataTypes.STRING(20),
        street: DataTypes.STRING(200),
        number: DataTypes.INTEGER,
    });
    Address.associate = (models) => {
        Address.belongsTo(models.UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };
    return Address;
};
exports.default = AddressModel;
