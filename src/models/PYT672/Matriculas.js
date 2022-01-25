const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('./Grupos');
const Estado = require('./Estado');
const TipoEstudiante = require('./TipoEstudiante');

// ESTUDIANTES
const Matriculas = db672.define('matriculas', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	nro_identificacion: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	genero: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	fecha_nacimiento: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	telefono1: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	telefono2: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	telefono3: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	provincia: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	canton: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	distrito: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
});

Matriculas.TipoEstudiante = Matriculas.belongsTo(TipoEstudiante)
Matriculas.Grupos = Matriculas.belongsTo(Grupos)
Matriculas.Estado = Matriculas.belongsTo(Estado)
module.exports = Matriculas;