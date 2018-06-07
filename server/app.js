import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
const { Client } = require('pg');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
const client = new Client();

app.use(cors());

app.use(async (req, res, next) => {
  const start = Date.now();
  await next();
  const responseTime = Date.now() - start;
  console.log.info(
    `${ctx.method} ${ctx.status} ${ctx.url} - ${responseTime} ms`
  );
});

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
