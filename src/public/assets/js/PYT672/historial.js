let historialTable = $('.historial'), gruposTodos, usuarios, asistenciasAll, notasAll, participacionAll;

async function FetchData (num) {
  gruposTodos = await fetch('/obtenerGruposAll')
      .then(response => response.json())
      .then(data => {
          gruposTodos = data;

          moment.locale('es');
          $('#gruposMenu').html('<option value="">Seleccione un grupo</option>')
          gruposTodos.forEach(item => {
            let format = moment(item.fecha_inicio, "DD-MM-YYYY").format("D MMM YYYY");
            $('#gruposMenu').append(`<option value="${item.id}">${item.identificador} - ${item.dia_horario} - ${format}</option>`);
          });
          $('#gruposMenu').trigger("change");
            
          let gruposBuscador = JSON.parse($('#arrGrupos').val())
          $('#buscadorGrupos').html('<option value="">Seleccione un grupo</option>')
          gruposBuscador.forEach(grupo => {
            let filter = gruposTodos.filter(item => item.id === grupo.grupoId)
            $('#buscadorGrupos').append(`<option value="${filter[0].id}">${filter[0].identificador}</option>`);
            
            $('#buscadorGrupos').trigger("change");
          });

          return data
      });

  if (num === 1) {
      usuarios = await fetch('/obtenerusuariospy672')
          .then(response => response.json())
          .then(data => {
              usuarios = data.usuarios
              
              return data.usuarios
          });
  } else if (num === 3) {
    asistenciasAll = await fetch('/obtenerTodaMatriculaAusente')
          .then(response => response.json())
          .then(data => {
              asistenciasAll = data.asistencia
              //console.log(asistenciasAll)
              return asistenciasAll
          });
          
  } else if (num === 4) {
    notasAll = await fetch('/obtenerTodasNotas')
          .then(response => response.json())
          .then(data => {
              notasAll = data.notas
              //console.log(notasAll)
              return notasAll
          });
          
  } else if (num === 5) {
    participacionAll = await fetch('/obtenerTodasParticipacion')
          .then(response => response.json())
          .then(data => {
            participacionAll = data.participacion
              //console.log(participacionAll)
              return participacionAll
          });
          
    cargarTablaMatricula();  

  }
}

