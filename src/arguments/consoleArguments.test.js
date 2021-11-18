const { getConfig, prepareOptionsString, buildConfig } = require('./consoleArguments');

test ('gg', () => {
    expect(prepareOptionsString(['--input', 'some', '--output', 'another', '--config', 'conf']))
    .toEqual(['-i', 'some', '-o', 'another', '-c', 'conf']);
})

test ('gg22', () => {
    expect(buildConfig(['-i', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0']))
    .toEqual({
        '-i': './input.txt',
        '-o': './output.txt',
        '-c': ['A', 'C1', 'C1', 'R0']})
})

