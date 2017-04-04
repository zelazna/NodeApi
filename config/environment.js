const Sequelize = require('sequelize');
const environment = process.env.ENVIROMNENT || 'DEVELOPMENT';

require(`./environments/${environment.toLowerCase()}`);

