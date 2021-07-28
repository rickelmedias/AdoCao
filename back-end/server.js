const http  = require('http');
const app   = require('./app/app.js');
const port  = 3003; // process.env.PORT ||
const server= http.createServer(app);
server.listen(port);