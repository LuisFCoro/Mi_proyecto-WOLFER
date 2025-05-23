'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'categories',
    timestamps: false
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'category_id' });
  };

  return Category;
};
