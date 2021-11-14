const { Readable, Writable} = require('stream'); 

class MyReadStream extends Readable {
    constructor(filename, worker) {
      super();
      this.filename = filename;
      this.worker = worker;
      this.fd = null;
    }
    _construct(callback) {
        this.worker.open(this.filename, (err, fd) => {
        if (err) {
          callback(err);
        } else {
          this.fd = fd;
          callback();
        }
      });
    }
    _read(n) {
      const buf = Buffer.alloc(n);
      this.worker.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
        if (err) {
          this.destroy(err);
        } else {
          this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
        }
      });
    }
    _destroy(err, callback) {
      if (this.fd) {
        this.worker.close(this.fd, (er) => callback(er || err));
      } else {
        callback(err);
      }
    }
  }

  class MyWriteStream extends Writable {
    constructor(filename, worker) {
        super();
        this.filename = filename;
        this.worker = worker;
      }
    
      _construct(callback) {
        this.worker.open(this.filename, 'a', (err, fd) => {
          console.log(this.flags);
          if (err) {
            callback(err);
          } else {
            this.fd = fd;
            callback();
          }
        });
      }
      _write(chunk, encoding, callback) {
        this.worker.writeFile(this.filename, chunk, {flag: 'a'} ,callback);
      }
      _destroy(err, callback) {
        if (this.fd) {
            this.worker.close(this.fd, (er) => callback(er || err));
        } else {
          callback(err);
        }
      }
  }

  module.exports = {
      MyReadStream,
      MyWriteStream
  }