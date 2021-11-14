class CipheringFactory {
  constructor() {
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    this.alphabetCaesar = 'zabcdefghijklmnopqrstuvwxy'.split('');
    this.alphabetAtbash = 'zyxwvutsrqponmlkjihgfedcba'.split('');
    this.alphabetROT8 = 'stuvwxyzabcdefghijklmnopqrstuvwxyz'.split('');
  }

  cryptInformation(info, option) {
    let inputAlphabet,
      outputAlphabet,
      cryptedInfo;

    if (option.match(/^A$/)) {
      inputAlphabet = this.alphabet;
      outputAlphabet = this.alphabetAtbash;
    }
    if (option.match(/^[C][0-1]$/)) {
      if (option[1] == 0) {
        inputAlphabet = this.alphabet;
        outputAlphabet = this.alphabetCaesar;
      }
      if (option[1] == 1) {
        inputAlphabet = this.alphabetCaesar;
        outputAlphabet = this.alphabet;
      }
    }
    if (option.match(/^[R][0-1]$/)) {
      if (option[1] == 0) {
        inputAlphabet = this.alphabet;
        outputAlphabet = this.alphabetROT8;
      }
      if (option[1] == 1) {
        inputAlphabet = this.alphabetROT8;
        outputAlphabet = this.alphabet;
      }
    }
    return cryptedInfo = this.crypt(info, inputAlphabet, outputAlphabet);
  }

  crypt(info, inputAlphabet, outputAlphabet) {
    let cryptedSymbol = info.toString()
      .split('')
      .map(symbol => {
        if ((symbol === symbol.toUpperCase()) && (inputAlphabet.includes(symbol.toLowerCase()))) {
          return outputAlphabet[inputAlphabet.indexOf(symbol.toLowerCase())].toUpperCase();
        } else if (inputAlphabet.includes(symbol.toLowerCase())) {
          return outputAlphabet[inputAlphabet.indexOf(symbol.toLowerCase())]
        } else {
          return symbol
        }
      })
      .join('');
    return cryptedSymbol;
  }
}

module.exports = {
  CipheringFactory,
}