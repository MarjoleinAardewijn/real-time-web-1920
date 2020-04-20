const config = require('../../config'),
    api = require('../../scripts/modules/corona-api'),
    render = require('../../scripts/modules/render'),
    urlCountries = config.countries_url;

const overviewCoronaAll = async (res) => {
        const title = 'Covid-19 All Countries';

        try {
            const data = await api.coronaData(urlCountries);
            render.pageWithData(res, 'home', title, data);
        } catch (err) {
            console.log('Error: ', err);
            render.basicPage(res, '404', 'Oeps! Er is iets misgegaan, probeer het later nog eens.');
        }
    };

module.exports = { overviewCoronaAll };