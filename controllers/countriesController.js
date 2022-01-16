const fetch = require('node-fetch');

// Inside fetch goes as a param the URL of the API to request, that fetch returns a promise of the petition.
// To that promise we need to convert to a JSON format in order to manipulate it, that will return another promise to be formatted in JSON 
// Once we have the the result of the second promise, we can start to work with the data obtained

module.exports = {
    list: async (req, res) => {

        let countries = await fetch('http://restcountries.eu/rest/v2/all').then((result) => result.json());

        return countries;
    }
};