'use strict';

module.exports = {
    up: async (q, S) => {
        await q.createTable(
            'Games',
            {
                game_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                match_id: {
                    type: S.INTEGER,
                    allowNull: false,
                    references: { model: 'Matches', key: 'match_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                game_number: { type: S.INTEGER, allowNull: false },
                player1_points: { type: S.INTEGER, allowNull: false },
                player2_points: { type: S.INTEGER, allowNull: false },
            },
            { timestamps: false }
        );

        await q.addIndex('Games', ['match_id']);
    },
    down: async (q) => {
        await q.dropTable('Games');
    },
};
