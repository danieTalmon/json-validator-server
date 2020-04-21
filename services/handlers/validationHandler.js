//imports
const { validationMethods } = require('../../config/index');
let { ajvValidation, djvValidation, jsenValidation, zSchemaValidation} = require('../validators/index');


module.exports = {
    validationBySchema : async (schema, json,validationMethod) => { 

        switch(validationMethod) {
            case "ajv": return ajvValidation(schema,json);
            case "z-schema": return zSchemaValidation(schema,json);
            case "djv": djvValidation(schema,json);
            case "jsen": jsenValidation(schema,json);    
    default: 
        return {error: `validation method ${validationMethod} isn't supported  
        the supported methods are: ${validationMethods.join(" , ")}`};
}
    }
}