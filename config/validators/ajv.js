var Ajv = require('ajv');
 
var ajv = new Ajv({schemaId: 'auto'});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));


module.exports = {
    ajv
}