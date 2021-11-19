const { Transform, pipeline } = require('stream');
const fs = require('fs');
const process = require('process');
const { MyReadStream, MyWriteStream } = require('../streams/customStreams');
const { buildConfig, prepareOptionsString } = require('../arguments/consoleArguments');
const { errorHandler } = require('../errors/userErrors');
const { CipheringFactory } = require('../transformation/transformation');

const makeTransformStream = (config, tool) => {
  const transformStream = config.map((option) => {
    return new Transform({
      transform(chunk, encoding, callback) {
        this.push(
          chunk = tool.cryptInformation(chunk, option)
        );
        callback();
      }
    });
  });

  return transformStream;
}

const startCiphering = (inputParams) => {
  const optionsString = prepareOptionsString(inputParams);
  const config = buildConfig(optionsString);
  try {
    const cipheringTool = new CipheringFactory();
    const transformStream = makeTransformStream(config['-c'], cipheringTool);
    pipeline(
      config['-i'] ? new MyReadStream(config['-i'], fs) : process.stdin,
      ...transformStream,
      config['-o'] ? new MyWriteStream(config['-o'], fs) : process.stdout,
      () => { }
    );

  }
  catch (error) {
    errorHandler(error);
  }
}


module.exports = {
  startCiphering,
}