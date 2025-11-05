require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models'); // loading Models

const playersRoutes = require('./modules/players/players.routes');
const healthCheckRoute = require('./modules/healthCheck/healthCheck.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// initialize body-parser for application/json
app.use(bodyParser.json());

// CORS Headers
app.use(cors());

// all the routes that starts by /players will be attended by this router
app.use('/players', playersRoutes);
app.use(healthCheckRoute);

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Connected to the Postgres DB successfully!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ DB synced');

    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
