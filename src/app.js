const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
app.use(helmet());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'))
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


module.exports = app;