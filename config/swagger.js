const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'MedicalCheck API',
    description: 'Description'
  },
  host: 'localhost:8000'
};

const outputFile = './swagger.json';
const routes = ['../routes/api/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);