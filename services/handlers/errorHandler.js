//import
var GeneralJVError = require('../../log/GeneralJVError');
var logger = require('../../log/logger');

module.exports ={
    handleErrorInCatch: (err,res) => {
        if( err instanceof GeneralJVError){
            res.status(err.statusCode).json({error: err.message});
        } else {
            logger.error(err);
            res.status(500).json({error:'some Error were occurred, contact the owners'})
        }
    }
}