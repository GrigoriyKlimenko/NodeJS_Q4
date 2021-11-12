const proces = require('process');
const { isValidConfigString } = require('./validation');
const a = process.argv.slice(2);



const getConfig = () => {
    isValidConfigString(a);
    return a;
}

module.exports = {
    getConfig,
};