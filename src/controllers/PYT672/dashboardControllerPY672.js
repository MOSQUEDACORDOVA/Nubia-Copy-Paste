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
      return res.redirect('/py672/PYT-672')
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
  console.log(req.user)
  if (req.user.puesto === 'Administrador') {
    return res.redirect("../grupos/PYT-672");
  } else {
    return res.redirect("../board672/PYT-672");
  }
};

// * REGISTRO DE USUARIOS
/*exports.reguser = (req, res) => {
  console.log(req.body);
  const { nombre, dni, email, pais, fechaN, puesto, password } = req.body;
  let msg = false;
  if (nombre.trim() === '' || dni.trim() === '' || email.trim() === '' || pais.trim() === '' || fechaN.trim() === '' || puesto.trim() === '' || password.trim() === '') {
    console.log('complete todos los campos')
    return res.redirect('/registerpy672/PYT-672');
  } else {
    DataBase.RegUser(nombre, dni, email, pais, fechaN, puesto, password).then((respuesta) =>{
      res.redirect('/loginpy672/PYT-672')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};*/
exports.reguser = (req, res) => {
  console.log(req.body);
  let { nombre, apellidos, dni, email, pais, fechaN, fechaI, puesto, password } = req.body;
  nombre = nombre + " " + apellidos;
  let msg = false;
  if (nombre.trim() === '' || dni.trim() === '' || email.trim() === '' || pais.trim() === '' || fechaN.trim() === '' || fechaI.trim() === '' || puesto.trim() === '' || password.trim() === '') {
    console.log('complete todos los campos')
    return res.redirect('/usuarios672/PYT-672');
  } else {
    DataBase.RegUser(nombre, dni, email, pais, fechaN, fechaI, puesto, password).then((respuesta) =>{
      return res.redirect('/usuarios672/PYT-672');
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
      py672:true,
      login: true,
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
  console.log(proyecto)
  
  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")
    
  DataBase.ObtenerGruposDesdeCero().then((response2) => {
    let gruposDesde0 = JSON.parse(response2);
    console.log(gruposDesde0)
    console.log("DESDE CERO INICIADOS")

      if (gruposDesde0.length) {
        gruposDesde0.forEach(obj => {
          let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
          console.log(obj)
          console.log("EACH")
  
          DataBase.ObtenerMatriculaGrupo(obj.id).then((responseGrupos) => {
            let find = JSON.parse(responseGrupos);
            console.log(find)
            console.log("FIND MATRICULA")
            
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
      console.log(gruposIntensivo)
      console.log("INTENSIVOS INICIADOS")

        if (gruposIntensivo.length) {
          gruposIntensivo.forEach(obj => {
            let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
            console.log(obj)
            console.log("EACH")
    
            DataBase.ObtenerMatriculaGrupo(obj.id).then((responseGrupos) => {
              let find = JSON.parse(responseGrupos);
              console.log(find)
              console.log("FIND MATRICULA")
              
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
          console.log(gruposApertura)
          console.log("EN APERTURA")

          if (gruposApertura.length) {
            gruposApertura.forEach(obj => {
              let numActivos = 0, numIncorporados = 0, numInscritos = 0, numFusionados = 0, numCongelados = 0, numTotal = 0, matrActivos, matrIncorporados, matrInscritos, matrFusionados, matrCongelados, matrTotal;
              console.log(obj)
              console.log("EACH")
      
              DataBase.ObtenerMatriculaGrupo(obj.id).then((responseGrupos) => {
                let find = JSON.parse(responseGrupos);
                console.log(find)
                console.log("FIND MATRICULA")
                
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

// * AJAX
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
            nivel1 = moment(iniciado).add(107, 'd').format('YYYY-MM-DD')
            nivel2 = moment(iniciado).add(214, 'd').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(321, 'd').format('YYYY-MM-DD')
            nivel4 = moment(iniciado).add(428, 'd').format('YYYY-MM-DD')
    
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
            
        } else if(moment().isAfter(nivel2) && moment().isBefore(nivel3)) {
          fechaFin = moment(nivel2, "YYYY-MM-DD").format("DD-MM-YYYY")
          nivelCode = '-2';
          nivel = 'Básico';
          
        } else if(moment().isAfter(nivel3) && moment().isBefore(nivel4)) {
          fechaFin = moment(nivel3, "YYYY-MM-DD").format("DD-MM-YYYY")
          nivelCode = '-3';
          nivel = 'Intermedio';
          
        } else if(moment().isAfter(nivel3)) {
          fechaFin = moment(nivel4, "YYYY-MM-DD").format("DD-MM-YYYY")
          nivelCode = '-4';
          nivel = 'Avanzado';

        }
      }

      if (iniciar >= 1) {
        EstablecerNivel();
        console.log("NIVELLLL")
      } else if (iniciar < 0) {
        EstablecerNivel();
        console.log("GRUPO INICIADO CON EXITO ACTUALIZANDO")

        if(row.estadosGrupoId === 1) {
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

    DataBase.GruposYMatriculas().then((response2) => {
      let arr = JSON.parse(response2);
      console.log(arr)

  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/admin/matricula", {
      pageName: "Academia Americana - Matriculas",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      matric: true,
      gruposTodos,
      arr,
      response2
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

  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")

    DataBase.ObtenerMatriculasDistinct().then((response2) => {
      let gruposDist = JSON.parse(response2);
      console.log(gruposDist)
      console.log("GRUPOS DISTINCTS")
      
      let gruposDesde0 = [], gruposIntensivo = [];
      
      gruposDist.forEach(element => {
        DataBase.BuscarGrupos(element.grupoId).then((response3) => {
          let gruposFounds = JSON.parse(response3);
          console.log(gruposFounds)
          console.log("GRUPOS ENCONTRADOS")

          gruposFounds.forEach(found => {
            if(found.nombre === "Desde cero") {
              gruposDesde0.push(found);
            } else {
              gruposIntensivo.push(found);
            }
          });

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      });

    res.render(proyecto+"/admin/asistencias", {
      pageName: "Academia Americana - Asistencias",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      asistencias: true,
      gruposTodos,
      gruposDesde0,
      gruposIntensivo,
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

// * ASISTENCIAS DE GRUPO
exports.controlgrupo = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  let idGrupo = req.params.grupoid

  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")

    DataBase.ObtenerMatriculasDistinct().then((response2) => {
      let gruposDist = JSON.parse(response2);
      console.log(gruposDist)
      console.log("GRUPOS DISTINCTS")
      
      let gruposDesde0 = [], gruposIntensivo = [];
      
      gruposDist.forEach(element => {
        DataBase.BuscarGrupos(element.grupoId).then((response3) => {
          let gruposFounds = JSON.parse(response3);
          console.log(gruposFounds)
          console.log("GRUPOS ENCONTRADOS")

          gruposFounds.forEach(found => {
            if(found.estadosGrupoId === 2) {
              if(found.nombre === "Desde cero") {
                gruposDesde0.push(found);
              } else {
                gruposIntensivo.push(found);
              }
            }
          });

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      });
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

          numLeccion = (32 - Math.floor(rest))

          console.log(fechaActual)
          console.log(fechaInicio)
          console.log(diff)
          console.log(rest)
          console.log(numLeccion)

    res.render(proyecto+"/admin/asistencias", {
      pageName: "Academia Americana - Asistencias",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      asistencias: true,
      gruposTodos,
      gruposDesde0,
      gruposIntensivo,
      matri,
      grupoId,
      numLeccion,
      fechaActual,
      fechaInicio,
      diff,
      rest,
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

// * HISTORIAL
exports.historial = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  

  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    //console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")

  DataBase.GruposYMatriculas().then((response2) => {
    let matriculas = JSON.parse(response2);
    //console.log(matriculas)
    /*console.log("TODA LA MATRICULA")*/
    let arrString;

    matriculas.forEach(element => {
      let userInfo = {
        leccActual: 0,
        nivelActualGrupo: 1,
        leccion9: '',
        leccion17: '',
        leccion18: '',
        leccion25: '',
        leccion31: '',
        leccion32: '',
        participacion: '',
        asistencias: 0,
        ausentes: 0,
        fechaLeccionesAusentes: '',
        notas: ''
      };

      DataBase.BuscarGrupos(element.grupoId).then((respuesta) => {
        let grupo = JSON.parse(respuesta)[0]

        let inicioGrupo = grupo.fecha_inicio;
        let fechaActual = moment().format("DD-MM-YYYY");
        let iniciado = moment(inicioGrupo, "DD-MM-YYYY").format('YYYY-MM-DD');
        let iniciar = moment(iniciado).diff(moment(), 'days');

        /*console.log(iniciado)
        console.log(iniciar)
        console.log("INCIAR DIAS DIFERENCIA")
        //console.log(grupo)
        //console.log("GRUPO ENCONTRADO")*/
        
        let fechaInicio = moment(grupo.fecha_inicio, "DD-MM-YYYY").format("DD-MM-YYYY");
        let diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days');
        let rest; 

        function EstablecerNivel () {  
          let nivel1, nivel2, nivel3, nivel4;
          switch (grupo.lecciones_semanales) {
            case '1':
              nivel1 = moment(iniciado).add(224, 'd').format('YYYY-MM-DD')
              nivel2 = moment(iniciado).add(448, 'd').format('YYYY-MM-DD')
              nivel3 = moment(iniciado).add(672, 'd').format('YYYY-MM-DD')
              nivel4 = moment(iniciado).add(896, 'd').format('YYYY-MM-DD')
      
              /*console.log("NIVELES")
              console.log(nivel1)
              console.log(nivel2)
              console.log(nivel3)
              console.log(nivel4)
              console.log("DESDE CERO")*/
              break;
  /*OJO*/
            case '2':
              nivel1 = moment(iniciado).add(107, 'd').format('YYYY-MM-DD')
              nivel2 = moment(iniciado).add(214, 'd').format('YYYY-MM-DD')
              nivel3 = moment(iniciado).add(321, 'd').format('YYYY-MM-DD')
              nivel4 = moment(iniciado).add(428, 'd').format('YYYY-MM-DD')
      
              /*console.log("NIVELES")
              console.log(nivel1)
              console.log(nivel2)
              console.log(nivel3)
              console.log(nivel4)
              console.log("INTENSIVO")*/
            break;
          }
            
          if (moment().isBefore(nivel2)) {
            userInfo.nivelActualGrupo = 1
            
          } else if(moment().isAfter(nivel2) && moment().isBefore(nivel3)) {
            userInfo.nivelActualGrupo = 2
            
          } else if(moment().isAfter(nivel3) && moment().isBefore(nivel4)) {
            userInfo.nivelActualGrupo = 3
            
          } else if(moment().isAfter(nivel3)) {
            userInfo.nivelActualGrupo = 4

          }

          if(grupo.lecciones_semanales === '1') {
            console.log("DESDE CERO")

            if (userInfo.nivelActualGrupo === 1) {
              if(diff < 0) {
                rest = (224 - (-diff)) / 7; 
              } else {
                rest = (224 - (diff)) / 7; 
              }
            }

            if (userInfo.nivelActualGrupo === 2) {
              if(diff < 0) {
                rest = (448 - (-diff)) / 14; 
              } else {
                rest = (448 - (diff)) / 14; 
              }
              console.log(diff)
              console.log(rest)
              console.log("NIVEL 2")
              /*console.log(rest)
              console.log(userInfo.nivelActualGrupo)
              console.log("NIVEL 2")*/
            } else if (userInfo.nivelActualGrupo === 3) {
              
            } else if (userInfo.nivelActualGrupo === 4) {
              
            }

          } else {
            if (userInfo.nivelActualGrupo === 1) {
              if(diff < 0) {
                rest = (112 - (-diff)) / 3.5; 
              } else {
                rest = (112 - (diff)) / 3.5; 
              }
            }
           
            if (userInfo.nivelActualGrupo === 2) {
              if(diff < 0) {
                rest = (224 - (-diff)) / 7; 
              } else {
                rest = (224 - (diff)) / 7; 
              }
  
            } else if (userInfo.nivelActualGrupo === 3) {
              
            } else if (userInfo.nivelActualGrupo === 4) {
              
            }
          }
          if(rest < 0) {
            rest = rest * (-1)
          }
          let numPositivo = Math.floor(rest);
          console.log(grupo.identificador)
          console.log(rest)
          userInfo.leccActual = (32 - (numPositivo));

          
        }
  
        if (iniciar >= 1 || iniciar < 0) {
          EstablecerNivel();
        } 

        let final = Object.assign(element, userInfo);

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

      let lecciones = [9, 17, 18, 25, 31, 32], notasArr = '';
      lecciones.forEach((item, idx) => {
        // CREAR CONSULTA QUE MUESTRA QUE ME TRAIGA TODAS LAS NOTAS 
        DataBase.BuscarNotasLeccion(item, element.grupoId, element.id).then((leccion) => {
          let lecc = JSON.parse(leccion)[0];
          /*console.log(lecc)
          console.log("LECCION")
          console.log(item)*/

          if(lecc !== undefined) {
            //notasArr += leccion + ';';
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
          
          userInfo.notas = notasArr;
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
      //console.log(gruposDist)
      //console.log("GRUPOS DISTINCTS")
      
      let arrGrupos = [];
      
      gruposDist.forEach(element => {
        DataBase.BuscarGrupos(element.grupoId).then((response4) => {
          let gruposFounds = JSON.parse(response4);
          //console.log(gruposFounds)
          //console.log("GRUPOS ENCONTRADOS")

          gruposFounds.forEach(found => {
            arrGrupos.push(found);
          });

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      });

    res.render(proyecto+"/admin/historial", {
      pageName: "Academia Americana - Historial",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      historial: true,
      gruposTodos,
      arrString,
      arrGrupos
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

// * MODULO USUARIOS
exports.usuarios = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  DataBase.ObtenerTodosGrupos().then((response) => {
    let gruposTodos = JSON.parse(response);
    //console.log(gruposTodos)
    console.log("TODOS LOS GRUPOS")

    DataBase.ObtenerTodosUsuarios().then((stringUsuarios) => {
      let usuarios = JSON.parse(stringUsuarios);
    
    res.render(proyecto+"/admin/usuarios", {
      pageName: "Usuarios",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      usuarios: true,
      gruposTodos,
      usuarios,
      stringUsuarios
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
        fechaFin = moment(fechaInicio).add(107, 'd').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `I${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.CrearGrupo(identificador, nombre, lecciones, horario, fechaPagos, finNivel, inicio, fechaFin, nivel).then((respuesta) => {
          console.log(respuesta)
          console.log("GRUPO CREADO SATISFACTORIAMENTE")

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
    } 
  }
};

// * ACTUALIZAR GRUPOS ADMIN
exports.actualizargrupos = (req, res) => {
  console.log(req.body);
  const { id, nombre, horario1, horario2, fechaInicio } = req.body;
  let msg = false;
  let diaActual = moment(fechaInicio).format('DD');
  let identificador, lecciones, numGrupo = 1, numId = 100, numAño, inicio, fechaFin, fechaPagos, finNivel, nivelCode, nivel;

  inicio = moment(fechaInicio, "DD-MM-YYYY").format('DD-MM-YYYY');

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
    if (nombre === 'Desde cero') {
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
        lecciones = 1;
                                      // 224
        fechaFin = moment(fechaInicio).add(217, 'd').format('DD-MM-YYYY');
        finNivel = "32 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `C${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.ActualizarGrupos(id, identificador, nombre, lecciones, horario1, fechaPagos, finNivel, inicio, fechaFin, nivel).then((respuesta) => {
          console.log(respuesta)
          console.log("GRUPO DESDE CERO ACTUALIZADO SATISFACTORIAMENTE")

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
        lecciones = 2;
                                        // 112
        fechaFin = moment(fechaInicio).add(107, 'd').format('DD-MM-YYYY');
        finNivel = "16 Semanas";      
        console.log(fechaFin)
        console.log("FECHAR FINALIZAR")
        numId += numGrupo;
        identificador = `I${numAño}${numId}${nivelCode}`;
        console.log(identificador)
        console.log("IDENTIFICADOR GENERADO")
        
        DataBase.ActualizarGrupos(id, identificador, nombre, lecciones, horario2, fechaPagos, finNivel, inicio, fechaFin, nivel).then((respuesta) => {
          console.log(respuesta)
          console.log("GRUPO INTENSIVO ACTUALIZADO SATISFACTORIAMENTE")

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
    console.log('complete todos los campos')
    res.redirect('/matriculas/PYT-672');
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
  const { porcentaje, leccion, grupoId, matriculaId } = req.body;
  console.log(req.body);
  let msg = false;

  if (porcentaje.trim() === "" || leccion.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos" };
    res.send({err});
  } else {
    DataBase.BuscarParticipacionMatricula(leccion, grupoId, matriculaId).then((response) => {
      let resp = JSON.parse(response);
      
      if(resp.length) {
        DataBase.ActualizarParticipacion(porcentaje, leccion, grupoId, matriculaId).then((response2) =>{
          let resp2 = JSON.parse(response2);
          return res.send({resp2});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      } else {
        DataBase.RegistrarParticipacion(porcentaje, leccion, grupoId, matriculaId).then((response3) =>{
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
  const { nota, leccion, grupoId, matriculaId } = req.body;
  console.log(req.body);
  let msg = false;

  if (nota.trim() === "" || leccion.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos" };
    res.send({err});
  } else {
    DataBase.BuscarNotasLeccion(leccion, grupoId, matriculaId).then((response) => {
      let resp = JSON.parse(response);
      
      if(resp.length) {
        DataBase.ActualizarNotas(nota, leccion, grupoId, matriculaId).then((response2) =>{
          let resp2 = JSON.parse(response2);
          return res.send({resp2});

        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error672/PYT-672");
        });
      } else {
        DataBase.RegistrarNotas(nota, leccion, grupoId, matriculaId).then((response3) =>{
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

// * REGISTRAR MATRICULA AUSENTE
exports.registrarmatriculausente = (req, res) => {
  const { leccion, grupoId, matriculaId } = req.body;
  console.log(req.body);
  let msg = false;

  if (leccion.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos" };
    res.send({err});
  } else {
    DataBase.RegistrarAsistenciaMatriculaAusente(leccion, grupoId, matriculaId).then((response) =>{
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
    let err = { error: "complete todos los campos" };
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
  const { arr, leccion, grupoId, matriculaId } = req.body;
  console.log(req.body);
  let msg = false;

  if (leccion.trim() === '' || grupoId.trim() === '' || matriculaId.trim() === '') {
    console.log('complete todos los campos')
    let err = { error: "complete todos los campos" };
    res.send({err});
  } else {
    let matricula = JSON.parse(arr);
    matricula.forEach(item => {
      DataBase.ObtenerNotasMatricula(leccion, grupoId, item.id).then((response) => {
        let result = JSON.parse(response)[0];
        console.log(result)
        if (result) {
          console.log("CONTIENE NOTAS")
          let notas = {
            notas: result.nota
          }
          console.log(notas)
          let final = Object.assign(item, notas)
          console.log(final)
        } else {
          let notas = {
            notas: 0
          }
          let final = Object.assign(item, notas)
        }

      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/error672/PYT-672");
      });
      
      DataBase.BuscarParticipacionMatricula(leccion, grupoId, item.id).then((response2) => {
        let arr = JSON.parse(response2)[0];
        console.log(arr)
        if(arr) {
          console.log("CONTIENE PARTICIPACION")
          let participacion = {
            participacion: parseInt(arr.porcentaje)
          }
          console.log(participacion)
          let final2 = Object.assign(item, participacion)
          console.log(final2)
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

    DataBase.ObtenerAsistenciaMatriculaAusente(leccion, grupoId, matriculaId).then((response3) =>{
      let resp = JSON.parse(response3);
      return res.send({resp, matricula});
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

// * BORRAR ESTUDIANTES ADMIN
exports.borrarestudiantes = (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  let msg = false;

  console.log(id)
  console.log("ID ESTUDIANTE")

  if (id.trim() === '') {
    console.log('complete todos los campos')
    return res.redirect('/matriculas/PYT-672');
  } else {
    DataBase.BorrarEstudiantes(id).then((response) =>{
      console.log(response)
      
      return res.redirect('/matriculas/PYT-672');

    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * REGISTRAR ESTUDIANTES ADMIN
exports.registrarmatricula = (req, res) => {
  console.log(req.body);
  let { grupoId, nombre, apellido1, apellido2, tipo, dni, genero, nacimiento, telefono1, telefono2, telefono3, email, provincia, canton, distrito } = req.body;
  let msg = false;

  if (grupoId.trim() === "" || nombre.trim() === "" || apellido1.trim() === "" || apellido2.trim() === "" || tipo.trim() === "" || dni.trim() === "" || genero.trim() === "" || nacimiento.trim() === "" || telefono1.trim() === "" || email.trim() === "" || provincia.trim() === "" || canton.trim() === "" || distrito.trim() === "") {
    console.log('complete todos los campos')
    return res.redirect('/matriculas/PYT-672');
  } else {
    if(!telefono2) {
      telefono2 = '-'
    }
    if(!telefono3) {
      telefono3 = '-'
    }
    tipo = parseInt(tipo)
    DataBase.RegistrarMatricula(nombre, apellido1, apellido2, dni, genero, nacimiento, telefono1, telefono2, telefono3, email, provincia, canton, distrito, tipo, grupoId).then((resp) => {
      console.log(resp)
      let estudiante = JSON.parse(resp)
      let idEstudiante = estudiante.id
      console.log(idEstudiante)
      console.log("ESTUDIANTE REGISTRADO")
      return res.redirect('/matriculas/PYT-672');
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * CONGELAR ESTUDIANTES ADMIN
exports.congelarestudiante = (req, res) => {
  let { id } = req.body;
  let msg = false;

  console.log(req.body);

  if (id.trim() === "") {
    console.log('complete todos los campos')
    res.redirect('/matriculas/PYT-672');
  } else {
    DataBase.CongelarEstudiante(id).then((resp) => {
      console.log(resp)
  
      return res.redirect("/matriculas/PYT-672");
  
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * ACTIVAR ESTUDIANTES CONGELADOS ADMIN
exports.activarestudiantecongelado = (req, res) => {
  let { id } = req.body;
  let msg = false;

  console.log(req.body);

  if (id.trim() === "") {
    console.log('complete todos los campos')
    res.redirect('/matriculas/PYT-672');
  } else {
    DataBase.ActivarEstudianteCongelado(id).then((resp) => {
      console.log(resp)
      
      return res.redirect("/matriculas/PYT-672");
  
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

// * CONGELAR ESTUDIANTES ADMIN
exports.eliminarestudiantegrupo = (req, res) => {
  console.log(req.body);
  let { id } = req.body;
  let msg = false;

  if (id.trim() === "") {
    console.log('complete todos los campos')
    res.redirect('/matriculas/PYT-672');
  } else {
   
    DataBase.EliminarGrupoEstudiante(id).then((resp) => {
      console.log(resp)

      return res.redirect("/matriculas/PYT-672");
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
    console.log(provincias)

    DataBase.ObtenerTodosCanton().then((response2) =>{
      canton = JSON.parse(response2);
      console.log(canton)
      
      DataBase.ObtenerTodosDistritos().then((response3) =>{
        distritos = JSON.parse(response3);
        console.log(distritos)

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
  console.log(proyecto)
    res.render(proyecto+"/user/board", {
      pageName: "Tablero",
      dashboardPage: true,
      dashboard: true,
      py672:true,
      board: true,
      roleUser: true,
      role, 
      nombre
    })
};