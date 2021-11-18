const { Transform, pipeline } = require('stream');
const fs = require('fs');

const { MyReadStream, MyWriteStream } = require('./src/streams/customStreams');
const { getConfig } = require('./src/arguments/consoleArguments');
const { errorHandler } = require('./src/errors/userErrors');
const { CipheringFactory } = require('./src/transformation/transformation');

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
    config['-i'] ? new MyReadStream(config['-i'], fs) : process.stdin,    
    // config['-i'] ? fs.createReadStream(config['-i']) : process.stdin,
    ...transformStream,
    config['-o'] ? new MyWriteStream(config['-o'], fs) : process.stdout,
    // config['-o'] ? fs.createWriteStream(config['-o'], { flags: 'a' }) : process.stdout,
    () => {}
  );

}
catch (error) {
  errorHandler(error);
}
