'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('cliente', 'admin'),
      defaultValue: 'cliente'
    },
    avatar: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    // Si querés agregar relaciones, como pedidos, carrito, etc, acá van
  };

  return User;
};
