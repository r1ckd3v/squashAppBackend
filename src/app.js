require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models'); // loading Models

const playersRoutes = require('./modules/players/players.routes');
const healthCheckRoute = require('./modules/healthCheck/healthCheck.routes');
const authRoutes = require('./modules/auth/auth.routes');
const clubsRoutes = require('./modules/clubs/clubs.routes');
const categoriesRoutes = require('./modules/categories/categories.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// initialize body-parser for application/json
app.use(bodyParser.json());

// CORS Headers
app.use(cors());

app.use('/auth', authRoutes);
app.use('/players', playersRoutes);
app.use('/clubs', clubsRoutes);
app.use('/categories', categoriesRoutes);
app.use(healthCheckRoute);
app.use((req, res) => {
  res.status(404).send({
    message: 'Page Not Found',
    status: 404,
    ok: false,
  });
});

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
