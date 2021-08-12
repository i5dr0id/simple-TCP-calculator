const net = require('net');

const port = 1337;
const host = '127.0.0.1';

const onClientConnection = (sock) => {
  sock.on('data', function (data) {
    let result = '';
    try {
      if (data.includes(' ')) {
        result = `error: incorrect syntax`;
      } else {
        result = data.toString();
        result = eval(result);
        if (Number(result) === result && result % 1 !== 0) {
          result = `error: incorrect syntax`;
        }
        result = result.toString();
      }
    } catch {
      result = `error: incorrect syntax`;
    }
    sock.write(`${result}\n`);
  });
};

const server = net.createServer(onClientConnection);
server.listen(port, host);
