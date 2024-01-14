const express = require('express');
const hostname = '0.0.0.0';
const port = 3000;
const server = express();

//MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinode');


//Swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagg',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                },
            },
        },
        security: [
            {
                Authorization: [],
            },
        ],
    },
    apis: ['./api/routes/*.js'],
};

const openapiSpecification = swaggerJSDoc(options);



server.use(express.urlencoded());
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Routes
const postRoute = require('./api/routes/postRoute');
postRoute(server);

const commentRoute = require("./api/routes/commentRoute");
commentRoute(server);

const userRoute = require("./api/routes/userRoute");
userRoute(server);

server.listen(port, hostname, () => {
    console.log(`Example app listening on ${hostname} port ${port}`)
});