'use strict';

module.exports = {
    up: (q, S) =>
        q.createTable(
            'Clubs',
            {
                club_id: {
                    type: S.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: { type: S.STRING(100), allowNull: false },
                city: S.STRING(100),
                country: S.STRING(50),
                foundation_date: S.DATEONLY,
                email: S.STRING(100),
                phone: S.STRING(20),
            },
            { timestamps: false }
        ),
    down: (q) => q.dropTable('Clubs'),
};
