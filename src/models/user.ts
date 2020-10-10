const UserModel =  (sequelize: any, DataTypes: any) => {

    const User: any = sequelize.define('User', {
      first_name: DataTypes.STRING(200),
      last_name: DataTypes.STRING(200),
      email: DataTypes.STRING(200),
      rg: DataTypes.STRING(20),
      cpf: DataTypes.STRING(20),
      login: DataTypes.STRING(100),
      password: DataTypes.STRING(50)
    });

    User.associate = (models: any) => {
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
}

export default UserModel;


  
// const { Model, DataTypes } = require('sequelize');

// import Sequelize from 'sequelize';

// class User extends Sequelize.Model {
//   static init(sequelize: any): void {
//     // this.init({});
//     super.init({}, {})
//     // super.init({
//     //   name: DataTypes.STRING,
//     //   email: DataTypes.STRING,
//     // }, {
//     //   sequelize
//     // })
//   }

//   static associate(models: any) {
//     this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
//     this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
//   }
// }

// export default User;