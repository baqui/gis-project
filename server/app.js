import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
const { Client } = require('pg');
import dbgeo from 'dbgeo';
require('dotenv').config();

import WeatherApiClient from './services/weather_client';

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

app.use('/fetch-weather', async (req, res, next) => {
  if (!req.query.zoom) {
    res.status(400);
    res.send({ error: 'Missing param [zoom]' });
    return;
    next();
  }
  const query = `
    SELECT ST_AsGeoJSON(location) AS geom, id
    FROM grids 
    WHERE zoom = $1`;
  const values = [req.query.zoom];
  const { rows } = await client.query(query, values);

  console.log(`Found ${rows.length} rows`);
  if (rows.length === 0) {
    res.status(400);
    res.send({ error: 'Found 0 locations at given zoom' });
    next();
    return;
  }

  dbgeo.parse(
    rows,
    {
      outputFormat: 'geojson',
      geometryType: 'geojson'
    },
    (error, data) => {
      data.features.map(feature => {
        const coords = feature.geometry.coordinates[0];
        const location_id = feature.properties.id;
        const latitude =
          (coords[0][1] + coords[1][1] + coords[2][1] + coords[3][1]) / 4;
        const longitude =
          (coords[0][0] + coords[1][0] + coords[2][0] + coords[3][0]) / 4;

        WeatherApiClient.getWeatherByCoordinates(latitude, longitude).then(
          response => {
            const weather = response.data.query.results;
            client.query(
              'INSERT INTO weathers (location_id, data) VALUES ($1, $2)',
              [location_id, weather],
              (err, res) => {
                if (err) {
                  console.log('Failed to save record');
                  console.log(err.stack);
                } else {
                  console.log('Saved record ', location_id);
                }
              }
            );
          }
        );
      });

      res.send();
      next();
    }
  );
});

// deprecated
app.use('/temperatures', async (req, res, next) => {
  const { rows } = await client.query(
    'SELECT ST_AsGeoJSON(location) AS location FROM temperatures'
  );
  res.send(rows[0]);
  next();
});

app.use('/weather/where', async (req, res, next) => {
  if (!req.query.viewport) {
    res.status(400);
    res.send({ error: 'Missing param [viewport]' });
    next();
    return;
  } else if (!req.query.zoom) {
    res.status(400);
    res.send({ error: 'Missing param [zoom]' });
    next();
    return;
  }

  const query = `
    SELECT ST_AsGeoJSON(g.location) AS geom, g.zoom AS zoom, w.data AS weather
    FROM grids g
    LEFT JOIN weathers w ON w.location_id = g.id
    WHERE g.zoom = $5 AND g.location && ST_MakeEnvelope($1, $2, $3, $4, 4326)`;

  const values = req.query.viewport.split(',');
  values.push(req.query.zoom);

  const { rows } = await client.query(query, values);

  console.log(`Found ${rows.length} rows at zoom ${req.query.zoom}`);
  if (rows.length === 0) {
    res.status(400);
    res.send({ error: `Found 0 locations at zoom ${req.query.zoom}` });
    next();
    return;
  }

  dbgeo.parse(
    rows,
    {
      outputFormat: 'geojson',
      geometryType: 'geojson'
    },
    (error, data) => {
      res.json(data);
      next();
    }
  );
});

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
