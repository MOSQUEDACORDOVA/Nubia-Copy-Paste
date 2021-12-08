const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT672/data");
const passport = require("passport");
const { rejects } = require("assert");
let moment = require('moment-timezone');

exports.grupos = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  
  DataBase.ObtenerGruposDesdeCero().then((response2) => {
    let gruposDesde0 = JSON.parse(response2);
    console.log(gruposDesde0)
    console.log("DESDE CERO INICIADOS")
    
    DataBase.ObtenerGruposIntensivo().then((response3) => {
      let gruposIntensivo = JSON.parse(response3);
      console.log(gruposIntensivo)
      console.log("INTENSIVOS INICIADOS")

        DataBase.ObtenerGruposEnApertura().then((response) => {
          let gruposApertura = JSON.parse(response);
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
      gruposIntensivo
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

  DataBase.ObtenerGruposEnApertura().then((response) => {
    let grupos = JSON.parse(response);
    console.log(grupos)
    
    // VERIFICAR GRUPOS EN APERTURA 
    grupos.forEach(row => {
      let inicioGrupo = row.fecha_inicio;
 
      console.log(inicioGrupo)
      console.log("INCIIOASIDSOADIOASO")
      
      let actual = moment().format('DD-MM-YYYY');
      let iniciado = moment(inicioGrupo, "DD-MM-YYYY").add(1, 'days').format('DD-MM-YYYY');
      //let limite = moment(inicioGrupo, "DD-MM-YYYY").add(2, 'days').format('DD-MM-YYYY');
      console.log(iniciado)
      console.log("FECHA DE GRUPO INICIADO")
 
      console.log(actual)
      console.log("FECHA ACTUAL")
      
      if (moment(iniciado).isSameOrBefore(actual)) {
        console.log("GRUPO INICIADO")

        DataBase.ActualizarEstadoDeGrupos(row.id).then((actualizado) => {
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
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/admin/matricula", {
      pageName: "Academia Americana - Matriculas",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      matricula: true
    })
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
  let identificador, numGrupo = 1, numId = 100, numAño, inicio, fechaFin, fechaPagos, finNivel, nivel;

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
        count = 0;
        // FILTRAR POR AÑO
        console.log("VERIFICAR SI TIENEN EL MISMO AÑO")
        /*grupos.forEach(row => {
          if (moment(inicio).isSame(row.fecha_inicio, 'year')) {
            count++;
            console.log("CONTIENEN EL MISMO AÑO")
            console.log(count)
            console.log("NUMERO DE IDENTIFICADOR")
          }
        });*/  

        numGrupo += count;
        let nivel1, nivel2, nivel3, nivel4;
        nivel1 = moment(fechaInicio).add(32, 'w').format('DD-MM-YYYY')
        nivel2 = moment(fechaInicio).add(64, 'w').format('DD-MM-YYYY')
        nivel3 = moment(fechaInicio).add(128, 'w').format('DD-MM-YYYY')
        nivel4 = moment(fechaInicio).add(128, 'w').format('DD-MM-YYYY')

        console.log(nivel1)
        console.log(nivel2)
        console.log(nivel3)
        console.log(nivel4)
        console.log("NIVELES")
  
        /*if(moment(fechaInicio).isBetween(moment(fechaInicio), nivel4)) {
          nivel = '-4';
          if(moment(fechaInicio).isBetween(moment(fechaInicio), nivel3)) {
            nivel = '-3';
            if(moment(fechaInicio).isBetween(moment(fechaInicio), nivel2)) {
              nivel = '-2';
              if(moment(fechaInicio).isBetween(moment(fechaInicio), nivel1)) {
                nivel = '-1';
              } 
            } 
          } 
        } */
        nivel = '-1';
        
        fechaFin = moment(fechaInicio).add(32, 'w').format('DD-MM-YYYY');
        finNivel = "32 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `C${numAño}${numId}${nivel}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin).then((respuesta) => {
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
    } else {
      DataBase.ObtenerTodosGruposIntensivo().then((response) => {
        let grupos = JSON.parse(response);
        console.log("INTENSIVOS")
        // FILTRAR POR AÑO
        if (grupos.length >= 1) {
          grupos.forEach(row => {
            if (moment(inicio).isSame(row.fecha_inicio, 'year')) {
              console.log("CONTIENEN EL MISMO AÑO")
              numGrupo++;
              console.log("NUMERO DE IDENTIFICADOR")
            }
          });    
        } 
        nivel = '-1'

        fechaFin = moment(fechaInicio).add(16, 'w').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `I${numAño}${numId}${nivel}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin).then((respuesta) => {
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
