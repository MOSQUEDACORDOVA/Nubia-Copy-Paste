const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
const Usuarios = require('../../models/PYT24/Usuarios');
const Paquetes = require('../../models/PYT24/Packages');
const MetodosRetiros = require('../../models/PYT24/Retreats');
// PAGOS
const Pagos = db24.define('pagos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	amount: {
        type: DataTypes.INTEGER(200),
        allowNull: false
    },
});

Pagos.Usuarios = Pagos.belongsTo(Usuarios);
Pagos.Paquetes = Pagos.belongsTo(Paquetes);
Pagos.MetodosRetiros = Pagos.belongsTo(MetodosRetiros);
module.exports = Pagos;