const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT672/data");
const passport = require("passport");
const { rejects } = require("assert");
let moment = require('moment-timezone');
var pdf = require('html-pdf');
const { group } = require("console");
const xlsxFile = require('read-excel-file/node');
const { toJpeg } = require('html-to-image');
const bcrypt = require('bcrypt-nodejs');


// TODO: AUTH
// * LOGIN
exports.sesionstart = (req, res) => {
  console.log(req.body);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      msg = "Datos incorrectos"
      return res.redirect("/loginpy672/PYT-672/"+msg);
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
      console.log(user.dataValues.enabled);
      if (user.dataValues.enabled == 0) {
        console.log("usuario inactivo")
        return res.redirect("/loginpy672E/PYT-672/msg");
      } else {
        return res.redirect('/py672/PYT-672')
      }
      
    });
  })(req, res);
};

// * CONTROL ROLES
exports.controlroles = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  if(req.user) {
    console.log(req.user)
    if (req.user.puesto === 'Administrador') {
      return res.redirect("../grupos/PYT-672");
    } else {
      return res.redirect("../control/PYT-672");
    }
  } else {
    return res.redirect("../loginpy672/PYT-672");
  }
};

// * REGISTRO DE USUARIOS
exports.reguser = (req, res) => {
  console.log(req.body);
  let { nombre, apellidos, dni, email, pais, fechaN, fechaI, puesto, password, telefono } = req.body;
  nombre = nombre + " " + apellidos;
  let msg = false;

    DataBase.RegUser(nombre, dni, email, pais, fechaN, fechaI, puesto, password, telefono).then((respuesta) => {
      console.log(respuesta)

      return res.send({success: true});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.send({err: true});
    });
};

