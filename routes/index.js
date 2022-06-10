const express = require('express');
const router = require('./notes');
const app = express();

app.use('/notes', router);

module.exports = app;