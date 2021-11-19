const { ValidationError } = require('./validationError');
const { UpperCaseError,
    CountOptionsError,
    FileAvailableError,
    ConfigValidationError,
    errorHandler } = require('./userErrors');


test('gg', () => {
    expect(['-']).toEqual(['-']);
})

jest.mock('./validationError');
beforeEach(() => {
    ValidationError.mockClear();
});

it('Check UpperCaseError class', () => {
    expect(ValidationError).not.toHaveBeenCalled();
    new UpperCaseError('-c');
    expect(ValidationError)
        .toHaveBeenCalled();
    expect(ValidationError.mock.calls[0][0])
        .toBe('-c property must be in a lower case');
});

it('Check CountOptionsError class with argument', () => {
    expect(ValidationError).not.toHaveBeenCalled();
    new CountOptionsError('-i');
    expect(ValidationError)
        .toHaveBeenCalled();
    expect(ValidationError.mock.calls[0][0])
        .toBe('-i property occurs more than once');
});

it('Check CountOptionsError class without argument', () => {
    expect(ValidationError).not.toHaveBeenCalled();
    new CountOptionsError();
    expect(ValidationError)
        .toHaveBeenCalled();
    expect(ValidationError.mock.calls[0][0])
        .toBe('-c or --config property must be defined');
});

it('Check FileAvailableError class', () => {
    expect(ValidationError).not.toHaveBeenCalled();
    new FileAvailableError('Input');
    expect(ValidationError)
        .toHaveBeenCalled();
    expect(ValidationError.mock.calls[0][0])
        .toBe('Input file not found or not available');
});

it('Check ConfigValidationError class', () => {
    expect(ValidationError).not.toHaveBeenCalled();
    new ConfigValidationError();
    expect(ValidationError)
        .toHaveBeenCalled();
    expect(ValidationError.mock.calls[0][0])
        .toBe('Config string is not valid');
});

it('Check errorHandler with custom class', () => {
    console.log = jest.fn();
    process.exit = jest.fn();
    errorHandler({
        name: 'Name',
        message: 'Error message',
        isCustom: true
    });
    expect(console.log.mock.calls[0][0])
        .toBe('Name: Error message');
    expect(process.exit.mock.calls[0][0])
        .toBe(1);
});


test("Check errorHandler with standart class", () => {
    const wrapper = () => {
        errorHandler(new Error)
    };
    expect(wrapper)
        .toThrow(Error);
});