const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');

// GRUPOS
const Grupos = db672.define('grupos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	identificador: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	lecciones_semanales: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	dia_horario: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	dia_pagos: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	finalizar_nivel: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	fecha_inicio: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	fecha_finalizacion: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	nivel: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	codigo_nivel: {
		type: DataTypes.STRING(200),
		allowNull: false,
		defaultValue: '-1'
	},
	activos: {
		type: DataTypes.INTEGER(200),
		allowNull: false,
		defaultValue: 0
	},
	incorporados: {
		type: DataTypes.INTEGER(200),
		allowNull: false,
		defaultValue: 0
	},
	inscritos: {
		type: DataTypes.INTEGER(200),
		allowNull: false,
		defaultValue: 0
	},
	fusionados: {
		type: DataTypes.INTEGER(200),
		allowNull: false,
		defaultValue: 0
	},
	congelados: {
		type: DataTypes.INTEGER(200),
		allowNull: false,
		defaultValue: 0
	},
	total_alumnos: {
		type: DataTypes.INTEGER(200),
		allowNull: false,
		defaultValue: 0
	},
	estado: {
		type: DataTypes.STRING(200),
		allowNull: false,
		defaultValue: 'En Apertura'
	},
});

module.exports = Grupos;