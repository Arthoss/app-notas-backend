const router = require('express').Router();
const pool   = require('../db');

/**
 * @swagger
 * /api/consulta:
 *   get:
 *     summary: Consultar notas de un estudiante por cédula
 *     tags: [Consulta]
 *     parameters:
 *       - in: query
 *         name: cedula
 *         required: true
 *         schema:
 *           type: string
 *         description: Cédula del estudiante
 *         example: "123456789"
 *     responses:
 *       200:
 *         description: Datos del estudiante y sus notas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     estudiante:
 *                       $ref: '#/components/schemas/Estudiante'
 *                     notas:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Nota'
 *       404:
 *         description: Estudiante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', async (req, res) => {
  const { cedula } = req.query;

  if (!cedula) {
    return res.status(400).json({ success: false, message: 'El parámetro cédula es requerido' });
  }

  try {
    const estResult = await pool.query(
      'SELECT * FROM estudiantes WHERE cedula = $1',
      [cedula.trim()]
    );

    if (estResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
    }

    const notasResult = await pool.query(
      'SELECT * FROM notas WHERE cedula = $1 ORDER BY created_at DESC',
      [cedula.trim()]
    );

    return res.json({
      success: true,
      data: {
        estudiante: estResult.rows[0],
        notas:      notasResult.rows
      }
    });
  } catch (err) {
    console.error('Error en /api/consulta:', err.message);
    return res.status(500).json({ success: false, message: 'Error al consultar los datos' });
  }
});

module.exports = router;
