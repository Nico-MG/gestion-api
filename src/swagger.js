// swagger.js

import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for my Express application',
    },
    components: {
      schemas: {
        Products: {
          type: 'object',
          properties: {
            product_id: {
              type: 'string',
              description: 'The unique identifier for a product',
              example: '12345-ABCDE',
            },
            name: {
              type: 'string',
              description: 'The name of the product',
              example: 'Product Name',
            },
            type: {
              type: 'string',
              description: 'The type of the product',
              example: 'Electronics',
            },
            quantity: {
              type: 'integer',
              description: 'The quantity of the product in stock',
              example: 100,
            },
            min_quantity: {
              type: 'integer',
              description: 'The minimum quantity required for the product',
              example: 10,
            },
            price: {
              type: 'integer',
              description: 'The price of the product',
              example: 299,
            },
          },
        },
      },
    },
  },
  apis: ['./src/products/*.js', './src/orders/*.js', './src/users/*.js'], // Asegúrate de que las rutas son correctas
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', serve, setup(swaggerSpec));
};

export default setupSwagger;
