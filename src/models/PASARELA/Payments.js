const { DataTypes } = require('sequelize');
const dbPasarela = require('../../config/dbPasarela');
const Usuarios = require('../../models/PASARELA/Usuarios');
const MetodosRetiros = require('../../models/PASARELA/Retreats');

// PAGOS
const Pays = dbPasarela.define('pagar_usuario', {
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