exports.deleteuser = (req, res) => {
  console.log(req.body);
  let { id_usuario } = req.body;
  let msg = false;
    DataBase.DeleteUser(id_usuario).then((respuesta) =>{

      return res.send({success: 'Usuario Eliminado'});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
};
exports.editUser = (req, res) => {
  console.log(req.body);
  console.log("req.body");
  let { nombre, id_usuario, dni, email, pais, fechaN, fechaI, puesto, password, telefono } = req.body;
  let msg = false;

    DataBase.EditUser(nombre, dni, email, pais, fechaN, fechaI, puesto, id_usuario, telefono, password).then((respuesta) =>{
      return res.send({success: 'Usuario Actualizado'});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
};
exports.enabledDisUser = (req, res) => {
  console.log(req.body);
  let { id_usuario, estado } = req.body;
  let msg = false;

    DataBase.EditEnabledUser(id_usuario, estado ).then((respuesta) =>{
      return res.send({success: 'Usuario actualizado'});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
};

exports.cargarPagosExcel = (req, res) => {
  let { fileName } = req.params
  console.log(req.params);
  let msg = false;

  let text = ""
  
  try {
    xlsxFile(path.join(__dirname, '../../public/assets/uploads/' + fileName)).then((rows) => {
      console.log(rows);
      DataBase.GruposYMatriculas().then((resp) =>{
        let alumnos = JSON.parse(resp)
        console.log(alumnos)
        console.log("alumnos")

        for (let index = 0; index < rows.length; index++) {
          const element = rows[index];
  
          let concepto = "", 
          banco = element[0],
          fecha_pago = element[1],
          transaccion = element[2],
          monto = element[3],
          observacion = "-",
          //alumnoFind = alumnos.filter(alumno => alumno.nro_identificacion == element[6]),
          mora = "-";
          //id_alumno = alumnoFind[0].id

          /*console.log(alumnoFind)
          console.log(id_alumno)
          console.log("alumno encontrado")*/
  
          DataBase.guardar_caja(concepto,fecha_pago,monto,mora,observacion,banco, transaccion).then((respuesta) =>{
            console.log(respuesta)
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        }
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
      text = "Pagos Registrados"
      return res.redirect("/caja/PYT-672/");    
    })

  } catch (error) {
    console.log(error);
    return res.redirect("/error672/PYT-672");    
  }
};

exports.cargarExcel = (req, res) => {
  let { grupoId, fileName, text } = req.params
  let idEncargado = res.locals.user.id;
  console.log(req.params);
  let msg = false;
  
  try {
    xlsxFile(path.join(__dirname, '../../public/assets/uploads/' + fileName)).then((rows) => {
      console.log(rows);
      DataBase.ObtenerTodosUsuarios().then((resp) =>{
        let usuarios = JSON.parse(resp)
        /*console.log(usuarios)
        console.log("usuarios")*/

        for (let index = 0; index < rows.length; index++) {
          const element = rows[index];
  
          let nombre = element[0].toUpperCase(), 
          dni = element[1],
          genero = element[2],
          nacimiento = moment(element[3]).format('DD-MM-YYYY'),
          tlf1 = element[4],
          tlf2 = element[5] != "" ? element[5] : null,
          email = element[6],
          provincia = element[7],
          canton = element[8],
          distrito = element[9],
          grupo = grupoId;
          vendedor = usuarios.filter(vendedor => vendedor.dni == element[10]);
          vendedorId = vendedor.length > 0 ? vendedor[0].id : null

          /*console.log(vendedorId)
          console.log("VENDEDOR")*/
  
          DataBase.RegistrarMatriculaExcel(nombre, dni, genero, nacimiento, tlf1, tlf2, email, provincia, canton, distrito, idEncargado, grupo, vendedorId).then((respuesta) =>{
            console.log(respuesta);
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        }
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
      return res.redirect("/matriculas");    
    })

  } catch (error) {
    console.log(error);
    return res.redirect("/error672/PYT-672");    
  }
};

// * VISTA COMPROBANTE DE REGISTRO
exports.generarRegistroPDF = (req, res) => {
  let msg = false;
  let idUser = req.params.id  

  DataBase.ObtenerMatricula(idUser).then((response) => {
    let find = JSON.parse(response)[0];
    console.log(find)
    console.log("USUARIO")
    
    res.render("PYT-672/docs/registro-pdf", {
      pageName: "Comprobante",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      login: true,
      find
    })

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });

};

// * VISTA LOGIN
exports.login = (req, res) => {
  let msg = false;
  
  let msgErr = ''
  if (req.params.msg) {
    req.flash("error", 'Usuario desactivado por el administrador')
    msg = req.flash();
  }
  if (req.params.err) {
    msgErr = req.params.err
  }

  let proyecto = req.params.id  
  console.log(msg)
    res.render(proyecto+"/auth/login", {
      pageName: "Login",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      login: true,
      messages: msg,
      msgErr
    })
};

// * VISTA RESTABLECER CONTRASEÁ
exports.restablecerpass = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/auth/restablecerpass", {
      pageName: "Restablecer Contraseña",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      login: true,
    })
};

// * VISTA REGISTRO
exports.register = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/auth/register", {
      pageName: "Registro",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      login: true
    })
};

// TODO: ADMINISTRADOR
exports.grupos = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id 

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

  let nombre = res.locals.user.nombre

    res.render(proyecto+"/admin/grupos", {
      pageName: "Academia Americana - Grupos",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      grupos: true,
      roleProf, roleAdmin,
      nombre
    });
}

// TODO: ADMINISTRADOR RESPALDO
exports.safasf = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id 

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

  console.log(proyecto)
  
  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    /*console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")*/
    
  DataBase.ObtenerGruposDesdeCero().then((response2) => {
    let gruposDesde0 = JSON.parse(response2);
    console.log(gruposDesde0)
    console.log("DESDE CERO INICIADOS")

      if (gruposDesde0.length) {
        gruposDesde0.forEach(obj => {
          let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
          /*console.log(obj)
          console.log("EACH")*/
  
          DataBase.ObtenerMatriculaGrupo(obj.id).then((responseGrupos) => {
            let find = JSON.parse(responseGrupos);
            /*console.log(find)
            console.log("FIND MATRICULA")*/
            
            find.forEach(item => {
              if(item.estado.id === 1) {
                numActivos += 1;
              } else if (item.estado.id === 2) {
                numIncorporados += 1;
              } else if (item.estado.id === 3) {
                numInscritos += 1;
              } else if (item.estado.id === 4) {
                numFusionados += 1;
              } else if (item.estado.id === 5) {
                numCongelados += 1;
              }
              numTotal += 1;
            });
  
            let newObj = {}
  
            matrActivos = {
              activos: numActivos
            }
            matrIncorporados = {
              incorporados: numIncorporados
            }
            matrInscritos = {
              inscritos: numInscritos
            }
            matrFusionados = {
              fusionados: numFusionados
            }
            matrCongelados = {
              congelados: numCongelados
            }
            matrTotal = {
              total: numTotal
            }
  
            Object.assign(newObj, matrActivos)
            Object.assign(newObj, matrIncorporados)
            Object.assign(newObj, matrInscritos)
            Object.assign(newObj, matrFusionados)
            Object.assign(newObj, matrCongelados)
            Object.assign(newObj, matrTotal)
  
            let result = Object.assign(obj, newObj);
  
            console.log(result)
            console.log("RESULT")
  
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        });
      }
    
    DataBase.ObtenerGruposIntensivo().then((response3) => {
      let gruposIntensivo = JSON.parse(response3);
      /*console.log(gruposIntensivo)
      console.log("INTENSIVOS INICIADOS")*/

        if (gruposIntensivo.length) {
          gruposIntensivo.forEach(obj => {
            let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
            /*console.log(obj)
            console.log("EACH")*/
    
            DataBase.ObtenerMatriculaGrupo(obj.id).then((responseGrupos) => {
              let find = JSON.parse(responseGrupos);
              /*console.log(find)
              console.log("FIND MATRICULA")*/
              
              find.forEach(item => {
                if(item.estado.id === 1) {
                  numActivos += 1;
                } else if (item.estado.id === 2) {
                  numIncorporados += 1;
                } else if (item.estado.id === 3) {
                  numInscritos += 1;
                } else if (item.estado.id === 4) {
                  numFusionados += 1;
                } else if (item.estado.id === 5) {
                  numCongelados += 1;
                }
                numTotal += 1;
              });
    
              let newObj = {}
    
              matrActivos = {
                activos: numActivos
              }
              matrIncorporados = {
                incorporados: numIncorporados
              }
              matrInscritos = {
                inscritos: numInscritos
              }
              matrFusionados = {
                fusionados: numFusionados
              }
              matrCongelados = {
                congelados: numCongelados
              }
              matrTotal = {
                total: numTotal
              }
    
              Object.assign(newObj, matrActivos)
              Object.assign(newObj, matrIncorporados)
              Object.assign(newObj, matrInscritos)
              Object.assign(newObj, matrFusionados)
              Object.assign(newObj, matrCongelados)
              Object.assign(newObj, matrTotal)
    
              let result = Object.assign(obj, newObj);
    
              console.log(result)
              console.log("RESULT")
    
            }).catch((err) => {
              console.log(err)
              let msg = "Error en sistema";
              return res.redirect("/error672/PYT-672");
            });
          });
        }

        let gruposApertura, stringAperturas;
        DataBase.ObtenerGruposEnApertura().then((response4) => {
          gruposApertura = JSON.parse(response4);
          /*console.log(gruposApertura)
          console.log("EN APERTURA")*/

          if (gruposApertura.length) {
            gruposApertura.forEach(obj => {
              let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
              /*console.log(obj)
              console.log("EACH")*/
      
              DataBase.ObtenerMatriculaGrupo(obj.id).then((responseGrupos) => {
                let find = JSON.parse(responseGrupos);
                /*console.log(find)
                console.log("FIND MATRICULA")*/
                
                find.forEach(item => {
                  if(item.estado.id === 1) {
                    numActivos += 1;
                  } else if (item.estado.id === 2) {
                    numIncorporados += 1;
                  } else if (item.estado.id === 3) {
                    numInscritos += 1;
                  } else if (item.estado.id === 4) {
                    numFusionados += 1;
                  } else if (item.estado.id === 5) {
                    numCongelados += 1;
                  }
                  numTotal += 1;
                });
      
                let newObj = {}
      
                matrActivos = {
                  activos: numActivos
                }
                matrIncorporados = {
                  incorporados: numIncorporados
                }
                matrInscritos = {
                  inscritos: numInscritos
                }
                matrFusionados = {
                  fusionados: numFusionados
                }
                matrCongelados = {
                  congelados: numCongelados
                }
                matrTotal = {
                  total: numTotal
                }
      
                Object.assign(newObj, matrActivos)
                Object.assign(newObj, matrIncorporados)
                Object.assign(newObj, matrInscritos)
                Object.assign(newObj, matrFusionados)
                Object.assign(newObj, matrCongelados)
                Object.assign(newObj, matrTotal)
      
                let result = Object.assign(obj, newObj);
                
              }).catch((err) => {
                console.log(err)
                let msg = "Error en sistema";
                return res.redirect("/error672/PYT-672");
              });
            });
          }

    res.render(proyecto+"/admin/grupos", {
      pageName: "Academia Americana - Grupos",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      grupos: true,
      roleProf, roleAdmin,
      gruposTodos,
      gruposDesde0,
      response2,
      gruposIntensivo,
      response3,
      gruposApertura,
      response4,
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * AJAX PRINCIPAL - GENERAR ID GRUPOS
exports.obtenerGruposAll = async (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
   
  let arrIdGrupos = []

  DataBase.ObtenerTodosGrupos().then(async (response) => {
    let gruposTodos = JSON.parse(response);
    let gruposGenerados = IdentificadorGrupos(gruposTodos)

    function IdentificadorGrupos(arr) {
        let grupos = arr

        // * VARIABLES GENERALES
        for (let i = 0; i < grupos.length; i++) {
          let identificador, numGrupo = 1, numId = 100, nivelCode, count = 0;
          const elemento = grupos[i];
          let result = arrIdGrupos.filter(item => item === elemento.identificador)
          arrIdGrupos.push(elemento.identificador)
          count = result ? result.length : 0
          
          numGrupo += count;
          
          nivelCode = NivelGrupos(elemento.nombre, elemento.fecha_inicio, elemento);
          numId += numGrupo;

          identificador = `${elemento.identificador}${numId}-${nivelCode}`;
          let Obj = {
            identificador: identificador,
          }
          Object.assign(elemento, Obj)
        }

        console.log(grupos)
        return grupos;
    }

    function NivelGrupos(nombre, fecha, grupo) {
        let inicioGrupo = fecha;
        let iniciado = moment(inicioGrupo, "DD-MM-YYYY").format('YYYY-MM-DD');
        let nivelActual, nivel2, nivel3, nivel4;

        let fechasNiveles = {
          nivel1: '',
          nivel2: '',
          nivel3: '',
          nivel4: '',
        }

        switch (nombre) {
          case 'Desde cero':
            nivel2 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(64, 'w').format('YYYY-MM-DD')
            nivel4 = moment(iniciado).add(96, 'w').format('YYYY-MM-DD')
        
            if (moment().isBefore(nivel2)) {
                nivelActual = 1
            
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
                nivelActual = 2
            
            } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
                nivelActual = 3
            
            } else {
                nivelActual = 4
            }

            fechasNiveles = {
              nivel1: iniciado,
              nivel2: nivel2,
              nivel3: nivel3,
              nivel4: nivel4,
            }
            CalcularFechasLecciones(grupo, fechasNiveles)
          break;
            
          case 'Intensivo':

            let diaActualInicioGrupo = moment(grupo.fecha_inicio, 'DD-MM-YYYY').isoWeekday()
            
            if (diaActualInicioGrupo === 3 || diaActualInicioGrupo === 4) {
              nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
              nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
              nivel4 = moment(iniciado).add(48, 'w').format('YYYY-MM-DD')
  
            } else {
              nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
              nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
              nivel4 = moment(iniciado).add(48, 'w').format('YYYY-MM-DD')
  
              /*let addWeek = ''
              let fechaFinal = ''
              console.log(iniciado)
              console.log("iniciado el")
              for (let i = 0; i < 16; i++) {
                addWeek = moment(iniciado).add(i, 'w').format('YYYY-MM-DD')
                fechaFinal = moment(addWeek).add(2, 'd').format('YYYY-MM-DD')
                console.log(addWeek)
                console.log("addWeek")
                console.log(fechaFinal)
                console.log("fechaFinal")
              }
              nivel2 = fechaFinal
              
              let addWeek2 = ''
              for (let i = 0; i < 16; i++) {
                addWeek2 = moment(nivel2).add(i, 'w')
                fechaFinal = moment(addWeek2).add(2, 'd').format('YYYY-MM-DD')
                
                console.log(addWeek2)
                console.log("addWeek 2")
                console.log(fechaFinal)
                console.log("fechaFinal")
              }
              nivel3 = fechaFinal
              
              let addWeek3 = ''
              for (let i = 0; i < 16; i++) {
                addWeek3 = moment(nivel3).add(i, 'w')
                fechaFinal = moment(addWeek3).add(2, 'd').format('YYYY-MM-DD')
                
                console.log(addWeek3)
                console.log("addWeek 3")
                console.log(fechaFinal)
                console.log("fechaFinal")
              }
              nivel4 = fechaFinal
              
              console.log(nivel2, nivel3, nivel4)
              console.log("niveles else")*/
              
            }
            
            if (moment().isBefore(nivel2)) {
                nivelActual = 1
            
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
                nivelActual = 2
            
            } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
                nivelActual = 3
            
            } else {
                nivelActual = 4
            }

            fechasNiveles = {
              nivel1: iniciado,
              nivel2: nivel2,
              nivel3: nivel3,
              nivel4: nivel4,
            }
            
            CalcularFechasLecciones(grupo, fechasNiveles)
          break;
                
          case 'Kids':
            nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
            
            if (moment().isBefore(nivel2)) {
                nivelActual = 1
            
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
                nivelActual = 2
            
            } else if(moment().isSameOrAfter(nivel3)) {
                nivelActual = 3
            } 

            fechasNiveles = {
              nivel1: iniciado,
              nivel2: nivel2,
              nivel3: nivel3,
              nivel4: '',
            }
            CalcularFechasLecciones(grupo, fechasNiveles)
          break;
        }
        
        return nivelActual;
    }

    // * REMOVER ACENTOS
    function quitarAcentos(cadena){
      const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
      return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    }

    function CalcularFechasLecciones(grupo, fechas) {
      let countLecc = 0
      let fechaActualizada = ''
      let fechaActualizada2 = ''
      let addWeeksNum = 0
      let addDaysNum1 = 0
      let addDaysNum2 = 0
      let fechaLecciones = []
      let fechaLeccionActual = ''
      let fechaLeccionActual2 = ''
      let day = grupo.dia_horario.includes("Lunes") ? 1 :
      grupo.dia_horario.includes("Martes") ? 2 :
      grupo.dia_horario.includes("Miercoles") ? 3 :
      grupo.dia_horario.includes("Jueves") ? 4 : 6 

      if (grupo.nombre === "Desde cero") {

        for (i = 1; countLecc <= 32; i++) {
          /*console.log(countLecc)
          console.log("CONTADOR INICAL BUCLE")*/
          let fechaleccion = {}
          fechaActualizada = moment(grupo.fecha_inicio, 'DD-MM-YYYY').add(addWeeksNum, 'w')
          /*console.log(fechaActualizada)
          console.log("fechaActualizada")*/
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')

          /*console.log(day)
          console.log("DIA HORARIO GRUPO")*/

          let diaActual = fechaActualizada.isoWeekday()
          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 1,
              fecha: fechaLeccionActual
            }
          } else {
            console.log("entro al else", day, diaActual)
            break
          }

          if (addWeeksNum < 32) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
          /*console.log(addWeeksNum)
          console.log("SEMANAS A SUMAR ++")
          console.log(fechaActualizada)
          console.log("fechaActualizada")
          console.log(userInfo.fechaLecciones)
          console.log("LECCIONES ")*/
          /*console.log(countLecc)
          console.log("CONTADOR FINAL BUCLE")*/
        }

        Object.assign(grupo, {fechaLecciones: fechaLecciones})
        countLecc = 0
        fechaActualizada = ''
        day = 0
        addWeeksNum = 0
        fechaLeccionActual = ''
        
        for (i = 1; countLecc <= 32; i++) {
          /*console.log(countLecc)
          console.log("CONTADOR INICAL BUCLE")*/
          let fechaleccion = {}
          fechaActualizada = moment(fechas.nivel2, 'YYYY-MM-DD').add(addWeeksNum, 'w')
          /*console.log(fechaActualizada)
          console.log("fechaActualizada")*/
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')

          /*console.log(day)
          console.log("DIA HORARIO GRUPO")*/

          let diaActual = fechaActualizada.isoWeekday()
          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 2,
              fecha: fechaLeccionActual
            }
          } else {
            console.log("entro al else", day, diaActual)
            break
          }

          if (addWeeksNum < 32) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
          
        }

        Object.assign(grupo, {fechaLecciones: fechaLecciones})
        countLecc = 0
        fechaActualizada = ''
        day = 0
        addWeeksNum = 0
        fechaLeccionActual = ''

        for (i = 1; countLecc <= 32; i++) {
          /*console.log(countLecc)
          console.log("CONTADOR INICAL BUCLE")*/
          let fechaleccion = {}
          fechaActualizada = moment(fechas.nivel3, 'YYYY-MM-DD').add(addWeeksNum, 'w')
          /*console.log(fechaActualizada)
          console.log("fechaActualizada")*/
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')

          /*console.log(day)
          console.log("DIA HORARIO GRUPO")*/

          let diaActual = fechaActualizada.isoWeekday()
          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 3,
              fecha: fechaLeccionActual
            }
          } else {
            console.log("entro al else", day, diaActual)
            break
          }

          if (addWeeksNum < 32) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
          
        }
       
        Object.assign(grupo, {fechaLecciones: fechaLecciones})
        countLecc = 0
        fechaActualizada = ''
        day = 0
        addWeeksNum = 0
        fechaLeccionActual = ''

        for (i = 1; countLecc <= 32; i++) {
          /*console.log(countLecc)
          console.log("CONTADOR INICAL BUCLE")*/
          let fechaleccion = {}
          fechaActualizada = moment(fechas.nivel4, 'YYYY-MM-DD').add(addWeeksNum, 'w')
          /*console.log(fechaActualizada)
          console.log("fechaActualizada")*/
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')

          /*console.log(day)
          console.log("DIA HORARIO GRUPO")*/

          let diaActual = fechaActualizada.isoWeekday()
          if (day <= diaActual) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 4,
              fecha: fechaLeccionActual
            }
          } else {
            console.log("entro al else", day, diaActual)
            break
          }

          if (addWeeksNum < 32) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }

        }

        // * FECHA DE FINALIZACION - ULTIMA LECCION
        let fechaF = fechaLecciones[fechaLecciones.length-1]
        grupo.fecha_finalizacion = fechaF.fecha
        Object.assign(grupo, {fechaLecciones: fechaLecciones}) 
        
      } else if (grupo.nombre === "Intensivo") {
        
        day = grupo.dia_horario.includes("Lunes") ? 1 :
        grupo.dia_horario.includes("Martes") ? 2 : 0

        day2 = quitarAcentos(grupo.dia_horario).includes("Miercoles") ? 3 :
        grupo.dia_horario.includes("Jueves") ? 4 : 0

        countLecc = 1
        let fechaFinal = ''

        function Reset(fecha) {
          countLecc = 1
          fechaActualizada = ''
          fechaActualizada2 = ''

          let fechaProcess = moment(fecha).isoWeekday()
          console.log(fechaProcess)
          console.log("fechaProcess")
          if (fechaProcess === 3 || fechaProcess === 4) {
            addDaysNum1 = 5
            addDaysNum2 = 5
            
          } else {
            addDaysNum1 = 2
            addDaysNum2 = 2

          }
          console.log(addDaysNum1)
          console.log(addDaysNum2)
          console.log("contador dias")
          addWeeksNum = 0
        }

        for (let i = 1; i <= 16; i++) {
          let num = 2, b = i + 1, c = i > 1 ? i : 0
          let fechaActualizada = moment(grupo.fecha_inicio, 'DD-MM-YYYY').add(c, 'w')
          let fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')
          let diaActual = moment(fechaActualizada).isoWeekday()
          let fechaActualizada2

          if (diaActual === 3 || diaActual === 4) {
            fechaActualizada2 = moment(fechaActualizada).add(1, 'w')
          } else {
            fechaActualizada2 = moment(fechaActualizada).add(num, 'd')
          }

          let fechalec = {}
          fechalec = {
            leccion: i,
            nivel: 1,
            fecha: fechaLeccionActual
          }
          fechaLecciones.push(fechalec)

          fechalec = {
            leccion: b,
            nivel: 1,
            fecha: moment(fechaActualizada2).format('DD-MM-YYYY')
          }
          fechaLecciones.push(fechalec)

          console.log(diaActual)
          console.log("diaActual")
          console.log(fechaActualizada)
          console.log("fechaActualizada")
          console.log(fechaFinal)
          console.log("fechaFinal")
          Object.assign(grupo, {fechaLecciones: fechaLecciones})
        } 
        

        for (i = 1; countLecc <= 32; i++) {
          let fechaleccion = {}
          fechaActualizada = moment(grupo.fecha_inicio, 'DD-MM-YYYY').add(addDaysNum1, 'd')
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')
          
          let diaActual = fechaActualizada.isoWeekday()

       


          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 1,
              fecha: fechaLeccionActual
            }
          }
          
          if (diaActual === 1 || diaActual === 2) {
            addDaysNum1 += 2
            addDaysNum2 += 2
            
          } else {
            addDaysNum1 += 5
            addDaysNum2 += 5
            
          }

          if (i === 1) {
            fechaLeccionActual2 = moment(fechaActualizada).format('DD-MM-YYYY')
            
          } else {
            fechaLeccionActual2 = moment(fechaActualizada2).format('DD-MM-YYYY')
            
          }

          fechaActualizada2 = moment(grupo.fecha_inicio, 'DD-MM-YYYY').add(addDaysNum2, 'd')
          
          let diaActual2 = fechaActualizada2.isoWeekday()
          if (day2 <= diaActual2 || diaActual2 <= day2) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 1,
              fecha: fechaLeccionActual2
            }
          }
          
          if (addWeeksNum < 32) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
   
          fechaFinal = fechaActualizada2
        }

        Object.assign(grupo, {fechaLecciones: fechaLecciones})
        Reset(fechaFinal)
        
        // * NIVEL 2
        console.log(fechaFinal)
        console.log("fechaFinal")
        for (i = 1; countLecc <= 32; i++) {
          let fechaleccion = {}
          console.log(addDaysNum1)
          console.log("addDaysNum1")
          fechaActualizada = moment(fechaFinal).add(addDaysNum1, 'd')
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')
          
          console.log(fechaActualizada)
          console.log("fechaActualizada")
          console.log("nivel2")
          let diaActual = fechaActualizada.isoWeekday()
          console.log(diaActual)
          console.log("diaActual")

          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 2,
              fecha: fechaLeccionActual
            }
          }
          
          if (diaActual === 1 || diaActual === 2) {
            addDaysNum1 += 2
            addDaysNum2 += 2
            
          } else {
            addDaysNum1 += 5
            addDaysNum2 += 5
            
          }

          if (i === 1) {
            fechaLeccionActual2 = moment(fechaActualizada).format('DD-MM-YYYY')
            
          } else {
            fechaLeccionActual2 = moment(fechaActualizada2).format('DD-MM-YYYY')
            
          }

          fechaActualizada2 = moment(fechaFinal).add(addDaysNum2, 'd')
          
          let diaActual2 = fechaActualizada2.isoWeekday()
          if (day2 <= diaActual2 || diaActual2 <= day2) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 2,
              fecha: fechaLeccionActual2
            }
          }
          
          if (addWeeksNum < 32) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
   
          fechaFinal = fechaActualizada2
        }

        Object.assign(grupo, {fechaLecciones: fechaLecciones})
        Reset(fechaFinal)
        
        // * FECHA DE FINALIZACION - ULTIMA LECCION
        let fechaF = fechaLecciones[fechaLecciones.length-1]
        grupo.fecha_finalizacion = fechaF.fecha
        Object.assign(grupo, {fechaLecciones: fechaLecciones}) 
        
      } else if (grupo.nombre === "Kids") {
        day = 7

        for (i = 1; countLecc <= 16; i++) {
          let fechaleccion = {}
          fechaActualizada = moment(grupo.fecha_inicio, 'DD-MM-YYYY').add(addWeeksNum, 'w')
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')

          let diaActual = fechaActualizada.isoWeekday()
          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 1,
              fecha: fechaLeccionActual
            }
          }
          

          if (addWeeksNum < 16) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
   
        }

        Object.assign(grupo, {fechaLecciones: fechaLecciones})
        countLecc = 0
        fechaActualizada = ''
        addWeeksNum = 0
        fechaLeccionActual = ''
        
        for (i = 1; countLecc <= 16; i++) {
          let fechaleccion = {}
          fechaActualizada = moment(fechas.nivel2, 'YYYY-MM-DD').add(addWeeksNum, 'w')
          
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')

          let diaActual = fechaActualizada.isoWeekday()
          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 2,
              fecha: fechaLeccionActual
            }
          } else {
            console.log("entro al else", day, diaActual)
            break
          }

          if (addWeeksNum < 16) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
         
        }
        Object.assign(grupo, {fechaLecciones: fechaLecciones})
        countLecc = 0
        fechaActualizada = ''
        addWeeksNum = 0
        fechaLeccionActual = ''
        
        for (i = 1; countLecc <= 16; i++) {
          let fechaleccion = {}
          fechaActualizada = moment(fechas.nivel3, 'YYYY-MM-DD').add(addWeeksNum, 'w')
          
          fechaLeccionActual = moment(fechaActualizada).format('DD-MM-YYYY')

          let diaActual = fechaActualizada.isoWeekday()
          if (day <= diaActual || diaActual <= day) {
            countLecc++;
            fechaleccion = {
              leccion: i,
              nivel: 3,
              fecha: fechaLeccionActual
            }
          } else {
            console.log("entro al else", day, diaActual)
            break
          }

          if (addWeeksNum < 16) {
            fechaLecciones.push(fechaleccion)
            addWeeksNum++;
          }
         
        }

        // * FECHA DE FINALIZACION - ULTIMA LECCION
        let fechaF = fechaLecciones[fechaLecciones.length-1]
        grupo.fecha_finalizacion = fechaF.fecha
        Object.assign(grupo, {fechaLecciones: fechaLecciones}) 
      }
    }
    
    for (let index = 0; index < gruposGenerados.length; index++) {
      let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0;
      
      let data = await DataBase.ObtenerMatriculaGrupo(gruposGenerados[index].id).then((responseGrupos) => {
        let find = JSON.parse(responseGrupos);
        
        find.forEach(item => {
          if(item.estado.id === 1) {
            numActivos += 1;
          } else if (item.estado.id === 2) {
            numIncorporados += 1;
          } else if (item.estado.id === 3) {
            numInscritos += 1;
          } else if (item.estado.id === 4) {
            numFusionados += 1;
          } else if (item.estado.id === 5) {
            numCongelados += 1;
          }
          numTotal += 1;
        });
  
        let newObj = {
          activos: numActivos,
          incorporados: numIncorporados,
          inscritos: numInscritos,
          fusionados: numFusionados,
          congelados: numCongelados,
          total: numTotal,
        }
  
        let result = Object.assign(gruposGenerados[index], newObj);
  
        return JSON.stringify(gruposGenerados)
      })
      let count = gruposGenerados.length - 1
      if(count === index) {
        return res.send(gruposGenerados)
      }
    }
  
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });

  
};

