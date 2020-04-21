//imports
var moment = require('moment');
var fs = require('fs');

// const
const debugFilePath = 'log/debug_log.txt';
const errorFilePath = 'log/error_log.txt';
const dateFormat = 'MMM Do YYYY, h:mm:ss a';
const options = {
    flag: 'a'
}

module.exports = {
    log(errorMsg) {
        fs.writeFileSync(debugFilePath,`${moment().format(dateFormat)}: ${errorMsg} \n`,options);
    },
    error(errorMsg) {
        fs.writeFileSync(errorFilePath,`${moment().format(dateFormat)}: ${errorMsg} \n`,options);
    },
    debug(errorMsg) {
        fs.writeFileSync(debugFilePath,`${moment().format(dateFormat)}: ${errorMsg} \n`,options);
    }
}