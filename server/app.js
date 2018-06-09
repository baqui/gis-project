import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
const { Client } = require('pg');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

client.connect();

app.use(cors());

app.use(async (req, res, next) => {
  const start = Date.now();
  await next();
  const responseTime = Date.now() - start;
  console.log('\x1b[42m%s\x1b[0m', `Server response: ${responseTime} ms`);
});

app.use('/temperatures', async (req, res, next) => {
  const { rows } = await client.query(
    'SELECT ST_AsGeoJSON(location) AS location FROM temperatures'
  );
  res.send(rows[0]);
  next();
});

app.use('/test/where', async (req, res, next) => {
  const query = `
    SELECT ST_AsGeoJSON(location) AS location, temp, zoom
    FROM temperatures 
    WHERE location && ST_MakeEnvelope($1, $2, $3, $4, 4326)`;

  const values = ['13.1656366', '49.198964', '20.9009881', '54.4281889'];
  const { rows } = await client.query(query, values);
  res.json(rows);
  next();
});

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
