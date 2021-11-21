const { startCiphering } = require('./src/main/main');
const process = require('process');

startCiphering(process.argv.slice(2));
