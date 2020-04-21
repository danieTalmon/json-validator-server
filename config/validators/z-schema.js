var ZSchema = require("z-schema");
const options = {
breakOnFirstError: false
}

var ZSchemaValidator = new ZSchema(options);

module.exports = {
    ZSchemaValidator
}
