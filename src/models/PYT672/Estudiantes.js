const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('../../models/PYT672/Grupos');

// ESTUDIANTES
const Estudiantes = db672.define('estudiantes', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	primer_apellido: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	segundo_apellido: {
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
	tipo_estudiante: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	estado: {
		type: DataTypes.STRING(200),
		allowNull: false,
		defaultValue: 'Activo'
	},
});

Estudiantes.Grupos = Estudiantes.belongsTo(Grupos)
module.exports = Estudiantes;