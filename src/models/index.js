const fs = require('fs');
const path = require('path');
const sequelize = require('../utils/database');

const basename = path.basename(__filename);
const models = {};

// Dynamically import all models in this directory
fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file !== basename && file.endsWith('.js') && !file.startsWith('.')
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize);
        models[model.name] = model;
    });

// Define associations if they exist
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = { sequelize, ...models };
