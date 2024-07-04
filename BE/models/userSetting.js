'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSetting.init({
    user_id: DataTypes.INTEGER,
    language_id: DataTypes.INTEGER,
    theme_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserSetting',
  });
  return UserSetting;
};