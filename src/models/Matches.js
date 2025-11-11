const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Matches = sequelize.define(
        'Matches',
        {
            match_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tournament_id: { type: DataTypes.INTEGER, allowNull: false },
            player1_id: { type: DataTypes.INTEGER, allowNull: false },
            player2_id: { type: DataTypes.INTEGER, allowNull: false },
            winner_id: { type: DataTypes.INTEGER, allowNull: false },
            match_date: DataTypes.DATE, // DATETIME in SQL
            result: DataTypes.STRING(20),
            round: DataTypes.STRING(50),
        },
        {
            tableName: 'Matches',
            timestamps: false,
        }
    );

    Matches.associate = (models) => {
        Matches.belongsTo(models.Tournaments, {
            foreignKey: 'tournament_id',
            as: 'tournament',
        });
        Matches.belongsTo(models.Players, {
            foreignKey: 'player1_id',
            as: 'player1',
        });
        Matches.belongsTo(models.Players, {
            foreignKey: 'player2_id',
            as: 'player2',
        });
        Matches.belongsTo(models.Players, {
            foreignKey: 'winner_id',
            as: 'winner',
        });
        Matches.hasMany(models.Games, { foreignKey: 'match_id', as: 'Games' });
    };

    return Matches;
};
