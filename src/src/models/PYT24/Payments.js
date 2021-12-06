const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
const Usuarios = require('../../models/PYT24/Usuarios');
const Paquetes = require('../../models/PYT24/Packages');
const MetodosRetiros = require('../../models/PYT24/Retreats');
const Depositos = require('../../models/PYT24/Depositos');
// PAGOS
const Pays = db24.define('pagar_usuario', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	amount: {
        type: DataTypes.INTEGER(255),
        allowNull: false
    },
	status: {
        type: DataTypes.STRING(255),
        allowNull: false,
		defaultValue: 'Pendiente'
    },
});

Pays.Usuarios = Pays.belongsTo(Usuarios);
Pays.Paquetes = Pays.belongsTo(Paquetes);
Pays.MetodosRetiros = Pays.belongsTo(MetodosRetiros);
Pays.Depositos = Pays.belongsTo(Depositos);
module.exports = Pays;