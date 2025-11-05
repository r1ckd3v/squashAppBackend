const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rankings = sequelize.define(
    'Rankings',
    {
      ranking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      player_id: { type: DataTypes.INTEGER },
      points: DataTypes.INTEGER,
      last_updated: DataTypes.DATEONLY,
    },
    {
      tableName: 'Rankings',
      timestamps: false,
    }
  );

  Rankings.associate = (models) => {
    Rankings.belongsTo(models.Players, {
      foreignKey: 'player_id',
      as: 'player',
    });
  };

  return Rankings;
};
