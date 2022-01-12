const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const bcrypt = require('bcrypt-nodejs');

// USUARIOS
const Usuarios = db672.define('usuarios', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	dni: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
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
	pais: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La contraseña es obligatoria'
			}
		}
	},
    puesto: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
	fecha_nacimiento: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	fecha_inicio: {
		type: DataTypes.STRING(100),
		allowNull: false,
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

module.exports = Usuarios;