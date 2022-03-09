const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const EstadoGrupos = require('../../models/PYT672/EstadoGrupos');
const Usuarios = require('./Usuarios');
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
	profesor: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	codigo_nivel: {
		type: DataTypes.STRING(200),
		allowNull: false,
		defaultValue: '-1'
	},
});

Grupos.EstadoGrupos = Grupos.belongsTo(EstadoGrupos);
Grupos.Usuarios = Grupos.belongsTo(Usuarios)
module.exports = Grupos;