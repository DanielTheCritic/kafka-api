const axios = require('axios');
const baseUrl = 'https://pokeapi.co/api/v2/';

function pokeService() {

    function getByName(name) {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + '/pokemon/' + name)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
    return { getByName };
}

module.exports = pokeService();