const {CipheringFactory} = require('./transformation');

test('callback is run', () => {
    let g = new CipheringFactory();
    let spy = jest.spyOn(g, 'crypt');
    g.cryptInformation('AbC', 'A');
    expect(spy).toHaveBeenCalled()
    spy.mockRestore();
});