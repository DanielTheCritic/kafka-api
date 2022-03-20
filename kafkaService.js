const { response } = require('express');
const { Kafka } = require('kafkajs');

const clientId = process.env.KAFKA_CLIENTID;
const broker = process.env.KAFKA_BROKER;
const sasl = false;
const ssl = false;

const kafka = new Kafka({
  clientId: clientId,
  brokers: [ broker ],
  ssl,
  sasl
});

const admin = kafka.admin();
const producer = kafka.producer();

function kafkaService() {

    getTopics = () => {

        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    await admin.connect();

                    return await admin.listTopics();
                }
                catch(error) {
                    console.log(error);
                    return error;
                }
                finally {
                    await admin.disconnect();
                }
            })()
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    createTopic = (topicDetails) => {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    await admin.connect();

                    let createTopicsRequest = {
                        validateOnly: false,
                        timeout: 5000,
                        waitForLeaders: true,
                        topics : [
                            {
                                topic: topicDetails.name,
                                numPartitions: topicDetails.partitions,
                                replicationFactor: topicDetails.replicas,
                                replicaAssignment: [],
                                configEntries: []
                            }
                        ]
                    };

                    return await admin.createTopics(createTopicsRequest);
                }
                catch(error) {
                    return error;
                }
                finally {
                    await admin.disconnect();
                }
            })()
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    function publish(eventName, message) {
        return new Promise((resolve, reject) => {
            
            (async function kafkaCall() {
                
                try {
                    await producer.connect();

                    let response = await producer.send({
                        topic: topic,
                        messages: [{
                          key: eventName,
                          value: JSON.stringify(message)
                        }]
                      });
                    return response;
                }
                catch (error) {
                    debug(error.stack);
                }
                finally {
                    await producer.disconnect();
                }
               
            }())
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
    return { getTopics, createTopic, publish };
}

module.exports = kafkaService();