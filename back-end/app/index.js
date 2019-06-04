const buildServer = require('./build-server.js');
const logger = require('./utils/logger.js');

const serv = buildServer(server => logger.info(`Server is listening on port ${server.address().port}`));
