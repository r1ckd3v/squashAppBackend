'use strict';

module.exports = {
    up: async (q, S) => {
        await q.createTable(
            'Club_History',
            {
                history_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },

                player_id: {
                    type: S.INTEGER,
                    allowNull: false,
                    references: { model: 'Players', key: 'player_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },

                club_id: {
                    type: S.INTEGER,
                    allowNull: true,
                    references: { model: 'Clubs', key: 'club_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },

                start_date: { type: S.DATEONLY, allowNull: false },
                end_date: S.DATEONLY,
            },
            { timestamps: false }
        );

        await q.addIndex('Club_History', ['player_id']);
        await q.addIndex('Club_History', ['club_id']);
    },
    down: async (q) => {
        await q.dropTable('Club_History');
    },
};
