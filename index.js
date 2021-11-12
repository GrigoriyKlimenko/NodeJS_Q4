const {getConfig} = require('./src/consoleArguments');
const { errorHandler } = require('./src/userErrors');

try {
    console.log(getConfig());
}
catch (error) {
    errorHandler(error);
}
