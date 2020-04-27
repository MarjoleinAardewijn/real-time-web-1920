const fetch = require('node-fetch');

const coronaData = async (url) => {
        const response = await fetch(url);
        const jsonData = await response.json();

        return jsonData.data;
     };

module.exports = { coronaData };