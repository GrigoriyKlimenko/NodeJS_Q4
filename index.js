const process = require('process');
const { startCiphering } = require('./src/main/main')

startCiphering(process.argv.slice(2));