'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Estimote = require('bleacon').Estimote;

function startScanning() {
  Estimote.discoverAll((estimote) => {
    // console.log(estimote.uuid);
  });
}


module.exports = () => {
  startScanning();

  const app = express();
  app.use(bodyParser.json())

  app.get('/location-watcher', (req, res) => {
    res.sendFile('location-watcher.html', { root: __dirname });
  });

  app.post('/location', (req, res) => {
    console.log(req.body);
    res.send(200);
  });

  app.listen(3002, () => {
    console.log('scanner started.');
  });

};
