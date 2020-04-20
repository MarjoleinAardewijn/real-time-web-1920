const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    countries_url: process.env.COUNTRIES_URL
};