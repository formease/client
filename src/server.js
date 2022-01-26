const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
app.use(helmet());
app.set('view engine', 'ejs');
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});