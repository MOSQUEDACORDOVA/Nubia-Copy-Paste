const { Op, where } = require("sequelize");
const db672 = require("../../config/dbPY672");
const Grupos = require("../../models/PYT672/Grupos");
const Matriculas = require("../../models/PYT672/Matriculas");

module.exports = {
    // * CREAR GRUPOS ADMIN
    CrearGrupo(identificador, nombre, lecciones, horario, diaPagos, finNivel, fecha, fechaFin, nivel) {
    return new Promise((resolve, reject) => {
        Grupos.create({ identificador: identificador, nombre: nombre, lecciones_semanales: lecciones, dia_horario: horario, dia_pagos: diaPagos, finalizar_nivel: finNivel, fecha_inicio: fecha, fecha_finalizacion: fechaFin, nivel: nivel })
          .then((data) => {
            let data_set = JSON.stringify(data);
            console.log('NUEVO GRUPO CREADO')
            resolve(data_set);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // * ELIMINAR GRUPOS ADMIN
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
    IniciarGrupos(id) {
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
    ActualizarNivelesGrupos(id, identif, fin, nivel, code) {
      return new Promise((resolve, reject) => {
        Grupos.update({
          identificador: identif,
          fecha_finalizacion: fin,
          nivel: nivel,
          codigo_nivel: code,
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
    // ACTUALIZAR GRUPOS
    ActualizarEstudiantesActivosGrupos(id, activos, total) {
      return new Promise((resolve, reject) => {
        Grupos.update({
          activos: activos, total_alumnos: total
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
    // * REGISTRAR ESTUDIANTES ADMIN
    RegistrarMatricula(nombre, apellido1, apellido2, dni, genero, nacimiento, telefono1, telefono2, telefono3, email, provincia, canton, distrito, tipo, grupoId) {
    return new Promise((resolve, reject) => {
      Matriculas.create({ nombre: nombre, primer_apellido: apellido1, segundo_apellido: apellido2, nro_identificacion: dni, genero: genero, fecha_nacimiento: nacimiento, telefono1: telefono1, telefono2: telefono2, telefono3: telefono3, email: email, provincia: provincia, canton: canton,  distrito: distrito, tipoEstudianteId: tipo, grupoId: grupoId, estadoId: 1})
          .then((data) => {
            let data_set = JSON.stringify(data);
            console.log('NUEVO ESTUDIANTE REGISTRADO')
            resolve(data_set);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // * ELIMINAR ESTUDIANTES ADMIN
    BorrarEstudiantes(id){
      return new Promise((resolve, reject) => {
        Matriculas.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            console.log('ESTUDIANTE ELIMINADO')
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // * BUSCAR ESTUDIANTE ADMIN
    BuscarEstudiante(id){
      return new Promise((resolve, reject) => {
        Matriculas.findAll({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            console.log('ESTUDIANTE ENCONTRADO')
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // * ACTIVAR ESTUDIANTE CONGELADO ADMIN
    ActivarEstudianteCongelado(id){
      return new Promise((resolve, reject) => {
        Matriculas.update({
          estado: 'Activo',
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          console.log('ESTUDIANTE ACTIVADO')
          resolve(data_s);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // * CONGELAR ESTUDIANTE ADMIN
    CongelarEstudiante(id){
      return new Promise((resolve, reject) => {
        Matriculas.update({
          estado: 'Congelado',
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          console.log('ESTUDIANTE CONGELADO')
          resolve(data_s);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // * ELIMINAR ESTUDIANTE DE UN GRUPO ADMIN
    EliminarGrupoEstudiante(id){
      return new Promise((resolve, reject) => {
        Matriculas.update({
          grupoId: null,
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          console.log('ESTUDIANTE ELIMINADO DE GRUPO')
          resolve(data_s);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // * RESTAR ESTUDIANTE ELIMINADO DE UN GRUPO ADMIN
    EliminarEstudianteGrupo(id, activos, total){
      return new Promise((resolve, reject) => {
        Grupos.update({
          activos: activos, total_alumnos: total,
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          console.log('ESTUDIANTE ELIMINADO DE GRUPO')
          resolve(data_s);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // * ACTUALIZAR ESTUDIANTE CONGELADO GRUPOS
    EstudianteCongeladoGrupo(id, activos, congelados) {
      return new Promise((resolve, reject) => {
        Grupos.update({
          activos: activos, congelados: congelados,
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          console.log('GRUPO ACTUALIZADO')
          resolve(data_s);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // * ACTUALIZAR ESTUDIANTE ACTIVADO GRUPOS
    EstudianteActivadoGrupo(id, activos, congelados) {
      return new Promise((resolve, reject) => {
        Grupos.update({
          activos: activos, congelados: congelados,
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          console.log('GRUPO ACTUALIZADO')
          resolve(data_s);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // * OBTENER GRUPO
    BuscarGrupos(id) {
      return new Promise((resolve, reject) => {
        Grupos.findAll({ where: {
          id: id
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
    // * OBTENER ESTUDIANTES CON GRUPOS
    GruposYEstudiantes() {
      return new Promise((resolve, reject) => {
        Matriculas.findAll({
        include:[
          {association: Matriculas.TipoEstudiante},
          {association: Matriculas.Grupos},
          {association: Matriculas.Estado},
        ],order: [
          ["id", "DESC"],
        ],})
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    // * OBTENER MATRICULA DE GRUPOS
    ObtenerMatriculaGrupo(id) {
      return new Promise((resolve, reject) => {   
        Matriculas.findAll({ where: {
          grupoId: id,
        },
        include:[
          {association: Matriculas.TipoEstudiante},
          {association: Matriculas.Grupos},
          {association: Matriculas.Estado},
        ],order: [
          ["id", "DESC"],
        ],})
        .then((data) => {
          let data_p = JSON.stringify(data);
          console.log(data)
          console.log("USUARIOS")
          resolve(data_p);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
}