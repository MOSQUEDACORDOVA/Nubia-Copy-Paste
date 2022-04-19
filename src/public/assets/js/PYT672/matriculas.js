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
        { data: "usuario.nombre" },
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
                    <form action="/borrarestudiantespy672" method="POST" id="form${full["id"]}">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full["id"]}" required>
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
                    <form action="/borrarestudiantespy672" method="POST" id="form${full["id"]}">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full["id"]}" required>
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
            let vendedores = data
            if (data == null) {
              vendedores = 'Sin vendedor'
            }
            let vendedor =
              `<span class="badge badge-light-info">${vendedores}</span>`;
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
                  <span class="badge rounded-pill bg-dark">${full["estado"]["estado"]}</span>
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
    $("div.head-label").html('<h4 class="mb-0">Alumnos inscritos</h4>');
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
    let filterStudiante = estudiantesParsed.filter(
      (element) => element.id == data
    );
    console.log(filterStudiante);
    $("#edit-title-modal").text("Editar Alumno");
    $("#formregalumno").removeAttr("action");

    $("#formregalumno").attr("action", "/edit-estudiantepy627");
    $("#grupos-edit").addClass("d-none");
    $("#id-alumno-edit").append(
      `<input type="text" value="${filterStudiante[0]["id"]}" name="id_estudiante">`
    );

    $("#name-for-edit").val(`${filterStudiante[0]["nombre"]}`);
    if (filterStudiante[0]["tipoEstudianteId"] == 1) {
      $("#inlineRadio1").prop("checked", true);
    } else {
      $("#inlineRadio2").prop("checked", true);
    }

    $("#nacionalDni").val(`${filterStudiante[0]["nro_identificacion"]}`);
    $("#fecha-nacimiento-edit").val(
      `${filterStudiante[0]["fecha_nacimiento"]}`
    );
    $(`#genero-edit option[value='${filterStudiante[0]["genero"]}']`).attr(
      "selected",
      true
    );
    $("#genero-edit").val(`${filterStudiante[0]["genero"]}`).trigger("change");

    //$('#tlf1Check').val()
    $("#inputTlf1").val(`${filterStudiante[0]["telefono1"]}`);

    //$('#tlf2Check').val()
    $("#inputTlf2").val(`${filterStudiante[0]["telefono2"]}`);

    $("#email-edit").val(`${filterStudiante[0]["email"]}`);
    let vendedor
      if (filterStudiante[0]["usuario"] != null) {
        vendedor =filterStudiante[0]["usuario"]["id"]
      }
    $(`#vendedor-edit option[value='${vendedor}']`).attr("selected", true);
    $("#vendedor-edit").val(`${vendedor}`).trigger("change");
    $(
      `#select-provincia option[value='${filterStudiante[0]["provincia"]}']`
    ).attr("selected", true);
    $("#select-provincia")
      .val(`${filterStudiante[0]["provincia"]}`)
      .trigger("change");

    $(`#select-canton option[value='${filterStudiante[0]["canton"]}']`).attr(
      "selected",
      true
    );
    $("#select-canton")
      .val(`${filterStudiante[0]["canton"]}`)
      .trigger("change");

    $(
      `#select-distrito option[value='${filterStudiante[0]["distrito"]}']`
    ).attr("selected", true);
    $("#select-distrito")
      .val(`${filterStudiante[0]["distrito"]}`)
      .trigger("change");

    $("#btn-submit-form-estudiante").val("Guardar");

    $("#registrarAlumno").modal("show");
  });

  $(".congelar-estudiante").on("click", (e) => {
    if (!e.target.classList.contains('dropdown-item')) {
      e.target.submit()
    }
  });

  $(".eliminar-estudiante-grupo").on("click", (e) => {
    let form = e.target;
  });
  $(".eliminar-estudiante").on("click", (e) => {
    let form = e.target;
    form.submit();
  });

  $("#createAppModal").on("show.bs.modal", async function (e) {
    $("#guarda-grupoNew").addClass("d-none");
    var Array = e.relatedTarget["dataset"]["bsArrdata"];
    var my_object = JSON.parse(decodeURIComponent(Array));
    console.log(my_object["grupo"]);
    $(`#nombreReagrupar`).text(`${my_object["nombre"]}`);
    $(`#tlfReagrupar`).text(
      `${my_object["telefono1"]} - ${my_object["telefono2"]}`
    );
    let filter_group_alumnos = estudiantesParsed.filter(
      (filter2) => filter2.grupo.id == my_object["grupo"]["id"]
    );

    $("#id_estudiante").val(my_object["id"]);
    $("#nombre_reaginador").val(my_object["nombre"]);
    $("#grupoId_actual").val(my_object["grupo"]["id"]);

    $(`#grupoReag`).text(`${my_object["grupo"]["identificador"]}`);
    $(`.horarioreag`).text(`${my_object["grupo"]["dia_horario"]} `);
    $(`#profesorreag`).text(`${my_object["grupo"]["usuario"]["nombre"]} `);
    $(`#tipogrupoReag`).text(
      `${my_object["grupo"]["nombre"]}- ${my_object["grupo"]["identificador"]}`
    );
    $(`#fechaPagoReag`).text(`${my_object["grupo"]["dia_pagos"]}`);
    $(`#cantAlumnos`).text(`${filter_group_alumnos.length}`);
//NOTAS Y PARTICIPACION
var notas,nota_participacion,ausencias, comentarios;
notas = await fetch("/notas-titulo-academy/" + my_object["id"])
.then((response) => response.json())
.then((data) => {
  return data.obtener_notas;
});
nota_participacion= await fetch("/participacion-titulo-academy/" + my_object["id"])
.then((response) => response.json())
.then((data) => {
return data.obtener_participacion;
});
ausencias = await fetch("/ausencias-titulo-academy/" + my_object["id"])
.then((response) => response.json())
.then((data) => {
return data.obtener_ausencias;
});
let total_nota = 0
for (let i = 0; i < notas.length; i++) {
if (notas[i]['nota'] == 'undefined') {
  total_nota += 0;
}else{
  total_nota += parseInt(notas[i]['nota']);
}     
}
let asistencias = 32-parseInt(ausencias.length);
let porcentaje_asist = (asistencias * 100)/32;
$('#calificacionT').text(`${total_nota}%`)
$('#asistenciareag').text(`${porcentaje_asist.toFixed(2)}%`)

    let inicio = moment(my_object["grupo"]["fecha_inicio"], "DD-MM-YYYY");
    let final = moment(my_object["grupo"]["fecha_finalizacion"], "DD-MM-YYYY");
    let diferencia2 = final.diff(inicio, "w");
    let tipo = my_object["grupo"]["nombre"];    
    let numLeccion;
    let fechaActual = moment().format("DD-MM-YYYY");
    let fechaInicio = moment(my_object["grupo"]["fecha_inicio"], "DD-MM-YYYY").format("DD-MM-YYYY");
    let diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days');
    let rest; 

    if(my_object["grupo"]["lecciones_semanales"] === '1') {
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

    if (numLeccion) {
      $(`#leccionActual0`).text(numLeccion);
    } else {
      $(`#leccionActual0`).text(0);
    }

    $(`.bg-success`).removeClass("bg-success");
    $(`#leccion${$("#leccionActual0").text()}`).addClass("bg-success");
    $(`#leccion_actual_reasig`).val($("#leccionActual0").text());
    var historial = await fetch("/historia-caja-academy/" + my_object["id"])
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data.obtener_historia;
      });
      if (historial.length == 0) {
        $('#countGrupos').text('0')

        await leccionActualGrupos();
      } else {
            for (let i = 0; i < historial.length; i++) {
      var hora_registro_pago = moment(historial[i]["createdAt"]);
      console.log(moment().isAfter(hora_registro_pago, "d"))
      if (
        historial[i]["concepto"] == "Traslado" &&
        moment().isAfter(hora_registro_pago, "d") == false        
      ) {
        $("#guarda-grupoNew").removeClass("d-none");
       await leccionActualGrupos(); 
      }else{
          $('#countGrupos').text('0')

await leccionActualGrupos();
      }
    }
      }

    comentarios = await fetch("/comentarios-academy/" + my_object["id"])
.then((response) => response.json())
.then((data) => {
  return data.obtener_comentarios;
});
console.log(comentarios)
for (let i = 0; i < comentarios.length; i++) {
 $('#accordionMargin').append(`<div class="accordion-item">
 <h2 class="accordion-header" id="headingMargin${comentarios[i].n_leccion}">
   <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
     data-bs-target="#accordionMargin${comentarios[i].n_leccion}" aria-expanded="false" aria-controls="accordionMargin${comentarios[i].n_leccion}">
     Comentarios Leccion ${comentarios[i].n_leccion}
   </button>
 </h2>
 <div id="accordionMargin${comentarios[i].n_leccion}" class="accordion-collapse collapse" aria-labelledby="headingMargin${comentarios[i].n_leccion}"
   data-bs-parent="#accordionMargin" style="">
   <div class="accordion-body">
     <div class="row">
       <div class="col-6">
         <div class="mb-1">
           <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
           <textarea class="form-control commentProf" id="comentP47" rows="1" placeholder="${comentarios[i].commentProfForm}" data-id="47" readonly></textarea>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>`)
}
  /** CARGAR COMENTARIOS DEL ADMINISTREADOR */
    $('#commentAdmin').empty()
    let id_alumno = $("#id-alumno-form").val();
       let comentariosA = await fetch("/comentarios_admin_get-academy/" + my_object["id"])
          .then((response) => response.json())
          .then((data) => {
            return data.obtener_comentarios;
          });
          console.log(comentariosA)
          for (let i=0; i < comentariosA.length; i++){
            $('#commentAdmin').append(`          
            <div class="col-12">
             <div class="mb-1">
               <label class="form-label" for="exampleFormControlTextarea1">Comentario del ${moment(comentariosA[i].createdAt).format('DD/MM/YYYY')}</label>
               <textarea class="form-control" id="coment${comentariosA[i].id}" rows="1" data-id="47" readonly>${comentariosA[i].commentAdminForm}</textarea>
             </div>
           </div>`)                        
        }
    /**fin carga modal alumno */
  });

}); //END OF READY FUNCTION

