//imports
var { validationBySchema } = require('../handlers/validationHandler');
var { handleErrorInCatch } = require('../handlers/errorHandler')

module.exports = {
    validationBySchemaController: async (req,res) => {
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

    validationBySchema(schema,json,validationMethod).then(data => {
        const response = JSON.parse(JSON.stringify(data));
        res.status(200).send( response );
}).catch(err => handleErrorInCatch(err,res));
    

}
}