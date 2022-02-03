const express = require('express');
const router = express.Router();
const methods = require('../middleware/method');

router.get('/register',methods([`GET`]), (req, res) => {
    res.render('register');
}
);

module.exports = router;

