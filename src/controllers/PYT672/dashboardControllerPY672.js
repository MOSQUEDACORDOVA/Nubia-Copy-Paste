const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT672/data");
const passport = require("passport");
const { rejects } = require("assert");
let moment = require('moment-timezone');

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
      console.log("no existe usuario")
      return res.redirect("/loginpy672/PYT-672");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
      return res.redirect('/grupos/PYT-672')
    });
  })(req, res);
};

// * REGISTRO DE USUARIOS
exports.reguser = (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  let msg = false;
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/registerpy672/PYT-672');
  } else {
    DataBase.RegUser(username, email, password).then((respuesta) =>{
      res.redirect('/py21/PYT-21'+respuesta)
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * VISTA LOGIN
exports.login = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/auth/login", {
      pageName: "Login",
      dashboardPage: true,
      dashboard: true,
      py21:true,
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
      py21:true,
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
  console.log(proyecto)
  
  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")
  
  DataBase.ObtenerGruposDesdeCero().then((response2) => {
    let gruposDesde0 = JSON.parse(response2);
    console.log(gruposDesde0)
    console.log("DESDE CERO INICIADOS")
    
    DataBase.ObtenerGruposIntensivo().then((response3) => {
      let gruposIntensivo = JSON.parse(response3);
      console.log(gruposIntensivo)
      console.log("INTENSIVOS INICIADOS")

        DataBase.ObtenerGruposEnApertura().then((response4) => {
          let gruposApertura = JSON.parse(response4);
          console.log(gruposApertura)
          console.log("EN APERTURA")
    
    res.render(proyecto+"/admin/grupos", {
      pageName: "Academia Americana - Grupos",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      grupos: true,
      gruposApertura,
      gruposDesde0,
      gruposIntensivo,
      gruposTodos
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
      let iniciar = moment(iniciado).diff(actual, 'days');
      console.log(iniciar)
      console.log("CONDICION")
      console.log(inicioGrupo)
      console.log("FECHA DE INICIO DEL GRUPO")
      console.log(iniciado)
      console.log("FECHA CUANDO INICIA EL GRUPO !")
      
      console.log(actual)
      console.log("FECHA ACTUAL")

      let nivelCode, nivel;
    
      function EstablecerNivel () {  
        switch (row.lecciones_semanales) {
          case '1':
            nivel1 = moment(iniciado).add(224, 'd').format('YYYY-MM-DD')
            nivel2 = moment(iniciado).add(448, 'd').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(672, 'd').format('YYYY-MM-DD')
            nivel4 = moment(iniciado).add(896, 'd').format('YYYY-MM-DD')
    
            console.log("NIVELES")
            console.log(nivel1)
            console.log(nivel2)
            console.log(nivel3)
            console.log(nivel4)
            console.log("DESDE CERO")
            break;

          case '2':
            nivel1 = moment(iniciado).add(112, 'd').format('YYYY-MM-DD')
            nivel2 = moment(iniciado).add(224, 'd').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(336, 'd').format('YYYY-MM-DD')
            nivel4 = moment(iniciado).add(448, 'd').format('YYYY-MM-DD')
    
            console.log("NIVELES")
            console.log(nivel1)
            console.log(nivel2)
            console.log(nivel3)
            console.log(nivel4)
            console.log("INTENSIVO")
          break;
        }
          
        if (moment().isBefore(nivel2)) {
            fechaFin = moment(nivel1, "YYYY-MM-DD").format("DD-MM-YYYY")
            nivelCode = '-1';
            nivel = 'Principiante';
            console.log("ESTA EN EL NIVEL 1 --- !!!!")
            
        } else if(moment().isAfter(nivel2) && moment().isBefore(nivel3)) {
          fechaFin = moment(nivel2, "YYYY-MM-DD").format("DD-MM-YYYY")
          nivelCode = '-2';
          nivel = 'Básico';
          console.log("ESTA EN EL NIVEL 2 --- !!!!")
          
        } else if(moment().isAfter(nivel3) && moment().isBefore(nivel4)) {
          fechaFin = moment(nivel3, "YYYY-MM-DD").format("DD-MM-YYYY")
          nivelCode = '-3';
          nivel = 'Intermedio';
          console.log("ESTA EN EL NIVEL 3 --- !!!!")
          
        } else if(moment().isAfter(nivel3)) {
          fechaFin = moment(nivel4, "YYYY-MM-DD").format("DD-MM-YYYY")
          nivelCode = '-4';
          nivel = 'Avanzado';
          console.log("ESTA EN EL NIVEL 4 --- !!!!")
          
        }
      }

      if (iniciar >= 1) {
        EstablecerNivel();
        console.log("NIVELLLL")
      } else if (iniciar < 0) {
        EstablecerNivel();
        console.log("GRUPO INICIADO CON EXITO ACTUALIZANDO")

        if(row.estado === 'En Apertura') {
          DataBase.IniciarGrupos(row.id).then((actualizado) => {
            console.log("GRUPO INICIADO - RES CONTROLLER")
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error672/PYT-672");
          });
        } 

        let identificador = row.identificador.slice(0,-2) + nivelCode;
        console.log(identificador)

        DataBase.ActualizarNivelesGrupos(row.id, identificador, fechaFin, nivel, nivelCode).then((actualizado) => {
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

exports.matriculas = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }

  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")

    DataBase.ObtenerMatriculaEstudiantes().then((response) => {
      let matricula = JSON.parse(response);
      console.log(matricula)
      console.log("TODA LA MATRICULA")
      let newArr = [];
  
      matricula.forEach(row => { 
        let idEs = row.estudianteId;

        DataBase.BuscarEstudiante(idEs).then((response2) => {
          let estudiante = JSON.parse(response2);
          console.log(estudiante)
          console.log("ESTUDIANTE ENCONTRADO")
          
          const find = {
            estudiante: JSON.stringify(estudiante) 
          };

          const finalResult = Object.assign(row,find);

          let idG = row.grupoId;
          DataBase.BuscarGrupos(idG).then((response3) => {
            let grupo = JSON.parse(response3);
            console.log(grupo)
            console.log("GRUPO ENCONTRADO")
            
            const find = {
              grupo: JSON.stringify(grupo) 
            };
            
            const final = Object.assign(row,find);
            newArr.push(row)
            
  console.log(newArr)
  console.log("ARRAY NUEVO")
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/admin/matricula", {
      pageName: "Academia Americana - Matriculas",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      matricula: true,
      gruposTodos,
      newArr
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

// * OBTENER ESTUDIANTES MATRICULA
exports.estudiantesmatricula = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }

  DataBase.ObtenerMatriculaEstudiantes().then((response) => {
    let matricula = JSON.parse(response);
    console.log(matricula)
    console.log("TODA LA MATRICULA")
    let newArr = [];

    if(matricula.length) {
      matricula.forEach(row => { 
        let idEs = row.estudianteId;

        DataBase.BuscarEstudiante(idEs).then((response2) => {
          let estudiante = JSON.parse(response2);
          console.log(estudiante)
          console.log("ESTUDIANTE ENCONTRADO")
          
          const find = {
            grupo: estudiante  
          };

          const finalResult = Object.assign(row,find);

          let idG = row.grupoId;
          DataBase.BuscarGrupos(idG).then((response3) => {
            let grupo = JSON.parse(response3);
            console.log(grupo)
            console.log("GRUPO ENCONTRADO")
            
            const find = {
              grupo: grupo  
            };
            
            const final = Object.assign(row,find);

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
      });
    }

    res.send({newArr})
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
  const { nombre, lecciones, horario, fechaInicio } = req.body;
  let msg = false;
  let diaActual = moment(fechaInicio).format('DD');
  let identificador, numGrupo = 1, numId = 100, numAño, inicio, fechaFin, fechaPagos, finNivel, nivelCode, nivel;

  inicio = moment(fechaInicio).format('DD-MM-YYYY');

  numAño = moment(fechaInicio).format('YY');
  console.log(numAño)
  console.log("AÑO DE IDENTIFICADOR")

  if (parseInt(diaActual) <= 9 || parseInt(diaActual) >= 26) {
    fechaPagos = "01 de cada mes";
  } else {
    fechaPagos = "15 de cada mes";
  }
  
  if (nombre.trim() === '' || lecciones.trim() === '' || horario.trim() === '' || fechaInicio.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/verificargrupos/PYT-672');
  } else {
    if (lecciones === '1') {
      DataBase.ObtenerTodosGruposDesdeCero().then((response) => {
        let grupos = JSON.parse(response);
        inicio = moment(fechaInicio).format("DD-MM-YYYY")
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
                                      // 224
        fechaFin = moment(fechaInicio).add(217, 'd').format('DD-MM-YYYY');
        finNivel = "32 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `C${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, nivel).then((respuesta) => {
          let grupoCreado = JSON.parse(respuesta)
          let grupoId = grupoCreado.id
          console.log(grupoId)
          console.log("GRUPO CREADO SATISFACTORIAMENTE")

          DataBase.CrearMatricula(0, null, grupoId).then((respuesta) => {
            let matricula = JSON.parse(respuesta)
            console.log(matricula)
            console.log("MATRICULA CREADA SATISFACTORIAMENTE")
  
            return res.redirect("/verificargrupos/PYT-672");
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
    } else {
      DataBase.ObtenerTodosGruposIntensivo().then((response) => {
        let grupos = JSON.parse(response);
        console.log("INTENSIVOS")
        // FILTRAR POR AÑO
        inicio = moment(fechaInicio).format("DD-MM-YYYY")
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
                                        // 112
        fechaFin = moment(fechaInicio).add(105, 'd').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `I${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, nivel).then((respuesta) => {
          let grupoCreado = JSON.parse(respuesta)
          let grupoId = grupoCreado.id
          console.log(grupoId)
          console.log("GRUPO CREADO SATISFACTORIAMENTE")

          DataBase.CrearMatricula(0, null, grupoId).then((respuesta) => {
            let matricula = JSON.parse(respuesta)
            console.log(matricula)
            console.log("MATRICULA CREADA SATISFACTORIAMENTE")
  
            return res.redirect("/verificargrupos/PYT-672");
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
    } 
  }
};

// * ACTUALIZAR GRUPOS ADMIN
exports.actualizargrupos = (req, res) => {
  console.log(req.body);
  const { id, nombre, fechaInicio } = req.body;
  let msg = false;
  console.log(req.body)

  let diaActual = moment(fechaInicio).format('DD');
  let identificador, lecciones, numGrupo, numAño, fechaFin, fechaPagos, finNivel;

  numAño = moment(fechaInicio).format('YY');
  console.log(numAño)
  console.log("AÑO DE IDENTIFICADOR")

  if (parseInt(diaActual) <= 9 || parseInt(diaActual) >= 26) {
    fechaPagos = "01 de cada mes";
  } else {
    fechaPagos = "15 de cada mes";
  }

  if (id.trim() === '' || nombre.trim() === '' || fechaInicio.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/verificargrupos/PYT-672');
  } else {
    DataBase.ObtenerTodosGrupos().then((response) =>{
      let grupos = JSON.parse(response);
      numGrupo = grupos.length+1;
      console.log(grupos.length)
      console.log(numGrupo)
      console.log("NUMERO DE IDENTIFICADOR")

      if (nombre === 'Desde Cero') {
          fechaFin = moment(fechaInicio).add(32, 'w').format('DD-MM-YYYY');
          finNivel = "32 Semanas";      
          lecciones = "2";
          identificador = `C${numAño}10${numGrupo}-1`;
        } else {
          fechaFin = moment(fechaInicio).add(16, 'w').format('DD-MM-YYYY');
          finNivel = "16 Semanas";      
          lecciones = "1";
          identificador = `I${numAño}10${numGrupo}-1`;
      } 
      DataBase.ActualizarGrupos(id, identificador, nombre, lecciones, horario, fechaPagos, finNivel, fechaInicio, fechaFin).then((respuesta) =>{
        res.redirect("/verificargrupos/PYT-672")
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
};

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

// * REGISTRAR ESTUDIANTES ADMIN
exports.registrarestudiantes = (req, res) => {
  console.log(req.body);
  const { grupoId, nombre, apellido1, apellido2, tipo, dni, genero, nacimiento, telefono1, telefono2, telefono3, email, provincia, canton, distrito } = req.body;
  let msg = false;

  let split = grupoId.split(',')
  let grupo = split[0]
  let id = split[1]
  
  console.log(split)
  console.log(grupo)
  console.log(id)
  console.log("ID MATRICULA")
  console.log(grupoId)
  console.log("ID GRUPO")

  if (grupoId.trim() === "" || nombre.trim() === "" || apellido1.trim() === "" || apellido2.trim() === "" || tipo.trim() === "" || dni.trim() === "" || genero.trim() === "" || nacimiento.trim() === "" || email.trim() === "" || provincia.trim() === "" || canton.trim() === "" || distrito.trim() === "") {
    console.log('complete todos los campos')
    res.redirect('/verificargrupos/PYT-672');
  } else {
    DataBase.RegistrarEstudiantes(nombre, apellido1, apellido2, tipo, dni, genero, nacimiento, telefono1, telefono2, telefono3, email, provincia, canton, distrito).then((respuesta) => {
      console.log(respuesta)
      let estudiante = JSON.parse(respuesta)
      let idEstudiante = estudiante.id
      console.log(idEstudiante)
      console.log("ESTUDIANTE REGISTRADO")
      
      DataBase.AñadirEstudianteMatricula(id, idEstudiante, grupo).then((resp2) => {
        console.log(resp2)
        console.log("ESTUDIANTE AÑADIDO A LA MATRICULA")

        res.redirect("/verificargrupos/PYT-672")
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
};

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
      console.log("no existe usuario")
      return res.redirect("/login27/PYT-27");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
      return res.redirect('/controlrolespy27/PYT-27')
    });
  })(req, res);
};

// Registro de usuarios
exports.reguserpy27 = (req, res) => {
  console.log(req.body);
  const { fname, lname, bdate, gender, dtype, numdoc, nationality, country, city, phone, address, username, email, password } = req.body;
  let msg = false;
  if (fname.trim() === '' || lname.trim() === '' || bdate.trim() === '' || gender.trim() === '' || dtype.trim() === '' || numdoc.trim() === '' || nationality.trim() === '' || country.trim() === '' || city.trim() === '' || phone.trim() === '' || address.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/register27/PYT-27');
  } else {
    DataBase.RegUser(fname, lname, bdate, gender, dtype, numdoc, nationality, country, city, phone, address, username, email, password).then((respuesta) =>{
      res.redirect("/login27/PYT-27")
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-27");
    });
  }
};
