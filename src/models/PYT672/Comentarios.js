const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('./Grupos');
const Matriculas = require('./Matriculas');
const Usuarios = require('./Usuarios');
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
Comentarios.Usuarios = Comentarios.belongsTo(Usuarios);
module.exports = Comentarios;