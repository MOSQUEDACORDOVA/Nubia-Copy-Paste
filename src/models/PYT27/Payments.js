const { DataTypes } = require('sequelize');
const db27 = require('../../config/dbPY27');
const Usuarios = require('../../models/PYT27/Usuarios');
const MetodosRetiros = require('../../models/PYT27/Retreats');

// PAGOS
const Pays = db27.define('pagar_usuario', {
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
Pays.MetodosRetiros = Pays.belongsTo(MetodosRetiros);
module.exports = Pays;