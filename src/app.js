const express = require('express');
const app = express();

const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', routes);

module.exports = app;