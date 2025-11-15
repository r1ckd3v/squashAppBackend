'use strict';
module.exports = {
    up: async (q) => {
        await q.bulkInsert('Ranking', [
            {
                ranking_id: 1,
                player_id: 1,
                points: 1200,
                last_updated: '2025-03-13',
            },
            {
                ranking_id: 2,
                player_id: 5,
                points: 980,
                last_updated: '2025-03-13',
            },
            {
                ranking_id: 3,
                player_id: 2,
                points: 860,
                last_updated: '2025-03-13',
            },
            {
                ranking_id: 4,
                player_id: 3,
                points: 700,
                last_updated: '2025-04-07',
            },
            {
                ranking_id: 5,
                player_id: 6,
                points: 680,
                last_updated: '2025-04-07',
            },
            {
                ranking_id: 6,
                player_id: 4,
                points: 500,
                last_updated: '2025-03-13',
            },
        ]);
        // Reset the sequence so auto-increment continues after 3
        await q.sequelize
            .query(`SELECT setval(pg_get_serial_sequence('"Ranking"', 'ranking_id'),
        (SELECT COALESCE(MAX("ranking_id"), 0) FROM "Ranking"));`);
    },
    down: async (q) => {
        await q.bulkDelete('Ranking', { ranking_id: [1, 2, 3, 4, 5, 6] });
    },
};
