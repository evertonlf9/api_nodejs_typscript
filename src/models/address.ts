// import { Model, DataTypes } from 'sequelize';

// class Address extends Model {
//   static init(sequelize) {
//     super.init({
//       zipcode: DataTypes.STRING,
//       street: DataTypes.STRING,
//       number: DataTypes.INTEGER,
//     }, {
//       sequelize
//     })
//   }

//   static associate(models) {
//     this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
//   }
// }

// export default Address;

// import { Sequelize, DataTypes } from 'sequelize/types';

const AddressModel =  (sequelize: any, DataTypes: any) => {

    const Address: any = sequelize.define('Address', {
      zipcode: DataTypes.STRING(20),
      street: DataTypes.STRING(200),
      number: DataTypes.INTEGER,
    });

    Address.associate = (models: any) => {
      Address.belongsTo(models.UserModel, {
        foreignKey: 'user_id',
        as: 'user'
      });
    };

    return Address;
}

export default AddressModel