$("#guarda-grupoNew").click(() => {
  if ($("#grupoId_actual").val() == $("#grupoId").val()) {
    swal.fire(
      "El grupo actual y el seleccionado son el mismo, elija otro grupo"
    );
    return;
  }
  $("#form-reasignar-grupo").submit();
});

const leccionActualGrupos = async () => {
  
  $('#grupos_table').dataTable().fnDestroy();
  $('#grupos_table').empty();
  $('#grupos_table').html(`<thead>
  <tr>
      <th></th>
      <th>Tipo</th>
      <th>Leccion Actual</th>
      <th>Horario</th>
      <th>Fecha Pago</th>
      <th>Alumnos</th>
      <th>Profesor</th>
  </tr>
</thead><tbody id="gruposAct">
                                      
</tbody>`);
  console.log("Entro aqui");
  $(`#gruposAct`).empty();
  var grupoActual = $("#leccion_actual_reasig").val(),
  numLeccion;
  var jjaa;
  var gruposAct = [];
  let fstChar = ($("#grupoReag").text()).charAt(0);
  console.log(fstChar)
  for (let i = 0; i < grupos.length; i++) {
    let tipo = grupos[i]["nombre"];
    let inicio = moment(grupos[i]["fecha_inicio"], "DD-MM-YYYY");
    let final = moment(grupos[i]["fecha_finalizacion"], "DD-MM-YYYY");
    let diferencia2 = final.diff(inicio, "w");
    let dia = grupos[i]["dia_horario"].split(":");
    dia = dia[0].toString();
    dia = dia.split("y");
    let fechaInicio = moment(grupos[i]["fecha_inicio"], "DD-MM-YYYY").format("DD-MM-YYYY");
    let diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), 'days');
    let rest; 
    if(grupos[i]["lecciones_semanales"] === '1') {
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
    console.log(numLeccion)
    if (numLeccion) {
      jjaa = numLeccion;
    } else {
      jjaa = 0;
    }
    
    if (parseInt(jjaa) > parseInt(grupoActual)) {
      // $('#selectGroup option[value="' + grupos[i]["id"] + '"]').attr(
      //   "disabled",
      //   true
      // );
      console.log('000000')
    } else {
      let fstChar2 = (grupos[i]["identificador"]).charAt(0);
      console.log(fstChar2)

      if ($("#grupoReag").text() == grupos[i]["identificador"]) {
        console.log("mismo grupo");
      } else {
        console.log("other grupo");
        console.log(jjaa);
        let filter_group_alumnos = estudiantesParsed.filter(
          (filter2) => filter2.grupo.id == grupos[i]["id"]
        ).length;
        gruposAct.push(grupos[i]);
        if (fstChar == "C" &&  fstChar2 == "I" || fstChar == "I" &&  fstChar2 == "C" || fstChar == "C" &&  fstChar2 == "C" || fstChar == "I" &&  fstChar2 == "I") {
          $(`#gruposAct`).append(`<tr>
      <td><div class="form-check"> <input class="form-check-input dt-checkboxes grupoSelected" name="grupoSelected" type="radio" value="${grupos[i]["id"]}" id="checkbox${grupos[i]["id"]}" onclick="grupoSelected(this.value)"/><label class="form-check-label" for="checkbox${grupos[i]["id"]}"></label></div></td>
      <td>${grupos[i]["identificador"]}</td>
      <td style="text-align: center;">${jjaa}</td>
      <td>${grupos[i]["dia_horario"]}</td>
      <td>${grupos[i]["dia_pagos"]}</td>
      <td style="text-align: center;">${filter_group_alumnos}</td>
      <td>${grupos[i]["usuario"]['nombre']}</td>
  </tr>`);
        }
  
        if (fstChar == "N" &&  fstChar2 == "N") {
          $(`#gruposAct`).append(`<tr>
      <td><div class="form-check"> <input class="form-check-input dt-checkboxes grupoSelected" name="grupoSelected" type="radio" value="${grupos[i]["id"]}" id="checkbox${grupos[i]["id"]}" onclick="grupoSelected(this.value)"/><label class="form-check-label" for="checkbox${grupos[i]["id"]}"></label></div></td>
      <td>${grupos[i]["identificador"]}</td>
      <td>${jjaa}</td>
      <td>${grupos[i]["dia_horario"]}</td>
      <td>${grupos[i]["dia_pagos"]}</td>
      <td>${filter_group_alumnos}</td>
      <td>${grupos[i]["usuario"]['nombre']}</td>
  </tr>`);
        }
      }
    }
    $("#countGrupos").text("0");
    $("#countGrupos").text(gruposAct.length);
  }
  var dt_gruposActi = $("#grupos_table");  
  dt_gruposActi.DataTable({"bPaginate": false, "bFilter": false, "bInfo": false,order: [[2, 'desc']] })
};
function grupoSelected(valor) {
  $("#grupoId").val(valor);
  $("#guarda-grupoNew").removeAttr("disabled");
}

