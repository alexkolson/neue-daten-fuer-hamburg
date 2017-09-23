'use strict';

const express = require('express');

const app = express();

app.get('/location-watcher', () => {
  res.sendFile('location-watcher.html');
});

app.listen(3002, () => {
  console.log('location watcher started.');
});
