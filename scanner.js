'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const Estimote = require('bleacon').Estimote;

module.exports = () => {

  function startScanning() {
    Estimote.discoverAll((estimote) => {
      const { uuid } = estimote;
      Location.find({}).sort('-createdAt').exec((err, docs) => {
        const { lat, lng } = docs[0];
        const date = Date.now();
        request({
          method: 'post',
          uri: 'http://localhost:3000:/pings',
          json: {
            uuid,
            lat,
            lng,
            date,
          },
        }, (err, res, body) => {
          if (err) {
            console.log('/pings API error');
            console.log(err);
            return;
          }
          if (res.statusCode !== 200) {
            console.log('/pings API error');
            console.log(res.statusCode);
            return;
          }
        });
      });

    });
  }

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
