'use strict';
module.exports = {
    up: async (q) => {
        await q.bulkInsert('Users', [
            {
                user_id: 1,
                email: 'admin@example.com',
                password:
                    '$2b$10$ey1vYaEgXStkmaC2wfSfuO0vEvaDNURJu5r2NHc5cw6RoHqTK/8E2',
                roles: ['admin', 'organizer'],
            },
            {
                user_id: 2,
                email: 'coach@example.com',
                password:
                    '$2b$10$eAMhA2YQfueu2EiXBhzPyODEeKcptAthUpVZpqOiFVGVjBXalqeHy',
                roles: ['coach'],
            },
            {
                user_id: 3,
                email: 'viewer@example.com',
                password:
                    '$2b$10$LQcYrvx/7uOXblHcv/BwAuWeczi9X9RDKD.PkeDveNfaO69ZZqUqu',
                roles: ['viewer'],
            },
        ]);
        // Reset the sequence so auto-increment continues after 3
        await q.sequelize
            .query(`SELECT setval(pg_get_serial_sequence('"Users"', 'user_id'),
        (SELECT COALESCE(MAX("user_id"), 0) FROM "Users"));`);
    },
    down: async (q) => {
        await q.bulkDelete('Users', { user_id: [1, 2, 3] });
    },
};
