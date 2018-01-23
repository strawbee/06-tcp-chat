'use strict';
const uuid = require('uuid');

module.exports = function (socket) {
    this.socket = socket;
    this.user = uuid('uuid/v4');
    this.nickname = `user_${Math.floor(Math.random() * 1000)}`;
};