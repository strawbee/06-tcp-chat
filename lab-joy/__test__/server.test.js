'use strict';

require('jest');
const net = require('net');
const server = require('../server');

describe('Server Module', () => {
    afterAll(() => server.close());

    it('should be able to connect to server', () => {
        let client = net.connect({port: 4444});
        client.on('data', (data) => {
            expect(data.toString()).not.toBeNull();
        });
    });

    it('should be able to send and receive messages', () => {

    });

    it('should be able to receive special commands', () => {

    });
});