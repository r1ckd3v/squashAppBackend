// require('dotenv').config();
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const bcrypt = require('bcrypt');
const { Users, sequelize } = require('../src/models');

console.log('test Password: ', process.env.POSTGRES_PASSWORD);

const EMAIL = 'test@example.com';
const PASS = 'password123';

console.log('🚀 Starting smoke test for Users model...');
console.log('📦 Using email:', EMAIL);

// Clean up old test user (safe repeatability)
Users.destroy({ where: { email: EMAIL } })
  .then((count) => {
    if (count > 0) console.log(`🧹 Removed existing user (${count} row(s))`);
    else console.log('🧩 No existing user found, proceeding...');
    return bcrypt.hash(PASS, 10);
  })
  .then((hash) => {
    console.log('🔹 Hashed password:', hash);
    console.log('🛠️  Creating new user...');
    return Users.create({ email: EMAIL, password: hash });
  })
  .then((user) => {
    console.log(`✅ User created successfully! ID: ${user.user_id}`);
    console.log('🔍 Fetching user from database...');
    return Users.findOne({ where: { email: EMAIL } });
  })
  .then((user) => {
    if (!user) throw new Error('User not found after creation!');
    console.log(`📄 Found user: ${user.email}`);
    console.log('🧮 Comparing password hash...');
    return bcrypt.compare(PASS, user.password);
  })
  .then((match) => {
    console.log(`✅ Password matches? ${match ? 'Yes' : 'No'}`);
    if (match) console.log('🎉 Smoke test passed successfully!');
    else console.log('⚠️  Password mismatch! Check bcrypt logic.');
  })
  .catch((err) => {
    console.error('❌ Smoke test failed:', err.message);
    console.error(err);
  })
  .finally(() => {
    console.log('🔚 Closing database connection...');
    sequelize.close();
  });
