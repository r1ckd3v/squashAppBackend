'use strict';
module.exports = {
    up: async (q) => {
        await q.bulkInsert('Player_Categories', [
            {
                category_id: 1,
                name: 'Senior',
                description: 'Standard adult division',
            },
            {
                category_id: 2,
                name: 'Junior',
                description: 'Under-18 division',
            },
            {
                category_id: 3,
                name: 'Veteran',
                description: 'Over-40 division',
            },
        ]);
        // ✅ Reset the sequence so auto-increment continues after 3
        await q.sequelize
            .query(`SELECT setval(pg_get_serial_sequence('"Player_Categories"', 'category_id'),
        (SELECT COALESCE(MAX("category_id"), 0) FROM "Player_Categories"));`);
    },
    down: async (q) => {
        await q.bulkDelete('Player_Categories', { category_id: [1, 2, 3] });
    },
};
