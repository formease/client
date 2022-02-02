const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const Logger = require('./util/logger');
const rateLimit = require('express-rate-limit')
app.use(helmet());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'))
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const rateLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
});
app.set('trust proxy', 1);
app.use(rateLimiter)

app.use('/', [
    require('./routes/landing')
]);

app.get('*', (req, res, next) => {
    let err = new Error();
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        let data = {
            title: '404 Not Found',
            content: 'Oops, page not found!',
        };
        res.render('404', {
            data: data
        });
    } else {
        return next();
    }
});

const logger = new Logger('FormEase', true, true);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
process.on('uncaughtException', (err) => {
    logger.error(err && err.stack);
});
