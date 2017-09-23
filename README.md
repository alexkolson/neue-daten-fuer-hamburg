# Hamburg Bewegt Sich
Rough english translation: Hamburg moves

This is a POC for the Hamburg Bewegt Sich project at the 2017 Hochbahn Mobility Hackathon.

## Files
- [`api.js`](api.js): Minimal POC implementation of the API for storing and retrieving pings from all registered becaons in the project.
- [`scanner.js`](scanner.js): Minimal POC implementation of the code that would be on the beacon scanner devices.
- [`location-watcher.html`](location-watcher.html): Helper file that uses HTML5 geolcation API to get location of the "reciever" (our computer).
- [`index.js`](index.js): Helper file that starts the scanner and the API server.