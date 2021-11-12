const process = require('process');
const { isValidOptionsString, isValidOptions } = require('./validation');

const optionsString = process.argv.slice(2);
const optionsToCheck = ['-c', '-i', '-o']

const buildConfig = (optionsString) => {
    let optionsObject = {};

    if (isValidOptionsString(optionsString)) {
        optionsToCheck.map((option) => {
            if (optionsString.includes(option)) {
                optionsObject[option] = optionsString[optionsString.indexOf(option) + 1]
            }
        })
    }
    optionsObject['-c'] = optionsObject['-c'].split('-');

    if (isValidOptions(optionsObject)) {
        return optionsObject;
    }
}



const getConfig = () => buildConfig(optionsString);

module.exports = {
    getConfig,
};