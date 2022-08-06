import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import redis from 'redis';
import { fileURLToPath } from 'url';
import router from './api/routes/index.js';
// Construct a schema, using GraphQL schema language
// Provide type definitions and resolver functions for your schema fields

const PORT = process.env.PORT || 8000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const DEFAULT_REDIS_EXPIRATION = process.env.DEFAULT_REDIS_EXPIRATION || 10800;

// initiate server
const app = express();
const client = redis.createClient(REDIS_PORT);
client.on('error', err => console.error('Redis Client Error: ', err));
client.connect();
// For Heroku - Only require dotenv when NODE_ENV is set to development
if (process.env.NODE_ENV == 'development') {
    dotenv.config({ silent: true });
}

//utilize express as middleware for the server
//server.applyMiddleware({ app });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(function (req, res, next) {
    req.redisClient = client;
    req.redisExpiration = DEFAULT_REDIS_EXPIRATION;
    next();
});

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'public/index.html')),
);

// body-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`),
);

export default app;
