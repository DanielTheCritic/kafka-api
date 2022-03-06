const pokeRouter = require('express').Router();
const pokeService = require('../services/pokeService');
const kafkaService = require('../services/kafkaService');
const debug = require('debug')('palm-tree-api:poke');

pokeRouter.get('/', function(req, res) {
    res.send('Users Index Page');
});

pokeRouter.route('/:name').get((request, response) => {
    let name = request.params.name;
    
    (async function serviceCall() {
        try {
            let result = await pokeService.getByName(name);
            response.send({result});
        }
        catch (error) {
            debug(error.stack);
        }
    }());
});

pokeRouter.route('/:name/summary').get((request, response) => {
    let name = request.params.name;
    
    (async function serviceCall() {
        try {
            let data = await pokeService.getByName(name);
            let summary = summarize(data);

            let responses = await kafkaService.publish("get-poke", { name: name, data: summary } );
            console.log(responses);

            response.send(summary);
        }
        catch (error) {
            debug(error.stack);
        }
    }());
});

function summarize(data) {
    var result = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map(function(type) { return type.type.name; }),
        baseStatTotal: data.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
    };
    return result;
};

module.exports = pokeRouter;