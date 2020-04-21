//imports
var _ = require('lodash');

module.exports = {
    generateErrorReport: (errors,pathField,messageField) => {
        //TODO
        let explanationMessage = "";
        if (messageField !== 'message') {
            explanationMessage = "error in"
        }
        const report = _.map(errors,(error) => {
            return {message: `${error[pathField]} :${explanationMessage} ${error[messageField]}`}
        });
        return report
    }
}