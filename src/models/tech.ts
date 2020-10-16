// import { Model, DataTypes } from 'sequelize';

// class Tech extends Model {
//   static init(sequelize) {
//     super.init({
//       name: DataTypes.STRING,
//     }, {
//       sequelize,
//       tableName: 'techs',
//     })
//   }

//   static associate(models) {
//     this.belongsToMany(models.User, { foreignKey: 'tech_id', through: 'user_techs', as: 'users' });
//   }
// }

// export default Tech;

// import { Sequelize, DataTypes } from 'sequelize/types';

const TechModel =  (sequelize: any, DataTypes: any) => {

    const TechModel: any = sequelize.define('Tech', {
      name: DataTypes.STRING(100),
    });

    TechModel.associate = (models: any) => {
      TechModel.belongsToMany(models.TechModel, {
        foreignKey: 'tech_id',
        through: 'user_techs',
        as: 'users'
      });
    };

    return TechModel;
}

export default TechModel