/*// * AJAX
exports.obtenergruposapertura = async (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  var dataFinal;

  DataBase.ObtenerGruposEnApertura().then(async (response) => {
    let gruposApertura = JSON.parse(response), gruposArr = [], gruposArr2 = [];
    //console.log(gruposApertura)
    //console.log("EN APERTURA")
    
    for (let index = 0; index < gruposApertura.length; index++) {
      let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
      
      let data = await DataBase.ObtenerMatriculaGrupo(gruposApertura[index].id).then((responseGrupos) => {
        let find = JSON.parse(responseGrupos);
        
        find.forEach(item => {
          if(item.estado.id === 1) {
            numActivos += 1;
          } else if (item.estado.id === 2) {
            numIncorporados += 1;
          } else if (item.estado.id === 3) {
            numInscritos += 1;
          } else if (item.estado.id === 4) {
            numFusionados += 1;
          } else if (item.estado.id === 5) {
            numCongelados += 1;
          }
          numTotal += 1;
        });
  
        let newObj = {}
  
        matrActivos = {
          activos: numActivos
        }
        matrIncorporados = {
          incorporados: numIncorporados
        }
        matrInscritos = {
          inscritos: numInscritos
        }
        matrFusionados = {
          fusionados: numFusionados
        }
        matrCongelados = {
          congelados: numCongelados
        }
        matrTotal = {
          total: numTotal
        }
  
        Object.assign(newObj, matrActivos)
        Object.assign(newObj, matrIncorporados)
        Object.assign(newObj, matrInscritos)
        Object.assign(newObj, matrFusionados)
        Object.assign(newObj, matrCongelados)
        Object.assign(newObj, matrTotal)
  
        let result = Object.assign(gruposApertura[index], newObj);
        gruposArr.push(result)
  
        return JSON.stringify(gruposArr)
      })
      let count = gruposApertura.length - 1
      if(count === index) {
        gruposArr2.push(JSON.parse(data));
      }
    }

    console.log(gruposArr2)

    return res.send(gruposArr2);
    
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  
};

// * AJAX
exports.obtenergruposdesde0 = async (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let dataFinal;

  DataBase.ObtenerGruposDesdeCero().then(async (response) => {
    let gruposDesde0 = JSON.parse(response), gruposArr = [], gruposArr2 = [];
    //console.log(gruposDesde0)
    //console.log("DESDE CERO INICIADO")
    
    for (let index = 0; index < gruposDesde0.length; index++) {
      let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
      
      let data = await DataBase.ObtenerMatriculaGrupo(gruposDesde0[index].id).then((responseGrupos) => {
        let find = JSON.parse(responseGrupos);
        
        find.forEach(item => {
          if(item.estado.id === 1) {
            numActivos += 1;
          } else if (item.estado.id === 2) {
            numIncorporados += 1;
          } else if (item.estado.id === 3) {
            numInscritos += 1;
          } else if (item.estado.id === 4) {
            numFusionados += 1;
          } else if (item.estado.id === 5) {
            numCongelados += 1;
          }
          numTotal += 1;
        });
  
        let newObj = {}
  
        matrActivos = {
          activos: numActivos
        }
        matrIncorporados = {
          incorporados: numIncorporados
        }
        matrInscritos = {
          inscritos: numInscritos
        }
        matrFusionados = {
          fusionados: numFusionados
        }
        matrCongelados = {
          congelados: numCongelados
        }
        matrTotal = {
          total: numTotal
        }
  
        Object.assign(newObj, matrActivos)
        Object.assign(newObj, matrIncorporados)
        Object.assign(newObj, matrInscritos)
        Object.assign(newObj, matrFusionados)
        Object.assign(newObj, matrCongelados)
        Object.assign(newObj, matrTotal)
  
        let result = Object.assign(gruposDesde0[index], newObj);
        gruposArr.push(result)
  
        return JSON.stringify(gruposArr)
      })
      let count = gruposDesde0.length - 1
      if(count === index) {
        gruposArr2.push(JSON.parse(data));
      }
    }

    return res.send(gruposArr2);
    
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  
};

// * AJAX
exports.obtenergruposintensivos = async (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let dataFinal;

  DataBase.ObtenerGruposIntensivo().then(async (response) => {
    let gruposIntensivo = JSON.parse(response), gruposArr = [], gruposArr2 = [];
    console.log(gruposIntensivo)
    console.log("INTENSIVOS INICIADOS")
    
    for (let index = 0; index < gruposIntensivo.length; index++) {
      let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
      
      let data = await DataBase.ObtenerMatriculaGrupo(gruposIntensivo[index].id).then((responseGrupos) => {
        let find = JSON.parse(responseGrupos);
        
        find.forEach(item => {
          if(item.estado.id === 1) {
            numActivos += 1;
          } else if (item.estado.id === 2) {
            numIncorporados += 1;
          } else if (item.estado.id === 3) {
            numInscritos += 1;
          } else if (item.estado.id === 4) {
            numFusionados += 1;
          } else if (item.estado.id === 5) {
            numCongelados += 1;
          }
          numTotal += 1;
        });
  
        let newObj = {}
  
        matrActivos = {
          activos: numActivos
        }
        matrIncorporados = {
          incorporados: numIncorporados
        }
        matrInscritos = {
          inscritos: numInscritos
        }
        matrFusionados = {
          fusionados: numFusionados
        }
        matrCongelados = {
          congelados: numCongelados
        }
        matrTotal = {
          total: numTotal
        }
  
        Object.assign(newObj, matrActivos)
        Object.assign(newObj, matrIncorporados)
        Object.assign(newObj, matrInscritos)
        Object.assign(newObj, matrFusionados)
        Object.assign(newObj, matrCongelados)
        Object.assign(newObj, matrTotal)
  
        let result = Object.assign(gruposIntensivo[index], newObj);
        gruposArr.push(result)
  
        return JSON.stringify(gruposArr)
      })
      let count = gruposIntensivo.length - 1
      if(count === index) {
        gruposArr2.push(JSON.parse(data));
      }
    }

    return res.send(gruposArr2);
    
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  
};

// * AJAX
exports.obtenergruposkids = async (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let dataFinal;

  DataBase.ObtenerGruposKids().then(async (response) => {
    let gruposKids = JSON.parse(response), gruposArr = [], gruposArr2 = [];
    console.log(gruposKids)
    console.log("NIÑOS INICIADOS")
    
    for (let index = 0; index < gruposKids.length; index++) {
      let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
      
      let data = await DataBase.ObtenerMatriculaGrupo(gruposKids[index].id).then((responseGrupos) => {
        let find = JSON.parse(responseGrupos);
        
        find.forEach(item => {
          if(item.estado.id === 1) {
            numActivos += 1;
          } else if (item.estado.id === 2) {
            numIncorporados += 1;
          } else if (item.estado.id === 3) {
            numInscritos += 1;
          } else if (item.estado.id === 4) {
            numFusionados += 1;
          } else if (item.estado.id === 5) {
            numCongelados += 1;
          }
          numTotal += 1;
        });
  
        let newObj = {}
  
        matrActivos = {
          activos: numActivos
        }
        matrIncorporados = {
          incorporados: numIncorporados
        }
        matrInscritos = {
          inscritos: numInscritos
        }
        matrFusionados = {
          fusionados: numFusionados
        }
        matrCongelados = {
          congelados: numCongelados
        }
        matrTotal = {
          total: numTotal
        }
  
        Object.assign(newObj, matrActivos)
        Object.assign(newObj, matrIncorporados)
        Object.assign(newObj, matrInscritos)
        Object.assign(newObj, matrFusionados)
        Object.assign(newObj, matrCongelados)
        Object.assign(newObj, matrTotal)
  
        let result = Object.assign(gruposKids[index], newObj);
        gruposArr.push(result)
  
        return JSON.stringify(gruposArr)
      })
      let count = gruposKids.length - 1
      if(count === index) {
        gruposArr2.push(JSON.parse(data));
      }
    }

    return res.send(gruposArr2);
    
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  
};*/

