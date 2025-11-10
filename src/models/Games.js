const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Games = sequelize.define(
        'Games',
        {
            game_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            match_id: { type: DataTypes.INTEGER },
            game_number: { type: DataTypes.INTEGER, allowNull: false },
            player1_points: { type: DataTypes.INTEGER, allowNull: false },
            player2_points: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            tableName: 'Games',
            timestamps: false,
        }
    );

    Games.associate = (models) => {
        Games.belongsTo(models.Matches, {
            foreignKey: 'match_id',
            as: 'match',
        });
    };

    return Games;
};
