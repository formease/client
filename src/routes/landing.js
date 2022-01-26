const express = require('express');
const router = express.Router();
const methods = require('../middleware/method');

router.get('/',methods([`GET`]), (req, res) => {
    res.render('index');
}
);

module.exports = router;

