// require('dotenv').config();
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const {
  sequelize,
  Clubs,
  Player_Categories,
  Players,
} = require('../src/models');

// ---- Data ----
const clubs = [
  {
    name: 'Squash La Paz',
    city: 'La Paz',
    country: 'Bolivia',
    foundation_date: '2003-04-12',
    email: 'contacto@lapazsquash.bo',
    phone: '+591 2 123 4567',
  },
  {
    name: 'Squash Santa Cruz',
    city: 'Santa Cruz de la Sierra',
    country: 'Bolivia',
    foundation_date: '2006-07-20',
    email: 'info@santacruzsquash.bo',
    phone: '+591 3 987 6543',
  },
  {
    name: 'Squash Cochabamba',
    city: 'Cochabamba',
    country: 'Bolivia',
    foundation_date: '2005-09-15',
    email: 'info@cochasquash.bo',
    phone: '+591 4 765 4321',
  },
  {
    name: 'Squash Sucre',
    city: 'Sucre',
    country: 'Bolivia',
    foundation_date: '2008-03-10',
    email: 'info@sucresquash.bo',
    phone: '+591 64 333 222',
  },
  {
    name: 'Squash Tarija',
    city: 'Tarija',
    country: 'Bolivia',
    foundation_date: '2011-10-05',
    email: 'info@tarijasquash.bo',
    phone: '+591 66 444 555',
  },
];

const categories = [
  {
    name: 'Professional',
    description: 'Top national and international players.',
  },
  {
    name: 'Semi-Pro',
    description: 'Competitive players below professional tier.',
  },
  {
    name: 'Amateur',
    description: 'Recreational and local competition players.',
  },
  { name: 'Junior', description: 'Under 19 players in development.' },
  { name: 'Senior', description: 'Players aged 40 and above.' },
];

// ---- Star Wars Players ----
const starWarsPlayers = [
  {
    name: 'Luke',
    first_lastname: 'Skywalker',
    second_lastname: 'Lars',
    birth_date: '1981-05-04',
  },
  {
    name: 'Leia',
    first_lastname: 'Organa',
    second_lastname: 'Solo',
    birth_date: '1981-05-04',
  },
  {
    name: 'Han',
    first_lastname: 'Solo',
    second_lastname: 'Corell',
    birth_date: '1975-07-13',
  },
  {
    name: 'Anakin',
    first_lastname: 'Skywalker',
    second_lastname: 'Tano',
    birth_date: '1977-08-10',
  },
  {
    name: 'Obi-Wan',
    first_lastname: 'Kenobi',
    second_lastname: 'Jinn',
    birth_date: '1970-03-11',
  },
  {
    name: 'Padmé',
    first_lastname: 'Amidala',
    second_lastname: 'Naberrie',
    birth_date: '1978-02-28',
  },
  {
    name: 'Rey',
    first_lastname: 'Skywalker',
    second_lastname: 'Palpatine',
    birth_date: '1993-04-10',
  },
  {
    name: 'Finn',
    first_lastname: 'FN-2187',
    second_lastname: 'Ren',
    birth_date: '1992-01-05',
  },
  {
    name: 'Poe',
    first_lastname: 'Dameron',
    second_lastname: 'Antilles',
    birth_date: '1985-01-17',
  },
  {
    name: 'Mace',
    first_lastname: 'Windu',
    second_lastname: 'Korun',
    birth_date: '1968-12-21',
  },
  {
    name: 'Ahsoka',
    first_lastname: 'Tano',
    second_lastname: 'Kryze',
    birth_date: '1990-08-22',
  },
  {
    name: 'Din',
    first_lastname: 'Djarin',
    second_lastname: 'Vizsla',
    birth_date: '1980-05-01',
  },
];

const countries = ['Bolivia', 'Spain', 'Chile', 'Peru', 'Argentina'];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugifyEmail(name, lastname, i) {
  const slug =
    `${String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')}` +
    `.${String(lastname)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')}`;
  return `${slug}${i}@example.com`;
}

// ---- Seeding ----
console.log('🚀 Seeding Clubs, Player_Categories, and Star Wars Players…');

sequelize
  .sync()
  .then(() =>
    Promise.all(
      clubs.map((c) =>
        Clubs.findOrCreate({ where: { name: c.name }, defaults: c })
      )
    )
  )
  .then(() =>
    Promise.all(
      categories.map((cat) =>
        Player_Categories.findOrCreate({
          where: { name: cat.name },
          defaults: cat,
        })
      )
    )
  )
  .then(() =>
    Promise.all([
      Clubs.findAll({ attributes: ['club_id'] }),
      Player_Categories.findAll({ attributes: ['category_id'] }),
    ])
  )
  .then(([clubRows, categoryRows]) => {
    const clubIds = clubRows.map((c) => c.club_id);
    const categoryIds = categoryRows.map((c) => c.category_id);

    const players = starWarsPlayers.map((p, idx) => ({
      name: p.name,
      first_lastname: p.first_lastname,
      second_lastname: p.second_lastname,
      country: rand(countries),
      email: slugifyEmail(p.name, p.first_lastname, idx),
      club_id: rand(clubIds),
      category_id: rand(categoryIds),
      club_join_date: '2025-01-01',
      birth_date: p.birth_date,
    }));

    return Players.bulkCreate(players, { ignoreDuplicates: true });
  })
  .then(() => {
    console.log('✅ Seeding completed successfully!');
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
  })
  .finally(() => {
    console.log('🔚 Closing database connection…');
    sequelize.close();
  });
