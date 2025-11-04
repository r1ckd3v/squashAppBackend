// models/index.js
const fs = require('fs');
const path = require('path');
const sequelize = require('../utils/database');

const basename = path.basename(__filename);
const models = {};

// Import all class-based model files
fs.readdirSync(__dirname)
  .filter(
    (file) => file !== basename && file.endsWith('.js') && !file.startsWith('.')
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

// ✅ Set up associations (if defined)
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, ...models };
