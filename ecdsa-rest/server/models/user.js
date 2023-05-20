'use strict';

const bcrypt = require("bcryptjs");
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "Users",
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password,10);
        return user;
      },
    },
  });
  return User;
};