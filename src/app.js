require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const playersRoutes = require('./modules/players/players.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// initialize body-parser for application/json
app.use(bodyParser.json());

// CORS Headers
app.use(cors());

// all the routes that starts by /player will be attended by this router
app.use('/players', playersRoutes);

// Add the message here
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
