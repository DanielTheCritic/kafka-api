const { response } = require('express');
const { Kafka } = require('kafkajs');

const kafkaServer = 'localhost:9092';
const topic = 'TESTTOPIC';
const clientId = 'palm-tree-api';
const sasl = false;
const ssl = false;

const kafka = new Kafka({
  clientId: clientId,
  brokers: [ kafkaServer ],
  ssl,
  sasl
});

const producer = kafka.producer();

function kafkaService() {

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
    return { publish };
}

module.exports = kafkaService();