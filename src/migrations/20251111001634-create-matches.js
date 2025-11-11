'use strict';

module.exports = {
    up: async (q, S) => {
        await q.createTable(
            'Matches',
            {
                match_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },

                tournament_id: {
                    type: S.INTEGER,
                    allowNull: false,
                    references: { model: 'Tournaments', key: 'tournament_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },

                player1_id: {
                    type: S.INTEGER,
                    allowNull: false,
                    references: { model: 'Players', key: 'player_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },

                player2_id: {
                    type: S.INTEGER,
                    allowNull: false,
                    references: { model: 'Players', key: 'player_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },
                winner_id: {
                    type: S.INTEGER,
                    allowNull: false,
                    references: { model: 'Players', key: 'player_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },

                match_date: S.DATE, // DATETIME equivalent
                result: S.STRING(20),
                round: S.STRING(50),
            },
            { timestamps: false }
        );

        await q.addIndex('Matches', ['tournament_id']);
        await q.addIndex('Matches', ['player1_id']);
        await q.addIndex('Matches', ['player2_id']);

        // Optional rule: forbid same player on both sides (Postgres)
        // await q.sequelize.query(
        //   'ALTER TABLE "Matches" ADD CONSTRAINT matches_player_diff CHECK (player1_id IS NULL OR player2_id IS NULL OR player1_id <> player2_id);'
        // );
    },
    down: async (q) => {
        // await q.sequelize.query('ALTER TABLE "Matches" DROP CONSTRAINT IF EXISTS matches_player_diff;').catch(() => {});
        await q.dropTable('Matches');
    },
};
