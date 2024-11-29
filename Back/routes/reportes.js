const express = require('express');
const Reporte = require('../models/Reporte');
const Auditoria = require('../models/auditoria');
const router = express.Router();

// Obtener todos los reportes
router.get('/reportes', async (req, res) => {
    try {
        const reportes = await Reporte.findAll(); // Método Sequelize para obtener todos los reportes
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los reportes', detalle: error.message });
    }
});

// Crear un reporte para una auditoría
router.post('/:auditoriaId/reportes', async (req, res) => {
    try {
        const { auditoriaId } = req.params;
        const { titulo, descripcion, fecha, autor, tipo, gravedad, area } = req.body;
        
        // Verificar si la auditoría existe
        const auditoria = await Auditoria.findByPk(auditoriaId);
        if (!auditoria) {
            return res.status(404).json({ error: 'Auditoría no encontrada' });
        }

        const nuevoReporte = await Reporte.create({
            auditoriaId,
            titulo,
            descripcion,
            fecha,
            autor,
            tipo,
            gravedad,
            area
        });

        res.status(201).json(nuevoReporte);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el reporte', detalle: error.message });
    }
});

// Obtener todos los reportes de una auditoría
router.get('/:auditoriaId/reportes', async (req, res) => {
    try {
        const { auditoriaId } = req.params;

        // Verificar si la auditoría existe
        const auditoria = await Auditoria.findByPk(auditoriaId);
        if (!auditoria) {
            return res.status(404).json({ error: 'Auditoría no encontrada' });
        }

        const reportes = await Reporte.findAll({ where: { auditoriaId } });
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los reportes', detalle: error.message });
    }
});

// Obtener un reporte específico por ID
router.get('/reportes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reporte = await Reporte.findByPk(id);
        if (!reporte) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }
        res.status(200).json(reporte);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el reporte', detalle: error.message });
    }
});

// Actualizar un reporte por ID
router.put('/reportes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, fecha, autor } = req.body;

        const reporte = await Reporte.findByPk(id);
        if (!reporte) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }

        reporte.titulo = titulo;
        reporte.descripcion = descripcion;
        reporte.fecha = fecha;
        reporte.autor = autor;
        await reporte.save();

        res.status(200).json(reporte);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el reporte', detalle: error.message });
    }
});

// Eliminar un reporte por ID
router.delete('/reportes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reporte = await Reporte.findByPk(id);

        if (!reporte) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }

        await reporte.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el reporte', detalle: error.message });
    }
});

module.exports = router;