// Node js includes
var express = require('express');

// Project includes
var { validationBySchemaController } = require('../services/controllers/validationController');


var router = express.Router();

// ===============================================
//    validate the json by the json schema using one of few validation libraries
// ===============================================
router.post('/validateBySchema',validationBySchemaController);


module.exports = router;