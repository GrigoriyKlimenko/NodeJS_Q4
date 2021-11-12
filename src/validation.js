const {UpperCaseError, CountOptionsError} = require('./userErrors');

let countOfOptions = {
    '-i': 0,
    '-o': 0,
    '-c': 0,
}

const isValidConfigString = (configString) => {
    configString.forEach(element => {
        if (countOfOptions.hasOwnProperty(element)) {
            countOfOptions[element] +=1;
        }
        if (element.toUpperCase() === element && countOfOptions.hasOwnProperty(element.toLowerCase())) {
            throw new UpperCaseError(element);
        }
    });
    if (countOfOptions['-c'] === 0) {
        throw new CountOptionsError();
    }
    for (let key in countOfOptions) {
        if (countOfOptions.hasOwnProperty(key) && countOfOptions[key] > 1) {
            throw new CountOptionsError(key);
        }
    }
    
}

module.exports = {
    isValidConfigString,
}