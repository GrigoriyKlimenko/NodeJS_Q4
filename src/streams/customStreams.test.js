const { MyReadStream, MyWriteStream } = require('./customStreams');
const fs = require('fs');

const config = {
    '-i': './input.txt',
    '-o': './output.txt',
}
const wrongConfig = {
    '-i': './input2.txt',
    '-o': './output2.txt',
}

test("Test read stream", () => {
    const readStream = new MyReadStream(config['-i'], fs);
    expect(typeof readStream._read).toBe("function");

});

// new MyReadStream(config['-i'], fs)
