const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
const Usuarios = require('../../models/PYT24/Usuarios');
const Paquetes = require('../../models/PYT24/Packages');
const MetodosRetiros = require('../../models/PYT24/Retreats');
// PAGOS
const Pays = db24.define('pagar_usuario', {
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

Pays.Usuarios = Pays.belongsTo(Usuarios);
Pays.Paquetes = Pays.belongsTo(Paquetes);
Pays.MetodosRetiros = Pays.belongsTo(MetodosRetiros);
module.exports = Pays;