// * VERIFICAR GRUPOS
exports.verificargrupos = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  DataBase.ObtenerTodosGrupos().then((response) => {
    let grupos = JSON.parse(response);
    console.log(grupos)
    
    // VERIFICAR GRUPOS EN APERTURA 
    grupos.forEach(row => {
      let inicioGrupo = row.fecha_inicio;
      let actual = moment();
      let iniciado = moment(inicioGrupo, "DD-MM-YYYY").format('YYYY-MM-DD');
      console.log('LINEA VERIFICA FECHA INICIADO')
      console.log(iniciado)
      let iniciar = moment(iniciado).diff(actual, 'days');

      let nivelCode, nivel;

      let fechaInicio = moment(row.fecha_inicio, "DD-MM-YYYY").format("DD-MM-YYYY");
      let diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days');
      let rest;
      
      function EstablecerNivel () {  
        let nivel2, nivel3, nivel4;
        switch (row.lecciones_semanales) {
          case '1':
            if (row.nombre === "Desde cero") {
              nivel2 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
              nivel3 = moment(iniciado).add(64, 'w').format('YYYY-MM-DD')
              nivel4 = moment(iniciado).add(96, 'w').format('YYYY-MM-DD')
              
            } else {

            }
            break;

          case '2':
            nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
            nivel4 = moment(iniciado).add(48, 'w').format('YYYY-MM-DD')
    
          break;
        }
               
        if (moment().isBefore(nivel2)) {
          console.log("Estas en nivel 1")
          nivelCode = '1';
          nivel = 'Principiante';
          
        } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
          console.log("Estas en nivel 2")
          nivelCode = '2';
          nivel = 'Básico';
          
        } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
          console.log("Estas en nivel 3")
          nivelCode = '3';
          nivel = 'Intermedio';
          
        } else {
          console.log("Estas en nivel 4")
          nivelCode = '4';
          nivel = 'Avanzado';
          
        }

      }
      //* --------

      if (iniciar >= 1) {
        EstablecerNivel();
        console.log("NIVELLLL")
      } else if (iniciar < 0) {
        EstablecerNivel();
        console.log("GRUPO INICIADO CON EXITO ACTUALIZANDO")

        if(row.estadosGrupoId === 1) {
          DataBase.IniciarGrupos(row.id).then((actualizado) => {
            console.log("GRUPO INICIADO")
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        } 

        DataBase.ActualizarNivelesGrupos(row.id, nivel, nivelCode).then((actualizado) => {
          console.log(actualizado)
          console.log("GRUPO ACTUALIZADO")
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }
    });
    return res.redirect("/grupos/PYT-672");
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * AJAX PRINCIPAL DE ESTUDIANTES
exports.obtenerMatriculasAll = async (req, res) => {
  DataBase.GruposYMatriculas().then(async(response) => {
    let matriculas = JSON.parse(response);
    console.log(matriculas)
    console.log("MATRICULAS ALL")

    return res.send(matriculas)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

exports.matriculas = async (req, res) => {
  let msg = false;
  if (req.params.item) {
    msg = req.params.item;
  }

  let idUser = ''
  if (req.params.item && parseInt(req.params.item)) {
    msg = false;
    idUser = req.params.item;
  }

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

  DataBase.ObtenerTodosGrupos().then(async(response) => {
    let gruposTodos = JSON.parse(response);
   // console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")

    DataBase.GruposYMatriculas().then(async(response2) => {
      let arr = JSON.parse(response2);
      console.log(arr)
      console.log(arr)

      let gruposTodosStr = JSON.stringify(gruposTodos)
      let proyecto = req.params.id  
      console.log(msg)
      // console.log(proyecto)

    function GetUsers () {
      return new Promise ((resolve, reject) => {
        DataBase.ObtenerTodosUsuarios().then((response3) => {
          let usuarios = JSON.parse(response3);
          usuarios = usuarios.filter(item => item.puesto === "Vendedor")
          resolve(usuarios)
  
        }).catch((err) => {
          console.log(err)
          reject(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      })
    }

    let vendedores = await GetUsers();

    let nombre = res.locals.user.nombre

    res.render("PYT-672/admin/matricula", {
      pageName: "Academia Americana - Matriculas",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      matric: true,
      idUser,
      roleAdmin, roleProf,
      gruposTodos,
      arr,
      response2,msg,gruposTodosStr,
      vendedores,
      nombre
    });

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * CONTROL
exports.control = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

    DataBase.ObtenerMatriculasDistinct().then((response2) => {
      let gruposDist = JSON.parse(response2);
      /*.log(gruposDist)
      console.log("GRUPOS DISTINCTS")*/
      
      let gruposDesde0 = [], gruposIntensivo = [], gruposKids = [];
      
      gruposDist.forEach(element => {
        DataBase.BuscarGrupos(element.grupoId).then((response3) => {
          let gruposFounds = JSON.parse(response3);
          /*console.log(gruposFounds)
          console.log("GRUPOS ENCONTRADOS")*/

          gruposFounds.forEach(found => {
            if(found.estadosGrupoId === 2) {
              switch (found.nombre) {
                case "Desde cero":
                  gruposDesde0.push(found);
                  break;
              case "Intensivo":
                  gruposIntensivo.push(found);
                  break;
                   case "Kids":
                    gruposKids.push(found);
                  break;
                default:
                  break;
              }
            }
          });

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      });
    
    let nombre = res.locals.user.nombre

    res.render(proyecto+"/admin/control", {
      pageName: "Academia Americana - Control",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      asistencias: true,
      roleAdmin, roleProf,
      nombre
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * DISTINC GRUPOS CONTROL
exports.gruposControl = async (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }

    DataBase.ObtenerMatriculasDistinct().then((response2) => {
      let gruposDist = JSON.parse(response2);
      /*.log(gruposDist)
      console.log("GRUPOS DISTINCTS")*/
      
      return res.send(gruposDist)
    
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * CONTROL DE GRUPO
exports.controlgrupo = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  let idGrupo = req.params.grupoid

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

    let matri, grupoIdentificador;

    DataBase.ObtenerMatriculaGrupo(idGrupo).then((response2) => {
      matri = response2;
      let grupoId = idGrupo;
      /*if (matri.length) {
        grupoIdentificador = matri[0].grupo.identificador
      } else {
        grupoIdentificador = "El grupo selecionado no poseé una matrícula";
      }
      console.log(grupoIdentificador)*/
      
      DataBase.BuscarGrupos(idGrupo).then((respuesta) => {
        let grupo = JSON.parse(respuesta)[0]
        let numLeccion, nivelActual, 
        fechaNiveles = {
          nivel1: '',
          nivel2: '',
          nivel3: '',
          nivel4: '',
        };
        /*console.log(grupo)
        console.log("GRUPO ENCONTRADO")*/
        
        let fechaActual = moment().format("DD-MM-YYYY");

        let fechaInicio = moment(grupo.fecha_inicio, "DD-MM-YYYY").format("DD-MM-YYYY");

        let diff = "";

        let rest; 

        let inicioGrupo = grupo.fecha_inicio;
        let iniciado = moment(inicioGrupo, "DD-MM-YYYY").format('YYYY-MM-DD');

        function EstablecerNivel () {  
          let nivel2, nivel3, nivel4;
          switch (grupo.lecciones_semanales) {
            case '1':
              if (grupo.nombre === "Desde cero") {
                nivel2 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
                nivel3 = moment(iniciado).add(64, 'w').format('YYYY-MM-DD')
                nivel4 = moment(iniciado).add(96, 'w').format('YYYY-MM-DD')
                
              } else {
                nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
                nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
                nivel4 = ""
              }
      
              /*console.log("NIVELES")
              console.log(nivel2)
              console.log(nivel3)
              console.log(nivel4)
              console.log("DESDE CERO")*/
              break;
  
            case '2':
              nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
              nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
              nivel4 = moment(iniciado).add(48, 'w').format('YYYY-MM-DD')
      
              /*console.log("NIVELES")
              console.log(nivel2)
              console.log(nivel3)
              console.log(nivel4)
              console.log("INTENSIVO")*/
            break;
          }

          fechaNiveles = {
            nivel1: fechaInicio,
            nivel2: nivel2,
            nivel3: nivel3,
            nivel4: nivel4,
          };
          fechaNiveles = JSON.stringify(fechaNiveles)
                  
          if (grupo.nombre != "Kids") {
            if (moment().isBefore(nivel2)) {
              console.log("Estas en nivel 1")
              nivelActual = 1
              diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days')
              
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
              console.log("Estas en nivel 2")
              nivelActual = 2
              diff = moment().diff(moment(nivel2, "DD-MM-YYYY"), 'days')
              
            } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
              console.log("Estas en nivel 3")
              nivelActual = 3
              diff = moment().diff(moment(nivel3, "DD-MM-YYYY"), 'days')
              
            } else {
              console.log("Estas en nivel 4")
              nivelActual = 4
              diff = moment().diff(moment(nivel4, "DD-MM-YYYY"), 'days')
              
            }
            
          } else {
            if (moment().isBefore(nivel2)) {
              console.log("Estas en nivel 1")
              nivelActual = 1
              diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days')
              
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
              console.log("Estas en nivel 2")
              nivelActual = 2
              diff = moment().diff(moment(nivel2, "DD-MM-YYYY"), 'days')
              
            } else if(moment().isSameOrAfter(nivel3)) {
              console.log("Estas en nivel 3")
              nivelActual = 3
              diff = moment().diff(moment(nivel3, "DD-MM-YYYY"), 'days')
              
            } 

          }

          let numPositivo;
          if(grupo.lecciones_semanales === '1') {
            if (grupo.nombre === "Desde cero") {
              if (diff > 224) {
                //console.log("positivo")
                rest = (diff - 224) / 7; 
                numPositivo = Math.floor(rest)
                numLeccion = 1 + numPositivo
              } 
              else {
                if (diff < 0) {
                  console.log("negativo") 
                  diff = diff * (-1)
                  rest = (224 - diff) / 7; 
                  if (rest < 0) {
                    rest = rest * (-1) 
                  }
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo
                  
                } else {
                  //console.log("else")
                  rest = (224 - diff) / 7; 
                  if (rest < 0) {
                    rest = rest * (-1) 
                  }
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo
    
                }
              }
              if (numLeccion > 32) {
                numLeccion = 32
              }
              
            } else {
              if (diff > 112) {
                rest = (diff - 112) / 7; 
                numPositivo = Math.floor(rest)
                numLeccion = 1 + numPositivo
                
              } else {
                if (diff < 0) {
                  diff = diff * (-1)
                  rest = (112 - diff) / 7; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 16 - numPositivo
                  
                } else {
                  rest = (112 - diff) / 7; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 16 - numPositivo
    
                }
                
              }
              if (numLeccion > 16) {
                numLeccion = 16
              }
  
            }

          } else {
              if (diff > 112) {
                rest = (diff - 112) / 3.5; 
                numPositivo = Math.floor(rest)
                numLeccion = 1 + numPositivo
                
              } else {
                if (diff < 0) {
                  diff = diff * (-1)
                  rest = (112 - diff) / 7; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo
                  
                } else {
                  rest = (112 - diff) / 3.5; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo

                }
  
              }
              if (numLeccion > 32) {
                numLeccion = 32
              }
          }

          /*console.log(numLeccion)
          console.log("LECCION")
          console.log(numPositivo)
          console.log("POSITIVO")
          console.log("REST",rest)
          console.log("DIFF",diff)*/
          
        }
        
        EstablecerNivel();  
        
        

    let nombre = res.locals.user.nombre

    res.render(proyecto+"/admin/control", {
      pageName: "Academia Americana - Control",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      asistencias: true,
      nombre,
      roleAdmin, roleProf,
      matri,
      grupoId,
      numLeccion,
      fechaActual,
      fechaInicio,
      diff,
      rest,
      nivelActual,
      fechaNiveles
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * HISTORIAL
exports.historial = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

  DataBase.GruposYMatriculas().then((response2) => {
    let matriculas = JSON.parse(response2);
    //console.log(matriculas)
    /*console.log("TODA LA MATRICULA")*/
    let arrString;

    matriculas.forEach(element => {
      let userInfo = {
        leccActual: 0,
        nivelActualGrupo: 0,
        leccion9: 0,
        leccion17: 0,
        leccion18: 0,
        leccion25: 0,
        leccion31: 0,
        leccion32: 0,
        participacion: 0,
        asistencias: 0,
        ausentes: 0,
        fechaLeccionesAusentes: '',
        notas: [],
      };

      let grupoAct = ''

      DataBase.BuscarGrupos(element.grupoId).then((respuesta) => {
        let grupo = JSON.parse(respuesta)[0]
        grupoAct = grupo
        /*console.log(grupo)
        console.log("** GRUPO //")*/
        let inicioGrupo = grupo.fecha_inicio;
        let iniciado = moment(inicioGrupo, "DD-MM-YYYY").format('YYYY-MM-DD');
        let iniciar = moment(iniciado).diff(moment(), 'days');

        let numLeccion, nivelActual, 
        fechaNiveles = {
          nivel1: '',
          nivel2: '',
          nivel3: '',
          nivel4: '',
        };

        let fechaLecciones = []
        
        let fechaActual = moment().format("DD-MM-YYYY");

        let fechaInicio = moment(grupo.fecha_inicio, "DD-MM-YYYY").format("DD-MM-YYYY");

        let diff = "";

        let rest; 

        function EstablecerNivel () {  
          let nivel2, nivel3, nivel4;
          switch (grupo.lecciones_semanales) {
            case '1':
              if (grupo.nombre === "Desde cero") {
                nivel2 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
                nivel3 = moment(iniciado).add(64, 'w').format('YYYY-MM-DD')
                nivel4 = moment(iniciado).add(96, 'w').format('YYYY-MM-DD')

              } else {
                nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
                nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
                nivel4 = ""
              }
      
              console.log("NIVELES")
              console.log(nivel2)
              console.log(nivel3)
              console.log(nivel4)
              console.log("DESDE CERO")
              break;
  
            case '2':
              nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
              nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
              nivel4 = moment(iniciado).add(48, 'w').format('YYYY-MM-DD')
      
              console.log("NIVELES")
              console.log(nivel2)
              console.log(nivel3)
              console.log(nivel4)
              console.log("INTENSIVO")
            break;
          }

          fechaNiveles = {
            nivel1: fechaInicio,
            nivel2: nivel2,
            nivel3: nivel3,
            nivel4: nivel4,
          };
          fechaNiveles = JSON.stringify(fechaNiveles)
                  
          if (grupo.nombre != "Kids") {
            if (moment().isBefore(nivel2)) {
              console.log("Estas en nivel 1")
              nivelActual = 1
              diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days')
              
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
              console.log("Estas en nivel 2")
              nivelActual = 2
              diff = moment().diff(moment(nivel2, "DD-MM-YYYY"), 'days')
              
            } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
              console.log("Estas en nivel 3")
              nivelActual = 3
              diff = moment().diff(moment(nivel3, "DD-MM-YYYY"), 'days')
              
            } else {
              console.log("Estas en nivel 4")
              nivelActual = 4
              diff = moment().diff(moment(nivel4, "DD-MM-YYYY"), 'days')
              
            }
            
          } else {
            if (moment().isBefore(nivel2)) {
              console.log("Estas en nivel 1")
              nivelActual = 1
              diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days')
              
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
              console.log("Estas en nivel 2")
              nivelActual = 2
              diff = moment().diff(moment(nivel2, "DD-MM-YYYY"), 'days')
              
            } else if(moment().isSameOrAfter(nivel3)) {
              console.log("Estas en nivel 3")
              nivelActual = 3
              diff = moment().diff(moment(nivel3, "DD-MM-YYYY"), 'days')
              
            } 

          }
          
          userInfo.nivelActualGrupo = nivelActual

          let numPositivo;

          if(grupo.lecciones_semanales === '1') {

            if (grupo.nombre === "Desde cero") {
              if (diff > 224) {
                console.log("positivo")
                rest = (diff - 224) / 7; 
                numPositivo = Math.floor(rest)
                numLeccion = 1 + numPositivo
              } 
              else {
                if (diff < 0) {
                  console.log("negativo") 
                  diff = diff * (-1)
                  rest = (224 - diff) / 7; 
                  if (rest < 0) {
                    rest = rest * (-1) 
                  }
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo
                  
                } else {
                  console.log("else")
                  rest = (224 - diff) / 7; 
                  if (rest < 0) {
                    rest = rest * (-1) 
                  }
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo
    
                }
              }
              if (numLeccion > 32) {
                numLeccion = 32
              }
              
            } else {
              if (diff > 112) {
                rest = (diff - 112) / 7; 
                numPositivo = Math.floor(rest)
                numLeccion = 1 + numPositivo
                
              } else {
                if (diff < 0) {
                  diff = diff * (-1)
                  rest = (112 - diff) / 7; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 16 - numPositivo
                  
                } else {
                  rest = (112 - diff) / 7; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 16 - numPositivo
    
                }
                
              }
              if (numLeccion > 16) {
                numLeccion = 16
              }
  
            }

          } else {
              if (diff > 112) {
                rest = (diff - 112) / 3.5; 
                numPositivo = Math.floor(rest)
                numLeccion = 1 + numPositivo
                
              } else {
                if (diff < 0) {
                  diff = diff * (-1)
                  rest = (112 - diff) / 7; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo
                  
                } else {
                  rest = (112 - diff) / 3.5; 
                  numPositivo = Math.floor(rest)
                  numLeccion = 32 - numPositivo

                }
  
              }
              if (numLeccion > 32) {
                numLeccion = 32
              }
          }
          userInfo.leccActual = numLeccion

          /*console.log(numLeccion)
          console.log("LECCION")
          console.log(numPositivo)
          console.log("POSITIVO")
          
          console.log("REST",rest)
          console.log("DIFF",diff)*/
          
        }
        
        if (grupo.estadosGrupoId === 1) {
          userInfo = {
            leccActual: 0,
            nivelActualGrupo: 0,
            leccion9: 0,
            leccion17: 0,
            leccion18: 0,
            leccion25: 0,
            leccion31: 0,
            leccion32: 0,
            participacion: 0,
            asistencias: 0,
            ausentes: 0,
            fechaLeccionesAusentes: '',
            notas: [],
          };
          let final = Object.assign(element, userInfo);
          return

        } else {
          EstablecerNivel(); 
          
          let final = Object.assign(element, userInfo);
        }
        /*console.log(fechaActual)
        console.log(fechaInicio)
        console.log(diff)
        console.log(rest)
        console.log(userInfo.leccActual)
        console.log(final)
        console.log("OBJETO FINAL")*/

      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });

      let lecciones = [9, 17, 18, 25, 31, 32];
      lecciones.forEach((item, idx) => {
        // CREAR CONSULTA QUE MUESTRA QUE ME TRAIGA TODAS LAS NOTAS 
        DataBase.BuscarNotasLeccion(item, element.grupoId, element.id).then((leccion) => {
          let lecc = JSON.parse(leccion)[0];
          // console.log(lecc)
          // console.log("LECCION")
          // console.log(item)
          // console.log(idx)

          if(lecc !== undefined) {
            if(idx === 0) {
              userInfo.leccion9 = parseInt(lecc.nota);
            } else if (idx === 1) {
              userInfo.leccion17 = parseInt(lecc.nota);
            } else if (idx === 2) {
              userInfo.leccion18 = parseInt(lecc.nota);
            } else if (idx === 3) {
              userInfo.leccion25 = parseInt(lecc.nota);
            } else if (idx === 4) {
              userInfo.leccion31 = parseInt(lecc.nota);
            } else if (idx === 5) {
              userInfo.leccion32 = parseInt(lecc.nota);
            }
          } else {
            if(idx === 0) {
              userInfo.leccion9 = 0;
            } else if (idx === 1) {
              userInfo.leccion17 = 0;
            } else if (idx === 2) {
              userInfo.leccion18 = 0;
            } else if (idx === 3) {
              userInfo.leccion25 = 0;
            } else if (idx === 4) {
              userInfo.leccion31 = 0;
            } else if (idx === 5) {
              userInfo.leccion32 = 0;
            }
          }

          userInfo.notas.push(lecc)
          
          let final = Object.assign(element, userInfo);
          /*console.log(userInfo)
          console.log("FINAL ----- FINAL ---- !!!!!!")*/
  
          arrString = JSON.stringify(matriculas);
          /*console.log(arrString)*/ 

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      });

      DataBase.BuscarParticipacionMatricula(32, element.grupoId, element.id).then((part) => {
        let participacion = JSON.parse(part)[0];
        /*console.log(participacion)*/

        if(participacion !== undefined) {
          userInfo.participacion = parseInt(participacion.porcentaje);
        } else {
          userInfo.participacion = 0;
        }

        let final = Object.assign(element, userInfo);
        /*console.log(final)*/

        arrString = JSON.stringify(matriculas);
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });

      DataBase.ObtenerTodasAsistenciaMatricula(element.grupoId, element.id).then((asist) => {
        let asistencias = JSON.parse(asist);
        /*console.log(asistencias)*/

        if(asistencias !== undefined) {
          // FILTRAR AUSENCIAS CON LA LECCION ACTUAL
          let result = asistencias.filter((item) => parseInt(item.n_leccion) <= userInfo.leccActual);
          if(result.length) {
            userInfo.ausentes = parseInt(result.length);
            userInfo.fechaLeccionesAusentes = asist;
          } else {
            userInfo.ausentes = 0;
            userInfo.fechaLeccionesAusentes = "";
          }
        } else {
          userInfo.ausentes = 0;
        }

        userInfo.asistencias += userInfo.leccActual - userInfo.ausentes;

        let final = Object.assign(element, userInfo);
        /*console.log(final)*/

        arrString = JSON.stringify(matriculas);
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
            
    });

    DataBase.ObtenerMatriculasDistinct().then((response3) => {
      let gruposDist = JSON.parse(response3);
      let stringGrupos = JSON.stringify(gruposDist)
      //console.log(gruposDist)
      //console.log("GRUPOS DISTINCTS")
      
      let nombre = res.locals.user.nombre

    res.render(proyecto+"/admin/historial", {
      pageName: "Academia Americana - Historial",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      historial: true,
      nombre,
      roleAdmin, roleProf,
      arrString,
      stringGrupos,
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * DETALLES CONTROL CAJA 
exports.detallesControl = (req, res) => {
  let idAlumno = req.params.id, idGrupo = req.params.grupo
  console.log(req.params)

  let userInfo = {
    leccActual: 0,
    nivelActualGrupo: 0,
    leccion9: 0,
    leccion17: 0,
    leccion18: 0,
    leccion25: 0,
    leccion31: 0,
    leccion32: 0,
    participacion: 0,
    asistencias: 0,
    ausentes: 0,
    fechaLeccionesAusentes: [],
    notas: []
  };

  DataBase.BuscarGrupos(idGrupo).then((respuesta) => {
    let grupo = JSON.parse(respuesta)[0]
    /*console.log(grupo)
    console.log("** GRUPO //")*/
    fechaNiveles = {
      nivel1: '',
      nivel2: '',
      nivel3: '',
      nivel4: '',
    };
    /*console.log(grupo)
    console.log("GRUPO ENCONTRADO")*/
    let fechaActual = moment().format("DD-MM-YYYY");
    
    let fechaInicio = moment(grupo.fecha_inicio, "DD-MM-YYYY").format("DD-MM-YYYY");
    
    let rest; 
    
    let inicioGrupo = grupo.fecha_inicio;
    let iniciado = moment(inicioGrupo, "DD-MM-YYYY").format('YYYY-MM-DD');
    let iniciar = moment(iniciado).diff(moment(), 'days');

    function EstablecerNivel () {  
      let nivel2, nivel3, nivel4;
      switch (grupo.lecciones_semanales) {
        case '1':
          if (grupo.nombre === "Desde cero") {
            nivel2 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(64, 'w').format('YYYY-MM-DD')
            nivel4 = moment(iniciado).add(96, 'w').format('YYYY-MM-DD')
            
          } else {
            nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
            nivel4 = ""
          }
  
          console.log("NIVELES")
          console.log(nivel2)
          console.log(nivel3)
          console.log(nivel4)
          console.log("DESDE CERO")
          break;

        case '2':
          nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
          nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
          nivel4 = moment(iniciado).add(48, 'w').format('YYYY-MM-DD')
  
          console.log("NIVELES")
          console.log(nivel2)
          console.log(nivel3)
          console.log(nivel4)
          console.log("INTENSIVO")
        break;
      }

      fechaNiveles = {
        nivel1: fechaInicio,
        nivel2: nivel2,
        nivel3: nivel3,
        nivel4: nivel4,
      };
      fechaNiveles = JSON.stringify(fechaNiveles)
              
      let diff = "";

      if (grupo.nombre != "Kids") {
        if (moment().isBefore(nivel2)) {
          console.log("Estas en nivel 1")
          nivelActual = 1
          diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days')
          
        } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
          console.log("Estas en nivel 2")
          nivelActual = 2
          diff = moment().diff(moment(nivel2, "DD-MM-YYYY"), 'days')
          
        } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
          console.log("Estas en nivel 3")
          nivelActual = 3
          diff = moment().diff(moment(nivel3, "DD-MM-YYYY"), 'days')
          
        } else {
          console.log("Estas en nivel 4")
          nivelActual = 4
          diff = moment().diff(moment(nivel4, "DD-MM-YYYY"), 'days')
          
        }
        
      } else {
        if (moment().isBefore(nivel2)) {
          console.log("Estas en nivel 1")
          nivelActual = 1
          diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days')
          
        } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
          console.log("Estas en nivel 2")
          nivelActual = 2
          diff = moment().diff(moment(nivel2, "DD-MM-YYYY"), 'days')
          
        } else if(moment().isSameOrAfter(nivel3)) {
          console.log("Estas en nivel 3")
          nivelActual = 3
          diff = moment().diff(moment(nivel3, "DD-MM-YYYY"), 'days')
          
        } 
        
      }

      userInfo.nivelActualGrupo = nivelActual

      let numPositivo;
      if(grupo.lecciones_semanales === '1') {
          if (grupo.nombre === "Desde cero") {
            if (diff > 224) {
              console.log("positivo")
              rest = (diff - 224) / 7; 
              numPositivo = Math.floor(rest)
              numLeccion = 1 + numPositivo
            } 
            else {
              if (diff < 0) {
                console.log("negativo") 
                diff = diff * (-1)
                rest = (224 - diff) / 7; 
                if (rest < 0) {
                  rest = rest * (-1) 
                }
                numPositivo = Math.floor(rest)
                numLeccion = 32 - numPositivo
                
              } else {
                console.log("else")
                rest = (224 - diff) / 7; 
                if (rest < 0) {
                  rest = rest * (-1) 
                }
                numPositivo = Math.floor(rest)
                numLeccion = 32 - numPositivo
  
              }
            }
            if (numLeccion > 32) {
              numLeccion = 32
            }
            
          } else {
            if (diff > 112) {
              rest = (diff - 112) / 7; 
              numPositivo = Math.floor(rest)
              numLeccion = 1 + numPositivo
              
            } else {
              if (diff < 0) {
                diff = diff * (-1)
                rest = (112 - diff) / 7; 
                numPositivo = Math.floor(rest)
                numLeccion = 16 - numPositivo
                
              } else {
                rest = (112 - diff) / 7; 
                numPositivo = Math.floor(rest)
                numLeccion = 16 - numPositivo
  
              }
              
            }
            if (numLeccion > 16) {
              numLeccion = 16
            }

          }
        
      } else {
          if (diff > 112) {
            rest = (diff - 112) / 3.5; 
            numPositivo = Math.floor(rest)
            numLeccion = 1 + numPositivo
            
          } else {
            if (diff < 0) {
              diff = diff * (-1)
              rest = (112 - diff) / 7; 
              numPositivo = Math.floor(rest)
              numLeccion = 32 - numPositivo
              
            } else {
              rest = (112 - diff) / 3.5; 
              numPositivo = Math.floor(rest)
              numLeccion = 32 - numPositivo

            }

          }
          if (numLeccion > 32) {
            numLeccion = 32
          }
      }

      userInfo.leccActual = numLeccion
      
    }

    EstablecerNivel();
    
    // final = Object.assign(element, userInfo);

    /*console.log(fechaActual)
    console.log(fechaInicio)
    console.log(diff)
    console.log(rest)

    console.log(userInfo.leccActual)
    console.log(final)
    console.log("OBJETO FINAL")*/

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });

  DataBase.BuscarNotasAlumno(idGrupo, idAlumno).then((leccion) => {
      let lecc = JSON.parse(leccion);
      //console.log(lecc)
      //console.log("LECCION")
    
      userInfo.notas = lecc
      
      //let final = Object.assign(element, userInfo);
      /*console.log(userInfo)
      console.log("FINAL ----- FINAL ---- !!!!!!")*/

      /*console.log(arrString)*/ 

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
  
  DataBase.BuscarParticipacionMatricula(32, idGrupo, idAlumno).then((part) => {
    let participacion = JSON.parse(part)[0];
    /*console.log(participacion)*/

    if(participacion !== undefined) {
      userInfo.participacion = parseInt(participacion.porcentaje);
    } else {
      userInfo.participacion = 0;
    }

    // final = Object.assign(element, userInfo);
    /*console.log(final)*/

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });

  DataBase.ObtenerTodasAsistenciaMatricula(idGrupo, idAlumno).then((asist) => {
    let asistencias = JSON.parse(asist);
    /*console.log(asistencias)*/

    if(asistencias !== undefined) {
      // FILTRAR AUSENCIAS CON LA LECCION ACTUAL
      let result = asistencias.filter((item) => parseInt(item.n_leccion) <= userInfo.leccActual);
      if(result.length) {
        userInfo.ausentes = parseInt(result.length);
        userInfo.fechaLeccionesAusentes = asistencias;
      } 
    } else {
      userInfo.ausentes = 0;
    }

    userInfo.asistencias += userInfo.leccActual - userInfo.ausentes;

    //let final = Object.assign(element, userInfo);
    /*console.log(final)*/
    console.log(userInfo)
    return res.send(userInfo)
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
          
}

// * MODULO CAJA
exports.caja = async(req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }

  let proyecto = req.params.id
  let alert = req.params.text

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }
  //console.log(proyecto)
var matricula = JSON.parse(await DataBase.GruposYMatriculas())
console.log(matricula)
  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    //console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")
    let matricula_st = JSON.stringify(matricula)
    let gruposTodosStr = JSON.stringify(gruposTodos)

    let nombre = res.locals.user.nombre

    res.render(proyecto+"/admin/caja", {
      pageName: "Academia Americana - Caja",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      caja: true,
      nombre,
      alert,
      roleAdmin, roleProf,
      gruposTodos,matricula,matricula_st,gruposTodosStr
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

exports.guarda_pago = async(req, res) => {
  console.log(req.body)
  console.log("DATA")
  var { idCaja, id_alumno, concepto,fecha_pago, monto, mora, observacion,banco, transaccion} = req.body
  
  for (let i = 0; i < concepto.length; i++) {
    if (concepto[i] === "Reactivacion") {
      const save_pago = await DataBase.actualizarPagoPendiente(idCaja, fecha_pago, banco,
        transaccion)
      
        console.log(save_pago)
    } else {
      const save_pago = await DataBase.guardar_caja(concepto[i],fecha_pago, monto[i], mora[i], observacion[i],banco,
        transaccion,id_alumno)

        console.log(save_pago)
    }
    
  }

  return res.send({response:'Se guardo bien'})
};

exports.guardarPagoReactivar = async(req, res) => {
  console.log(req.body)
  let {id_alumno, concepto, monto, mora, observacion} = req.body
  
  const save_pago = await DataBase.guardarCajaPendiente(concepto, monto, mora, observacion,id_alumno)
    console.log(save_pago)
  return res.redirect('/caja/PYT-672')
};

// * OBTENER TODO HISTORIAL 
exports.historialCompleto = async(req, res) => {
  
  const historial = JSON.parse(await DataBase.historialCompleto())
  console.log(historial)
  return res.send({historial})
};

exports.historial_caja = async(req, res) => {
  let id_alumno = req.params.id_alumno
  
  const obtener_historia = JSON.parse(await DataBase.historial_caja(id_alumno))
  console.log(obtener_historia)
  return res.send({obtener_historia})
};

//OBTENER COMENTARIOS POR ALUMNO
exports.get_comments_alumno = async(req, res) => {
  let id_alumno = req.params.id_alumno
  
  const obtener_comentarios = JSON.parse(await DataBase.comentariosByAlumno(id_alumno))
  console.log(obtener_comentarios)
  return res.send({obtener_comentarios})
};

exports.validacionPassw = async (req, res) => {
  let { passw } = req.params
  const userId = res.locals.user.id
  console.log(passw)
  
  const usuario = JSON.parse(await DataBase.ObtenerUsuario(userId));
  console.log(usuario)
  
  let passHash = await bcrypt.hashSync(passw, bcrypt.genSaltSync(10));
  console.log(passw)
  console.log(passHash)

  let validation = await bcrypt.compareSync(passw, usuario[0].password)
  console.log(validation)
  return res.send({validation})
};

exports.guardar_comentario = async(req, res) => {
  let { id_alumno, comentario } = req.body
  const userId = res.locals.user.id
  const comentario_save = await DataBase.Guarda_comentarios(comentario, id_alumno, userId)
  console.log(comentario_save)

  const obtener_comentarios = JSON.parse(await DataBase.comentariosByAlumnoAdmin(id_alumno))
  console.log(obtener_comentarios) 

  return res.send({obtener_comentarios})
};

exports.guardar_comentarioCaja = async(req, res) => {
  let { id_alumno, comentario } = req.params
  const userId = res.locals.user.id
  const comentario_save = await DataBase.Guarda_comentarios(comentario, id_alumno, userId)
  console.log(comentario_save)

  const obtener_comentarios = JSON.parse(await DataBase.comentariosByAlumnoAdmin(id_alumno))
  console.log(obtener_comentarios) 

  return res.send({obtener_comentarios})
};

exports.comentarios_admin_get = async(req, res) => {
  let id_alumno = req.params.id_alumno
  
  const obtener_comentarios = JSON.parse(await DataBase.comentariosByAlumnoAdmin(id_alumno))
  console.log(obtener_comentarios)
  return res.send({obtener_comentarios})
};

/**GENERAL PDF CONSTANCIA */
exports.genera_pdf_constancia = async (req, res) => {
  console.log(req.params.id_estudiante)
  var fech = moment().format('DD/MM/YYYY')
  var estudiante =  JSON.parse(await DataBase.BuscarEstudianteConstancia(req.params.id_estudiante))
  console.log('CONSTANCIA')
  
  let fecha_nacimiento = moment(estudiante.fecha_nacimiento, 'DD-MM-YYYY')
  let hoy = moment()
  console.log(fecha_nacimiento)
  console.log(hoy)
  let edad = hoy.diff(fecha_nacimiento, 'years')
  console.log('edad:' + edad)
  var contenido = `<html class="loading dark-layout" lang="en" data-layout="dark-layout" data-textdirection="ltr">
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
      <title>PDF Constancia</title>
      <link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png">
      <link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/bordered-layout.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/horizontal-menu.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/app-invoice-print.css">
      <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">  
  </head>
  <body class="horizontal-layout horizontal-menu blank-page navbar-floating footer-static  " data-open="hover" data-menu="horizontal-menu" data-col="blank-page">
      <div class="app-content content ">
          <div class="content-overlay"></div>
          <div class="header-navbar-shadow"></div>
          <div class="content-wrapper">
              <div class="content-header row">
              </div>
              <div class="content-body">
                  <div class="invoice-print p-3">
                      <div class="invoice-header d-flex justify-content-between flex-md-row flex-column pb-2">
                              <div class="d-flex mb-1">
                                  <img src="../../../app-assets/images/logo/logoAA.png" alt="" style="width: 100px; height: auto;">
                                  <div class="d-flex align-items-center ms-2">
                                      <h1 class="text-primary fw-bold">Academia Americana</h1>
                                  </div>
                              </div>                           
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <h1>CONSTANCIA DE ESTUDIOS</h1>
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <p>El director del Centro de Educacion "Academia Americana" de Costa Rica </p>
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <h4><u>HACE CONSTAR:</u></h4>
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <p class="text-center">
                              Que el alumno: 
                              ${estudiante.nombre}, 
                              identificado con documento de identidad:
                              ${estudiante.nro_identificacion},
                              de 
                              ${edad} años de edad,
                              viene cursando el
                              ${estudiante.grupo.nivel} 
                              en la forma 
                              ${estudiante.grupo.identificador}
                              de
                              ${estudiante.grupo.dia_horario},
                              asistiendo en forma regular a clases
                              en esta institución.
                              <br>
                              <br>
                              Se expide la presente a solicitud de la parte interesada para los fines convenientes.
                          </p>
                      </div>
                      <div class="d-flex justify-content-end my-5 p-4">
                          <p>
                              Costa Rica, ${fech}
                          </p>
                      </div>                     
                      <div class="d-flex justify-content-around p-4">
                          <div class="text-center border-top border-2 pt-2" style="width: 150px;">
                              <p>
                                  Coordinador
                                  Administrativo
                              </p>
                          </div>
                          <div class="text-center border-top border-2 pt-2" style="width: 150px;">
                              <p>
                                  Director
                              </p>
                          </div>
                      </div>
                      <hr class="my-2"/>
                  </div>
              </div>
          </div>
      </div>
      <script src="../../../app-assets/vendors/js/vendors.min.js"></script>
      <script src="../../../app-assets/vendors/js/ui/jquery.sticky.js"></script>
      <script src="../../../app-assets/js/core/app-menu.js"></script>
      <script src="../../../app-assets/js/core/app.js"></script>
      <script src="../../../app-assets/js/scripts/pages/app-invoice-print.js"></script>
  </body></html>`;
let fechaaa=Number(moment())
var envio
var check_constancia = JSON.parse(await DataBase.historial_caja(req.params.id_estudiante))
console.log(check_constancia)
for (let i = 0; i < check_constancia.length; i++) {
 if (check_constancia[i]['concepto']== "Constancia" && check_constancia[i]['observacion']== "-") {
    let update_contancia = await DataBase.update_constancia(check_constancia[i]['id'],moment().format('YYYY-MM-DD'))
 }
  
}
pdf.create(contenido).toStream(function (err, stream) {
    if (err) {
        console.log(err);
    }
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-disposition': 'attachment; filename=constancia.pdf'
    });
    stream.pipe(res);
  });

// pdf.create(contenido).toFile(`./public/sa${fechaaa}.pdf`, function(err, rest) {
//     if (err){
//         console.log(err);
//     } else {
//         console.log(rest);
//         res.send(`./sa${fechaaa}.pdf`)
//       return  envio = rest
//     }
// });


};

// * MODULO USUARIOS
exports.usuarios = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

  let nombre = res.locals.user.nombre

  res.render(proyecto+"/admin/usuarios", {
    pageName: "Academia Americana - Usuarios",
    dashboardPage: true,
    dashboard: true,
    py672:true,
    usuarios: true,
    nombre,
    roleAdmin, roleProf,
  });
};

// * GESTIONAR CONTRASEÑAS DE USUARIOS
exports.managUsuarios = async (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleProf = false
  } else {
    roleAdmin = false
    roleProf = true
  }

  let usuario = res.locals.user, nombre = res.locals.user.nombre;
    
  res.render(proyecto+"/admin/changeuser-password", {
    pageName: "Academia Americana - Perfil de Usuario",
    dashboardPage: true,
    dashboard: true,
    py672:true,
    managUsuarios: true,
    roleAdmin, roleProf,
    usuario,
    nombre
  });
};

// * OBTENER CONTRASEÑA DE USUARIOS
exports.getPasswordUser = (req, res) => {
  let idUser = req.params.id

  DataBase.ObtenerUsuario(idUser).then((response) => {
    let usuario = JSON.parse(response);
    console.log(usuario)
    return res.send({usuario})

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.send({error: 'Error al realizar la tarea'});
  });
};

// * CAMBIAR CONTRASEÑA DE USUARIO
exports.changePasswordUser = (req, res) => {
  let { password } = req.body
  let idUser = res.locals.user.id
  console.log(res.locals)
  console.log(req.body)

  DataBase.ChangePasswordUser(idUser, password).then((response) => {
    console.log(response)

    return res.redirect('/manag-user/PYT-672')

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.send({error: 'Error al realizar la tarea'});
  });
};

// * CAMBIAR INFORMACIÓN DE USUARIO
exports.changeInfoUser = (req, res) => {
  let { nombre, dni, email, pais, fechaN, fechaI, telefono } = req.body;

  let idUser = res.locals.user.id
  console.log(res.locals)
  console.log(req.body)

  DataBase.EditInfoUserProfile(nombre, dni, email, pais, fechaN, fechaI, telefono, idUser).then((response) => {
    console.log(response)

    return res.redirect('/manag-user/PYT-672');

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect('error672/PYT-672');
  });
};

// * AJAX
exports.obtenerusuarios = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

    DataBase.ObtenerTodosUsuarios().then((response) => {
      let usuarios = JSON.parse(response);
      return res.send({usuarios});

    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.send({error: 'Error al realizar la tarea'});
    });
};

// * OBTENER LECCION ACTUAL DE GRUPO
exports.obtenerGrupoLeccionActual = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  const { idGrupo } = req.body
  let proyecto = req.params.id  
  console.log(proyecto)
  console.log(idGrupo)

  DataBase.BuscarGrupos(idGrupo).then((respuesta) => {
    let grupo = JSON.parse(respuesta)[0]
    let numLeccion;
    console.log(grupo)
    console.log("GRUPO ENCONTRADO")
    
    let fechaActual = moment().format("DD-MM-YYYY");

    let fechaInicio = moment(grupo.fecha_inicio, "DD-MM-YYYY").format("DD-MM-YYYY");

    let diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days');

    let rest; 

    if(grupo.lecciones_semanales === '1') {
      if(diff < 0) {
        rest = (224 - (-diff)) / 7; 
      } else {
        rest = (224 - (diff)) / 7; 
      }
    } else {
      if(diff < 0) {
        rest = (112 - (-diff)) / 3.5; 
      } else {
        rest = (112 - (diff)) / 3.5; 
      }
    }

    numLeccion = (32 - Math.floor(rest));

    return res.send({numLeccion});
    
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};





exports.error = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/404", {
      pageName: "Error",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      login: true
    })
};

// * CREAR GRUPOS ADMIN
exports.creargrupos = (req, res) => {
  console.log(req.body);
  let { nombre, lecciones, horario, fechaInicio, profesor } = req.body;
  profesor = profesor ? profesor : null
  let msg = false;
  let diaActual = moment(fechaInicio,'DD-MM-YYYY').format('DD');
  let identificador, numGrupo = 1, numId = 100, numAño, inicio, fechaFin, fechaPagos, finNivel;

  inicio = moment(fechaInicio,'DD-MM-YYYY').format('DD-MM-YYYY');

  numAño = moment(fechaInicio,'DD-MM-YYYY').format('YY');

  if (parseInt(diaActual) <= 9 || parseInt(diaActual) >= 26) {
    fechaPagos = "01 de cada mes";
  } else {
    fechaPagos = "15 de cada mes";
  }
  
  if (nombre.trim() === '' || lecciones.trim() === '' || horario.trim() === '' || fechaInicio.trim() === '') {
    console.log('complete todos los campos')
    let error = {
      msg: 'complete todos los campos'
    }

    return res.send(error);
  } else {
    if (lecciones === '1') {
      if(nombre === "Desde cero") {
        DataBase.ObtenerTodosGruposDesdeCero().then((response) => {
          let grupos = JSON.parse(response);
          inicio = moment(fechaInicio,'DD-MM-YYYY').format("DD-MM-YYYY")
          count = 0;
          
          grupos.forEach(row => {
            let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');
  
            if (numAño === añoGrupo) {
              count++;
            }
          }); 
  
          numGrupo += count;
  
          fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(128, 'w').format('DD-MM-YYYY');
          finNivel = "32 Semanas";      

          numId += numGrupo;
          identificador = `C${numAño}`;

          DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin,profesor).then((respuesta) => {
            console.log(respuesta)

            return res.send({success: 'creado'});
  
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      } else {
        DataBase.ObtenerTodosGruposKids().then((response) => {
          let grupos = JSON.parse(response);
          inicio = moment(fechaInicio,'DD-MM-YYYY').format("DD-MM-YYYY")
          count = 0;
          
          grupos.forEach(row => {
            let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');
  
            if (numAño === añoGrupo) {
              count++;
            }
          }); 
  
          numGrupo += count;
  
          fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(64, 'w').format('DD-MM-YYYY');
          finNivel = "16 Semanas";      
          numId += numGrupo;
          identificador = `N${numAño}`;
    
          DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, profesor).then((respuesta) => {
            console.log(respuesta)
  
            return res.send({success: 'creado'});
  
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }
    } else {
      DataBase.ObtenerTodosGruposIntensivo().then((response) => {
        let grupos = JSON.parse(response);
        inicio = moment(fechaInicio,'DD-MM-YYYY').format("DD-MM-YYYY")
        count = 0;
        // FILTRAR POR AÑO
        
        grupos.forEach(row => {
          let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');

          if (numAño === añoGrupo) {
            count++;
          }
        }); 

        numGrupo += count;

        //fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(15, 'w').add(2,'d').format('DD-MM-YYYY');
        fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(64, 'w').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        numId += numGrupo;
        identificador = `I${numAño}`;
   
        DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, profesor).then((respuesta) => {
          console.log(respuesta)

          return res.send({success: 'creado'});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
    } 
  }
};

// ? CREAR GRUPOS RESPALDO
/*exports.creargrupos = (req, res) => {
  console.log(req.body);
  const { nombre, lecciones, horario, fechaInicio,profesor } = req.body;
  let profesor1 = profesor
  let msg = false;
  let diaActual = moment(fechaInicio,'DD-MM-YYYY').format('DD');
  let identificador, numGrupo = 1, numId = 100, numAño, inicio, fechaFin, fechaPagos, finNivel, nivelCode, nivel;

  inicio = moment(fechaInicio,'DD-MM-YYYY').format('DD-MM-YYYY');

  numAño = moment(fechaInicio,'DD-MM-YYYY').format('YY');

  if (parseInt(diaActual) <= 9 || parseInt(diaActual) >= 26) {
    fechaPagos = "01 de cada mes";
  } else {
    fechaPagos = "15 de cada mes";
  }
  
  if (nombre.trim() === '' || lecciones.trim() === '' || horario.trim() === '' || fechaInicio.trim() === '') {
    console.log('complete todos los campos')
    let error = {
      msg: 'complete todos los campos 1650'
    }

    return res.send(error);
  } else {
    if (lecciones === '1') {
      if(nombre === "Desde cero") {
        DataBase.ObtenerTodosGruposDesdeCero().then((response) => {
          let grupos = JSON.parse(response);
          inicio = moment(fechaInicio,'DD-MM-YYYY').format("DD-MM-YYYY")
          count = 0;
          
          grupos.forEach(row => {
            let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');
  
            if (numAño === añoGrupo) {
              count++;
            }
          }); 
  
          numGrupo += count;
  
          nivelCode = '-1';
          nivel = 'Principiante';
          fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(128, 'w').format('DD-MM-YYYY');
          finNivel = "32 Semanas";      

          numId += numGrupo;
          identificador = `C${numAño}${numId}${nivelCode}`;

          if (profesor1 == 'NULL') {
            profesor1 = null
          }
          DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, nivel,profesor1).then((respuesta) => {
            let grupoCreado = JSON.parse(respuesta)
            let grupoId = grupoCreado.id
  
            return res.send({success: 'creado'});
  
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      } else {
        DataBase.ObtenerTodosGruposKids().then((response) => {
          let grupos = JSON.parse(response);
          inicio = moment(fechaInicio,'DD-MM-YYYY').format("DD-MM-YYYY")
          count = 0;
          
          grupos.forEach(row => {
            let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');
  
            if (numAño === añoGrupo) {
              count++;
            }
          }); 
  
          numGrupo += count;
  
          nivelCode = '-1';
          nivel = 'Principiante';
          fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(64, 'w').format('DD-MM-YYYY');
          finNivel = "16 Semanas";      
          numId += numGrupo;
          identificador = `N${numAño}${numId}${nivelCode}`;
          if (profesor1 == 'NULL') {
            profesor1 = null
          }
          DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, nivel,profesor).then((respuesta) => {
            let grupoCreado = JSON.parse(respuesta)
            let grupoId = grupoCreado.id
  
            return res.send({success: 'creado'});
  
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }
    } else {
      DataBase.ObtenerTodosGruposIntensivo().then((response) => {
        let grupos = JSON.parse(response);
        inicio = moment(fechaInicio,'DD-MM-YYYY').format("DD-MM-YYYY")
        count = 0;
        // FILTRAR POR AÑO
        
        grupos.forEach(row => {
          let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');

          if (numAño === añoGrupo) {
            count++;
          }
        }); 

        numGrupo += count;

        nivelCode = '-1';
        nivel = 'Principiante';
        //fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(15, 'w').add(2,'d').format('DD-MM-YYYY');
        fechaFin = moment(fechaInicio,'DD-MM-YYYY').add(64, 'w').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        numId += numGrupo;
        identificador = `I${numAño}${numId}${nivelCode}`;
        if (profesor1 == 'NULL') {
          profesor1 = null
        }
        DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, nivel,profesor).then((respuesta) => {

          return res.send(grupoCreado);

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
    } 
  }
};*/

// * ACTUALIZAR GRUPOS ADMIN
exports.actualizargrupos = (req, res) => {
  console.log(req.body);
  const { id, nombre, horario1, horario2, fechaInicio,profesor } = req.body;
  let msg = false;
  let diaActual = moment(fechaInicio,'DD-MM-YYY').format('DD');
  let identificador, lecciones, numGrupo = 1, numId = 100, numAño, inicio, fechaFin, fechaPagos, finNivel, nivelCode, nivel;

  inicio = moment(fechaInicio,'DD-MM-YYY').format('DD-MM-YYYY');
  
  numAño = moment(fechaInicio,'DD-MM-YYY').format('YY');
  console.log(numAño)
  console.log("AÑO DE IDENTIFICADOR")
  if (parseInt(diaActual) <= 9 || parseInt(diaActual) >= 26) {
    fechaPagos = "01 de cada mes";
  } else {
    fechaPagos = "15 de cada mes";
  }
  
  if (id.trim() === '' || nombre.trim() === '' || fechaInicio.trim() === '') {
    console.log('complete todos los campos')
    return res.send({error: 'Lo sentimos algo ah ocurrido'});
  } else {
    if (nombre === 'Desde cero') {
      DataBase.ObtenerTodosGruposDesdeCero().then((response) => {
        let grupos = JSON.parse(response);
        inicio = moment(fechaInicio,'DD-MM-YYY').format("DD-MM-YYYY")
        count = 0;
        // FILTRAR POR AÑO
        console.log("VERIFICAR SI TIENEN EL MISMO AÑO")
        
        grupos.forEach(row => {
          let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');
          console.log(numAño)
          console.log(añoGrupo)
          console.log("MOMENTO INICIO")

          if (numAño === añoGrupo) {
            count++;
            console.log("CONTIENEN EL MISMO AÑO")
            console.log(count)
            console.log("NUMERO DE IDENTIFICADOR")
          }
        }); 

        numGrupo += count;

        nivelCode = '-1';
        nivel = 'Principiante';
        lecciones = 1;
                                      // 224
        fechaFin = moment(fechaInicio,'DD-MM-YYY').add(31, 'w').format('DD-MM-YYYY');
        finNivel = "32 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `C${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.ActualizarGrupos(id, identificador, nombre, lecciones, horario1, fechaPagos, finNivel, inicio, fechaFin, nivel,profesor).then((respuesta) => {
          console.log(respuesta)
          console.log("GRUPO DESDE CERO ACTUALIZADO SATISFACTORIAMENTE")

          return res.send({success: 'Grupo Actualizado'});
       
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
    } else if (nombre === "Intensivo") {
      DataBase.ObtenerTodosGruposIntensivo().then((response) => {
        let grupos = JSON.parse(response);
        console.log("INTENSIVOS")
        // FILTRAR POR AÑO
        inicio = moment(fechaInicio,'DD-MM-YYY').format("DD-MM-YYYY")
        count = 0;
        // FILTRAR POR AÑO
        console.log("VERIFICAR SI TIENEN EL MISMO AÑO")
        
        grupos.forEach(row => {
          let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');
          console.log(numAño)
          console.log(añoGrupo)
          console.log("MOMENTO INICIO")

          if (numAño === añoGrupo) {
            count++;
            console.log("CONTIENEN EL MISMO AÑO")
            console.log(count)
            console.log("NUMERO DE IDENTIFICADOR")
          }
        }); 

        numGrupo += count;

        nivelCode = '-1';
        nivel = 'Principiante';
        lecciones = 2;
                                        // 112
        fechaFin = moment(fechaInicio,'DD-MM-YYY').add(15, 'w').add(2,'d').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `I${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.ActualizarGrupos(id, identificador, nombre, lecciones, horario2, fechaPagos, finNivel, inicio, fechaFin, nivel,profesor).then((respuesta) => {
          console.log(respuesta)
          console.log("GRUPO INTENSIVO ACTUALIZADO SATISFACTORIAMENTE")

          return res.send({success: 'Grupo Actualizado'});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });

    } else {
      DataBase.ObtenerTodosGruposKids().then((response) => {
        let grupos = JSON.parse(response);
        console.log("KIDS")
        // FILTRAR POR AÑO
        inicio = moment(fechaInicio,'DD-MM-YYY').format("DD-MM-YYYY")
        count = 0;
        // FILTRAR POR AÑO
        console.log("VERIFICAR SI TIENEN EL MISMO AÑO")
        
        grupos.forEach(row => {
          let añoGrupo = moment(row.fecha_inicio, "DD-MM-YYYY").format('YY');
          console.log(numAño)
          console.log(añoGrupo)
          console.log("MOMENTO INICIO")

          if (numAño === añoGrupo) {
            count++;
            console.log("CONTIENEN EL MISMO AÑO")
            console.log(count)
            console.log("NUMERO DE IDENTIFICADOR")
          }
        }); 

        numGrupo += count;

        nivelCode = '-1';
        nivel = 'Principiante';
        lecciones = 1;
                                        // 112
        fechaFin = moment(fechaInicio,'DD-MM-YYY').add(15, 'w').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `N${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.ActualizarGrupos(id, identificador, nombre, lecciones, horario2, fechaPagos, finNivel, inicio, fechaFin, nivel,profesor).then((respuesta) => {
          console.log(respuesta)
          console.log("GRUPO INTENSIVO ACTUALIZADO SATISFACTORIAMENTE")

          return res.send({success: 'Grupo Actualizado'});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });

    }
  }
};

// * OBTENER MATRICULA DE GRUPO
exports.obtenermatriculagrupo = (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  let msg = false;

  console.log(id)
  console.log("ID GRUPO")

  if (id.trim() === '') {
    console.log('complete todos los campos ')
    res.redirect('/matriculas');
  } else {
    DataBase.ObtenerMatriculaGrupo(id).then((response) => {
      let find = JSON.parse(response);
      console.log(response)
      console.log("RESPONSEEEE")

      res.send({find})
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * REGISTRAR PARTICIPACION
exports.registrarparticipacion = (req, res) => {
  const { porcentaje, leccion, nivel, grupoId, matriculaId } = req.body;
  console.log(req.body);
  let msg = false;

  if (porcentaje.trim() === "" || leccion.trim() === '' || nivel.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos" };
    res.send({err});
  } else {
    DataBase.BuscarParticipacionMatricula(leccion, nivel, grupoId, matriculaId).then((response) => {
      let resp = JSON.parse(response);
      
      if(resp.length) {
        DataBase.ActualizarParticipacion(porcentaje, leccion, nivel, grupoId, matriculaId).then((response2) =>{
          let resp2 = JSON.parse(response2);
          return res.send({resp2});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      } else {
        DataBase.RegistrarParticipacion(porcentaje, leccion, nivel, grupoId, matriculaId).then((response3) =>{
          let resp3 = JSON.parse(response3);
          return res.send({resp3});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * REGISTRAR NOTAS
exports.registrarnotas = (req, res) => {
  const { nota, leccion, nivel, grupoId, matriculaId, commentProfForm, commentAdminForm } = req.body;
  console.log(req.body);
  console.log("NOTAS");
  let msg = false;
const userId = res.locals.user.id
  if (nota.trim() === "" || leccion.trim() === '' || nivel.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos 2095" };
    res.send({err});
  } else {
    DataBase.BuscarNotasLeccion(leccion, nivel, grupoId, matriculaId).then((response) => {
      let resp = JSON.parse(response);
      
      if(resp.length) {
        DataBase.ActualizarNotas(nota, leccion, nivel, grupoId, matriculaId, commentProfForm,  commentAdminForm).then(async(response2) =>{
          let resp2 = JSON.parse(response2);
          if (commentProfForm != "") {
             const comentario_save = await DataBase.Guarda_comentariosProf(commentProfForm,matriculaId,userId)
             console.log(comentario_save)
          }         
          return res.send(resp2);

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      } else {
        DataBase.RegistrarNotas(nota, leccion, nivel, grupoId, matriculaId, commentProfForm,  commentAdminForm).then(async(response3) =>{
          let resp3 = JSON.parse(response3);
          if (commentProfForm != "") {
            const comentario_save = await DataBase.Guarda_comentariosProf(commentProfForm,matriculaId,userId)
            console.log(comentario_save)
         }   
          return res.send({resp3});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      }
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * REGISTRAR MATRICULA AUSENTE
exports.registrarmatriculausente = (req, res) => {
  const { leccion, nivel, grupoId, matriculaId } = req.body;
  console.log(req.body);
  let msg = false;

  if (leccion.trim() === '' || nivel.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos" };
    res.send({err});
  } else {
    DataBase.RegistrarAsistenciaMatriculaAusente(leccion, nivel, grupoId, matriculaId).then((response) =>{
      let resp = JSON.parse(response);
      return res.send({resp});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * ELIMINAR MATRICULA AUSENTE
exports.eliminarmatriculausente = (req, res) => {
  const { leccion, grupoId, matriculaId } = req.body;
  console.log(req.body);
  let msg = false;

  if (leccion.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos 2160" };
    res.send({err});
  } else {
    DataBase.EliminarAsistenciaMatriculaAusente(leccion, grupoId, matriculaId).then((response) =>{
      let resp = JSON.parse(response);
      return res.send({resp});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * OBTENER MATRICULA AUSENTE
exports.obtenermatriculausente = (req, res) => {
  const { arr, leccion, nivel, grupoId, matriculaId } = req.body;
  console.log(req.body);
  console.log("BODY");
  let msg = false;

  if (leccion.trim() === '' || nivel.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos');
    let err = { error: "complete todos los campos" };
    res.send({err});
  } else {
    let matricula = JSON.parse(arr);
    matricula.forEach(item => {
      DataBase.ObtenerNotasMatricula(leccion, nivel, grupoId, item.id).then((response) => {
        let result = JSON.parse(response)[0];
        console.log(result)
        if (result) {
          console.log("CONTIENE NOTAS")
          let notas = {
            notas: parseInt(result.nota)
          }
          let commentProfForm = {
            commentProfForm: result.commentProfForm
          }
          let commentAdminForm = {
            commentAdminForm: result.commentAdminForm
          }
          let final = Object.assign(item, notas,commentProfForm, commentAdminForm)
          console.log(notas)
          console.log(final)
        } else {
          let notas = {
            notas: 0
          }
          let commentProfForm = {
            commentProfForm: ""
          }
          let commentAdminForm = {
            commentAdminForm: ""
          }
          let final = Object.assign(item, notas,commentProfForm, commentAdminForm)
        }

      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
      
      DataBase.BuscarParticipacionMatricula(leccion, grupoId, item.id).then((response2) => {
        let arr = JSON.parse(response2)[0];
        /*console.log(arr)*/
        if(arr) {
          /*.log("CONTIENE PARTICIPACION")*/
          let participacion = {
            participacion: parseInt(arr.porcentaje)
          }
          let final2 = Object.assign(item, participacion)
          /*.log(participacion)
          console.log(final2)*/
        } else {
            let participacion = {
              participacion: 0
            }
            let final2 = Object.assign(item, participacion)
        }

      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
    });

    DataBase.ObtenerAsistenciaMatriculaAusente(leccion, nivel, grupoId, matriculaId).then((response3) =>{
      let resp = JSON.parse(response3);
      return res.send({resp, matricula});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * OBTENER TODO MATRICULA AUSENTE 
exports.obtenerTodaMatriculAusente = (req, res) => {

  DataBase.ObtenerAsistenciasAll().then((response) =>{
    let asistencia = JSON.parse(response);
    console.log(asistencia)
    return res.send({asistencia});

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });

}

// * OBTENER TODO MATRICULA AUSENTE 
exports.obtenerTodasNotas = (req, res) => {

  DataBase.ObtenerTodasNotas().then((response) => {
    let notas = JSON.parse(response);
    console.log(notas)
    return res.send({notas});

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });

}

// * OBTENER TODAS PARTICIPACIONES
exports.obtenerTodasParticipaciones = (req, res) => {

  DataBase.ObtenerTodasParticipacion().then((response) => {
    let participacion = JSON.parse(response);
    console.log(participacion)
    return res.send({participacion});

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });

}

// * BORRAR GRUPOS ADMIN
exports.borrargrupo = (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  let msg = false;

  console.log(id)
  console.log("ID GRUPO")

  if (id.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/verificargrupos/PYT-672');
  } else {
    DataBase.BorrarGrupos(id).then((response) =>{
      console.log(response)
      return res.redirect("/verificargrupos/PYT-672");
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * BORRAR ESTUDIANTES ADMIN
exports.borrarestudiantes = (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  let msg = false;

  console.log(id)
  console.log("ID ESTUDIANTE")

  if (id.trim() === '') {
    console.log('complete todos los campos')
    return res.redirect('/matriculas');
  } else {
    DataBase.BorrarEstudiantes(id).then((response) =>{
      console.log(response)
      
      return res.redirect('/matriculas');

    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * REGISTRAR ESTUDIANTES ADMIN
exports.registrarmatricula = async(req, res) => {
  console.log(req.body);
  let { grupoId, nombre, tipo, dni, genero, nacimiento, telefono1, telefono2, email, provincia, canton, distrito, vendedor } = req.body;
  let msg = false;
  let idEncargado = res.locals.user.id;
  let usuarioId = vendedor ? vendedor : null

  if (grupoId.trim() === "" || nombre.trim() === "" || tipo.trim() === "" || genero.trim() === "" || nacimiento.trim() === "" || telefono1.trim() === "" || email.trim() === "" || provincia.trim() === "" || canton.trim() === "" || distrito.trim() === "") {
    console.log('complete todos los campos')
    return res.redirect('/matriculas');
  } else {

    if(!telefono2) {
      telefono2 = '-'
    } 

    tipo = parseInt(tipo)
    let countGroupAlumnos = JSON.parse(await DataBase.ObtenerMatriculaGrupo(grupoId))
    console.log(countGroupAlumnos.length)
    if (countGroupAlumnos.length > 40) {
      msg = `El grupo seleccionado ya cuenta con ${countGroupAlumnos.length} registrados. Superó el limite de alumnos por grupo`
      return res.redirect('/matriculas/'+msg);
    }
    DataBase.RegistrarMatricula(nombre.toUpperCase(), dni, genero, nacimiento, telefono1, telefono2, email, provincia, canton, distrito, idEncargado, tipo, grupoId, usuarioId).then((resp) => {
      //console.log(resp)
      let estudiante = JSON.parse(resp)
      let idEstudiante = estudiante.id
      console.log(idEstudiante)
      console.log("ESTUDIANTE REGISTRADO")
      if (countGroupAlumnos.length >= 25) {
        let countNew = parseInt(countGroupAlumnos.length)+1
        msg = `El grupo seleccionado ya cuenta con ${countNew} registrados`
        return res.redirect('/matriculas/'+msg);
      }

      return res.redirect('/matriculas/'+idEstudiante);
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};
// * EDITAR ESTUDIANTES ADMIN
exports.editarmatricula = async(req, res) => {
  console.log(req.body);
  let { grupoId, nombre, dni, genero, nacimiento, telefono1, telefono2, email, provincia, canton, distrito, id_estudiante,vendedor } = req.body;
  console.log(req.body)
  console.log("REQ BODY")
  let msg = false;

  if (grupoId.trim() === "" || nombre.trim() === "" || genero.trim() === "" || nacimiento.trim() === "" || telefono1.trim() === "" || email.trim() === "" || provincia.trim() === "" || canton.trim() === "" || distrito.trim() === "") {
    console.log('complete todos los campos')
    msg="Complete todos los campos"
    return res.redirect('/matriculas/'+msg);
  } else {

    if(!telefono2) {
      telefono2 = '-'
    } 
    let tipo = 1
    if (vendedor === "") {
      vendedor = null
    }
  
    DataBase.EditMatricula(nombre.toUpperCase(), dni, genero, nacimiento, telefono1, telefono2, email, provincia, canton, distrito, tipo, id_estudiante, vendedor).then((resp) => {
    console.log(resp)
      console.log("ESTUDIANTE EDITADO")
      msg="Datos del estudiante "+nombre.toUpperCase()+" actualizados con éxito"
      return res.redirect('/matriculas/'+msg);
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * REASIGNAR GRUPO ESTUFDIANDO
exports.reasignarGrupo = async(req, res) => {
  console.log(req.body);
  let { grupoId, id_estudiante,nombre_reaginador } = req.body;
  let msg = false;  
    DataBase.ReasignarGrupoEstudiante(grupoId, id_estudiante).then(async (resp) => {
      var check_newGroup = JSON.parse(await DataBase.historial_caja(id_estudiante))
for (let i = 0; i < check_newGroup.length; i++) {
  var hora_registro_pago = moment(check_newGroup[i]['createdAt']);
 if (check_newGroup[i]['concepto']== "Traslado" && check_newGroup[i]['observacion']== "-" && moment().isAfter(hora_registro_pago, 'd') == false) {
    let update_contancia = await DataBase.update_constancia(check_newGroup[i]['id'],moment().format('YYYY-MM-DD'))
 }
  
}
      console.log("REASIGNADOR GRUPO")
      msg="Grupo reasignado al alumno "+nombre_reaginador+" con éxito"
      return res.redirect('/matriculas/'+msg);
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });

};
// * REASIGNAR GRUPO ESTUFDIANDO
exports.reasignarGrupo2 = async(req, res) => {
  console.log(req.body);
  let { grupoId, id_estudiante,nombre_reaginador } = req.body;
  let msg = false;  
    DataBase.ReasignarGrupoEstudiante(grupoId, id_estudiante).then(async (resp) => {
      var check_newGroup = JSON.parse(await DataBase.historial_caja(id_estudiante))
for (let i = 0; i < check_newGroup.length; i++) {
  var hora_registro_pago = moment(check_newGroup[i]['createdAt']);
 if (check_newGroup[i]['concepto']== "Traslado" && check_newGroup[i]['observacion']== "-" && moment().isAfter(hora_registro_pago, 'd') == false) {
    let update_contancia = await DataBase.update_constancia(check_newGroup[i]['id'],moment().format('YYYY-MM-DD'))
 }
  
}
      console.log("REASIGNADOR GRUPO")
      msg="Grupo reasignado al alumno "+nombre_reaginador+" con éxito"
      return res.send({msg});
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });

};

// * CONGELAR ESTUDIANTES ADMIN
exports.congelarestudiante = (req, res) => {
  let { id } = req.body;
  let msg = false;

  console.log(req.body);

  DataBase.CongelarEstudiante(id).then((resp) => {
    console.log(resp)
    
    /*let concepto = "Reactivacion", monto = 5000, mora = "-", observacion = "-"
    DataBase.guardarCajaPendiente(concepto, monto, mora, observacion,id).then((value) => {
      console.log(value)

      return res.redirect('/matriculas');
    })*/
    return res.send({success: true})

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * ACTIVAR ESTUDIANTES CONGELADOS ADMIN
exports.activarestudiantecongelado = (req, res) => {
  let { id } = req.body;
  let msg = false;

  console.log(req.body);

  DataBase.ActivarEstudianteCongelado(id).then((resp) => {
    console.log(resp)
    
    return res.redirect('/matriculas');
      //return res.send({activado:'activado'});
  
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// * CONGELAR ESTUDIANTES ADMIN
exports.eliminarestudiantegrupo = (req, res) => {
  console.log(req.body);
  let { id } = req.body;
  let msg = false;

  if (id.trim() === "") {
    console.log('complete todos los campos')
    return res.redirect('/matriculas');
  } else {
   
    DataBase.EliminarGrupoEstudiante(id).then((resp) => {
      console.log(resp)

      return res.redirect("/matriculas");
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * OBTENER PROVINCIAS, CANTON, DISTRITOS
exports.obtenerdirecciones = (req, res) => {
  let provincias, canton, distritos;

  DataBase.ObtenerTodasProvincias().then((response) =>{
    provincias = JSON.parse(response);
    //console.log(provincias)

    DataBase.ObtenerTodosCanton().then((response2) =>{
      canton = JSON.parse(response2);
      //console.log(canton)
      
      DataBase.ObtenerTodosDistritos().then((response3) =>{
        distritos = JSON.parse(response3);
       // console.log(distritos)

        return res.send({provincias, canton, distritos});
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

// TODO: USUARIOS
exports.boardUser = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  let role = req.user.puesto, nombre = req.user.nombre

  let roleAdmin, roleProf
  if(req.user.puesto === "Administrador") {
    roleAdmin = true
    roleUser = false
  } else {
    roleAdmin = false
    roleProf = true
  }

  console.log(proyecto)
    res.render(proyecto+"/user/board", {
      pageName: "Tablero",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      board: true,
      roleAdmin,
      roleProf,
      role, 
      nombre
    })
};


//NOTAS PARA TITULO
exports.notas_titulo = async(req, res) => {
  let id_alumno = req.params.id_alumno
  
  const obtener_notas = JSON.parse(await DataBase.BuscarNotasTitulo(id_alumno))
  console.log(obtener_notas)
  return res.send({obtener_notas})
};

//PARTICIPACION PARA TITULO
exports.participacion_titulo = async(req, res) => {
  let id_alumno = req.params.id_alumno
  
  const obtener_participacion = JSON.parse(await DataBase.BuscarParticipacionTitulo(id_alumno))
  console.log(obtener_participacion)
  return res.send({obtener_participacion})
};

//AUSENCIAS PARA TITULO
exports.ausencias_titulo = async(req, res) => {
  let id_alumno = req.params.id_alumno
  
  const obtener_ausencias = JSON.parse(await DataBase.BuscarausenciasTitulo(id_alumno))
  console.log(obtener_ausencias)
  return res.send({obtener_ausencias})
};

/**GENERAL PDF TITULO */
exports.genera_pdf_titulo = async (req, res) => {
  console.log(req.params.id_estudiante)
  var fech = moment().format('DD/MM/YYYY')
  var estudiante =  JSON.parse(await DataBase.BuscarEstudianteConstancia(req.params.id_estudiante))
  console.log('TITULO')
  
  let fecha_nacimiento = moment(estudiante.fecha_nacimiento, 'DD-MM-YYYY')
  let hoy = moment()
  console.log(fecha_nacimiento)
  console.log(hoy)
  let edad = hoy.diff(fecha_nacimiento, 'years')
  console.log('edad:' + edad)
  var contenido = `<html class="loading dark-layout" lang="en" data-layout="dark-layout" data-textdirection="ltr">
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
      <title>PDF Constancia</title>
      <link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png">
      <link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/bordered-layout.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/horizontal-menu.css">
      <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/app-invoice-print.css">
      <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">  
  </head>
  <body class="horizontal-layout horizontal-menu blank-page navbar-floating footer-static  " data-open="hover" data-menu="horizontal-menu" data-col="blank-page">
      <div class="app-content content ">
          <div class="content-overlay"></div>
          <div class="header-navbar-shadow"></div>
          <div class="content-wrapper">
              <div class="content-header row">
              </div>
              <div class="content-body">
                  <div class="invoice-print p-3">
                      <div class="invoice-header d-flex justify-content-between flex-md-row flex-column pb-2">
                              <div class="d-flex mb-1">
                                  <img src="../../../app-assets/images/logo/logoAA.png" alt="" style="width: 100px; height: auto;">
                                  <div class="d-flex align-items-center ms-2">
                                      <h1 class="text-primary fw-bold">Academia Americana</h1>
                                  </div>
                              </div>                           
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <h1>TITULO</h1>
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <p>El director del Centro de Educacion "Academia Americana" de Costa Rica </p>
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <h4><u>HACE CONSTAR:</u></h4>
                      </div>
                      <div class="d-flex justify-content-center p-2">
                          <p class="text-center">
                              Que el alumno: 
                              ${estudiante.nombre}, 
                              identificado con documento de identidad:
                              ${estudiante.nro_identificacion},
                              de 
                              ${edad} años de edad,
                              viene cursando el
                              ${estudiante.grupo.nivel} 
                              en la forma 
                              ${estudiante.grupo.identificador}
                              de
                              ${estudiante.grupo.dia_horario},
                              asistiendo en forma regular a clases
                              en esta institución.
                              <br>
                              <br>
                              Se expide la presente a solicitud de la parte interesada para los fines convenientes.
                          </p>
                      </div>
                      <div class="d-flex justify-content-end my-5 p-4">
                          <p>
                              Costa Rica, ${fech}
                          </p>
                      </div>                     
                      <div class="d-flex justify-content-around p-4">
                          <div class="text-center border-top border-2 pt-2" style="width: 150px;">
                              <p>
                                  Coordinador
                                  Administrativo
                              </p>
                          </div>
                          <div class="text-center border-top border-2 pt-2" style="width: 150px;">
                              <p>
                                  Director
                              </p>
                          </div>
                      </div>
                      <hr class="my-2"/>
                  </div>
              </div>
          </div>
      </div>
      <script src="../../../app-assets/vendors/js/vendors.min.js"></script>
      <script src="../../../app-assets/vendors/js/ui/jquery.sticky.js"></script>
      <script src="../../../app-assets/js/core/app-menu.js"></script>
      <script src="../../../app-assets/js/core/app.js"></script>
      <script src="../../../app-assets/js/scripts/pages/app-invoice-print.js"></script>
  </body></html>`;
let fechaaa=Number(moment())
var envio
var check_constancia = JSON.parse(await DataBase.historial_caja(req.params.id_estudiante))
console.log(check_constancia)
for (let i = 0; i < check_constancia.length; i++) {
 if (check_constancia[i]['concepto']== "Titulo" && check_constancia[i]['observacion']== "-") {
    let update_contancia = await DataBase.update_constancia(check_constancia[i]['id'],moment().format('YYYY-MM-DD'))
 }
  
}
pdf.create(contenido).toStream(function (err, stream) {
    if (err) {
        console.log(err);
    }
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-disposition': 'attachment; filename=titulo.pdf'
    });
    stream.pipe(res);
  });


};
