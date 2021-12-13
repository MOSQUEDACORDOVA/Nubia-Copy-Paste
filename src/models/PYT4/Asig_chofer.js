const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Vehiculos = require('./Vehiculos')
const Personal = require('./Personal')
const Sucursales = require('./Sucursales')
const Asig_chofer = db.define('asig_chofer', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,	
		autoIncrement: true
	},
});


Asig_chofer.Vehiculos= Asig_chofer.belongsTo(Vehiculos);
Asig_chofer.Personal= Asig_chofer.belongsTo(Personal);
Asig_chofer.Sucursales= Asig_chofer.belongsTo(Sucursales);
//Asig_chofer.hasMany(Carga_init, {as: 'Carga_init'})
module.exports = Asig_chofer;

