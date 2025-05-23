'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'brands',
    timestamps: false
  });

  Brand.associate = (models) => {
    Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
  };

  return Brand;
};
