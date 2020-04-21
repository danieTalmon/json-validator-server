//imports

const express = require('express');
let { ajv } = require('./config/validators/ajv');
let { ZSchemaValidator } = require('./config/validators/z-schema');
let { djv } = require('./config/validators/djv');
let { jsen } = require('./config/validators/jsen');
const { validationMethods } = require('./config/index');
const _ = require('lodash');
const axios = require('axios').default;
//contracts

const PORT = 8080;

// Routers
var jsonRouter = require('./routers/jsonRouter');
var validateRouter = require('./routers/validationRouter');

let app = express();

app.use(express.json({limit: "50MB"})) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//The actual use of routing
app.use('/api/json', jsonRouter);
app.use('/api/json', validateRouter);

app.post('/api/json/validateBySchema',async (req,res) => {
    if( !"json" in req.body || !"schema" in req.body || !"validationMethod" in req.body){
        res.status(500).send({error: "there isn't json/jsonSchema/validationMethod in the body"});
    }
    const {json, validationMethod} = req.body;
    let { schema } = req.body;
    let valid, data, report;

    try {
        data = JSON.parse(JSON.stringify(json));
    } catch (e) {
        res.status(500).send({error: `the json is invalid, error:${e}`})
    }
    try {
        schema = JSON.parse(JSON.stringify(schema));
    }  catch (e) {
        res.status(500).send({error: `the json schema is invalid, error:${e}`})
    }
    

    switch(validationMethod) {
        case "ajv":
            valid = ajv.validate(schema, data);
            console.log(ajv.errors);
             if (!valid) {
                 report = _.map(ajv.errors,"message")
                 return res.json({
                data: report
            }); 
            }
            res.json({data: []});
            break;
        case "z-schema": 
            if ("$schema" in schema) {
                console.log(schema["$schema"]);
                let requestUrl = schema["$schema"];
                const refResponse = await axios.get(requestUrl);
                ZSchemaValidator.setRemoteReference(requestUrl, json);
            }
            valid = ZSchemaValidator.validate(json, schema);
            if (!valid) {
                const errorMassages = _.map(ZSchemaValidator.getLastErrors(),(error) => {
                    return {message: `${error.path} :  ${error.message}`}
                })
                return res.json({
                data: errorMassages
            });
        }
            res.json({data: []});
            break;
        case "djv":
            djv.addSchema('schema',schema);
            report = djv.validate('schema',json);
            if(report) {
                const errorMassages = _.map([].concat(report),(error) => {
                    return {message: `${error.schemaPath} : error in ${error.keyword}`}
                })
                return res.json({
                    data: errorMassages
                });  
            }
            res.json({data: []});
            break;
        case "jsen":
                var validate = jsen(schema);
                const valid = validate(json);
                if(!valid) {
                    const errorMassages = _.map(validate.errors,(error) => {
                        return {message: `${error.path} : error in ${error.keyword}`}
                    })
                    return res.json({
                        data: errorMassages
                    });  
                }
                res.json({data: []});
                break;
        default: 
            res.status(500).send({error: `validation method ${validationMethod} isn't supported  
            the supported methods are: ${validationMethods.join(" , ")}`});
    }


})

app.listen(8080,() => {
    console.log(`The server is listening on port ${PORT}`);
});