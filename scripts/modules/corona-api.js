const fetch = require('node-fetch');

const coronaData = async (url) => {
        const response = await fetch(url);
        const jsonData = await response.json();

        console.log(jsonData);

        return jsonData.data;
     };

module.exports = { coronaData };