'use strict';
module.exports = {
    up: async (q) => {
        await q.bulkInsert('Users', [
            {
                user_id: 1,
                email: 'admin@example.com',
                password:
                    '$2b$10$CyBBSp9HPSBqUTiFZ1C5SO8UZ6axX40rW0OaF3TqI1uTQHHK2gDAK',
                roles: ['admin', 'organizer'],
            },
            {
                user_id: 2,
                email: 'coach@example.com',
                password:
                    '$2b$10$2dKl2HR8TY1fTMy1Qb7EvOktlUm2t2pQPBwAO5Fu49LrJj4dG/pYO',
                roles: ['coach'],
            },
            {
                user_id: 3,
                email: 'viewer@example.com',
                password:
                    '$2b$10$nK6Uu1eLBh.lYwQWIEe5iOGq6YfqvGhfnkQKqzrcFZSlVEsLsoH6G',
                roles: ['viewer'],
            },
        ]);
        // ✅ Reset the sequence so auto-increment continues after 3
        await q.sequelize
            .query(`SELECT setval(pg_get_serial_sequence('"Users"', 'user_id'),
        (SELECT COALESCE(MAX("user_id"), 0) FROM "Users"));`);
    },
    down: async (q) => {
        await q.bulkDelete('Users', { user_id: [1, 2, 3] });
    },
};
