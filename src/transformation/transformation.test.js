const { CipheringFactory } = require('./transformation');

const entity = new CipheringFactory();
const spyCrypt = jest.spyOn(entity, 'crypt');
const data = 'This is secret. Message about "_" symbol!';
const dataAfterAtbash = 'Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!';
const dataAfterCaesar = 'Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!';
const dataAfterROT8 = 'Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!';

test('Callback is run', () => {
    entity.cryptInformation('Ab C', 'A');
    expect(spyCrypt).toHaveBeenCalled()
    spyCrypt.mockRestore();
});

test('Atbash crypt work', () => {
    expect(entity.cryptInformation(data, 'A'))
        .toBe(dataAfterAtbash);
});

test('Caesar crypt work', () => {
    expect(entity.cryptInformation(data, 'C0'))
        .toBe(dataAfterCaesar);
});

test('Caesar uncrypt work', () => {
    expect(entity.cryptInformation(dataAfterCaesar, 'C1'))
        .toBe(data);
});

test('ROT8 crypt work', () => {
    expect(entity.cryptInformation(data, 'R1'))
        .toBe(dataAfterROT8);
});

test('ROT8 uncrypt work', () => {
    expect(entity.cryptInformation(dataAfterROT8, 'R0'))
        .toBe(data);
});

