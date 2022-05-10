const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const Clientes = require("./Clientes");
const Usuarios = require("./Usuarios");
const Pedidos = require("./Pedidos");
const Personal = require("../../models/PYT4/Personal");
const Historial_observaciones = db.define('historial_observaciones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	chofer: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	observacion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	fecha: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	tipo_origen: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
});

Historial_observaciones.Usuarios= Historial_observaciones.belongsTo(Usuarios);
Historial_observaciones.Clientes= Historial_observaciones.belongsTo(Clientes);
Historial_observaciones.Pedidos= Historial_observaciones.belongsTo(Pedidos);
Historial_observaciones.Personal= Historial_observaciones.belongsTo(Personal);

module.exports = Historial_observaciones;

