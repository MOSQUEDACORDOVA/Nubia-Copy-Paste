const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
const bcrypt = require('bcrypt-nodejs');
const Paquetes = require('../../models/PYT24/Packages');
const Depositos = require('../../models/PYT24/Depositos');

// USUARIOS
const Usuarios = db24.define('usuarios', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: DataTypes.STRING(30),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			isEmail: {
				msg: 'Agrega un correo válido'
			},
			notEmpty: {
				msg: 'El email es obligatorio'
			}
		},
		unique: {
			args: true,
			msg: 'Usuario ya registrado'
		}
	},
	password: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La contraseña es obligatoria'
			}
		}
	},
    type_user: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
	available_balance: {
		type: DataTypes.INTEGER,
        allowNull: true,
		defaultValue: 0
	},
	earnings: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	front_img_dni: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	back_img_dni: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	account_verified: {
		type: DataTypes.STRING(50),
		allowNull: false,
		defaultValue: 'No verificado'
	},
	status: {
		type: DataTypes.STRING(50),
		allowNull: false,
		defaultValue: 'activo'
	}
}, {
	hooks: {
		beforeCreate(usuario) {
			usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
		}
	}
});

// Métodos personalizados
Usuarios.prototype.verifyPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}
Usuarios.Depositos = Usuarios.hasMany(Depositos);
module.exports = Usuarios;