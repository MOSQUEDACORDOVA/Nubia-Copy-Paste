const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Matriculas = require('./Matriculas');

// ESTUDIANTES
const Caja = db672.define('caja', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	concepto: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	fecha_pago: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	monto: {
		type: DataTypes.STRING(20),
		allowNull: true,
	},	
	mora: {
		type: DataTypes.STRING(20),
		allowNull: true,
	},
	observacion: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	banco: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	transaccion: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	estado: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
});

Caja.Matriculas = Caja.belongsTo(Matriculas)
module.exports = Caja;