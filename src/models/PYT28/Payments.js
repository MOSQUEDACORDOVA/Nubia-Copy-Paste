const { DataTypes } = require('sequelize');
const db28 = require('../../config/dbPY28');
const Usuarios = require('../../models/PYT28/Usuarios');
const MetodosRetiros = require('../../models/PYT28/Retreats');

// PAGOS
const Pays = db28.define('pagar_usuario', {
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