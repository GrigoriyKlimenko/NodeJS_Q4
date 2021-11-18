const { UpperCaseError } = require('../errors/userErrors');
const { isValidOptionsString, isValidOptions, isValidConfig } = require('./validation');

test('gg', () => {
    expect(['-']).toEqual(['-']);
})

test('gg', () => {
    expect(isValidOptionsString(['-i', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0']))
        .toBe(true);
})

test('gg22', () => {
    expect(isValidOptions({
        '-i': './input.txt',
        '-o': './output.txt',
        '-c': ['A', 'C1', 'C1', 'R0']}))
        .toEqual({
            '-i': './input.txt',
            '-o': './output.txt',
            '-c': ['A', 'C1', 'C1', 'R0']})
});

test('gg22', () => {
    expect(isValidConfig(['A', 'C1', 'C1', 'R0']))
        .toBe(true)
});

test("Test description", () => {
    const t = () => {
        isValidOptionsString(['-I', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0'])
    };
    expect(t)
    .toThrow(UpperCaseError);
});