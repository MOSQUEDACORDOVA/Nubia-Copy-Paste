const { Op, where } = require("sequelize");
const db672 = require("../../config/dbPY672");
const Grupos = require("../../models/PYT672/Grupos");

module.exports = {
    // * CREAR GRUPOS ADMIN
    CrearGrupo(nombre, lecciones, horario, fecha) {
    return new Promise((resolve, reject) => {
        Grupos.create({ nombre: nombre, lecciones_semanales: lecciones, dia_horario: horario, fecha_inicio: fecha })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('NUEVO GRUPO CREADO');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    ObtenerGruposEnApertura() {
        return new Promise((resolve, reject) => {
            Grupos.findAll({where:{ estado: 'En Apertura'}})
                .then((data) => {
                    let data_p = JSON.stringify(data);
                    resolve(data_p);
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }
}