const { Op, where } = require("sequelize");
const db672 = require("../../config/dbPY672");
const Grupos = require("../../models/PYT672/Grupos");

module.exports = {
    // * CREAR GRUPOS ADMIN
    CrearGrupo(identificador, nombre, lecciones, horario, diaPagos, finNivel, fecha, fechaFin, nivel) {
    return new Promise((resolve, reject) => {
        Grupos.create({ identificador: identificador, nombre: nombre, lecciones_semanales: lecciones, dia_horario: horario, dia_pagos: diaPagos, finalizar_nivel: finNivel, fecha_inicio: fecha, fecha_finalizacion: fechaFin, nivel: nivel })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('NUEVO GRUPO CREADO');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ELIMINAR GRUPOS
    BorrarGrupos(id){
      return new Promise((resolve, reject) => {
        Grupos.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve('GRUPO ELIMINADO');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    ObtenerTodosGrupos() {
      return new Promise((resolve, reject) => {
        Grupos.findAll()
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ObtenerGruposEnApertura() {
      return new Promise((resolve, reject) => {
        Grupos.findAll({where:{ 
          estado: {
            [Op.eq]: 'En Apertura'
          }
        }})
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ObtenerGruposDesdeCero() {
      return new Promise((resolve, reject) => {
        Grupos.findAll({where:
          { nombre: {
            [Op.eq]: 'Desde cero',
          }, estado: {
            [Op.eq]: 'Iniciado',
          }}
        })
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ObtenerTodosGruposDesdeCero() {
      return new Promise((resolve, reject) => {
        Grupos.findAll({where:
          { nombre: {
            [Op.eq]: 'Desde cero',
          }}
        })
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ObtenerGruposIntensivo() {
      return new Promise((resolve, reject) => {
        Grupos.findAll({where:
          { nombre: {
            [Op.eq]: 'Intensivo',
          }, estado: {
            [Op.eq]: 'Iniciado',
          }}
        })
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ObtenerTodosGruposIntensivo() {
      return new Promise((resolve, reject) => {
        Grupos.findAll({where:
          { nombre: {
            [Op.eq]: 'Intensivo',
          }}
        })
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ActualizarEstadoDeGrupos(id) {
      return new Promise((resolve, reject) => {
        Grupos.update({
          estado: 'Iniciado',
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log('GRUPO INICIADO')
            resolve('GRUPO INICIADO');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR GRUPOS
    ActualizarGrupos(id, identificador, nombre, lecciones, horario, diaPagos, finNivel, fecha, fechaFin) {
      return new Promise((resolve, reject) => {
        Grupos.update({
          identificador: identificador, nombre: nombre, lecciones_semanales: lecciones, dia_horario: horario, dia_pagos: diaPagos, finalizar_nivel: finNivel, fecha_inicio: fecha, fecha_finalizacion: fechaFin
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            resolve('GRUPO ACTUALIZADO');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
}