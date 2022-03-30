const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Provincias = require('./Provincias');
const Canton = require('./Canton');

// DISTRITOS
const Distritos = db672.define('distritos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: false
	}
}, {
	timestamps: false,
});

Distritos.Canton = Distritos.belongsTo(Canton);
Distritos.Provincias = Distritos.belongsTo(Provincias);
module.exports = Distritos;