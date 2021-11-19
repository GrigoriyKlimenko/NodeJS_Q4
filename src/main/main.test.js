const { startCiphering } = require('./main');
const fs = require('fs');

// console.log = jest.fn();
test('Test usage example', () => {
  startCiphering([ '-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt' ]);
  let a;
  setTimeout(()=> {
    a = fs.readFileSync('./output.txt').toString()
  }, 5000);
  expect(a).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
  // expect(console.log.mock.calls[0][0])
  //       .toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
  //  
});


    // process.exit = jest.fn();
    // errorHandler({
    //     name: 'Name',
    //     message: 'Error message',
    //     isCustom: true
    // });
    
    // expect(process.exit.mock.calls[0][0])
    //     .toBe(1);

