require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const http = require('http');
const { initSocket } = require('./socket/socket');

const { sequelize } = require('./models');

const playersRoutes = require('./modules/players/players.routes');
const healthCheckRoute = require('./modules/healthCheck/healthCheck.routes');
const authRoutes = require('./modules/auth/auth.routes');
const clubsRoutes = require('./modules/clubs/clubs.routes');
const categoriesRoutes = require('./modules/categories/categories.routes');
const matchesRoutes = require('./modules/matches/matches.routes');
const gamesRoutes = require('./modules/games/games.routes');

const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// initialize body-parser for application/json
app.use(bodyParser.json());

// CORS Headers
app.use(cors());

app.use('/auth', authRoutes);
app.use('/players', auth, playersRoutes);
app.use('/clubs', clubsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/matches', matchesRoutes);
app.use('/games', gamesRoutes);
app.use(healthCheckRoute);
//404
app.use((req, res) => {
    res.status(404).send({
        message: 'Page Not Found',
        status: 404,
        ok: false,
    });
});

// Create HTTP server and init socket.io ONCE here
const server = http.createServer(app);
const io = initSocket(server);
app.set('io', io); // expose via req.app.get('io')

sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Connected to the Postgres DB successfully!');
        console.log('💾 Run migrations manually with: npm run db:migrate');
        console.log('🌱 Run seeders manually with: npm run db:seed');

        server.listen(PORT, () => {
            console.log(
                `🎮 Server (HTTP + WebSockets) running on http://localhost:${PORT}`
            );
        });
    })
    .catch((err) => {
        console.log('Database Connection Failed: ', err);
    });
