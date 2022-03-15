const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const topicsRouter = require('./routes/topics');
const debug = require('debug')('kafka-api');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 9998;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/topics', topicsRouter);

app.listen(process.env.PORT || 9998, () => {
    console.log(`Listening on port ${port}...`);
});