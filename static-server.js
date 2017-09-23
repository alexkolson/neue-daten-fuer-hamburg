'use strict';

const express = require('express');

module.exports = () => {
  const app = express();

  app.get('/location-watcher', (req, res) => {
    res.sendFile('location-watcher.html');
  });

  app.listen(3002, () => {
    console.log('location watcher started.');
  });
};
