const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - App de Notas Estudiantiles',
      version: '1.0.0',
      description: 'Microservicios para consulta y registro de estudiantes y notas',
      contact: { name: 'Soporte', email: 'soporte@appnotas.com' }
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' },
      { url: 'https://app-notas-backend.onrender.com', description: 'Servidor producción' }
    ],
    components: {
      schemas: {
        Estudiante: {
          type: 'object',
          required: ['cedula', 'nombre'],
          properties: {
            cedula:  { type: 'string', example: '123456789' },
            nombre:  { type: 'string', example: 'Juan Pérez' },
            correo:  { type: 'string', example: 'juan@email.com' },
            celular: { type: 'string', example: '3001234567' },
            materia: { type: 'string', example: 'Matemáticas' }
          }
        },
        Nota: {
          type: 'object',
          required: ['cedula', 'materia'],
          properties: {
            cedula:     { type: 'string', example: '123456789' },
            materia:    { type: 'string', example: 'Matemáticas' },
            nota1:      { type: 'number', example: 3.5 },
            nota2:      { type: 'number', example: 4.0 },
            nota3:      { type: 'number', example: 3.8 },
            nota4:      { type: 'number', example: 4.2 },
            definitiva: { type: 'number', example: 3.88 }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error al procesar la solicitud' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
