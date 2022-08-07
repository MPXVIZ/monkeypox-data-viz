const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const redis = require('redis');
// import { fileURLToPath } from 'url';
const router = require('./api/routes/index.js');
// Construct a schema, using GraphQL schema language
// Provide type definitions and resolver functions for your schema fields

const PORT = process.env.PORT || 8000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const DEFAULT_REDIS_EXPIRATION = process.env.DEFAULT_REDIS_EXPIRATION || 10800;

// initiate server
const app = express();
const client = redis.createClient({ url: REDIS_URL });
client.on('error', (err: any) => console.error('Redis Client Error: ', err));
client.connect();
// For Heroku - Only require dotenv when NODE_ENV is set to development
if (process.env.NODE_ENV == 'development') {
    dotenv.config();
}

//utilize express as middleware for the server
//server.applyMiddleware({ app });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(function (req: any, res: any, next: any) {
    req.redisClient = client;
    req.redisExpiration = DEFAULT_REDIS_EXPIRATION;
    next();
});

app.get('/', (req: any, res: any) =>
    res.sendFile(path.join(__dirname, '..', '..', 'public/index.html')),
);

// body-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use(function (err: any, req: any, res: any, next: any) {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`),
);

module.exports = app;
