'use strict';

module.exports = {
    up: (q, S) =>
        q.createTable(
            'Tournaments',
            {
                tournament_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: { type: S.STRING(100), allowNull: false },
                start_date: { type: S.DATEONLY, allowNull: false },
                end_date: { type: S.DATEONLY, allowNull: false },
                location: S.STRING(100),
                category: S.STRING(50),
            },
            { timestamps: false }
        ),
    down: (q) => q.dropTable('Tournaments'),
};
