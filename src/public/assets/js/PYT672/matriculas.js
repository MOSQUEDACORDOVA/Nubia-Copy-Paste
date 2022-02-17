let matriculaTable = $(".matricula");
var grupos = $("#arrayGrupos").val();
var estudiantes = $("#arrayEstudiantes").val();

var estudiantesParsed = "";
function cargarTablaMatricula(editada) {
  if (editada) {
    estudiantesParsed = JSON.parse(estudiantes);
    grupos = JSON.parse(grupos);
  } else {
    estudiantesParsed = JSON.parse(estudiantes.replace(/&quot;/g, '"'));
    grupos = JSON.parse(grupos.replace(/&quot;/g, '"'));
  }
  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // --------------------------------------------------------------------
  console.log(estudiantesParsed);
  console.log(grupos);
  if (matriculaTable.length) {
    var tableMatr = matriculaTable.DataTable({
      ordering: false,
      paging: false,
      data: estudiantesParsed,
      columns: [
        { data: "nombre" },
        { data: "email" }, // used for sorting so will hide this column
        { data: "grupoId" },
        { data: "vendedores" },
        { data: "estado" },
        {
          // Actions
          targets: -1,
          title: "Acciones",
          orderable: false,
          render: function (data, type, full, meta) {
            let congelado = "",
              añadirGrupo = "";
            if (full["grupo"] !== null) {
              if (full["estado"]["id"] === 1) {
                congelado = `
                  <a class="dropdown-item" href="#">
                    <form action="/congelarestudiantepy672" method="POST">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full["id"]}" required>
                        Congelar
                    </form>
                  </a>
                  <a class="dropdown-item eliminar-estudiante" href="#">
                    <form action="/borrarestudiantespy672" method="POST" id="form${
                      full["id"]
                    }">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${
                          full["id"]
                        }" required>
                        Eliminar Alumno
                    </form>
                </a>
                  <a class="dropdown-item eliminar-estudiante-grupo d-none" href="#">
                    <form action="/eliminarestudiantedegrupopy672" method="POST">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full["id"]}" required>
                        Eliminar de Grupo
                    </form>
                  </a>`;
              } else {
                congelado = `
                <a class="dropdown-item" href="#">
                  <form action="/activarestudiantecongeladopy672" method="POST">
                      <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full["id"]}" required>
                      Activar
                  </form>
                </a>
                <a class="dropdown-item eliminar-estudiante" href="#">
                    <form action="/borrarestudiantespy672" method="POST" id="form${
                      full["id"]
                    }">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${
                          full["id"]
                        }" required>
                        Eliminar Alumno
                    </form> 
                </a>
                <a class="dropdown-item eliminar-estudiante-grupo d-none" href="#">
                <form action="/eliminarestudiantedegrupopy672" method="POST">
                    <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full["id"]}" required>
                    Eliminar de Grupo
                  </form>
                </a>`;
              }
            } else {
              congelado = `
                <a class="dropdown-item" href="#">
                    Añadir Grupo
                </a>`;
            }
            var arrData = encodeURIComponent(JSON.stringify(full));

            return `<div class="d-inline-flex align-items-center">
                <div role="button" class="text-primary edit-btn-alumno me-1" data-bs-id="${
                  full["id"]
                }">
                ${feather.icons["edit"].toSvg()}
                </div>
                <div class="">
                    <a href="#" class="dropdown-toggle text-center text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown">
                      ${feather.icons["more-vertical"].toSvg()}
                    </a>
                    <div class="dropdown-menu congelar-estudiante" aria-labelledby="dropdownMenuButton" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 40px);">
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#createAppModal" data-bs-arrData="${arrData}">
                          Traslado
                        </a>
                        ${añadirGrupo}
                        ${congelado}
                    </div>
                </div>
              </div>`;
          },
        },
      ],
      columnDefs: [
        {
          targets: 0,
          render: function (data, type, full) {
            let nombreAlumno = full.nombre;
            return nombreAlumno;
          },
        },
        {
          targets: 2,
          render: function (data, type, full) {
            let grupo;
            if (full["grupo"]) {
              grupo = `
            <div class="badge-wrapper me-1">
                <span class="badge rounded-pill badge-light-primary">${full["grupo"]["identificador"]}</span>
            </div>`;
            } else {
              grupo = `
            <div class="badge-wrapper me-1">
                <span class="badge rounded-pill badge-light-secondary">No pertenece a un grupo</span>
            </div>`;
            }

            return grupo;
          },
        },
        {
          targets: 3,
          render: function (data, type, full) {
            let vendedor =
              '<span class="badge badge-light-info">Sin Vendedor</span>';
            /*if(inicio === null) {
                  inicio = '<span class="badge badge-light-danger">No Establecida</span>'
              } else {
                  inicio = `<span class="badge badge-light-primary">${inicio}</span>`;
              }*/
            return vendedor;
          },
        },
        {
          targets: 4,
          render: function (data, type, full) {
            let estado;
            if (full["estado"]["id"] === 1) {
              estado = `
                <div class="badge-wrapper me-1">
                  <span class="badge rounded-pill badge-light-success">${full["estado"]["estado"]}</span>
                </div>
              `;
            } else if (full["estado"]["id"] === 5) {
              estado = `
                <div class="badge-wrapper me-1">
                  <span class="badge rounded-pill badge-light-danger">${full["estado"]["estado"]}</span>
                </div>
              `;
            }

            return estado;
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 5,
      lengthMenu: [5, 10, 25, 50, 75, 100],
      language: {
        decimal: "",
        emptyTable: "No existen alumos",
        info: "Total _TOTAL_ alumnos",
        infoEmpty: "Total _TOTAL_ alumnos",
        infoFiltered: "(Filtrado de _MAX_ alumnos totales)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "Mostrar _MENU_ Entradas",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
    });
    $("div.head-label").html('<h6 class="mb-0">Alumnos inscritos</h6>');
    document.getElementById("matricula_info").classList.add("py-2");
    document
      .getElementById("matricula_info")
      .parentElement.parentElement.classList.add("align-items-center");
  }
}

$(function () {
  "use strict";
  cargarTablaMatricula();

  $(".odd").addClass("selector");
  $(".even").addClass("selector");

  $(".edit-btn-alumno").on("click", (e) => {
    let data = e.currentTarget["dataset"]["bsId"];
   console.log(data)
  
   let filterStudiante =estudiantesParsed.filter(element => element.id == data)
   console.log(filterStudiante);
   $('#edit-title-modal').text('Editar Alumno')
   $('#formregalumno').removeAttr('action')

   $('#formregalumno').attr('action','/edit-estudiantepy627')
   $('#grupos-edit').addClass('d-none')
   $('#id-alumno-edit').append(`<input type="text" value="${filterStudiante[0]['id']}" name="id_estudiante">`)

$('#name-for-edit').val(`${filterStudiante[0]['nombre']}`)
 if (filterStudiante[0]['tipoEstudianteId']==1) {
   $('#inlineRadio1').prop('checked', true);

 }else{
  $('#inlineRadio2').prop('checked', true);
 }

$('#nacionalDni').val(`${filterStudiante[0]['nro_identificacion']}`)
$('#fecha-nacimiento-edit').val(`${filterStudiante[0]['fecha_nacimiento']}`)
$(`#genero-edit option[value='${filterStudiante[0]['genero']}']`).attr("selected", true);
$("#genero-edit").val(`${filterStudiante[0]['genero']}`).trigger('change');

//$('#tlf1Check').val()
$('#inputTlf1').val(`${filterStudiante[0]['telefono1']}`)

//$('#tlf2Check').val()
$('#inputTlf2').val(`${filterStudiante[0]['telefono2']}`)

$('#email-edit').val(`${filterStudiante[0]['email']}`)

$(`#vendedor-edit option[value='Isaac']`).attr("selected", true);
$("#vendedor-edit").val('Isaac').trigger('change');
console.log(filterStudiante[0]['provincia'])
$(`#select-provincia option[value='${filterStudiante[0]['provincia']}']`).attr("selected", true);
$("#select-provincia").val(`${filterStudiante[0]['provincia']}`).trigger('change');

$(`#select-canton option[value='${filterStudiante[0]['canton']}']`).attr("selected", true);
$("#select-canton").val(`${filterStudiante[0]['canton']}`).trigger('change');

$(`#select-distrito option[value='${filterStudiante[0]['distrito']}']`).attr("selected", true);
$("#select-distrito").val(`${filterStudiante[0]['distrito']}`).trigger('change');

$('#btn-submit-form-estudiante').val("Guardar")

   $('#registrarAlumno').modal('show')
  });

  $(".congelar-estudiante").on("click", (e) => {
    // console.log(e.target)
    let form = e.target;
    //  form.submit();
  });

  $(".eliminar-estudiante-grupo").on("click", (e) => {
    console.log(e.target);
    let form = e.target;
  });
  $(".eliminar-estudiante").on("click", (e) => {
    console.log(e.target);
    let form = e.target;
    form.submit();
  });

  $("#createAppModal").on("show.bs.modal", async function (e) {
    $('#guarda-grupoNew').addClass('d-none')
    var Array = e.relatedTarget["dataset"]["bsArrdata"];
    var my_object = JSON.parse(decodeURIComponent(Array));
    console.log(estudiantesParsed);
    console.log(my_object["grupo"]["identificador"]);
    $(`#nombreReagrupar`).text(`${my_object["nombre"]}`);
    $(`#tlfReagrupar`).text(
      `${my_object["telefono1"]} - ${my_object["telefono2"]}`
    );
    let filter_group_alumnos = estudiantesParsed.filter(
      (filter2) => filter2.grupo.id == my_object["grupo"]["id"]
    );
    console.log(filter_group_alumnos);

    $('#id_estudiante').val(my_object["id"])
     $('#nombre_reaginador').val(my_object["nombre"])
    $('#grupoId_actual').val(my_object["grupo"]["id"])

    $(`#grupoReag`).text(`${my_object["grupo"]["identificador"]}`);
    $(`.horarioreag`).text(`${my_object["grupo"]["dia_horario"]} `);
    $(`#tipogrupoReag`).text(
      `${my_object["grupo"]["nombre"]}- ${my_object["grupo"]["identificador"]}`
    );
    $(`#fechaPagoReag`).text(`${my_object["grupo"]["dia_pagos"]}`);
    $(`#cantAlumnos`).text(`${filter_group_alumnos.length}`);

    let inicio = moment(my_object["grupo"]["fecha_inicio"], "DD-MM-YYYY");
    let final = moment(my_object["grupo"]["fecha_finalizacion"], "DD-MM-YYYY");
    let diferencia2 = final.diff(inicio, "w");
    let tipo = my_object["grupo"]["nombre"];
    let leccionFecha, addf, leccionactual, fecha_ant, leccionFecha2,  leccionFecha3="",  html = "",  html2 = "",  j = "",   html3 = "";
      console.log(tipo)
      var leccionTrue = false,nLeccion
      var startDate = moment().startOf('week');
var endDate = moment().endOf('week');
console.log(startDate)
console.log(endDate)
      if (tipo == "Intensivo") {
          for (let i = 0; i < (diferencia2*2)+2; i++) {  
                if (i == 0) {
                leccionFecha = inicio;
                fecha_ant = inicio;
                leccionFecha2 = moment(leccionFecha).add(2, "d").format("YYYY-MM-DD");      
                html += `<div class="col-3" ">
                <div class="p-1 border-secondary rounded-1 " id="leccion${
                  i + 1
                }">Lección ${i + 1} <br> ${inicio.format("DD-MM-YYYY")} </div>
            </div>`;
              } else {
                addf = moment(leccionFecha, "DD-MM-YYYY");      
                fecha_ant = leccionFecha;                
              
                if (j==2) {
                  leccionFecha = moment(addf).add(5, "d").format("DD-MM-YYYY");
                }else{
                   leccionFecha = moment(addf).add(2, "d").format("DD-MM-YYYY");
                }
                 j =moment(leccionFecha, "DD-MM-YYYY").diff(moment(fecha_ant,'DD-MM-YYYY'), "d");
              
              }
              console.log('-----I')
              let fecha_consulta = moment(leccionFecha, "DD-MM-YYYY").format('"YYYY-MM-DD"')
              
              leccionactual = moment(fecha_consulta).isBetween(startDate, endDate);
              if (i > 0 && i < 12) {
                html += `<div class="col-3" ">
                <div class="p-1 border-secondary rounded-1 " id="leccion${
                  i + 1
                }">Lección ${i + 1} <br> ${leccionFecha} </div>
            </div>`;
              }
      
              if (i > 11 && i < 24) {
                html2 += `<div class="col-3" >
              <div class="p-1 border-secondary rounded-1" id="leccion${
                i + 1
              }">Lección ${i + 1} <br> ${leccionFecha}</div>
          </div>`;
              }
              if (i > 23 && i < 33) {
                html3 += `<div class="col-3" >
              <div class="p-1 border-secondary rounded-1" id="leccion${
                i + 1
              }">Lección ${i + 1} <br> ${leccionFecha}</div>
          </div>`;
              }
              if (leccionactual) {
                console.log(leccionactual)
                console.log(i + 1)
                 $(`#leccionActual`).text(i + 1);
              }
          }
        }else{
         for (let i = 0; i < (diferencia2)+1; i++) {  
              //32 SEMANAS
              if (i == 0) {
                leccionFecha = inicio;
                fecha_ant = inicio;
                leccionFecha2 = moment(leccionFecha).add(1, "w").format("YYYY-MM-DD");
              } else {
                addf = moment(leccionFecha, "DD-MM-YYYY");
                fecha_ant = leccionFecha;
                leccionFecha = moment(addf).add(1, "w").format("DD-MM-YYYY");
              }
              console.log('-----')
              let fecha_consulta = moment(leccionFecha, "DD-MM-YYYY").format('"YYYY-MM-DD"')              
              leccionactual = moment(fecha_consulta).isBetween(startDate, endDate);
                if (i == 0) {
              html += `<div class="col-3" ">
            <div class="p-1 border-secondary rounded-1 " id="leccion${
              i + 1
            }">Lección ${i + 1} <br> ${inicio.format("DD-MM-YYYY")} <br> ${leccionFecha3}</div>
        </div>`;
            }
            if (i > 0 && i < 12) {
              html += `<div class="col-3" >
            <div class="p-1 border-secondary rounded-1" id="leccion${
              i + 1
            }">Lección ${i + 1} <br> ${leccionFecha} <br> ${leccionFecha3}</div>
        </div>`;
            }
            if (i > 11 && i < 24) {
              html2 += `<div class="col-3" >
            <div class="p-1 border-secondary rounded-1" id="leccion${
              i + 1
            }">Lección ${i + 1} <br> ${leccionFecha} <br> ${leccionFecha3}</div>
        </div>`;
            }
            if (i > 23 && i < 33) {
              html3 += `<div class="col-3" >
            <div class="p-1 border-secondary rounded-1" id="leccion${
              i + 1
            }">Lección ${i + 1} <br> ${leccionFecha} <br> ${leccionFecha3}</div>
        </div>`;
            }
            
            if (leccionactual) {
              leccionTrue = true
        nLeccion =i + 1
               $(`#leccionActual`).text(i + 1);
            }        
      
          
          }  
        }
        if (leccionTrue) {
           $(`#leccionActual`).text(nLeccion);
        } else{
          $(`#leccionActual`).text(0);
        }
    $(`#1_12Line1`).empty();
    $(`#13_24Line1`).empty();
    $(`#25_32Line1`).empty();

    $(`#1_12Line1`).append(html);
    $(`#13_24Line1`).append(html2);
    $(`#25_32Line1`).append(html3);
    $(`.bg-success`).removeClass("bg-success");
    $(`#leccion${$("#leccionActual").text()}`).addClass("bg-success");

   var historial =  await fetch('/historia-caja-academy/'+my_object['id'])
     .then(response => response.json())
     .then(data => {
         console.log(data)
      return data.obtener_historia
     });
console.log(historial)
for (let i = 0; i < historial.length; i++) {
  if (historial[i]['concepto'] == "Traslado") {
    $('#guarda-grupoNew').removeClass('d-none')
  }
  
}
 /**fin carga modal alumno */ });

  $(`#selectGroup`).change((e) => {    
    console.log(e.target.value);
    if (e.target.value =="Grupos Disponibles") {
      $('#guarda-grupoNew').attr('disabled', true)
    }else{
      $('#guarda-grupoNew').removeAttr('disabled')
    }
    
    let filter_group = grupos.filter((filter) => filter.id == e.target.value);
    let filter_group_alumnos = estudiantesParsed.filter(
      (filter2) => filter2.grupo.id == e.target.value
    ).length;
    console.log(filter_group);
    console.log(filter_group_alumnos);

    //$(`#grupoReag`).text(`${filter_group[0]["identificador"]}`);
   // $(`.horarioreag`).text(`${filter_group[0]["dia_horario"]} `);
    $(`#tipogrupoReag`).text(
      `${filter_group[0]["nombre"]}- ${filter_group[0]["identificador"]}`
    );
    $(`#fechaPagoReag`).text(`${filter_group[0]["dia_pagos"]}`);
    $(`#cantAlumnos`).text(`${filter_group_alumnos}`);
    let tipo = filter_group[0]["nombre"];
    let inicio = moment(filter_group[0]["fecha_inicio"], "DD-MM-YYYY");
    let final = moment(filter_group[0]["fecha_finalizacion"], "DD-MM-YYYY");
    let diferencia2 = final.diff(inicio, "w");
    
    let leccionFecha, addf, leccionactual, fecha_ant, leccionFecha2, leccionFecha3="",  html = "",  html2 = "",  j = "",  html3 = "";   
   let dia = (filter_group[0]["dia_horario"]).split(':')
       dia = dia[0].toString()
       dia = dia.split('y')   
var leccionTrue = false,nLeccion
var startDate = moment().startOf('week');
var endDate = moment().endOf('week');
let hoy = moment().locale('es').format('dddd')
if (tipo == "Intensivo") {
       console.log(dia)
  console.log((diferencia2*2)+1)
    for (let i = 0; i < (diferencia2*2)+2; i++) {  
          if (i == 0) {
          leccionFecha = inicio;
          fecha_ant = inicio;
          leccionFecha2 = moment(leccionFecha).add(1, "2").format("YYYY-MM-DD");
          html += `<div class="col-3" ">
          <div class="p-1 border-secondary rounded-1 " id="leccion${
            i + 1
          }">Lección ${i + 1} <br> ${inicio.format("DD-MM-YYYY")} </div>
      </div>`;
        } else {
          addf = moment(leccionFecha, "DD-MM-YYYY");
          fecha_ant = leccionFecha;                 
          if (j==2) {
            leccionFecha = moment(addf).add(5, "d").format("DD-MM-YYYY");
          }else{
             leccionFecha = moment(addf).add(2, "d").format("DD-MM-YYYY");
          }
           j =moment(leccionFecha, "DD-MM-YYYY").diff(moment(fecha_ant,'DD-MM-YYYY'), "d");
        
        }
        console.log('-----')
       let dia_fechaSelect = moment(leccionFecha,'DD-MM-YYYY').locale('es').format('dddd')
        let fecha_consulta = moment(leccionFecha, "DD-MM-YYYY").format('"YYYY-MM-DD"')

        leccionactual = moment(fecha_consulta).isBetween(startDate, endDate);
        if (i > 0 && i < 12) {
          html += `<div class="col-3" ">
          <div class="p-1 border-secondary rounded-1 " id="leccion${
            i + 1
          }">Lección ${i + 1} <br> ${leccionFecha} </div>
      </div>`;
        }

        if (i > 11 && i < 24) {
          html2 += `<div class="col-3" >
        <div class="p-1 border-secondary rounded-1" id="leccion${
          i + 1
        }">Lección ${i + 1} <br> ${leccionFecha}</div>
    </div>`;
        }
        if (i > 23 && i < 33) {
          html3 += `<div class="col-3" >
        <div class="p-1 border-secondary rounded-1" id="leccion${
          i + 1
        }">Lección ${i + 1} <br> ${leccionFecha}</div>
    </div>`;
        }
        if (leccionactual) {
          if (leccionFecha) {
            
          }
          leccionTrue = true
          nLeccion =i + 1
           $(`#leccionActual`).text(i + 1);
        }
    }
  }else{
   for (let i = 0; i < (diferencia2)+1; i++) {  
        //32 SEMANAS
        if (i == 0) {
          leccionFecha = inicio;
          fecha_ant = inicio;
          leccionFecha2 = moment(leccionFecha).add(1, "w").format("YYYY-MM-DD");
        } else {
          addf = moment(leccionFecha, "DD-MM-YYYY");
          fecha_ant = leccionFecha;
          leccionFecha = moment(addf).add(1, "w").format("DD-MM-YYYY");
        }
        let fecha_consulta = moment(leccionFecha, "DD-MM-YYYY").format('"YYYY-MM-DD"')
        
        leccionactual = moment(fecha_consulta).isBetween(startDate, endDate);
          if (i == 0) {
        html += `<div class="col-3" ">
      <div class="p-1 border-secondary rounded-1 " id="leccion${
        i + 1
      }">Lección ${i + 1} <br> ${inicio.format("DD-MM-YYYY")} <br> ${leccionFecha3}</div>
  </div>`;
      }
      if (i > 0 && i < 12) {
        html += `<div class="col-3" >
      <div class="p-1 border-secondary rounded-1" id="leccion${
        i + 1
      }">Lección ${i + 1} <br> ${leccionFecha} <br> ${leccionFecha3}</div>
  </div>`;
      }
      if (i > 11 && i < 24) {
        html2 += `<div class="col-3" >
      <div class="p-1 border-secondary rounded-1" id="leccion${
        i + 1
      }">Lección ${i + 1} <br> ${leccionFecha} <br> ${leccionFecha3}</div>
  </div>`;
      }
      if (i > 23 && i < 33) {
        html3 += `<div class="col-3" >
      <div class="p-1 border-secondary rounded-1" id="leccion${
        i + 1
      }">Lección ${i + 1} <br> ${leccionFecha} <br> ${leccionFecha3}</div>
  </div>`;
      }
      
      if (leccionactual) {
        leccionTrue = true
        nLeccion =i + 1
         $(`#leccionActual`).text(i + 1);
      } 
    }  
  }
  if (leccionTrue) {
     $(`#leccionActual`).text(nLeccion);
  } else{
    $(`#leccionActual`).text(0);
  }
  
    $(`#1_12Line1`).empty();
    $(`#13_24Line1`).empty();
    $(`#25_32Line1`).empty();

    $(`#1_12Line1`).append(html);
    $(`#13_24Line1`).append(html2);
    $(`#25_32Line1`).append(html3);
    $(`.bg-success`).removeClass("bg-success");
    $(`#leccion${$("#leccionActual").text()}`).addClass("bg-success");

$('#grupoId').val(e.target.value)

  /**end of select group */});

}); //END OF READY FUNCTION

$('#guarda-grupoNew').click(()=>{
  
  
  if ($('#grupoId_actual').val() == $('#grupoId').val()) {
    swal.fire('El grupo actual y el seleccionado son el mismo, elija otro grupo')
    return
  }
  $('#form-reasignar-grupo').submit()
})