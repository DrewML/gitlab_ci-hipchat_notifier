'use strict';

const path           = require('path');
const colors         = require('colors');
const express        = require('express');
const Promise        = require('bluebird');
const readdir        = Promise.promisify(require('fs').readdir);
const bodyParser     = require('body-parser');

const app = express();
const router = express.Router();

readdir('./endpoints')
    .filter(file => path.extname(file) === '.js')
    .each(file => require(`./endpoints/${file}`)(router));


app.use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use('/', router);

app.listen(process.env.PORT || 8080, function() {
    let port = this.address().port;
    console.log(`Listening on port ${port}`.green);
});
