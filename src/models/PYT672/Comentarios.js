const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('./Grupos');
const Matriculas = require('./Matriculas');

// NOTAS
const Comentarios = db672.define('comentarios', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	commentProfForm: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	commentAdminForm: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	

});

Comentarios.Grupos = Comentarios.belongsTo(Grupos);
Comentarios.Matriculas = Comentarios.belongsTo(Matriculas);
module.exports = Comentarios;