function cargarTablaMatricula(editada) {

  let matricula = $('#arrayMatricula').val()
  
  let matriculaParsed = ""
  if (editada) {
    
    matriculaParsed = JSON.parse(matricula)

  }else{
    matriculaParsed = JSON.parse(matricula.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // --------------------------------------------------------------------
  //console.log(matriculaParsed)
  if (historialTable.length) {
    let tableMatr;
    $('.buscar-matricula').on('keyup change', function(){
      tableMatr.search(this.value).draw();   
    });  

    $('.buscar-grupos').on('change', function(){
      tableMatr.search(this.value).draw();   
    });  

    tableMatr = historialTable.DataTable({
      paging:   false,
      data: matriculaParsed,
      columns: [
        { data: 'nombre' },
        { data: 'asistencia' },
        { data: 'nota' },
      ],
      columnDefs: [
        {
          targets: 0, render: function (data, type, full) {
            let grupo, find;
            if(full.grupo) {
              find = gruposTodos.filter(grupo => grupo.id === full.grupoId)
              grupo = find[0].identificador;
            } else {
              grupo = "Sin Grupo";
            }
            var arrData = encodeURIComponent(JSON.stringify(full));
            let prof = "No asignado"

            if (full.usuario) {
              prof = full.usuario.nombre
            }

            let nombreEst = `
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center mb-1">
                <span class="me-1 btnHistorialDetalles" data-lecciones-ausentes='${full.fechaLeccionesAusentes}' data-notas='${full.notas}' data-grupoid="${full['grupo']['id']}" data-presente="${full['asistencias']}" data-ausentes="${full['ausentes']}" data-nivel="${full['nivelActualGrupo']}" data-leccion="${full['leccActual']}" data-arrEstudiante = "${arrData}">${full['nombre']}</span>

                <button class="btn-circle btn-sm badge rounded-pill badge-light-success me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Presente" data-consulta="presente" role="button">
                  ${full['asistencias']}
                </button>

                <button class="btn-circle btn-sm badge rounded-pill badge-light-danger me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Ausentes" data-consulta="ausentes" role="button">
                  ${full['ausentes']}
                </button>

                <button class="btn-circle btn-sm badge rounded-pill badge-light-info me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Nivel" data-consulta="nivel" role="button">
                  ${full['nivelActualGrupo']}
                </button>
              
                <button class="btn-circle btn-sm badge rounded-pill badge-light-warning me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Lección" data-consulta="leccion" role="button">
                  ${full['leccActual']}
                </button>
              </div>

              <div class="d-flex align-items-end">
                <div class="me-1">
                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                    <small class="emp_post text-muted">Grupo</small><br><small class="emp_post">${grupo}</small>
                </div>
                <div class="me-1">
                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                    <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">${prof}</small>
                </div>

                <div class="">
                    <span class="item-clock me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock font-small-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                    
                    <small class="emp_post text-muted">Horario</small><br><small class="emp_post">${full['grupo']['dia_horario']}</small>
                </div>
              </div>
            </div>
            `;
            return nombreEst
          }
        },
        {
          targets: 1, render: function (data, type, full) {
            //console.log(full)
            let valorAsistencia = 3.125
            let filterAsistencias = asistenciasAll.filter(item => item.nivel == full.nivelActualGrupo && item.matriculaId == full.id)
            let leccionesAusentes = filterAsistencias.length ? parseFloat(filterAsistencias.length * valorAsistencia).toFixed(2) : parseFloat(0 * valorAsistencia).toFixed(2);
            let total = parseFloat(100 - leccionesAusentes);

            let asisTotal = `
            <div class="d-flex align-items-center" data-lecciones-ausentes='${full.fechaLeccionesAusentes}' data-notas='${full.notas}' data-grupoid="${full['grupo']['id']}" data-presente="${full['asistencias']}" data-ausentes="${full['ausentes']}" data-nivel="${full['nivelActualGrupo']}" data-leccion="${full['leccActual']}">
              <h6 class="m-0">${total}%</h6>
              <div id="chartPart${full['id']}"></div>
            </div>`;

            let color;

            if (total >= 80) {
              color = "#28c76f"
            } else {
              color = "#82868b"
            } 

            let item = document.querySelector(`#chartPart${full['id']}`);
            if(item) {
              SetGrap(item, total, color);
            }

            return asisTotal;
          }
        },
        {
          targets: 2, render: function (data, type, full) {
            let filterNotas = notasAll.filter(item => item.nivel == full.nivelActualGrupo && item.matriculaId == full.id)
            let filterPart = participacionAll.filter(item => item.nivel == full.nivelActualGrupo && item.matriculaId == full.id)
            let total = 0;
            if (filterNotas.length) {
              filterNotas.forEach(nota => {
                total += parseInt(nota.nota)
              });
            }
            if (filterPart.length) {
              total += parseInt(filterPart[0].porcentaje)
            }
            //console.log(total)
            let notaTotal = `
            <div class="d-flex align-items-center" data-lecciones-ausentes='${full.fechaLeccionesAusentes}' data-notas='${full.notas}' data-grupoid="${full['grupo']['id']}" data-presente="${full['asistencias']}" data-ausentes="${full['ausentes']}" data-nivel="${full['nivelActualGrupo']}" data-leccion="${full['leccActual']}">
              <h6 class="m-0">${total}%</h6>
              <div id="chart${full['id']}"></div>
            </div>`;

            let color;

            if (total >= 70) {
              color = "#28c76f"
            } else {
              color = "#82868b"
            } 

            let item = document.querySelector(`#chart${full['id']}`);
            if(item) {
              SetGrap(item, total, color);
            }

            return notaTotal;
          }
        },
        {
          targets: 3, render: function (data, type, full) {
            let valorAsistencia = 3.125
            let filterAsistencias = asistenciasAll.filter(item => item.nivel == full.nivelActualGrupo && item.matriculaId == full.id)
            let leccionesAusentes = filterAsistencias.length ? parseFloat(filterAsistencias.length * valorAsistencia).toFixed(2) : parseFloat(0 * valorAsistencia).toFixed(2);
            let totalAsistencias = parseFloat(100 - leccionesAusentes);
            let filterNotas = notasAll.filter(item => item.nivel == full.nivelActualGrupo && item.matriculaId == full.id)
            let filterPart = participacionAll.filter(item => item.nivel == full.nivelActualGrupo && item.matriculaId == full.id)
            let total = 0, info = "";
            if (filterNotas.length) {
              filterNotas.forEach(nota => {
                total += parseInt(nota.nota)
              });
            }
            if (filterPart.length) {
              total += parseInt(filterPart[0].porcentaje)
            }

            totalNotas = total

            if(full['leccActual'] != 32 && full['leccActual'] != 0 && full['grupo']['nombre'] != "Kids") {
              info = `<span class="badge badge-light-primary">En Curso</span>`
            } else if (full['leccActual'] === 0) {
              info = `<span class="badge badge-light-info">Por Iniciar</span>`
            } else {
              if (full['grupo']['nombre'] === "Kids" && full['leccActual'] === 16) {
                if (totalAsistencias >= 80 && totalNotas >= 70) {
                  info = `<span class="badge badge-light-success">Aprobado</span>`
                } else {
                  info = `<span class="badge badge-light-secondary">Reprobado</span>`
                }
                
              } else {
                if (totalAsistencias >= 80 && totalNotas >= 70) {
                  info = `<span class="badge badge-light-success">Aprobado</span>`
                } else {
                  info = `<span class="badge badge-light-secondary">Reprobado</span>`
                }

              }
            }
            return info;
          }
        },
      ],
      drawCallback: function (settings) {
        $('[data-bs-toggle="tooltip"]').tooltip();
      },
      order: [[2, 'desc']],
      dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 5,
      lengthMenu: [5, 10, 25, 50, 75, 100],
      language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Total _TOTAL_ registros",
      "infoEmpty": "Total _TOTAL_ registros",
      "infoFiltered": "(Filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });

  
    $('div.head-label').html('<h6 class="mb-0">Historial</h6>');
    document.getElementById('historial_info').classList.add('py-2')
    document.getElementById('historial_filter').classList.add('d-none')
    document.getElementById('historial_info').parentElement.parentElement.classList.add('align-items-center')
  }

  function SetGrap (item, total, color) {
    //console.log(item, total, color) 
    let options = {
      chart: {
        width: 100,
        height: 100,
        type: "radialBar"
      },
      
      series: [total],
      colors: [`${color}`],
      
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "40%"
          },
          
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: false,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              color: "#111",
              fontSize: "16px",
              show: false,
            },
          }
        }
      },
    
      stroke: {
        lineCap: "round",
      },
      labels: ["Total"]
    };

    let chart = new ApexCharts(item, options);
    if(chart !== null) {
      chart.render();
    }
  }

  
  $(function () {
    'use strict';
   
    $('.odd').addClass('selector');
    $('.even').addClass('selector'); 
    
    let nivelSelect, nivelMax, leccMax, grupoSelect, alumnoSelect;
    $('.btnHistorialDetalles').on('click', function () {
  
      var Array = this.getAttribute('data-arrEstudiante');
      var my_object = JSON.parse(decodeURIComponent(Array));
      alumnoSelect = my_object
  
      let idGrupo = parseInt(this.getAttribute('data-grupoid')), arrayLeccionesAusentes = this.getAttribute('data-lecciones-ausentes'), presentes = parseInt(this.getAttribute('data-presente')), ausentes = parseInt(this.getAttribute('data-ausentes')), nivel = parseInt(this.getAttribute('data-nivel')), leccion = parseInt(this.getAttribute('data-leccion')), notas = this.getAttribute('data-notas');

      $('#tablaHistorialDetalles').html('');
  
      let content = new DocumentFragment();
      //console.log(my_object)
      for (let index = 0; index < 3; index++) {
        $("#nivelHis")[0].options[index].disabled = true;
      }
      for (let index = 0; index < nivel; index++) {
        $("#nivelHis")[0].options[index].disabled = false;
      }
      $('#nivelHis').val(nivel)
      $('#nivelHis').trigger("change");
      leccMax = leccion

      nivelMax = nivel, nivelSelect = parseInt($('#nivelHis').val());

      let grupoFind = gruposTodos.filter(grupo => grupo.id === idGrupo)
      grupoSelect = grupoFind[0]

      if (grupoFind.length) {
        if (grupoSelect.nombre === "Desde cero") {
          if (nivelSelect != nivelMax) {
            num = 32
          }

        } else if (grupoSelect.nombre === "Intensivo") {
          if (nivelSelect != nivelMax) {
            num = 32
          }
          
        } else if (grupoSelect.nombre === "Kids") {
          if (nivelSelect != nivelMax) {
            num = 16
          }
          
        }
      }

      let filterFechasLecc = grupoSelect.fechaLecciones.filter(lecciones => lecciones.nivel === nivelSelect)

      for (let num = 1; num <= leccion; num++) {
        let row = document.createElement('tr'), td = '', notaLeccion = 0, calif = '', color = '', participacion = "", fechaLecc = "", setLeccion = "";

        setLeccion = filterFechasLecc.filter(item => item.leccion == num)

        fechaLecc = setLeccion[0].fecha
        
        if(num === 9 || num === 17 || num === 18 || num === 25 || num === 31 || num === 32) {
          let result = notasAll.filter(nota => nota.nivel == nivel && nota.n_leccion == num && nota.matriculaId === my_object.id)
          notaLeccion = result.length ? result[0].nota : 0
          
          /*console.log(notaLeccion);
          console.log("NOTA LECCION");*/
          if (notaLeccion > 7) {
            color = 'badge-light-success'
          } else {
            color = 'badge-light-danger'
          }
  
          calif = `<span class="badge rounded-pill ${color} me-1">${notaLeccion}</span>`;
        } else {
          calif = `<span class="badge rounded-pill badge-light-info me-1">No aplica</span>`;
        }

        if (num === 32 || num === 16 && grupoSelect.nombre === "Kids") {
          let filterParticipacion = participacionAll.filter(item => item.matriculaId === my_object.id && item.nivel == nivel && item.n_leccion == num) 
          let porcentaje = filterParticipacion.length ? filterParticipacion[0].porcentaje : 0
          if (porcentaje > 7) {
            color = 'badge-light-success'
          } else {
            color = 'badge-light-danger'
          }

          /*if (grupoSelect.nombre === "Kids") {
            let filterNotaLecc = notasAll.filter(item => item.n_leccion == num && item.nivel == nivelSelect && item.matriculaId == idAlumno)
            notaLeccion = filterNotaLecc.length ? parseInt(filterNotaLecc[0].nota) : 0
          
            if (notaLeccion > 7) {
              color = 'badge-light-success'
            } else {
              color = 'badge-light-danger'
            }
  
            calif = `<span class="badge rounded-pill ${color} me-1">${notaLeccion}</span>`;
          }*/

          participacion += `
          <div class="text-center ms-1">
                      
              <span class="emp_post fw-bolder">Participación</span><br>
              <span class="badge rounded-pill ${color} me-1">${porcentaje}</span>

          </div>
          ` 
        } 
        if(asistenciasAll.length) {
  
          let result = asistenciasAll.filter((lecc => parseInt(lecc.n_leccion) === num && parseInt(lecc.nivel) == nivel));
          /*console.log(result)
          console.log("LECC AUSENTES")*/
  
          if(result.length && parseInt(result[0].n_leccion)) {
            /*console.log(result)*/
            td += 
            `
              <div class="d-flex flex-column pb-0">
  
                <div class="d-flex align-items-center mb-1">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>
  
                <div class="d-flex align-items-end">
                  <div class="">
                    
                      <span class="emp_post fw-bolder">Fecha</span><br>
                      <span class="emp_post text-nowrap">${fechaLecc}</span>
  
                  </div>
                  <div class="mx-2 text-center">
                  
                      <span class="emp_post fw-bolder">Asistencia</span><br>
  
                      <span class="badge rounded-pill badge-light-danger">
                        Ausente
                      </span>
                      
                  </div>
  
                  <div class="text-center">
                      
                      <span class="emp_post fw-bolder">Calificación</span><br>
                      ${calif}
  
                  </div>
                  ${participacion}

                </div>
                <hr class="mb-0">
              </div>
            `;
            
          } else {
            td += 
            `
              <div class="d-flex flex-column pb-0">
  
                <div class="d-flex align-items-center mb-1">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>
  
                <div class="d-flex align-items-end">
                  <div class="">
                    
                      <span class="emp_post fw-bolder">Fecha</span><br>
                      <span class="emp_post text-nowrap">${fechaLecc}</span>
  
                  </div>
                  <div class="mx-2 text-center">
                  
                      <span class="emp_post fw-bolder">Asistencia</span><br>
  
                      <span class="badge rounded-pill badge-light-success">
                        Presente
                      </span>
                      
                  </div>
  
                  <div class="text-center">
                      
                      <span class="emp_post fw-bolder">Calificación</span><br>
                      ${calif}
  
                  </div>
                  ${participacion}
                </div>
                <hr class="mb-0">
              </div>
            `;
  
          }
  
        } else {
          td += 
            `
              <div class="d-flex flex-column pb-0">
  
                <div class="d-flex align-items-center mb-1">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>
  
                <div class="d-flex align-items-end">
                  <div class="">
                    
                      <span class="emp_post fw-bolder">Fecha</span><br>
                      <span class="emp_post text-nowrap">${fechaLecc}</span>
  
                  </div>
                  <div class="mx-2 text-center">
                  
                      <span class="emp_post fw-bolder">Asistencia</span><br>
  
                      <span class="badge rounded-pill badge-light-success">
                        Presente
                      </span>
                      
                  </div>
  
                  <div class="text-center">
                      
                      <span class="emp_post fw-bolder">Calificación</span><br>
                      ${calif}
  
                  </div>
                  ${participacion}
                </div>
                <hr class="mb-0">
              </div>
            `;
          
        }
        row.innerHTML = td;
        content.appendChild(row);
      }

      $(`#nombre-historial`).text(my_object['nombre'])
      $(`#dni-historial`).text(my_object['nro_identificacion'])
      $(`#tlfs-historial`).text(`${my_object['telefono1']}-${my_object['telefono2']}`)
      $(`#email-historial`).text(my_object['email'])
      $('#profesorDetalles').text(my_object.grupo.usuario ? my_object.grupo.usuario.nombre : "No Asignado")
      let filterGrupo = gruposTodos.filter(grupo => grupo.id == my_object['grupo']['id'])
      $(`#grupo-historial`).text(filterGrupo.length ? filterGrupo[0].identificador : "Sin Grupo")
      $(`#horario-historial`).text(my_object['grupo']['dia_horario'])
  
      $('#tablaHistorialDetalles').append(content);
  
      $('#btnHistorialDetalles').click();
  
    });

    $("#nivelHis").on("select2:select", function (e) {
      $('#tablaHistorialDetalles').html('');
      let content = new DocumentFragment(), leccion = leccMax;

      nivelSelect = parseInt($('#nivelHis').val())
      if (grupoSelect.nombre === "Desde cero" || grupoSelect.nombre === "Intensivo") {
        if (nivelSelect != nivelMax) {
          leccion = 32
          
        } 
      } else {
        if (nivelSelect != nivelMax) {
          leccion = 16
          
        } 
      }

      let filterFechasLecc = grupoSelect.fechaLecciones.filter(lecciones => lecciones.nivel === nivelSelect)
      
      for (let num = 1; num <= leccion; num++) {
        let row = document.createElement('tr'), td = '', notaLeccion = 0, calif = '', color = '', participacion = "", fechaLecc = "", setLeccion = "";

        setLeccion = filterFechasLecc.filter(item => item.leccion == num)

        fechaLecc = setLeccion[0].fecha
        
        if(num === 9 || num === 17 || num === 18 || num === 25 || num === 31 || num === 32) {
          let result = notasAll.filter(nota => nota.nivel == nivelSelect && nota.n_leccion == num && nota.matriculaId == alumnoSelect.id)
          notaLeccion = result.length ? result[0].nota : 0
          if (notaLeccion > 7) {
            color = 'badge-light-success'
          } else {
            color = 'badge-light-danger'
          }
          
          /*console.log(notaLeccion);
          console.log("NOTA LECCION");*/
  
          calif = `<span class="badge rounded-pill ${color} me-1">${notaLeccion}</span>`;
        } else {
          calif = `<span class="badge rounded-pill badge-light-info me-1">No aplica</span>`;
        }
        
        if (num === 32 || num === 16 && grupoSelect.nombre === "Kids") {
          let filterParticipacion = participacionAll.filter(item => item.matriculaId == alumnoSelect.id && item.nivel == nivelSelect && item.n_leccion == num) 
          let porcentaje = filterParticipacion.length ? filterParticipacion[0].porcentaje : 0

          if (porcentaje > 7) {
            color = 'badge-light-success'
          } else {
            color = 'badge-light-danger'
          }

          participacion += `
          <div class="text-center ms-1">
                      
              <span class="emp_post fw-bolder">Participación</span><br>
              <span class="badge rounded-pill ${color} me-1">${porcentaje}</span>

          </div>
          ` 
        } 
        
        if(asistenciasAll.length) {
  
          let result = asistenciasAll.filter((lecc => parseInt(lecc.n_leccion) == num && parseInt(lecc.nivel) == nivelSelect));
          /*console.log(result)
          console.log("LECC AUSENTES")*/
  
          if(result.length && parseInt(result[0].n_leccion)) {
            /*console.log(result)*/
            td += 
            `
              <div class="d-flex flex-column pb-0">
  
                <div class="d-flex align-items-center mb-1">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>
  
                <div class="d-flex align-items-end">
                  <div class="">
                    
                      <span class="emp_post fw-bolder">Fecha</span><br>
                      <span class="emp_post text-nowrap">${fechaLecc}</span>
  
                  </div>
                  <div class="mx-2 text-center">
                  
                      <span class="emp_post fw-bolder">Asistencia</span><br>
  
                      <span class="badge rounded-pill badge-light-danger">
                        Ausente
                      </span>
                      
                  </div>
  
                  <div class="text-center">
                      
                      <span class="emp_post fw-bolder">Calificación</span><br>
                      ${calif}
                      
                  </div>
                  ${participacion}
                </div>
                <hr class="mb-0">
              </div>
            `;
            
          } else {
            td += 
            `
              <div class="d-flex flex-column pb-0">
  
                <div class="d-flex align-items-center mb-1">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>
  
                <div class="d-flex align-items-end">
                  <div class="">
                    
                      <span class="emp_post fw-bolder">Fecha</span><br>
                      <span class="emp_post text-nowrap">${fechaLecc}</span>
  
                  </div>
                  <div class="mx-2 text-center">
                  
                      <span class="emp_post fw-bolder">Asistencia</span><br>
  
                      <span class="badge rounded-pill badge-light-success">
                        Presente
                      </span>
                      
                  </div>
  
                  <div class="text-center">
                      
                      <span class="emp_post fw-bolder">Calificación</span><br>
                      ${calif}
  
                  </div>
                  ${participacion}

                </div>
                <hr class="mb-0">
              </div>
            `;
  
          }
  
        } else {
          td += 
            `
              <div class="d-flex flex-column pb-0">
  
                <div class="d-flex align-items-center mb-1">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>
  
                <div class="d-flex align-items-end">
                  <div class="">
                    
                      <span class="emp_post fw-bolder">Fecha</span><br>
                      <span class="emp_post text-nowrap">${fechaLecc}</span>
  
                  </div>
                  <div class="mx-2 text-center">
                  
                      <span class="emp_post fw-bolder">Asistencia</span><br>
  
                      <span class="badge rounded-pill badge-light-success">
                        Presente
                      </span>
                      
                  </div>
  
                  <div class="text-center">
                      
                      <span class="emp_post fw-bolder">Calificación</span><br>
                      ${calif}
  
                  </div>
                  ${participacion}

                </div>
                <hr class="mb-0">
              </div>
            `;
          
        }
        row.innerHTML = td;
        content.appendChild(row);
      }

      $('#tablaHistorialDetalles').append(content);
    });
  

    /*$('.borrar-btn').on('click', (e)=>{ 
      let data = e.target.childNodes[1];
      data.submit()
    });
  
    $('.congelar-estudiante').on('click', (e)=>{
      console.log(e.target)
      let form = e.target;
      form.submit();
    });
    
    $('.eliminar-estudiante-grupo').on('click', (e)=>{
      console.log(e.target)
      let form = e.target;
    });*/
  });
}

FetchData(1)
FetchData(3) // * ASISTENCIAS
FetchData(4) // * NOTAS
FetchData(5) // * PARTICIPACION
