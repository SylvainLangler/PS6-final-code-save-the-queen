const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');


module.exports = (cb) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());
  app.use(bodyParser.json({}));
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));
  app.use('/api', api);
  app.use('*', (req, res) => res.status(404).end());
  const server = app.listen(9428, '0.0.0.0', () => cb && cb(server));

  // const socketIo = require('socket.io');
  // const io = socketIo(server);

  // const idAdmin = [15877166342, 15651565112];
  // app.set('idAdmins', idAdmin);

  // const map_socket = {};
  // app.set('smap', map_socket);

  // io.on('connection', (socket) => {
  //   socket.emit('create', 'omedetto gozaimasu');
  //   const id = socket.client.request._query.id;
  //   console.log('id = ', id);

  //   const currMap = app.get('smap');
  //   currMap[id] = socket;
  //   app.set('smap', currMap);
  // });

  // app.set('io', io);
};
