const { Op, where, Sequelize } = require("sequelize");
const db672 = require("../../config/dbPY672");
const Grupos = require("../../models/PYT672/Grupos");
const Matriculas = require("../../models/PYT672/Matriculas");
const Asistencia = require("../../models/PYT672/Asistencia");
const Notas = require("../../models/PYT672/Notas");
const Participacion = require("../../models/PYT672/Participacion");
const Provincias = require("../../models/PYT672/Provincias");
const Canton = require("../../models/PYT672/Canton");
const Distritos = require("../../models/PYT672/Distritos");
const Usuarios = require("../../models/PYT672/Usuarios");
const Caja = require("../../models/PYT672/Caja");
const Comentarios = require("../../models/PYT672/Comentarios");
module.exports = {
    // * REGISTRO DE USUARIOS
    RegUser(nombre, dni, email, pais, fechaN, fechaI, puesto, password, telefono) {
      return new Promise((resolve, reject) => {
      Usuarios.create({nombre: nombre, dni: dni, email: email, pais: pais, puesto: puesto, fecha_nacimiento: fechaN, fecha_inicio: fechaI, password: password,telefono:telefono })
        .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Usuario registrado con éxito');
        })
        .catch((err) => {
            reject(err)
        });
      });
    }, 
      // * EDIT DE USUARIOS
      EditUser(nombre, dni, email, pais, fechaN, fechaI, puesto, id_usuario, telefono) {
        return new Promise((resolve, reject) => {
        Usuarios.update({nombre: nombre, dni: dni, email: email, pais: pais, puesto: puesto, fecha_nacimiento: fechaN, fecha_inicio: fechaI,telefono:telefono },{where:{id:id_usuario}})
          .then((data) => {
              let data_set = JSON.stringify(data);
              resolve('Usuario actualizado con éxito');
          })
          .catch((err) => {
              reject(err)
          });
        });
      }, 
            // * EDIT ESTADO  DE USUARIOS
            EditEnabledUser(id_usuario, estado ) {
              return new Promise((resolve, reject) => {
              Usuarios.update({enabled:estado},{where:{id:id_usuario}})
                .then((data) => {
                    let data_set = JSON.stringify(data);
                    resolve('Usuario actualizado con éxito');
                })
                .catch((err) => {
                    reject(err)
                });
              });
            }, 
    // * DELETE DE USUARIOS
    DeleteUser(id) {
      return new Promise((resolve, reject) => {
      Usuarios.destroy({where:{id:id} })
        .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Usuario eliminado con éxito');
        })
        .catch((err) => {
            reject(err)
        });
      });
    },
    // * CREAR GRUPOS ADMIN
    CrearGrupo(identificador, nombre, lecciones, horario, diaPagos, finNivel, fecha, fechaFin, nivel, profesor) {
    return new Promise((resolve, reject) => {
        Grupos.create({ identificador: identificador, nombre: nombre, lecciones_semanales: lecciones, dia_horario: horario, dia_pagos: diaPagos, finalizar_nivel: finNivel, fecha_inicio: fecha, fecha_finalizacion: fechaFin, nivel: nivel,usuarioId:profesor, estadosGrupoId: 1 })
          .then((data) => {
            let data_set = JSON.stringify(data);
            
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
        Grupos.findAll({include:[
          {association: Grupos.EstadoGrupos},
          {association: Grupos.Usuarios},
        ],order:[['id', 'DESC']]})
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
          estadosGrupoId: {
            [Op.eq]: 1
          }
        }, include:[
          {association: Grupos.EstadoGrupos},
          {association: Grupos.Usuarios},
        ]},{order:[['id', 'DESC']]})
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
          }, estadosGrupoId: {
            [Op.eq]: 2,
          }}, include:[
            {association: Grupos.EstadoGrupos},
            {association: Grupos.Usuarios},
          ]
        },{order:[['id', 'DESC']]})
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
          }}, include:[
            {association: Grupos.EstadoGrupos},
            {association: Grupos.Usuarios},
          ]
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
          }, estadosGrupoId: {
            [Op.eq]: 2,
          }}, include:[
            {association: Grupos.EstadoGrupos},
            {association: Grupos.Usuarios},
          ]
        },{order:[['id', 'DESC']]})
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ObtenerGruposKids() {
      return new Promise((resolve, reject) => {
        Grupos.findAll({where:
          { nombre: {
            [Op.eq]: 'Kids',
          }, estadosGrupoId: {
            [Op.eq]: 2,
          }}, include:[
            {association: Grupos.EstadoGrupos},
            {association: Grupos.Usuarios},
          ]
        },{order:[['id', 'DESC']]})
          .then((data) => {
              let data_p = JSON.stringify(data);
              resolve(data_p);
          })
          .catch((err) => {
              reject(err)
          });
      });
    },
    ObtenerTodosGruposKids() {
      return new Promise((resolve, reject) => {
        Grupos.findAll({where:
          { nombre: {
            [Op.eq]: 'Kids',
          }}, include:[
            {association: Grupos.EstadoGrupos},
            {association: Grupos.Usuarios},
          ]
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
          }}, include:[
            {association: Grupos.EstadoGrupos},
            {association: Grupos.Usuarios},
          ]
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
          estadosGrupoId: 2,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            
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
            
            resolve('GRUPO INICIADO');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR GRUPOS
    ActualizarGrupos(id, identificador, nombre, lecciones, horario, diaPagos, finNivel, fecha, fechaFin,nivel,profesor) {
      return new Promise((resolve, reject) => {
        Grupos.update({
          usuarioId:profesor, nombre: nombre, lecciones_semanales: lecciones, dia_horario: horario, dia_pagos: diaPagos, finalizar_nivel: finNivel, fecha_inicio: fecha, fecha_finalizacion: fechaFin,nivel:nivel
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
    RegistrarMatricula(nombre, dni, genero, nacimiento, telefono1, telefono2, email, provincia, canton, distrito, idEncargado, tipo, grupoId,vendedor) {
    return new Promise((resolve, reject) => {
      Matriculas.create({ nombre: nombre, nro_identificacion: dni, genero: genero, fecha_nacimiento: nacimiento, telefono1: telefono1, telefono2: telefono2, email: email, provincia: provincia, canton: canton, distrito: distrito, resgistradoPor: idEncargado, tipoEstudianteId: tipo, grupoId: grupoId, estadoId: 1,usuarioId:vendedor})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve(data_set);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // * REGISTRAR ESTUDIANTES EXCEL
    RegistrarMatriculaExcel(nombre, dni, genero, nacimiento, telefono1, telefono2, email, provincia, canton, distrito, idEncargado, tipo, grupoId, vendedor) {
    return new Promise((resolve, reject) => {
      Matriculas.create({ nombre: nombre, nro_identificacion: dni, genero: genero, fecha_nacimiento: nacimiento, telefono1: telefono1, telefono2: telefono2, email: email, provincia: provincia, canton: canton,  distrito: distrito, resgistradoPor: idEncargado, tipoEstudianteId: tipo, grupoId: grupoId, estadoId: 1, usuarioId:vendedor })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve(data_set);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },

       // * EDITAR ESTUDIANTES ADMIN
       EditMatricula(nombre, dni, genero, nacimiento, telefono1, telefono2, email, provincia, canton, distrito, tipo, id_estudiante,vendedor) {
        return new Promise((resolve, reject) => {
          Matriculas.update({ nombre: nombre, nro_identificacion: dni, genero: genero, fecha_nacimiento: nacimiento, telefono1: telefono1, telefono2: telefono2, email: email, provincia: provincia, canton: canton,  distrito: distrito, tipoEstudianteId: tipo, estadoId: 1, usuarioId:vendedor}, {where:{id:id_estudiante}})
              .then((data) => {
                let data_set = JSON.stringify(data);
                resolve(data_set);
              })
              .catch((err) => {
                reject(err)
              });
          });
        },
           // * REASIGNA GRUPO ESTUDIANTES ADMIN
           ReasignarGrupoEstudiante(grupoId, id_estudiante) {
            return new Promise((resolve, reject) => {
              Matriculas.update({grupoId: grupoId}, {where:{id:id_estudiante}})
                  .then((data) => {
                    let data_set = JSON.stringify(data);
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
            
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    BuscarEstudianteConstancia(id){
      return new Promise((resolve, reject) => {
        Matriculas.findOne({where:{
          id: id
        }, include:[
          {association: Matriculas.TipoEstudiante},
          {association: Matriculas.Grupos},
          {association: Matriculas.Estado},
          {association: Matriculas.Usuarios},
        ],order: [
          ["id", "DESC"],
        ]
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            
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
          estadoId: 1,
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          
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
          estadoId: 5,
        }, { where: {
          id: id
        }})
        .then((data) => {
          let data_s = JSON.stringify(data);
          
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
    // * OBTENER TODOS LOS USUARIOS
    ObtenerTodosUsuarios() {
      return new Promise((resolve, reject) => {
        Usuarios.findAll()
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
    GruposYMatriculas() {
      return new Promise((resolve, reject) => {
        Matriculas.findAll({
        include:[
          {association: Matriculas.TipoEstudiante},
          {association: Matriculas.Grupos, include:[{association:Grupos.Usuarios}]},
          {association: Matriculas.Estado},
          {association: Matriculas.Usuarios},
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
          {association: Matriculas.Usuarios},
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
    ObtenerMatriculasDistinct() {
      return new Promise((resolve, reject) => {
        Matriculas.findAll({
          attributes: [
            // specify an array where the first element is the SQL function and the second is the alias
            [Sequelize.fn('DISTINCT', Sequelize.col('grupoId')) ,'grupoId'],
            // specify any additional columns, e.g. country_code
            // 'country_code'
          ],
          where: {
            grupoId: {
              [Op.ne]: null
            }
          }
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
    RegistrarAsistenciaMatriculaAusente(lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Asistencia.create({
          n_leccion: lecc, grupoId: grupoId, matriculaId: matriculaId
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
    RegistrarNotas(nota, lecc, grupoId, matriculaId, commentProfForm,  commentAdminForm) {
      return new Promise((resolve, reject) => {
        Notas.create({
          nota: nota, n_leccion: lecc, grupoId: grupoId, matriculaId: matriculaId, commentProfForm:commentProfForm,  commentAdminForm:commentAdminForm
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
    RegistrarParticipacion(porcentaje, lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Participacion.create({
          porcentaje: porcentaje, n_leccion: lecc, grupoId: grupoId, matriculaId: matriculaId
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
    comentariosByAlumno(matriculaId) {
      return new Promise((resolve, reject) => {
        Notas.findAll({
          where: {
            matriculaId: {
              [Op.eq]: matriculaId,
            },
          } 
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

    ObtenerNotasMatricula(lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Notas.findAll({
          where: {
            n_leccion: {
              [Op.eq]: lecc,
            },
            grupoId: {
              [Op.eq]: grupoId,
            },
            matriculaId: {
              [Op.eq]: matriculaId,
            },
          } 
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
    BuscarNotasLeccion(lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Notas.findAll({
          where: {
            n_leccion: {
              [Op.eq]: lecc,
            },
            grupoId: {
              [Op.eq]: grupoId,
            },
            matriculaId: {
              [Op.eq]: matriculaId,
            },
          } 
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
    BuscarParticipacionMatricula(lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Participacion.findAll({
          where: {
            n_leccion: {
              [Op.eq]: lecc,
            },
            grupoId: {
              [Op.eq]: grupoId,
            },
            matriculaId: {
              [Op.eq]: matriculaId,
            },
          } 
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
    BuscarParticipacionTitulo(matriculaId) {
      return new Promise((resolve, reject) => {
        Participacion.findAll({
          where: { matriculaId: matriculaId
          } 
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
    BuscarNotasTitulo(matriculaId) {
      return new Promise((resolve, reject) => {
        Notas.findAll({
          where: {  [Op.or]: [ {n_leccion: '9'},{n_leccion: '17'},{n_leccion: '18'},{n_leccion: '25'},{n_leccion: '31'},{n_leccion: '32'},
          ],[Op.and]: [
                { matriculaId: matriculaId,},
              ]
            
            
          }
        },{order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["n_leccion", "DESC"],
          ],
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
    BuscarausenciasTitulo(matriculaId) {
      return new Promise((resolve, reject) => {
        Asistencia.findAll({
          where: { matriculaId: matriculaId
          }
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
    ActualizarNotas(nota, lecc, grupoId, matriculaId,commentProfForm,  commentAdminForm ) {
      return new Promise((resolve, reject) => {
        Notas.update({
          nota: nota, n_leccion: lecc, grupoId: grupoId, matriculaId: matriculaId, commentProfForm:commentProfForm,  commentAdminForm:commentAdminForm 
        }, {
          where: {
            n_leccion: {
              [Op.eq]: lecc,
            },
            grupoId: {
              [Op.eq]: grupoId,
            },
            matriculaId: {
              [Op.eq]: matriculaId,
            },
          } 
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
    ActualizarParticipacion(porcentaje, lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Participacion.update({
          porcentaje: porcentaje, n_leccion: lecc, grupoId: grupoId, matriculaId: matriculaId,  
        }, {
          where: {
            n_leccion: {
              [Op.eq]: lecc,
            },
            grupoId: {
              [Op.eq]: grupoId,
            },
            matriculaId: {
              [Op.eq]: matriculaId,
            },
          } 
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
    EliminarAsistenciaMatriculaAusente(lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Asistencia.destroy({
          where: {
            n_leccion: lecc, grupoId: grupoId, matriculaId: matriculaId
          }
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
    ObtenerAsistenciaMatriculaAusente(lecc, grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Asistencia.findAll({
          where: {
            n_leccion: lecc, grupoId: grupoId, matriculaId: matriculaId
          }
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
    ObtenerTodasAsistenciaMatricula(grupoId, matriculaId) {
      return new Promise((resolve, reject) => {
        Asistencia.findAll({
          where: {
            grupoId: grupoId, matriculaId: matriculaId
          }
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
    // ? OBTENER DATOS DE DIRECCION PROVINCIAS, CANTON, DISTRITOS 
    ObtenerTodasProvincias() {
      return new Promise((resolve, reject) => {
        Provincias.findAll()
        .then((data) => {
          let data_p = JSON.stringify(data);
          
          resolve(data_p);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    ObtenerTodosCanton() {
      return new Promise((resolve, reject) => {
        Canton.findAll()
        .then((data) => {
          let data_p = JSON.stringify(data);
          
          resolve(data_p);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    ObtenerTodosDistritos() {
      return new Promise((resolve, reject) => {
        Distritos.findAll()
        .then((data) => {
          let data_p = JSON.stringify(data);
          
          resolve(data_p);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },


/** TODO CAJA */    
guardar_caja(concepto,fecha_pago,monto,mora,observacion,banco, transaccion, id_alumno) {
  return new Promise((resolve, reject) => {
    Caja.create({concepto: concepto,fecha_pago: fecha_pago,monto: monto,mora: mora,observacion: observacion,banco:banco, transaccion:transaccion, matriculaId:id_alumno})
    .then((data) => {
      let data_p = JSON.stringify(data);
      resolve(data_p);
    })
    .catch((err) => {
      reject(err)
    });
  });
},
historial_caja(id_alumno) {
  return new Promise((resolve, reject) => {
    Caja.findAll({where:{matriculaId:id_alumno}, limit: 6, order:[['id', 'DESC']] })
    .then((data) => {
      let data_p = JSON.stringify(data);
      resolve(data_p);
    })
    .catch((err) => {
      reject(err)
    });
  });
},
update_constancia(id_caja, fecha_download) {
  return new Promise((resolve, reject) => {
    Caja.update({observacion:fecha_download},{where:{id:id_caja} })
    .then((data) => {
      let data_p = JSON.stringify(data);
      resolve(data_p);
    })
    .catch((err) => {
      reject(err)
    });
  });
},

//COMENTARIOS
Guarda_comentarios(commentAdminForm,id_alumno,userId) {
  return new Promise((resolve, reject) => {
    Comentarios.create({commentAdminForm:commentAdminForm, matriculaId:id_alumno,usuarioId: userId})
    .then((data) => {
      let data_p = JSON.stringify(data);
      resolve(data_p);
    })
    .catch((err) => {
      reject(err)
    });
  });
},
comentariosByAlumnoAdmin(id_alumno) {
  return new Promise((resolve, reject) => {
    Comentarios.findAll({where:{matriculaId:id_alumno},include:[{association:Comentarios.Usuarios}],order:[['createdAt', 'DESC']]})
    .then((data) => {
      let data_p = JSON.stringify(data);
      resolve(data_p);
    })
    .catch((err) => {
      reject(err)
    });
  });
},
Guarda_comentariosProf(commentProfForm,id_alumno,userId) {
  return new Promise((resolve, reject) => {
    Comentarios.create({commentProfForm:commentProfForm, matriculaId:id_alumno,usuarioId: userId})
    .then((data) => {
      let data_p = JSON.stringify(data);
      resolve(data_p);
    })
    .catch((err) => {
      reject(err)
    });
  });
},
}