const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');

// PROVINCIAS
const Provincias = db672.define('provincias', {
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

module.exports = Provincias;