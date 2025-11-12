'use strict';
module.exports = {
    up: async (q) => {
        await q.bulkInsert('Clubs', [
            {
                club_id: 1,
                name: 'Andes Racquet Club',
                city: 'La Paz',
                country: 'Bolivia',
                phone: '+591 44235312',
                foundation_date: '1995-05-12',
                email: 'contact@andesrc.bo',
            },
            {
                club_id: 2,
                name: 'Altiplano Smash',
                city: 'El Alto',
                country: 'Bolivia',
                phone: '+591 70781215',
                foundation_date: '2003-09-01',
                email: 'hola@altiplanosmash.bo',
            },
            {
                club_id: 3,
                name: 'Cordillera Padel',
                city: 'Cochabamba',
                country: 'Bolivia',
                phone: '+591 44407753',
                foundation_date: '2010-03-20',
                email: 'info@cordillerapadel.bo',
            },
        ]);
        // ✅ Reset the sequence so auto-increment continues after 3
        await q.sequelize
            .query(`SELECT setval(pg_get_serial_sequence('"Clubs"', 'club_id'),
        (SELECT COALESCE(MAX("club_id"), 0) FROM "Clubs"));`);
    },
    down: async (q) => {
        await q.bulkDelete('Clubs', { club_id: [1, 2, 3] });
    },
};
