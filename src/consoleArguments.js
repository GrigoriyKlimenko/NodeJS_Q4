const process = require('process');
const { isValidOptionsString, isValidOptions } = require('./validation');

const optionsToCheck = ['-c', '-i', '-o']

const prepareOptionsString = (string) => {
  let preparedString = [...string]
  string.forEach((item, index) => {
    if (item == '--input') {
      preparedString.splice(index, 1, '-i');
    }
    if (item == '--output') {
      preparedString.splice(index, 1, '-o');
    }
    if (item == '--config') {
      preparedString.splice(index, 1, '-c');
    }
  })
  return preparedString;
}

const optionsString = prepareOptionsString(process.argv.slice(2));

const buildConfig = (optionsString) => {
  let optionsObject = {};

  if (isValidOptionsString(optionsString)) {
    optionsToCheck.map((option) => {
      if (optionsString.includes(option)) {
        optionsObject[option] = optionsString[optionsString.indexOf(option) + 1].trim();
      }
    })
  }
  optionsObject['-c'] = optionsObject['-c'].split('-').map((item) => item.trim());

  if (isValidOptions(optionsObject)) {
    return optionsObject;
  }
}

const getConfig = () => buildConfig(optionsString);

module.exports = {
  getConfig,
};