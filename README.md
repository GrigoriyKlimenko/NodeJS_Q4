# Ciphering CLI Tool

To start and use tool you need write to console `node index.js`

CLI tool accept 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
and plus flag of encoding (1) or decoding (0) (mandatory for Caesar cipher and ROT-8 cipher)
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

Config should look like `"C1-C1-R0-A"`

## Details:

1. If the input file option is missed - use `stdin` as an input source.
2. If the output file option is missed - use `stdout` as an output destination.

**Usage example:**  

```bash
$ node index.js -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```bash
$ node index.js -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```bash
$ node index.js -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```bash
$ node index.js -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`