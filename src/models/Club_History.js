const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Club_History = sequelize.define(
    'Club_History',
    {
      history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      player_id: { type: DataTypes.INTEGER },
      club_id: { type: DataTypes.INTEGER },
      start_date: { type: DataTypes.DATEONLY, allowNull: false },
      end_date: DataTypes.DATEONLY,
    },
    {
      tableName: 'Club_History',
      timestamps: false,
    }
  );

  Club_History.associate = (models) => {
    Club_History.belongsTo(models.Players, {
      foreignKey: 'player_id',
      as: 'player',
    });
    Club_History.belongsTo(models.Clubs, { foreignKey: 'club_id', as: 'club' });
  };

  return Club_History;
};
