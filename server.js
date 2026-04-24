require('dotenv').config();
const express        = require('express');
const cors           = require('cors');
const swaggerUi      = require('swagger-ui-express');
const swaggerSpec    = require('./swagger');

const consultaRouter    = require('./routes/consulta');
const estudianteRouter  = require('./routes/registroEstudiante');
const notaRouter        = require('./routes/registroNota');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Swagger UI ───────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'API Notas Estudiantiles',
  customCss: '.swagger-ui .topbar { background-color: #1565C0 }'
}));

// ── Rutas ────────────────────────────────────────────────────
app.use('/api/consulta',              consultaRouter);
app.use('/api/registro-estudiante',   estudianteRouter);
app.use('/api/registro-nota',         notaRouter);

// ── Health check ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API App Notas Estudiantiles funcionando ✅',
    version: '1.0.0',
    docs:    `/api-docs`
  });
});

// ── 404 ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta ${req.path} no encontrada` });
});

// ── Inicio ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Swagger docs en http://localhost:${PORT}/api-docs`);
});
