'use strict';
module.exports = {
    up: async (q) => {
        await q.bulkInsert('Tournaments', [
            {
                tournament_id: 1,
                name: 'La Paz Open 2025',
                start_date: '2025-03-10',
                end_date: '2025-03-12',
                location: 'La Paz',
                category: 'Senior',
            },
            {
                tournament_id: 2,
                name: 'Altiplano Junior Cup 2025',
                start_date: '2025-04-05',
                end_date: '2025-04-06',
                location: 'El Alto',
                category: 'Junior',
            },
        ]);
        // Reset the sequence so auto-increment continues after 3
        await q.sequelize
            .query(`SELECT setval(pg_get_serial_sequence('"Tournaments"', 'tournament_id'),
        (SELECT COALESCE(MAX("tournament_id"), 0) FROM "Tournaments"));`);
    },
    down: async (q) => {
        await q.bulkDelete('Tournaments', { tournament_id: [1, 2] });
    },
};
