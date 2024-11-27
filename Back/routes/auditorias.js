const express = require('express');
const Auditoria = require('../models/auditoria');
const router = express.Router();

// Crear una nueva auditoría
router.post('/', async (req, res) => {
    try {
        const { nombre, fecha, auditor, ubicacion } = req.body;
        const nuevaAuditoria = await Auditoria.create({ nombre, fecha, auditor, ubicacion });
        res.status(201).json(nuevaAuditoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la auditoría', detalle: error.message });
    }
});

// Obtener todas las auditorías
router.get('/', async (req, res) => {
    try {
        const auditorias = await Auditoria.findAll();
        res.status(200).json(auditorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las auditorías', detalle: error.message });
    }
});

// Obtener una auditoría específica por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const auditoria = await Auditoria.findByPk(id);
        if (!auditoria) {
            return res.status(404).json({ error: 'Auditoría no encontrada' });
        }
        res.status(200).json(auditoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la auditoría', detalle: error.message });
    }
});

// Actualizar una auditoría por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, fecha, auditor, ubicacion } = req.body;
        const auditoria = await Auditoria.findByPk(id);

        if (!auditoria) {
            return res.status(404).json({ error: 'Auditoría no encontrada' });
        }

        auditoria.nombre = nombre;
        auditoria.fecha = fecha;
        auditoria.auditor = auditor;
        auditoria.ubicacion = ubicacion;
        await auditoria.save();

        res.status(200).json(auditoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la auditoría', detalle: error.message });
    }
});

// Eliminar una auditoría por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const auditoria = await Auditoria.findByPk(id);

        if (!auditoria) {
            return res.status(404).json({ error: 'Auditoría no encontrada' });
        }

        await auditoria.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la auditoría', detalle: error.message });
    }
});

module.exports = router;