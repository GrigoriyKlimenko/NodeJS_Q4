const { UpperCaseError, CountOptionsError, FileAvailableError, ConfigValidationError } = require('../errors/userErrors');
const { isValidOptionsString, isValidOptions, isValidConfig } = require('./validation');

// isValidOptionsString
test("Test for catching falling of CONFIG option", () => {
    const wrapper = () => {
        isValidOptionsString(['-i', './input.txt'])
    };
    expect(wrapper)
    .toThrow(CountOptionsError);
});

test('Test for validation of config string', () => {
    expect(isValidOptionsString(['-i', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0']))
        .toBe(true);
})

test("Test for catching upper case config letters", () => {
    const wrapper = () => {
        isValidOptionsString(['-I', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0'])
    };
    expect(wrapper)
    .toThrow(UpperCaseError);
});

test("Test for catching count of options", () => {
    const wrapper = () => {
        isValidOptionsString(['-i', './input.txt', '-i', './input.txt', '-o', './output.txt', '-c', 'A-C1-C1-R0'])
    };
    expect(wrapper)
    .toThrow(CountOptionsError);
});

//isValidConfig
test('Test for valid config', () => {
    expect(isValidConfig(['A', 'C1', 'C1', 'R0']))
        .toBe(true)
});

test('Test for not valid config', () => {
    expect(isValidConfig(['A', 'C1', 'C1', 'R2']))
        .toBe(false)
});

//isValidOptions
test('', () => {
    expect(isValidOptions({
        '-i': './input.txt',
        '-o': './output.txt',
        '-c': ['A', 'C1', 'C1', 'R0']}))
        .toEqual({
            '-i': './input.txt',
            '-o': './output.txt',
            '-c': ['A', 'C1', 'C1', 'R0']})
});

test('', () => {
        const wrapper = () => {
            isValidOptions({
                '-i': './input2.txt',
                '-o': './output.txt',
                '-c': ['A', 'C1', 'C1', 'R0']})
        };
        expect(wrapper)
        .toThrow(FileAvailableError);
});

test('', () => {
    const wrapper = () => {
        isValidOptions({
            '-i': './input.txt',
            '-o': './output2.txt',
            '-c': ['A', 'C1', 'C1', 'R0']})
    };
    expect(wrapper)
    .toThrow(FileAvailableError);
});

test('', () => {
    const wrapper = () => {
        isValidOptions({
            '-i': './input.txt',
            '-o': './output.txt',
            '-c': ['A', 'C1', 'C1', 'R2']})
    };
    expect(wrapper)
    .toThrow(ConfigValidationError);
});



