const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', function(req, res) {
    res.send('Index Page');
});

module.exports = indexRouter;