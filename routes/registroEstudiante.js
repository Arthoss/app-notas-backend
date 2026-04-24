const router = require('express').Router();
const pool   = require('../db');

/**
 * @swagger
 * /api/registro-estudiante:
 *   post:
 *     summary: Registrar un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante registrado exitosamente
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
 *                   example: Estudiante registrado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Datos inválidos o cédula ya registrada
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
  const { cedula, nombre, correo, celular, materia } = req.body;

  if (!cedula || !nombre) {
    return res.status(400).json({ success: false, message: 'Cédula y nombre son obligatorios' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO estudiantes (cedula, nombre, correo, celular, materia)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [cedula.trim(), nombre.trim(), correo?.trim() || null, celular?.trim() || null, materia?.trim() || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Estudiante registrado exitosamente',
      data:    result.rows[0]
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ success: false, message: 'Ya existe un estudiante con esa cédula' });
    }
    console.error('Error en /api/registro-estudiante:', err.message);
    return res.status(500).json({ success: false, message: 'Error al registrar el estudiante' });
  }
});

module.exports = router;
