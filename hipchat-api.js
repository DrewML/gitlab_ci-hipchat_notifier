'use strict';

let rp = require('request-promise');

function sendRoomMessage(roomID, authToken, opts) {
    let defaultOptions = {
        message: '',
        color: 'green',
        from: '',
        message_format: 'html',
        notify: true
    };

    return rp.post({
        uri: `https://api.hipchat.com/v2/room/${roomID}/notification`,
        body: Object.assign(defaultOptions, opts),
        json: true,
        auth: { bearer: authToken }
    });
}

module.exports = {
    sendRoomMessage
};
