'use strict';

let colors  = require('colors');
let config  = require('../config');
let format  = require('util').format;
let hipchat = require('../hipchat-api');

const REPO_NAME_PATTERN = /\/\s*([\w-]+)/;

function route(router) {
    router.post('/ci/:roomID', function(req, res) {
        let roomID = req.params.roomID;
        let roomKey = getAuthKey(roomID);
        let data = getBuildData(req.body);

        hipchat.sendRoomMessage(roomID, roomKey, {
            message: getMessage(data),
            color: data.buildStatus === 'Success' ? 'green' : 'red'
        }).catch(console.error);
        res.end();
    });
}

function getAuthKey(roomID) {
    return config[roomID];
}

function getBuildData(payload) {
    let buildStatus = payload.build_status;
    return {
        buildStatus: `${buildStatus.charAt(0).toUpperCase()}${buildStatus.slice(1)}`,
        projectURI: payload.gitlab_url,
        commitHash: payload.sha,
        projectName: REPO_NAME_PATTERN.exec(payload.project_name)[1],
        buildURI: `${payload.gitlab_url}/builds/${payload.build_id}`,
        commitURI: `${payload.gitlab_url}/commit/${payload.sha}`,
        branchName: payload.ref
    };
}

function getMessage(data) {
    let d = data;
    let tpl = 
        `<b>Project:</b> <a href="${d.projectURI}">${d.projectName}</a><br>
        <b>Branch:</b> ${d.branchName}<br>
        <b>Build:</b> <a href="${d.buildURI}">${d.buildStatus}</a><br>
        <b>Commit:</b> <a href="${d.commitURI}">${d.commitHash}</a><br>`;

    return tpl;
}

module.exports = route;
