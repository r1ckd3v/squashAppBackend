'use strict';

module.exports = {
    up: async (q, S) => {
        await q.createTable(
            'Players',
            {
                player_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: { type: S.STRING(50), allowNull: false },
                first_lastname: { type: S.STRING(50), allowNull: false },
                second_lastname: S.STRING(50),
                birth_date: S.DATEONLY,
                country: S.STRING(50),
                phone: S.STRING(50),
                email: { type: S.STRING(100), unique: true },
                category_id: {
                    type: S.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Player_Categories',
                        key: 'category_id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },
                club_id: {
                    type: S.INTEGER,
                    allowNull: true,
                    references: { model: 'Clubs', key: 'club_id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },
                club_join_date: S.DATEONLY,
            },
            { timestamps: false }
        );

        // Helpful indexes
        await q.addIndex('Players', ['category_id']);
        await q.addIndex('Players', ['club_id']);
        await q.addIndex('Players', ['email'], {
            unique: true,
            name: 'players_email_unique',
        });
    },
    down: async (q) => {
        await q.removeIndex('Players', 'players_email_unique').catch(() => {});
        await q.dropTable('Players');
    },
};