let formCargarArchivos = document.getElementById('formCargarArchivos')

formCargarArchivos.addEventListener('submit', e => {
  e.preventDefault();
  /*let grupoId = document.querySelector('#formCargarArchivos .grupoId')
  grupoId.value = document.querySelector('#grupoIdCargarArchivo').value*/
  //formCargarArchivos.submit()
});

// * FUNCION CARGAR ARCHIVOS EXCEL

let linkExcel = "", file;
  $('#archivoExcel').on('change', (event)=>{
    subirImagen(event)
  })
  
  $('#grupoIdCargarArchivo').on('change', (event)=>{
    EnviarDatos()
  })
  
  /*$('#vendedorIdSelect').on('change', (event)=>{
    EnviarDatos()
  })*/

  const subirImagen = (event) => {
    //$(`#loading3`).addClass("display");
    console.log('aqui')
      const archivos = event.target.files;
      const data = new FormData();
      let imagenX = event.target.id;
      data.append("archivo", archivos[0]);
      $.ajax({
        url: '/subirExcel',
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data, textStatus, jqXHR)
        {       
          //console.log(data)     
          file = data.fileName
          linkExcel = "/cargarExcel/"+ $('#grupoIdCargarArchivo').val() +"/"+file+"/"

          EnviarDatos("Alumnos guardados")
          
          /*$(`#progressBar1`).text('Se cargó correctamente la imágen - 100%');
          setTimeout(() => {
            $(`#progressBar1`).addClass("d-none");
            $(`#loading3`).removeClass("display");
          }, 1000)*/
        },
        error: function (jqXHR, textStatus) { 
          EnviarDatos("Lo sentimos, algo ah ocurrido al realizar la acción")
          /*$("#progressBar1").text('100% - Error al cargar el archivo');
          $("#progressBar1").removeClass("progress-bar-success");
          $("#progressBar1").addClass("progress-bar-danger");*/
        }
      });
    };

  function EnviarDatos(text) {
    if(text) {
      linkExcel = "/cargarExcel/"+ $('#grupoIdCargarArchivo').val() +"/"+file+"/"+text
      window.location.href = linkExcel
    }
  }

let interval = '', idUser = $('#idUser').val()
//console.log(idUser)
if (idUser != '' && parseInt(idUser)) {
  localStorage.setItem('idUser', idUser);
  //console.log("guardado")
}

interval = setInterval(() => {
  if (document.readyState === "complete") {
    const result = localStorage.getItem('idUser')
    /*console.log(result)
    console.log("RESULT")*/
    if (result != null && parseInt(result)) {
      localStorage.removeItem('idUser')
      window.location.href = "/comprobante/"+result
    }
    clearInterval(interval);
  }
}, 300);