// Node js includes
var express = require('express');

// Project includes
var { jsonPrettyPrintController } = require('../services/controllers/jsonController')

var router = express.Router();

// ===============================================
//    pritty print to the json
// ===============================================

router.post('/beautify', jsonPrettyPrintController);

    module.exports = router;