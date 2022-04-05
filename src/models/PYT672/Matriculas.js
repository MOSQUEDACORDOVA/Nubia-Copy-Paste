const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('./Grupos');
const Estado = require('./Estado');
const TipoEstudiante = require('./TipoEstudiante');
const Usuarios = require('./Usuarios');

// ESTUDIANTES
const Matriculas = db672.define('matriculas', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	nro_identificacion: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	genero: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	fecha_nacimiento: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	telefono1: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	telefono2: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	provincia: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	canton: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	distrito: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
});

Matriculas.TipoEstudiante = Matriculas.belongsTo(TipoEstudiante)
Matriculas.Grupos = Matriculas.belongsTo(Grupos)
Matriculas.Estado = Matriculas.belongsTo(Estado)
Matriculas.Usuarios = Matriculas.belongsTo(Usuarios)
module.exports = Matriculas;