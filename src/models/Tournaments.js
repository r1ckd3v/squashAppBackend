const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tournaments = sequelize.define(
    'Tournaments',
    {
      tournament_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      start_date: { type: DataTypes.DATEONLY, allowNull: false },
      end_date: { type: DataTypes.DATEONLY, allowNull: false },
      location: DataTypes.STRING(100),
      category: DataTypes.STRING(50),
    },
    {
      tableName: 'Tournaments',
      timestamps: false,
    }
  );

  Tournaments.associate = (models) => {
    Tournaments.hasMany(models.Matches, {
      foreignKey: 'tournament_id',
      as: 'matches',
    });
  };

  return Tournaments;
};
