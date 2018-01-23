'use strict';

require('jest');
const net = require('net');
const server = require('../server');

describe('Server Module', () => {
    afterAll(() => server.close());

    it('should be able to connect to server', (done) => {
        let socket = net.connect({port: 4444});
        socket.on('data', (data) => {
            expect(data.toString()).not.toBeUndefined();
            expect(data.toString()).toMatch(/has joined the chat/);
            expect(data.toString()).not.toMatch(/cats/);
        });
        socket.end();
        done();
    });

    it('should be able to send and receive messages', (done) => {
        let client1, client2;
        client1 = net.connect({port: 4444}, () => {
            client2 = net.connect({port: 4444}, () => {
                client1.write('Hello client2');
            });

            client2.on('data', data => {
                expect(data.toString()).toMatch(/Hello client2/);
                expect(data.toString()).not.toMatch(/cats/);
                expect(data.toString()).not.toBeUndefined();
            });
        });
        client1.end();
        done();
    });

    it('should be able to receive special commands', done => {
        let messages = [], socket = net.connect({ port: 4444 });

        socket.on('data', data => {
            messages.push(data.toString());
        });

        socket.write('@nickname Joy', () => {
            expect.messages[1].toMatch(/has changed their name to/);
        });

        socket.write('@list', () => {
            expect.messages[2].toMatch(/Users connected:/);
        });

        socket.write('@cats', () => {
            expect.messages[3].toMatch(/You have entered an invalid command/);
        });

        socket.write('@quit', () => {
            expect.messages[4].toMatch(/See you later/);
        });

        socket.end();
        done();
    });
});