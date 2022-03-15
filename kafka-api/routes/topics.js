const express = require('express');
const kafkaService = require('../services/kafkaService');

const topicsRoute = express.Router();

topicsRoute.get('/', (req, res) => {

    (async () => {
        try {
            let topics = await kafkaService.getTopics();
            res.send(topics);
        }
        catch(error) {
            res.status(500).send({
                message: "An error occurred while trying to get topic information.",
                details: error
            });
        }
    })();
});

topicsRoute.post('/', (req, res) => {

    let body = req.body;
    console.log(req.body);
    
    (async () => {
        try {
            let result = await kafkaService.createTopic(body);
            if(result) {
                res.send(result);
            }
            res.status(400).send({
                message: "Topic could not be created. Check that a topic with the same name already exists."
            });
            
        }
        catch(error) {
            res.status(500).send({
                message: "An error occurred while trying to create topic.",
                details: error
            });
        }
    })();
});

module.exports = topicsRoute;