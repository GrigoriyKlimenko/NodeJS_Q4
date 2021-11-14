const { getConfig } = require('./src/consoleArguments');
const { errorHandler } = require('./src/userErrors');
const { Transform, pipeline } = require('stream');
const fs = require('fs');
const { CipheringFactory } = require('./src/transformation');

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

try {
  const config = getConfig();
  const cipheringTool = new CipheringFactory();
  const transformStream = makeTransformStream(config['-c'], cipheringTool);
  pipeline(
    config['-i'] ? fs.createReadStream(config['-i']) : process.stdin,
    ...transformStream,
    config['-o'] ? fs.createWriteStream(config['-o'], { flags: 'a' }) : process.stdout,
    () => { }
  );

}
catch (error) {
  errorHandler(error);
}
