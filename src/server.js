const express = require('express');
const routes = require('./routes');
const rateLimit = require("express-rate-limit");

require('./database');

const app = express();

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json());
app.use(routes);

app.listen(3232);