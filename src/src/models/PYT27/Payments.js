const { DataTypes } = require('sequelize');
const db27 = require('../../config/dbPY27');
const Usuarios = require('../../models/PYT27/Usuarios');
const Paquetes = require('../../models/PYT27/Packages');
const MetodosRetiros = require('../../models/PYT27/Retreats');
const Depositos = require('../../models/PYT27/Depositos');
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
Pays.Paquetes = Pays.belongsTo(Paquetes);
Pays.MetodosRetiros = Pays.belongsTo(MetodosRetiros);
Pays.Depositos = Pays.belongsTo(Depositos);
module.exports = Pays;