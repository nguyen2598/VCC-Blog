'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });
    }
  }
  User.init({
    role_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    ext: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,

    // If you want to give a custom name to the deletedAt column( đổi tên cột từ deleteAt thành destroyTime)
    deletedAt: 'destroyTime',
  });
  return User;
};