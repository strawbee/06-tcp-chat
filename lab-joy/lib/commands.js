'use strict';

exports.commands = (message, socket, client, clientPool) => {
    if (message.slice(0, 1) === '@') {
        let msgArr = message.trim().split(' ');
        let cmd = msgArr[0];
        let name = msgArr[1];
        
        switch(cmd) {
        case '@nickname': 
            var tempName = client.nickname;
            client.nickname = name;
            clientPool.map(c => c.socket.write(`\t${tempName} has changed their name to ${name}\n`));
            break;

        case '@quit':
            socket.write(`\tSee you later, ${client.nickname}\n`);
            socket.end();
            break;

        case '@list':
            socket.write(`\tUsers connected: ${clientPool.map(el => el.nickname).join(', ')}\n`);
            break;

        case '@dm':
            message = message.split(' ').slice(2).join(' ');
            clientPool.filter(n => n.nickname === name)[0].socket.write(`[DM] ${client.nickname}: ${message}`);
            break;

        default:
            socket.write('You have entered an invalid command');
        }
    }
};