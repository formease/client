const app = require('./app');
const Logger = require('./util/logger');

const middleRouter = [
    require('./routes/landing')
]
for (let i = 0; i < middleRouter.length; i++) {
    app.use('/', middleRouter[i]);
  }

const logger = new Logger('FormEase', true, true);
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    logger.info(`Server is running on port ${port}`);
});