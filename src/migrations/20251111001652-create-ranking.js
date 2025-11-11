'use strict';

module.exports = {
    up: async (q, S) => {
        await q.createTable(
            'Ranking',
            {
                ranking_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                player_id: {
                    type: S.INTEGER,
                    allowNull: false,
                    unique: true, // one-to-one with Players
                    references: { model: 'Players', key: 'player_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                points: S.INTEGER,
                last_updated: S.DATEONLY,
            },
            { timestamps: false }
        );

        await q.addIndex('Ranking', ['player_id'], {
            unique: true,
            name: 'ranking_player_unique',
        });
    },
    down: async (q) => {
        await q.removeIndex('Ranking', 'ranking_player_unique').catch(() => {});
        await q.dropTable('Ranking');
    },
};
