const { prepareOptionsString, buildConfig } = require('./consoleArguments');
const { UpperCaseError } = require('../errors/userErrors');


test ('Test of preparing options string', () => {
    expect(prepareOptionsString(['--input', 'some', '--output', 'another', '--config', 'conf']))
    .toEqual(['-i', 'some', '-o', 'another', '-c', 'conf']);
})


test ('Test upper case error', () => {
    const wrapper = () => {
        buildConfig(['-I', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0'])
    };
    expect(wrapper)
    .toThrow(UpperCaseError);
})


testData = [
    { data: 
        ['-i', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0'],
     result: 
        {
        '-i': './input.txt',
        '-o': './output.txt',
        '-c': ['A', 'C1', 'C1', 'R0']}
    },
    { data: 
        ['-o', './output.txt', '-c', 'A-C1-C1-R0'],
     result: 
        {
        '-o': './output.txt',
        '-c': ['A', 'C1', 'C1', 'R0']}
    },
    { data: 
        ['-i', './input.txt', '-o', './output.txt', '-c', 'A'],
     result: 
        {
        '-i': './input.txt',
        '-o': './output.txt',
        '-c': ['A']}
    },
];

testData.forEach( testItem => {
    expect(buildConfig(testItem.data)).toEqual(testItem.result);
});