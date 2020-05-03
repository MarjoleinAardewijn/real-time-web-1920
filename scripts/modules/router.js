const config = require('../../config'),
    api = require('../../scripts/modules/corona-api'),
    render = require('../../scripts/modules/render'),
    urlCountries = config.countries_url;

const basicPage = (res, view, title) => {
        res.render(view, {
            title
        })
    },

    overviewCoronaAll = async (res) => {
        const title = 'Corona - Positive Tweets';

        try {
            const data = await api.coronaData(urlCountries);
            render.pageWithData(res, 'home', title, data);
        } catch (err) {
            console.log('Error: ', err);
            render.basicPage(res, '404', 'Oeps! Er is iets misgegaan, probeer het later nog eens.');
        }
    };

module.exports = { basicPage, overviewCoronaAll };