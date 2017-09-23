'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

module.exports = () => {
  const connection = mongoose.createConnection('mongodb://localhost/ndfh-api');

  const pingSchema = new mongoose.Schema({ beacon: String, scanner: String, lat: Number, lng: Number, timestamp: Date });
  const Ping = connection.model('Ping', pingSchema);

  const app = express();
  app.use(bodyParser.json());

  app.post('/pings', (req, res) => {
    const { body: { beacon, scanner, lat, lng, timestamp } } = req;
    Ping.create({ beacon, scanner, lat, lng, timestamp }, (err, ping) => {
      if (err) {
        console.log('could not save ping...oh well.');
        return res.sendStatus(500);
      }

      res.sendStatus(200);
    });
  });

  app.get('/pings', (req, res) => {
    const { query: queryParams } = req;
    const query = {};
    const { begin, end } = queryParams;
    if (begin) {
      query.timestamp = {
        $gte: queryParams.begin,
      };
    }
    if (end) {
      query.timestamp = query.timestamp || {};
      query.timestamp.$lt = end;
    }

    delete queryParams.begin;
    delete queryParams.end;

    Ping.find(query).sort('-timestamp').exec((err, docs) => {
      res.json(docs);
    });
  });

  // app.get('/:uuid');

  app.listen(3000, () => {
    console.log('api server started.');
  });
};
