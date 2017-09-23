'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost/hbs-api');

  const app = express();
  app.use(bodyParser.json());

  app.post('/pings', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  });

  // app.get('/:uuid');

  app.listen(3000, () => {
    console.log('api server started.');
  });
};
