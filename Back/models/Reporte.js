const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const auditoria = require('./auditoria');

const Reporte = sequelize.define('Reporte', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Relación: Un reporte pertenece a una auditoría
Reporte.belongsTo(auditoria, {
    foreignKey: 'auditoriaId',
    onDelete: 'CASCADE',
});

// Relación: Una auditoría tiene muchos reportes
auditoria.hasMany(Reporte, {
    foreignKey: 'auditoriaId',
});

module.exports = Reporte;
