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

  mongoose.connect('mongodb://localhost/hbs-scanner')
  const locationSchema = new mongoose.Schema({ lat: Number, lng: Number }, { timestamps: true })
  const Location = mongoose.model('Location', locationSchema);

  const app = express();
  app.use(bodyParser.json())

  app.get('/location-watcher', (req, res) => {
    res.sendFile('location-watcher.html', { root: __dirname });
  });

  app.post('/location', (req, res) => {
    const { body: { lat, lng } } = req;
    Location.create({ lat, lng }, (err, location) => {
      if (err) {
        console.log('could not save location....oh well.');
        res.sendStatus(500);
        return;
      }

      return res.sendStatus(200);
    });
  });

  app.listen(3002, () => {
    console.log('scanner started.');
  });

};
