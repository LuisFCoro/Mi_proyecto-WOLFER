'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'tags',
    timestamps: false
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Product, { through: 'product_tags', foreignKey: 'tag_id' });
  };

  return Tag;
};
