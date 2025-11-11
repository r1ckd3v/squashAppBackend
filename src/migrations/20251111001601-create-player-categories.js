'use strict';

module.exports = {
    up: (q, S) =>
        q.createTable(
            'Player_Categories',
            {
                category_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: { type: S.STRING(50), allowNull: false },
                description: S.TEXT,
            },
            { timestamps: false }
        ),
    down: (q) => q.dropTable('Player_Categories'),
};
