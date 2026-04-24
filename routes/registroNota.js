const router = require('express').Router();
const pool   = require('../db');

/**
 * @swagger
 * /api/registro-nota:
 *   post:
 *     summary: Registrar notas de un estudiante en una materia
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Nota'
 *     responses:
 *       201:
 *         description: Notas registradas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notas registradas exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Nota'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
router.post('/', async (req, res) => {
  const { cedula, materia, nota1, nota2, nota3, nota4, definitiva } = req.body;

  if (!cedula || !materia) {
    return res.status(400).json({ success: false, message: 'Cédula y materia son obligatorios' });
  }

  // Verificar que el estudiante existe
  try {
    const estCheck = await pool.query('SELECT cedula FROM estudiantes WHERE cedula = $1', [cedula.trim()]);
    if (estCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'No existe un estudiante con esa cédula' });
    }
  } catch (err) {
    console.error('Error verificando estudiante:', err.message);
    return res.status(500).json({ success: false, message: 'Error al verificar el estudiante' });
  }

  // Calcular definitiva si no viene del cliente
  const n1 = parseFloat(nota1) || 0;
  const n2 = parseFloat(nota2) || 0;
  const n3 = parseFloat(nota3) || 0;
  const n4 = parseFloat(nota4) || 0;
  const def = definitiva !== undefined ? parseFloat(definitiva) : parseFloat(((n1 + n2 + n3 + n4) / 4).toFixed(2));

  try {
    const result = await pool.query(
      `INSERT INTO notas (cedula, materia, nota1, nota2, nota3, nota4, definitiva)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [cedula.trim(), materia.trim(), n1, n2, n3, n4, def]
    );

    return res.status(201).json({
      success: true,
      message: 'Notas registradas exitosamente',
      data:    result.rows[0]
    });
  } catch (err) {
    console.error('Error en /api/registro-nota:', err.message);
    return res.status(500).json({ success: false, message: 'Error al registrar las notas' });
  }
});

module.exports = router;
