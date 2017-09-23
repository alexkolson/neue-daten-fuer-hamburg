const Estimote = require('bleacon').Estimote;
Estimote.discoverAll((estimote) => {
  console.log(estimote.uuid);
});
