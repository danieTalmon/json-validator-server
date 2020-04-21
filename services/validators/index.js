//imports
let { ajv } = require('../../config/validators/ajv');
let { ZSchemaValidator } = require('../../config/validators/z-schema');
let { djv } = require('../../config/validators/djv');
let { jsen } = require('../../config/validators/jsen');
const _ = require('lodash');
const axios = require('axios').default;
let { generateErrorReport } = require('./validatorsUtils');


module.exports = {
    ajvValidation: (schema,json) => {
        valid = ajv.validate(schema, json);
                console.log(ajv.errors);
                if (!valid) {
                    const errorMassages = generateErrorReport(ajv.errors,"schemaPath","message")
                    return {
                        data: errorMassages
                    }; 
                }
                return { data: [] };
    },
    djvValidation: (schema,json) => {
            djv.addSchema('schema',schema);
            let report = djv.validate('schema',json);
            if(report) {
                const errorMassages = _.map([].concat(report),(error) => {
                    return {message: `${error.schemaPath} : error in ${error.keyword}`}
                });
                return {
                    data: errorMassages
                };  
            }
            return { data: [] };
    },
    zSchemaValidation: async (schema,json) => {
        if ("$schema" in schema) {
            let requestUrl = schema["$schema"];
            const refResponse = await axios.get(requestUrl);
            ZSchemaValidator.setRemoteReference(requestUrl, json);
        }

        valid = ZSchemaValidator.validate(json, schema);
        
        if (!valid) {
            const errorMassages = _.map(ZSchemaValidator.getLastErrors(),(error) => {
                return {message: `${error.path} :  ${error.message}`}
            });
            return {
            data: errorMassages
            };
        }
        return { data: [] };
    },
    jsenValidation: (schema,json) => {
        var validate = jsen(schema);
            const valid = validate(json);
            if(!valid) {
                const errorMassages = _.map(validate.errors,(error) => {
                    return {message: `${error.path} : error in ${error.keyword}`}
                });
                return {
                    data: errorMassages
                };  
            }
            return { data: [] };
    }
}