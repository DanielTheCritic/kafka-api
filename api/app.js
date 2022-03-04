const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('palm-tree-api');
const indexRouter = require('./src/routes/index');
const pokeRouter = require('./src/routes/poke');

const port = 9999;
const app = express();

app.use(morgan('tiny'));
app.use('/', indexRouter);
app.use('/poke', pokeRouter);

var server = app.listen(port, function() {

    var serverAddress = server.address();
    
    console.log("Example app listening at http://%s:%s", serverAddress.address, serverAddress.port);
});