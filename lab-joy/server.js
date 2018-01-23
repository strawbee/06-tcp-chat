'use strict';

// Application Dependencies
const net = require('net');
const Client = require('./lib/client');
const cmd = require('./lib/commands');

// Application Setup
const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

// Server Instance Setup
server.on('connection', (socket) => {
    socket.write(`
    =============== Welcome to the Chat! ===============
                   [ Available Commands ]
      @list - lists connected users
      @quit - quits the chat
      @nickname <name> - changes your nickname
      @dm <name> <message> - direct messages another user
    \n\n`);

    let client = new Client(socket);
    clientPool.push(client);
    clientPool.map(c => c.socket.write(`\t${client.nickname} has joined the chat.\n`));
    server.getConnections((err, count) => {
        if (err) throw err;
        console.log('connections: ', count);
    });

    socket.on('data', (data) => {
        let message = data.toString();

        cmd.commands(message, socket, client, clientPool);
    
        if (message.slice(0, 1) !== '@') {
            clientPool.filter(c => c.user !== client.user)
                .map(c => c.socket.write(`${client.nickname}: ${message}`));
        }
    });

    socket.on('close', () => {
        clientPool = clientPool.filter(c => c.user !== client.user);
        clientPool.map(c => c.socket.write(`\t${client.nickname} has left the channel.\n`));
        server.getConnections((err, count) => {
            if (err) throw err;
            console.log('connections: ', count);
        });
    });

    socket.on('error', (err) => {
        console.error(err);
    });

}).listen(PORT, () => console.log('opened server on ', server.address()));

server.getConnections((err, count) => {
    if (err) throw err;
    console.log('connections: ', count);
});