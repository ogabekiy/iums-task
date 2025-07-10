import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'Swagger orqali avtomatik hujjatlangan API',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Dockerda ham ishlaydi
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

export const swaggerSpec = swaggerJsdoc(options)
export const swaggerUiMiddleware = swaggerUi.serve
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec)
console.log("Swagger endpoints:", swaggerSpec.paths)

