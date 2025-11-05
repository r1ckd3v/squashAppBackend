const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Players = sequelize.define(
    'Players',
    {
      player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(50), allowNull: false },
      first_lastname: { type: DataTypes.STRING(50), allowNull: false },
      second_lastname: { type: DataTypes.STRING(50) },
      birth_date: DataTypes.DATEONLY,
      country: DataTypes.STRING(50),
      email: { type: DataTypes.STRING(100), unique: true },
      category_id: { type: DataTypes.INTEGER },
      club_id: { type: DataTypes.INTEGER },
      club_join_date: DataTypes.DATEONLY,
    },
    {
      tableName: 'Players',
      timestamps: false,
    }
  );

  Players.associate = (models) => {
    Players.belongsTo(models.Player_Categories, {
      foreignKey: 'category_id',
      as: 'category',
    });
    Players.belongsTo(models.Clubs, {
      foreignKey: 'club_id',
      as: 'club',
    });
    Players.hasMany(models.Club_History, {
      foreignKey: 'player_id',
      as: 'clubHistory',
    });
    Players.hasMany(models.Rankings, {
      foreignKey: 'player_id',
      as: 'rankings',
    });
    // Matches (as player1 / player2)
    if (models.Matches) {
      Players.hasMany(models.Matches, {
        foreignKey: 'player1_id',
        as: 'matchesAsPlayer1',
      });
      Players.hasMany(models.Matches, {
        foreignKey: 'player2_id',
        as: 'matchesAsPlayer2',
      });
    }
  };

  return Players;
};
