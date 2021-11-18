const { accessSync, constants } = require('fs');
const { UpperCaseError, CountOptionsError, FileAvailableError, ConfigValidationError } = require('../errors/userErrors');

let countOfOptions = {
  '-i': 0,
  '-o': 0,
  '-c': 0,
}

const isValidOptionsString = (configString) => {
  configString.forEach(element => {
    if (countOfOptions.hasOwnProperty(element)) {
      countOfOptions[element] += 1;
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
  return true;
}

const isAvailableFile = (path, constant) => {
  try {
    let y = accessSync(path, constant);
    return true;
  }
  catch {
    return false;
  }
}

const isValidConfig = (config) => {
  let isValid = true;
  config.forEach((item) => {
    if (!item.trim().match(/^[CR][0-1]$/) && !item.trim().match(/^A$/)) {
      isValid = false;
    }
  })
  return isValid;
}

const isValidOptions = (options) => {
  if (options.hasOwnProperty('-i') && !isAvailableFile(options['-i'], constants.R_OK)) {
    throw new FileAvailableError('Input');
  }
  if (options.hasOwnProperty('-o') && !isAvailableFile(options['-o'], constants.W_OK)) {
    throw new FileAvailableError('Output')
  }
  if (options.hasOwnProperty('-c') && !isValidConfig(options['-c'])) {
    throw new ConfigValidationError()
  }
  return options;
}

module.exports = {
  isValidOptionsString,
  isValidOptions,
}