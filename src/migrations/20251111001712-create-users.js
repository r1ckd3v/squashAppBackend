'use strict';

module.exports = {
    up: async (q, S) => {
        await q.createTable(
            'Users',
            {
                user_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: { type: S.STRING(255), allowNull: false, unique: true },
                password: { type: S.STRING(255), allowNull: false },
                roles: {
                    type: S.ARRAY(S.STRING),
                    allowNull: false,
                    defaultValue: [],
                }, // Postgres
            },
            { timestamps: false }
        );

        await q.addIndex('Users', ['email'], {
            unique: true,
            name: 'users_email_unique',
        });
    },
    down: async (q) => {
        await q.removeIndex('Users', 'users_email_unique').catch(() => {});
        await q.dropTable('Users');
    },
};
