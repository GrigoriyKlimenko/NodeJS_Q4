const { startCiphering, makeTransformStream } = require('./main');
const { CipheringFactory } = require('../transformation/transformation');
const { spawn } = require('child_process');
test('Test function of meking transform stream', () => {
    const cipheringTool = new CipheringFactory();
    expect(
        makeTransformStream(['A', 'C1', 'R0', 'A'], cipheringTool)
    ).toHaveLength(4);
});

//Error scenarios
test('User passes the same cli argument twice', () => {
    try {
        startCiphering(['-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt', '-c', 'C1-C1']);
    } catch (e) {
        expect(e.message).toEqual('-c property occurs more than once');
    }
});

test('User doesn\'t pass -c or --config argument', () => {
    try {
        startCiphering(['-i', './input.txt', '-o', './output.txt']);
    } catch (e) {
        expect(e.message).toEqual('-c or --config property must be defined');
    }
});

test('User passes -i argument with path that doesn\'t exist or with no read access', () => {
    try {
        startCiphering(['-c', 'C1-C1-R0-A', '-i', '', '-o', './output.txt']);
    } catch (e) {
        expect(e.message).toEqual('Input file not found or not available');
    }
});

test('User passes -o argument with path to directory that doesn\'t exist or with no read access', () => {
    try {
        startCiphering(['-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './out.txt']);
    } catch (e) {
        expect(e.message).toEqual('Output file not found or not available');
    }
});

test('User passes incorrent symbols in argument for --config', () => {
    try {
        startCiphering(['-c', 'C1-C1-W0-A', '-i', './input.txt', '-o', './output.txt']);
    } catch (e) {
        expect(e.message).toEqual('Config string is not valid');
    }
});

//scenar

describe('Scenarios from task 1', () => {
    const input = 'This is secret. Message about "_" symbol!';
    test(`Test C1-C1-R0-A config`, async () => {
        const cipheringTool = spawn('node', ['./index.js', '-c', 'C1-C1-R0-A']);
        let output = '';
        cipheringTool.stdout.on('data', (chunk) => {
            output += chunk.toString();
        });
        cipheringTool.stdin.write(input);
        cipheringTool.stdin.end();
        await new Promise((resolve) => {
            cipheringTool.stdout.on('end', resolve);
        });
        expect(output).toEqual('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
    });
    test(`Test C1-C0-A-R1-R0-A-R0-R0-C1-A config`, async () => {
        const cipheringTool = spawn('node', ['./index.js', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A']);
        let output = '';
        cipheringTool.stdout.on('data', (chunk) => {
            output += chunk.toString();
        });
        cipheringTool.stdin.write(input);
        cipheringTool.stdin.end();
        await new Promise((resolve) => {
            cipheringTool.stdout.on('end', resolve);
        });
        expect(output).toEqual('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');
    });
    test(`Test A-A-A-R1-R0-R0-R0-C1-C1-A config`, async () => {
        const cipheringTool = spawn('node', ['./index.js', '-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A']);
        let output = '';
        cipheringTool.stdout.on('data', (chunk) => {
            output += chunk.toString();
        });
        cipheringTool.stdin.write(input);
        cipheringTool.stdin.end();
        await new Promise((resolve) => {
            cipheringTool.stdout.on('end', resolve);
        });
        expect(output).toEqual('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
    });
    test(`Test C1-R1-C0-C0-A-R0-R1-R1-A-C1 config`, async () => {
        const cipheringTool = spawn('node', ['./index.js', '-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1']);
        let output = '';
        cipheringTool.stdout.on('data', (chunk) => {
            output += chunk.toString();
        });
        cipheringTool.stdin.write(input);
        cipheringTool.stdin.end();
        await new Promise((resolve) => {
            cipheringTool.stdout.on('end', resolve);
        });
        expect(output).toEqual('This is secret. Message about "_" symbol!');
    });
});