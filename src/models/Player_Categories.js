const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Player_Categories = sequelize.define(
    'Player_Categories',
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(50), allowNull: false },
      description: DataTypes.TEXT,
    },
    {
      tableName: 'Player_Categories',
      timestamps: false,
    }
  );

  return Player_Categories;
};
