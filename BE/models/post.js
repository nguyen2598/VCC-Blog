'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    is_stock: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};