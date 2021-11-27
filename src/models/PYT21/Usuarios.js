const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY21');
const bcrypt = require('bcrypt-nodejs');
const Depositos = require('../PYT21/Depositos');

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
	avalible_balance: {
		type: DataTypes.INTEGER(255),
        allowNull: true,
		defaultValue: 0
	},
	earnings: {
		type: DataTypes.INTEGER(255),
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
	refer_code: {
		type: DataTypes.STRING(255),
		allowNull: true,
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