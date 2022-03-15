const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {

    res.send('Kafka API');
});

module.exports = indexRouter;