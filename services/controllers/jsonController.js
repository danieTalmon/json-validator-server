module.exports = {
    jsonPrettyPrintController: (req,res) => {
        if( !"json" in req.body) {
            res.status(500).send({error: "there isn't json in the body"});
        }
    
        const {body} = req;
    
        res.status(200).send( { data: JSON.stringify(body,null,4)});
        }
}