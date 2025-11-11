const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ranking = sequelize.define(
        'Ranking',
        {
            ranking_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            player_id: { type: DataTypes.INTEGER, unique: true },
            points: DataTypes.INTEGER,
            last_updated: DataTypes.DATEONLY,
        },
        {
            tableName: 'Ranking',
            timestamps: false,
        }
    );

    Ranking.associate = (models) => {
        Ranking.belongsTo(models.Players, {
            foreignKey: 'player_id',
            as: 'player',
        });
    };

    return Ranking;
};
