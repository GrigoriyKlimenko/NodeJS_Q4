const { getConfig, prepareOptionsString, buildConfig } = require('./consoleArguments');

test ('gg', () => {
    expect(prepareOptionsString(['--input', 'some', '--output', 'another', '-c', 'conf'])).toEqual(['-i', 'some', '-o', 'another', '-c', 'conf']);
})
