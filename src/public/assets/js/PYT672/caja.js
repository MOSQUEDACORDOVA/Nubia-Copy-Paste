
var historial;
var grupos = JSON.parse($("#arrayGrupos").val());
var matricula = JSON.parse($("#matricula_st").val());
let idAlumno, idGrupo, gruposTodos;

$(function () {
  function FetchData (num) {
    gruposTodos = fetch('/obtenerGruposAll')
        .then(response => response.json())
        .then(data => {
            gruposTodos = data;

            moment.locale('es');
            gruposTodos.forEach(item => {
                let format = moment(item.fecha_inicio, "DD-MM-YYYY").format("D MMM YYYY");
                $('#gruposMenu').append(`<option value="${item.id}">${item.identificador} - ${item.dia_horario} - ${format}</option>`);
            });
            $('#gruposMenu').trigger("change");
            return data
        });
  }

  FetchData()

  var today_day = moment().format("D"),
    hoy = moment();

  /**FUNCIONES AL SELECCIONAR EL ALUMNO */
  $(".alumno-select").change(async (e) => {
    $('#totalMonto').text(0)

    $("#btnComentarios").removeAttr("disabled");
    $("#btnControl").removeAttr("disabled");
    $("#btnTrasladar").removeAttr("disabled");

    $("#btn-add-commnet").removeAttr("disabled");
    $("#btn-trasladar-alumno").removeAttr("disabled");
    $("#btn-congelar-alumno").removeAttr("disabled");
    $("#add_pago-btn").removeAttr("disabled");
    $("#btn-guardar-pago").removeAttr("disabled");
    $("#select-servicio").removeAttr("disabled");
    $("#btn-activar-alumno").addClass("d-none");
    var filter = matricula.filter((element) => element.id == e.target.value);
    $("#historial-list").empty();
    $("#body-table-pago").empty();
    $("#form-reg-pago").empty();
    //console.log(filter)
    let grupoIdentif = gruposTodos.filter(grupo => grupo.id === filter[0].grupoId)

    $("#nombre-alumno").text(filter[0]["nombre"]);
    $("#nivel-grupo-alumno").text(filter[0]["grupo"] ? filter[0]["grupo"]["codigo_nivel"] : "");

    $("#grupo-alumno").text(grupoIdentif[0].identificador);

    $("#horario-alumno").text(filter[0]["grupo"]["dia_horario"]);

    let prof = filter[0].grupo.usuarioId ? filter[0].grupo.usuario.nombre : 'No asignado'

    $("#profesor-alumno").text(prof);

    $('#estado-alumno').addClass('d-none')
    $('#estado-congelado-alumno').addClass('d-none')
    if (filter[0]["estadoId"] === 1) {
      $('#estado-alumno').text(filter[0]["estado"]["estado"])
      $('#estado-alumno').removeClass('d-none')
    } else {
      $('#estado-congelado-alumno').text(filter[0]["estado"]["estado"])
      $('#estado-congelado-alumno').removeClass('d-none')
    }

    $("#telefonos-alumno").text(
      filter[0]["telefono1"] + " - " + filter[0]["telefono2"]
    );
    $("#fecha-pago-alumno").text(filter[0]["grupo"]["dia_pagos"]);
    let dias_pago = filter[0]["grupo"]["dia_pagos"].split(" ");

    /**OBTENER HISTORIAL DE CAJA */
    historial = await fetch("/historia-caja-academy/" + filter[0]["id"])
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_historia;
      });
    console.log(filter[0])
    if (filter[0]["estadoId"] === 5) {
      $("#form-reg-pago").append(
        `<input type="text" name="id_alumno" id="id-alumno-form" value="${filter[0]["id"]}">`
      );
      $("#add_pago-btn").attr("disabled", true);
      $("#btn-guardar-pago").attr("disabled", true);
      $("#btn-trasladar-alumno").attr("disabled", true);
      $("#select-servicio").attr("disabled", true);
      $("#btn-congelar-alumno").addClass("d-none");
      $("#btn-activar-alumno").removeClass("d-none");
      updateHistorial(e.target.value);
      Swal.fire({
        title: 'Alumno congelado!',
        icon: 'info',
      })
      reactivacion();
      return;
    } else {
      $("#btn-congelar-alumno").removeClass("d-none");
      $("#btn-activar-alumno").addClass("d-none");
    }
    let fecha_pago_historial,
      pago_mensualidad = [];
    let mensualidad_coste;

    if (filter[0]["grupo"]["nombre"] == "Intensivo") {
      mensualidad_coste = "29000";
    } else {
      mensualidad_coste = "17000";
    }

    if (today_day <= dias_pago[0]) {
      $("#mensualidad-alumno").text(mensualidad_coste);
      /**FORM */
      $("#form-reg-pago").append(
        `<input type="text" name="id_alumno" id="id-alumno-form" value="${filter[0]["id"]}">`
      );
      updateHistorial(e.target.value);
      verificareposicion(e.target.value);
      titulo('a');
      incripcion();
    } else {
      $("#mensualidad-alumno").text(mensualidad_coste);
      var filter_mensualidad = historial.filter(
        (element) =>
          element.concepto == "Mensualidad" &&
          element.matriculaId == filter[0]["id"]
      );
      if (filter_mensualidad.length < 1) {
        mes_a_pagar =
          hoy.locale("es").format("MMMM") +
          "-" +
          hoy.locale("es").format("YYYY");
          mes_a_pagarView =hoy.locale("es").format("MMMM") + "" +hoy.locale("es").format("YYYY");
      } else {
        var meses = [
          "enero",
          "febrero",
          "marzo",
          "abril",
          "mayo",
          "junio",
          "julio",
          "agosto",
          "septiembre",
          "octubre",
          "noviembre",
          "diciembre",
        ];
        var mes_a_pagar,mes_a_pagarView;
        let mes_pagado;
        mes_pagado = filter_mensualidad[0]["observacion"].split("-");
        for (let i = 0; i < meses.length; i++) {
          if (meses[i] == mes_pagado[0]) {
            mes_a_pagar = ""; ///meses[i + 1] + "-" + hoy.locale("es").format("YYYY");
            $("#form-reg-pago").append(
              `<input type="text" name="id_alumno" id="id-alumno-form" value="${filter[0]["id"]}">`
            );
            updateHistorial(e.target.value);
            verificareposicion(e.target.value);
            incripcion();
            titulo('a');
            return;
          }
          mes_a_pagar =
            hoy.locale("es").format("MMMM") +
            "-" +
            hoy.locale("es").format("YYYY");
            mes_a_pagarView =hoy.locale("es").format("MMMM") + "" +hoy.locale("es").format("YYYY");
        }
      }

      /**FORM */
      $("#form-reg-pago")
        .append(`<input type="text" name="id_alumno" id="id-alumno-form" value="${
        filter[0]["id"]
      }">
      <div id="mensualidad-${mes_a_pagar}" class="mensualidad-${mes_a_pagar}"><input type="text" name="concepto[]" id="concepto-form" value="Mensualidad">
      <!--<input type="text" name="fecha_pago[]" id="fecha_pago-form" value="${moment().format(
              "YYYY-MM-DD"
            )}">-->
      <input type="text" name="monto[]" id="monto-form" value="${mensualidad_coste}">
      <input type="text" name="mora[]" id="mora-form" value="-">
      <input type="text" name="observacion[]" id="observacion-form" class="mensualidad" value="${mes_a_pagar}">
      </div>`);
            /**FIN FORM */

            $("#mensualidad-alumno").text(mensualidad_coste);
            /**LLENAR TABLA */
            $("#body-table-pago").append(`<tr id="tr-mensualidad-${mes_a_pagar}">
      <td>
        <div class="d-flex align-items-center">
          <span class="fw-bold">Mensualidad</span><p class="text-capitalize mb-0">${mes_a_pagarView}</p>
        </div>
      </td>

      <td class="monto">${mensualidad_coste}</td>
      <td>
          <a class="item borrar mensualidad-${mes_a_pagar}" data-observacion="${mes_a_pagar}" onclick="deshabilitarFila('tr-mensualidad-${mes_a_pagar}','mensualidad-${mes_a_pagar}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" class="feather feather-trash me-50">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                  </path>
              </svg>
              <span>Eliminar</span>
          </a>
      </td>
      </tr>`);
      updateHistorial(e.target.value);
      verificareposicion(e.target.value);
      titulo('a');
      incripcion();
    }
    
    reactivacion();

    /**FIN DEL SELECT ALUMNO */
  });

  $("#add_pago-btn").click(() => {
    let id_alumno = $("#id-alumno-form").val();

    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para procesar un pago");
      return;
    }
    let servicio = $("#select-servicio").val();

    switch (servicio) {
      case "Traslado":
        if ($("#concepto-form-traslado").length > 0) {
          swal.fire(
            "Ya ha seleccionado un traslado para este alumno, guarde los cambios"
          );
          return;
        }
        traslado();
        break;
      case "Constancia":
        if ($("#concepto-form-constancia").length > 0) {
          swal.fire(
            "Ya ha seleccionado una constancia para este alumno, guarde los cambios"
          );
          return;
        }
        constancia();
        break;
      case "Titulo":
        if ($("#concepto-form-titulo").length > 0) {
          swal.fire(
            "Ya ha seleccionado un título para este alumno, guarde los cambios"
          );
          return;
        }
        titulo();
        break;
      case "Reposicion":
        reposicion();
        break;
      case "Mensualidad":
        mensualidad();
        break;
      case "Recargo":
        recargo();
        break;
        case "inscripcion":
          if ($("#inscripcion").length > 0) {
            swal.fire(
              "Ya ha seleccionado un servicio de isncripcion para este alumno, guarde los cambios"
            );
            return;
          }
          incripcion();
        break;
      default:
        break;
    }
  });
  $("#select-servicio").change((e) => {
    let id_alumno = $("#id-alumno-form").val();
    $("#nivelAdd").addClass(`d-none`);
    $("#select-servicio option[value='inscripcion']").remove();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para procesar un pago");
      return;
    }
    let servicio = $("#select-servicio").val();
    let nivel_grupo = $("#nivel-grupo-alumno").text();
    // $('#fecha-servicio').val(moment().format(
    //   "YYYY-MM-DD" ))
    $(".select-reposicion").addClass(`d-none`);
    switch (servicio) {
      case "Mensualidad":
        removeMensualidadFormat();
        $("#itemPrice").val($("#mensualidad-alumno").text());
        break;
      case "Recargo":
        removeMensualidadFormat();
        $("#itemPrice").prop("readonly", false);
        $("#itemPrice").val("");
        break;
      case "Traslado":
        removeMensualidadFormat();
        $("#itemPrice").val(5000);

        break;
      case "Constancia":
        removeMensualidadFormat();
        $("#itemPrice").val(5000);
        break;
      case "Titulo":
        removeMensualidadFormat();
        $("#itemPrice").val(20000);
        $("#nivelAdd").removeClass(`d-none`);
        $(`#select-Nivel option[value="${nivel_grupo}"]`).attr("selected", "selected"  );
        break;
      case "Reposicion":
        removeMensualidadFormat();
        $(".select-reposicion").removeClass(`d-none`);
        $("#itemPrice").val(10000);
        break;
        case "inscripcion":
        removeMensualidadFormat();
        $("#itemPrice").val(5000);
        break;
      default:
        break;
    }
  });

  function addMensualidadFormat() {
    $("#itemPrice").prop("readonly", true);
    document
      .getElementById("mContenedor")
      .classList.replace("row-cols-3", "row-cols-4");
    document.getElementById("precio").classList.replace("col", "col-4");
    // document.getElementById("banco").classList.replace("col-6", "col-4");
    // document.getElementById("transct").classList.replace("col-6", "col-4");
    $(".mensualidadAdd").removeClass("d-none");
  }

  function removeMensualidadFormat() {
    $("#itemPrice").prop("readonly", true);
    document
      .getElementById("mContenedor")
      .classList.replace("row-cols-4", "row-cols-3");
    document.getElementById("precio").classList.replace("col-4", "col");
    // document.getElementById("banco").classList.replace("col-4", "col-6");
    // document.getElementById("transct").classList.replace("col-4", "col-6");
    $(".mensualidadAdd").addClass("d-none");
  }

  const TotalAPagar = ()=> {
    let total = 0
    let montos = document.querySelectorAll('#body-table-pago .monto')

    montos.forEach(monto => {
      console.log(monto.parentElement)
      if (!monto.parentElement.classList.contains('disabled')) {
        total += parseInt(monto.innerText);
      }
    });
    $('#totalMonto').text(total)
    
  }

  /**INICIO REACTIVACION */
  const addReactivacion = async () => {
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }

    $("#form-pago-pendiente").append(`
    <div id="reactivacion" class="reactivacion">
      <input type="text" name="id_alumno" value="${id_alumno}">
      <input type="text" name="concepto" id="concepto-form" value="Reactivacion">
      <input type="text" name="monto" id="monto-form" value="5000">
      <input type="text" name="mora" id="mora-form" value="-">
      <input type="text" name="observacion" id="observacion-form" value="-">
    </div>`);

    $("#form-pago-pendiente").submit()
    
  }; /**FIN REACTIVACION */

  /**INICIO REACTIVACION */
  const reactivacion = async () => {
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }

    historial = await fetch("/historia-caja-academy/" + id_alumno)
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_historia;
      });

      let filter = historial.filter(item => item.concepto === "Reactivacion" && item.estado === "Pendiente")
      /*console.log(historial)
      console.log(filter)
      console.log("HISTORIAL")*/
      if (filter.length && filter[0].estado === "Pendiente") {
        /**FORM */
        $("#form-reg-pago").append(`
        <div id="reactivacion" class="reactivacion">
        <input type="text" name="idCaja" id="concepto-form" value="${filter[0].id}">
        <input type="text" name="concepto[]" id="concepto-form" value="Reactivacion">
        <input type="text" name="monto[]" id="monto-form" value="5000">
        <input type="text" name="mora[]" id="mora-form" value="-">
        <input type="text" name="observacion[]" id="observacion-form" value="-">
        </div>`);
        /**FIN FORM */
        
        $("#pago-mensual-detail").text(5000);
      /**LLENAR TABLA */
        $("#body-table-pago").append(`<tr id="tr-reactivacion">
        <td>
        <span class="fw-bold">Reactivación</span>
        </td>
        <td class="monto">5000</td>
        <td>
        <a class="item borrar reactivacion" onclick="borrarFila('tr-reactivacion','total')">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round" class="feather feather-trash me-50">
               <polyline points="3 6 5 6 21 6"></polyline>
               <path
                   d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
               </path>
           </svg>
           <span>Eliminar</span>
        </a>
        </td>
        </tr>`);
        TotalAPagar();
      }
  }; /**FIN REACTIVACION */

  /**INICIO HABILITAR MENSUALIDAD */
  const recargo = async () => {
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    /**FORM */
    $("#form-reg-pago").append(`
<div id="recargo" class=".recargo">
<input type="text" name="concepto[]" id="concepto-form" value="Recargo">
<input type="text" name="monto[]" id="monto-form" value="${$(
      "#itemPrice"
    ).val()}">
<input type="text" name="mora[]" id="mora-form" value="-">
<input type="text" name="observacion[]" id="observacion-form" value="-">
</div>`);
    /**FIN FORM */

    $("#pago-mensual-detail").text($("#itemPrice").val());
    /**LLENAR TABLA */
    $("#body-table-pago").append(`<tr id="tr-recargo">
<td>
<span class="fw-bold">Recargo</span>
</td>
<td class="monto">${$("#itemPrice").val()}</td>
<td>
<a class="item borrar recargo" onclick="borrarFila('tr-recargo','recargo')">
   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
       stroke-linejoin="round" class="feather feather-trash me-50">
       <polyline points="3 6 5 6 21 6"></polyline>
       <path
           d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
       </path>
   </svg>
   <span>Eliminar</span>
</a>
</td>
</tr>`);
TotalAPagar();
  }; /**FIN BNT RECARGO */

  /**INICIO HABILITAR MENSUALIDAD */
  const mensualidad = async () => {
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    let mes = $("#select-mes").val();
    let anio = $("#select-anio").val();
    let mes_actual = []; 
    $(".mensualidad").each(function () {
      mes_actual.push($(this).val());
    });
    /**OBTENER HISTORIAL DE CAJA */
    historial = await fetch("/historia-caja-academy/" + id_alumno)
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_historia;
      });
    var filter_mensualidad = historial.filter(
      (element) =>
        element.concepto == "Mensualidad" && element.matriculaId == id_alumno
    );
    var meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    var mes_a_pagar;
    let mes_pagado;
    if (filter_mensualidad.length < 1) {
      if (mes_actual.length == 0) {
        mes_a_pagar =
          hoy.locale("es").format("MMMM") +
          "-" +
          hoy.locale("es").format("YYYY");
      }
      for (let i = 0; i < mes_actual.length; i++) {
        mes_pagado = mes_actual[i].split("-");
        for (let i = 0; i < meses.length; i++) {
          if (meses[i] == mes_pagado[0]) {
            mes_a_pagar = meses[i + 1] + "-" + hoy.locale("es").format("YYYY");
            break;
          }
          mes_a_pagar =
            hoy.locale("es").format("MMMM") +
            "-" +
            hoy.locale("es").format("YYYY");
        }
      }
    } else {
      if (mes_actual.length == 0) {
        mes_pagado = filter_mensualidad[0]["observacion"].split("-");
        for (let i = 0; i < meses.length; i++) {
          if (meses[i] == mes_pagado[0]) {
            mes_a_pagar = meses[i + 1] + "-" + hoy.locale("es").format("YYYY");
            break;
          }
          mes_a_pagar =
            hoy.locale("es").format("MMMM") +
            "-" +
            hoy.locale("es").format("YYYY");
        }
      }
      for (let i = 0; i < mes_actual.length; i++) {
        mes_pagado = mes_actual[i].split("-");
        for (let i = 0; i < meses.length; i++) {
          if (meses[i] == mes_pagado[0]) {
            mes_a_pagar = meses[i + 1] + "-" + hoy.locale("es").format("YYYY");
            break;
          }
          mes_a_pagar =
            hoy.locale("es").format("MMMM") +
            "-" +
            hoy.locale("es").format("YYYY");
        }
      }
    }
    /**FORM */
    $("#form-reg-pago").append(`
<div id="mensualidad-${mes_a_pagar}" class="mensualidad-${mes_a_pagar}">
<input type="text" name="concepto[]" id="concepto-form" value="Mensualidad">
<input type="text" name="monto[]" id="monto-form" value="${$(
      "#itemPrice"
    ).val()}">
<input type="text" name="mora[]" id="mora-form" value="-">
<input type="text" name="observacion[]" id="observacion-form" class="mensualidad" value="${mes_a_pagar}">
</div>`);
    /**FIN FORM */

    $("#pago-mensual-detail").text($("#itemPrice").val());
    /**LLENAR TABLA */
    $("#body-table-pago").append(`<tr id="tr-mensualidad-${mes_a_pagar}">
    <td>
    <span class="fw-bold">Mensualidad</span><span class="text-capitalize"> ${mes_a_pagar}</span>
</td>
<td class="monto">${$("#itemPrice").val()}</td>
<td>
 <a class="item borrar mensualidad-${mes_a_pagar}" data-observacion="${mes_a_pagar}" onclick="borrarFila('tr-mensualidad-${mes_a_pagar}','mensualidad-${mes_a_pagar}')">
     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round" class="feather feather-trash me-50">
         <polyline points="3 6 5 6 21 6"></polyline>
         <path
             d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
         </path>
     </svg>
     <span>Eliminar</span>
 </a>
</td>
</tr>`);
TotalAPagar();
  }; /**FIN BNT MENSUALIDAD */
  /**INICIO HABILITAR MENSUALIDAD */
  const incripcion = async () => {
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    /**OBTENER HISTORIAL DE CAJA */
    historial = await fetch("/historia-caja-academy/" + id_alumno)
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_historia;
      });
      
    var filter_inscripcion = historial.filter(
      (element) =>
        element.concepto == "Inscripción"
    );
    console.log(filter_inscripcion)
    $("#select-servicio option[value='inscripcion']").remove();
    if (filter_inscripcion.length == 0) {
      
  /**FORM */
  $("#form-reg-pago").append(`
  <div id="inscripcion" class="inscripcion">
  <input type="text" name="concepto[]" id="concepto-form" value="Inscripción">
  <input type="text" name="monto[]" id="monto-form" value="5000 ">
  <input type="text" name="mora[]" id="mora-form" value="-">
  <input type="text" name="observacion[]" id="observacion-form" class="inscripcion" value="-">
  </div>`);
      /**FIN FORM */
  
      $("#pago-mensual-detail").text(5000);
      /**LLENAR TABLA */
      $("#body-table-pago").append(`<tr id="tr-inscripcion">
      <td>
      <span class="fw-bold">Inscripción</span>
  </td>
  <td class="monto">5000</td>
  <td>
   <a class="item borrar inscripcion" onclick="deshabilitarFila('tr-inscripcion','inscripcion')">
       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round" class="feather feather-trash me-50">
           <polyline points="3 6 5 6 21 6"></polyline>
           <path
               d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
           </path>
       </svg>
       <span>Eliminar</span>
   </a>
  </td>
  </tr>`);
  $("#select-servicio").prepend(`<option value="inscripcion">Inscripción</option>`);
  TotalAPagar();
    }
  
  }; /**FIN BNT INSCRIPCION */

  /**INICIO HABILITAR TRASLADO */
  const traslado = async () => {
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    var filter = historial.filter((element) => element.concepto == 'Traslado' && moment(element.createdAt).isSame(moment(),'d') );
  console.log(filter)
  if (filter.length > 0) {
    swal.fire("Actualmente tiene un traslado activo para su uso");
      return;
  }

    $("#form-reg-pago")
      .append(`<div id="traslado"><input type="text" name="concepto[]" id="concepto-form-traslado" value="Traslado">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form-traslado" value="">-->
<input type="text" name="monto[]" id="monto-form-traslado" value="5000">
<input type="text" name="mora[]" id="mora-form-traslado" value="-">
<input type="text" name="observacion[]" id="observacion-form-traslado" value="-">`);

    $("#body-table-pago").append(`<tr id="tr-traslado">
<td>
    <span class="fw-bold">Traslado</span>
</td>
<td class="monto">5000</td>
<td>
    <a class="item borrar traslado" onclick="borrarFila('tr-traslado','traslado')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-trash me-50">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
            </path>
        </svg>
        <span>Eliminar</span>
    </a>
</td>
</tr>`);

    $("#detalle-servicios").append(`<li class="price-detail">
<div class="detail-title">Traslado</div>
</li>`);
    $("#total-servicios").text("5000");
    $("#itemPrice").val("5000");
    TotalAPagar();
  }; /**FIN BNT TRASLADO */

  /**HABILITAR CONSTANCIA */
  const constancia = async () => {
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    if (!$("#btn-genera-constancia").attr("disabled")) {
      swal.fire(
        "Ya tiene una constancia pagada, haga click en descargar constancia"
      );
      $("#btn-genera-constancia").focus();
      return;
    }
    var filter = matricula.filter((element) => element.id == id_alumno);

    // const fecha_pago = $('#fecha-servicio').val()

    let dias_pago = filter[0]["grupo"]["dia_pagos"].split(" ");
    $("#form-reg-pago")
      .append(`<div id="Constancia"><input type="text" name="concepto[]" id="concepto-form-constancia" value="Constancia">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form-Constancia" value="">-->
<input type="text" name="monto[]" id="monto-form-Constancia" value="5000">
<input type="text" name="mora[]" id="mora-form-Constancia" value="-">
<input type="text" name="observacion[]" id="observacion-form-Constancia" value="-">>
</div>`);

    $("#body-table-pago").append(`<tr id="tr-Constancia">
<td>
<span class="fw-bold">Constancia</span>
</td>
<td class="monto">5000</td>
<td>
<a class="item borrar Constancia" onclick="borrarFila('tr-Constancia','Constancia')">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" class="feather feather-trash me-50">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
        </path>
    </svg>
    <span>Eliminar</span>
</a>
</td>
</tr>`);

    $("#detalle-servicios").append(`<li class="price-detail">
<div class="detail-title">Constancia</div>
</li>`);
    $("#total-servicios").text("5000");
    $("#itemPrice").val("5000");
    TotalAPagar();
  }; /**FIN BNT TRASLADO */

  /**BTN HABILITAR TITULO */
  const titulo = async (a) => {
    let id_alumno = $("#id-alumno-form").val();
    console.log('aqui')
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    if (!$("#btn-descarga-titulo").attr("disabled")) {
      swal.fire("Ya tiene un titulo pagado, haga click en descargar titulo");
      $("#btn-descarga-titulo").focus();
      return;
    }
    if ($(`#Titulo`).length > 0) {
      swal.fire(
        "Ya el titulo esta agregado, seleccione otra opcion o guarde el pago"
      );
      return;
    }
    //VERIFICAR QUE LE CORRESPONDE TITULO:
    notas = await fetch("/notas-titulo-academy/" + id_alumno)
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_notas;
      });
    nota_participacion = await fetch(
      "/participacion-titulo-academy/" + id_alumno
    )
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_participacion;
      });
    ausencias = await fetch("/ausencias-titulo-academy/" + id_alumno)
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_ausencias;
      });
    if (nota_participacion.length == 0) {
      if (a) {
        console.log('aqui')
        return
      }
      swal.fire("El Alumno no ha aprobado el nivel del curso");
      return;
    }
    if (notas.length < 6) {
      if (a) {
        console.log('aqui2')
        return
      }
      swal.fire("Le falta al menos 1 o mas notas para obtar al Titulo");
      return;
    }
    let total_nota = 0;

    for (let i = 0; i < notas.length; i++) {
      if (notas[i]["nota"] == "undefined") {
        total_nota += 0;
      } else {
        total_nota += parseInt(notas[i]["nota"]);
      }
    }

    let asistencias = 32 - parseInt(ausencias.length);
    let porcentaje_asist = (asistencias * 100) / 32;
    if (porcentaje_asist < 80) {
      swal.fire(
        `Su asistencia es: ${porcentaje_asist}% (menor a 80%), no obta a Titulo`
      );
      return;
    }
    let participacion =0
    if (nota_participacion.length >0) {
      participacion =nota_participacion[0]['porcentaje']
    }
    
    total_nota = parseFloat(total_nota)+ parseFloat(participacion)
    if (total_nota <= 69) {
      swal.fire(
        `Su nota final es: ${total_nota}% (menor a 70%), no obta a Titulo`
      );
      return;
    }

    //CONTINUA HABILITANDO EL TITULO
    var filter = matricula.filter((element) => element.id == id_alumno);    
    let dias_pago = filter[0]["grupo"]["dia_pagos"].split(" ");
    let nivel_grupo = $("#select-Nivel").val();
    if (a) {
      nivel_grupo = $("#nivel-grupo-alumno").text();
    }
    $("#form-reg-pago")
      .append(`<div id="Titulo"><input type="text" name="concepto[]" id="concepto-form-Titulo" value="Titulo">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form-Titulo" value="">-->
<input type="text" name="monto[]" id="monto-form-Titulo" value="20000">
<input type="text" name="mora[]" id="mora-form-Titulo" value="-">
<input type="text" name="observacion[]" id="observacion-form-Titulo" value="-">>
</div>`);

    $("#body-table-pago").append(`<tr id="tr-Titulo">
<td>
<span class="fw-bold">Título N${nivel_grupo}</span>
</td>
<td class="monto">20000</td>
<td>
<a class="item borrar Titulo" onclick="borrarFila('tr-Titulo','Titulo')">
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" class="feather feather-trash me-50">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
      </path>
  </svg>
  <span>Eliminar</span>
</a>
</td>
</tr>`);

    $("#detalle-servicios").append(`<li class="price-detail">
<div class="detail-title">Titulo</div>
</li>`);
    $("#total-servicios").text("20000");
    $("#itemPrice").val("20000");
    TotalAPagar();
  }; /**FIN BNT TITULO */

  /**BTN HABILITAR REPOSICION */
  const reposicion = async () => {
    let id_estudiante = $("#id-alumno-form").val();

    if (!id_estudiante) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    let leccion = $("#select-reposicion").val();
    if ($(`#reposicion${leccion}`).length > 0) {
      swal.fire(
        "Ya la lección esta agregada, seleccione otra o guarde el pago"
      );
      return;
    } 
    if ($(`#select-reposicion`).val() =="Seleccione") {
      return;
    }
      $("#form-reg-pago")
        .append(`<div id="reposicion${leccion}"><input type="text" name="concepto[]" id="concepto-form-reposicion${leccion}" value="Reposicion,L-${leccion}">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form-reposicion${leccion}" value="">-->
<input type="text" name="monto[]" id="monto-form-reposicion${leccion}" value="10000">
<input type="text" name="mora[]" id="mora-form-reposicion${leccion}" value="-">
<input type="text" name="observacion[]" id="observacion-form-reposicion${leccion}" value="${leccion}">`);

      $("#body-table-pago").append(`<tr id="tr-reposicion${leccion}">
<td>
  <span class="fw-bold">Reposición L${leccion}</span>
</td>
<td class="monto">10000</td>
<td>
  <a class="item borrar reposicion${leccion}" onclick="deshabilitarFila('tr-reposicion${leccion}','reposicion${leccion}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" class="feather feather-trash me-50">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
          </path>
      </svg>
      <span>Eliminar</span>
  </a>
</td>
</tr>`);

      $("#detalle-servicios").append(`<li class="price-detail">
<div class="detail-title">Reposicion,L-${leccion}</div>
</li>`);
      $("#total-servicios").text("10000");
      $("#itemPrice").val("10000");
      TotalAPagar();
  }; /**FIN BNT REPOSICION */

  /**BTN GENERAR CONSTANCIA */
  $("#btn-genera-constancia").click(async () => {
    let id_estudiante = $("#id-alumno-form").val();
    
    $.ajax({
      type: "GET",
      url: `/genera-pdf-constancia/${id_estudiante}`,
      xhrFields: {
        // specify response type as "blob" to handle objects
        responseType: "blob",
      },
      success: function (data) {
        // creating a hidden <a> tag
        var a = document.createElement("a");
        // creating a reference to the file
        var url = window.URL.createObjectURL(data);
        // setting anchor tag's href attribute to the blob's URL
        a.href = url;
        // setting anchor tag's download attribute to the filename
        a.download = "constancia.pdf";
        document.body.append(a);
        // click on the <a> tag
        a.click();

        // after clicking it, remove it from the DOM
        a.remove();
        // release an existing object URL which was previously
        // created by calling URL.createObjectURL()
        // once we have finished using an object URL, let the
        // browser know not to keep the reference to the file any longer.
        window.URL.revokeObjectURL(url);
      },
      complete: function (params) {
        updateHistorial(id_estudiante);
      },
      error: function (result) {
        alert("error");
      },
    });
    //window.location.href=`/genera-pdf-constancia/${id_estudiante}`
  });

  /**BTN GENERAR TITULO */
  $("#btn-descarga-titulo").click(async () => {
    let id_estudiante = $("#id-alumno-form").val();
    
    $.ajax({
      type: "GET",
      url: `/genera-pdf-titulo/${id_estudiante}`,
      xhrFields: {
        // specify response type as "blob" to handle objects
        responseType: "blob",
      },
      success: function (data) {
        // creating a hidden <a> tag
        var a = document.createElement("a");
        // creating a reference to the file
        var url = window.URL.createObjectURL(data);
        // setting anchor tag's href attribute to the blob's URL
        a.href = url;
        // setting anchor tag's download attribute to the filename
        a.download = "titulo.pdf";
        document.body.append(a);
        // click on the <a> tag
        a.click();

        // after clicking it, remove it from the DOM
        a.remove();
        // release an existing object URL which was previously
        // created by calling URL.createObjectURL()
        // once we have finished using an object URL, let the
        // browser know not to keep the reference to the file any longer.
        window.URL.revokeObjectURL(url);
      },
      complete: function (params) {
        updateHistorial(id_estudiante);
      },
      error: function (result) {
        alert("error");
      },
    });
    //window.location.href=`/genera-pdf-constancia/${id_estudiante}`
  });

  /**GURDAR PAGO */
  $("#btn-guardar-pago").click(() => {
    let id_alumno = $("#id-alumno-form").val();

    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para procesar un pago");
      return;
    }
    Swal.fire({
      title: "Datos adicionales",
      html: `
      <div class="mb-1">
      <label class="form-label" for="itemquantity">Banco</label>
      
      <div class="demo-inline-spacing justify-content-around">
   
        <div class="form-check form-check-inline">
          <input class="form-check-input BNA" type="radio" name="bank-serv" id="BNA" value="BNA" />
          <label class="form-check-label" for="BNA">BNA</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input BCR" type="radio" name="bank-serv" id="BCR" value="BCR" />
          <label class="form-check-label" for="BCR">BCR</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input BAC" type="radio" name="bank-serv" id="BAC" value="BAC" />
          <label class="form-check-label" for="BAC">BAC</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input BPO" type="radio" name="bank-serv" id="BPO" value="BPO" />
          <label class="form-check-label" for="BPO">BPO</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input EFE" type="radio" name="bank-serv" id="EFE" value="EFE" />
          <label class="form-check-label" for="EFE">EFE</label>
        </div>
        
      </div>

    </div> 
    <div id="transct" class="col">
      <div class="mb-1">
        <label class="form-label" for="itemquantity">N° Transacción</label>
        <input type="text" class="form-control" id="trans-serv" aria-describedby="precio" value="">
      </div>
    </div>

    <div class="mb-1">
      <label class="form-label" for="itemcost">Fecha</label>
      <input type="date" id="fecha-servicio" class="form-control flatpickr-basic flatpickr-input" placeholder="DD-MM-YYYY" name="fecha" required>
    </div>
  `,
      confirmButtonText: "Continuar",
      focusConfirm: false,
      preConfirm: () => {
        const fecha_pago =
          Swal.getPopup().querySelector("#fecha-servicio").value;
        const banco = $("input[name=bank-serv]:checked").val(); //Swal.getPopup().querySelector('#bank-serv').value
        const transaction = Swal.getPopup().querySelector("#trans-serv").value;
        
        if (moment().isBefore(fecha_pago, "d")) {
          Swal.showValidationMessage(
            `La fecha de pago debe ser igual o anterior a la actual!`
          );
        }
        if (!fecha_pago || !banco || !transaction) {
          Swal.showValidationMessage(
            `Debe llenar todos los campos, por favor!`
          );
        }
        return {
          fecha_pago: fecha_pago,
          banco: banco,
          transaction: transaction,
        };
      },
    }).then((result) => {
      
      $("#form-reg-pago")
        .append(`<input type="text" name="fecha_pago" id="fecha_pago-form" value="${result.value.fecha_pago}">
  <input type="text" name="banco" id="banco-form" value="${result.value.banco}">
  <input type="text" name="transaccion" id="transaction-form" value="${result.value.transaction}">`);

      $.ajax({
        url: `/guardar-pago-academy`,
        type: "POST",
        data: $("#form-reg-pago").serialize(),
        success: function (data, textStatus, jqXHR) {
          
          $("#body-table-pago").empty();
          $("#itemPrice").val("");
          $("#select-servicio").val("Seleccione");
          $(".select-reposicion").addClass(`d-none`);
          let id = $("#id-alumno-form").val();
          $("#form-reg-pago").empty();
          $(".alumno-select").val(`${id}`).trigger("change");
          Swal.fire("Se guardó el pago con éxito");
          updateHistorial($("#id-alumno-form").val());
        },
        error: function (jqXHR, textStatus) {
        },
      });
    });

    /**FIN BTON GUARDAR PAGO */
  });

  $(".borrar").on("click", function () {
    
    $(`#mensualidad-${mes_a_pagar}`).remove();
    $(this).parents("tr").remove();
  });

  /** CARGAR COMENTARIOS DEL ALUMNO AL PRESIONAR CLICK EN EL BOTON COMENTARIOS */
  $('#btnComentarios').on('click', function () {
    $("#btn-add-commnet").click();
  });
  $('#btnTrasladar').on('click', function () {
    $("#btn-trasladar-alumno").click();
  });
  $('#btnCongelar').on('click', function () {
    $("#btn-congelar-alumno").click();
  });
  $('#btnControl').on('click', function () {

    idAlumno = $('.alumno-select').val()
    let result = matricula.filter(item => item.id === parseInt(idAlumno))
    idGrupo = result[0].grupoId
    ControlDetalles(idAlumno, idGrupo)

  });


  $("#btn-add-commnet").click(async () => {
    $("#commentAdmin").empty();
    let id_alumno = $("#id-alumno-form").val();
    let comentariosA = await fetch(
      "/comentarios_admin_get-academy/" + id_alumno
    )
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_comentarios;
      });
      
    for (let i = 0; i < comentariosA.length; i++) {
      let commentProf = "",
        commentAdmin = "";
      if (comentariosA[i].commentAdminForm != null) {
        commentAdmin = comentariosA[i].commentAdminForm;
      }
      if (comentariosA[i].commentProfForm != null) {
        commentProf = comentariosA[i].commentProfForm;
      }
      $("#commentAdmin").append(`<div class="col-12">
             <div class="mb-1">
               <label class="form-label" for="exampleFormControlTextarea1">Comentario de:${
                 comentariosA[i].usuario.nombre
               } (${comentariosA[i].usuario.puesto}) - ${moment(
        comentariosA[i].createdAt
      ).format("DD/MM/YYYY")}</label>
               <textarea class="form-control" id="coment${
                 comentariosA[i].id
               }" rows="1" data-id="47" readonly>${commentAdmin}${commentProf}</textarea>
             </div>
           </div>`);
    }
  });
  //**VER CREADOR DE COMENTARIOS */
  $("#commentAdminShow").click(() => {
    $("#accordionMargin").addClass("collapse");
    $("#commentAdmin").removeClass("collapse");
  });

  //**MOSTRAR COMENTARIOS DEL ADMIN */
  $("#addCommentShow").click(() => {
    $("#accordionMargin").removeClass("collapse");
    $("#commentAdmin").addClass("collapse");
    $("#addComment").val("");
  });
  /** AGREGAR COMENTARIO */
  $("#addComment").change(function () {
    
    let id_alumno = $("#id-alumno-form").val();
    const data_C = new FormData();
    data_C.append("id_alumno", id_alumno);
    data_C.append("comentario", $(this).val());
    $.ajax({
      url: `/guardar_comentario_admin_academy`,
      type: "POST",
      data: data_C,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data, textStatus, jqXHR) {
        
        $("#addComment").val("");
        $("#commentAdmin").empty();
        for (let i = 0; i < data.obtener_comentarios.length; i++) {
          let commentProf = "",
            commentAdmin = "";
          if (data.obtener_comentarios[i].commentAdminForm != null) {
            commentAdmin = data.obtener_comentarios[i].commentAdminForm;
          }
          if (data.obtener_comentarios[i].commentProfForm != null) {
            commentProf = data.obtener_comentarios[i].commentProfForm;
          }
          let fecha = moment(data.obtener_comentarios[i].createdAt).format(
            "DD-MM-YYYY"
          );
          $("#commentAdmin").append(`<div class="col-12">
             <div class="mb-1">
             <label class="form-label" for="exampleFormControlTextarea1">Comentario de:${data.obtener_comentarios[i].usuario.nombre} (${data.obtener_comentarios[i].usuario.puesto}) - ${fecha}</label>
               <textarea class="form-control addCommentShow" readonly>${commentAdmin}${commentProf}</textarea>
             </div>
           </div>`);
        }
      },
      error: function (jqXHR, textStatus) {
      },
    });
  }); /**FIN ADDCOMMENT */

  /**MODAL TRASLADO */
  $("#createAppModal").on("show.bs.modal", async function (e) {
    $("#guarda-grupoNew").addClass("d-none");
    $("#calificacionT").text(`0%`);
    $("#asistenciareag").text(`0%`);
    let id_estudiante = $("#id-alumno-form").val();
    var filter = matricula.filter((element) => element.id == id_estudiante);
    
    $(`#nombreReagrupar`).text(`${filter[0]["nombre"]}`);
    $(`#tlfReagrupar`).text(
      `${filter[0]["telefono1"]} - ${filter[0]["telefono2"]}`
    );
    let filter_group_alumnos = matricula.filter(
      (filter2) => filter2.grupo.id == filter[0]["grupo"]["id"]
    );

    $("#id_estudiante").val(filter[0]["id"]);
    $("#nombre_reaginador").val(filter[0]["nombre"]);
    $("#grupoId_actual").val(filter[0]["grupo"]["id"]);

    let grupoIdentif = gruposTodos.filter(grupo => grupo.id === filter[0].grupoId)

    $(`#grupoReag`).text(grupoIdentif[0].identificador);
    $(`.horarioreag`).text(`${filter[0]["grupo"]["dia_horario"]} `);
    
    let prof = filter[0].grupo.usuarioId ? filter[0].grupo.usuario.nombre : 'No asignado'

    $(`#profesorreag`).text(prof);

    $(`#tipogrupoReag`).text(
      `${filter[0]["grupo"]["nombre"]}- ${filter[0]["grupo"]["identificador"]}`
    );
    $(`#fechaPagoReag`).text(`${filter[0]["grupo"]["dia_pagos"]}`);
    $(`#cantAlumnos`).text(`${filter_group_alumnos.length}`);
    //NOTAS Y PARTICIPACION
    var notas, nota_participacion, ausencias, comentarios;
    notas = await fetch("/notas-titulo-academy/" + filter[0]["id"])
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_notas;
      });
    nota_participacion = await fetch(
      "/participacion-titulo-academy/" + filter[0]["id"]
    )
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_participacion;
      });
    ausencias = await fetch("/ausencias-titulo-academy/" + filter[0]["id"])
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_ausencias;
      });
    let total_nota = 0;

    for (let i = 0; i < notas.length; i++) {
      if (notas[i]["nota"] == "undefined") {
        total_nota += 0;
      } else {
        total_nota += parseInt(notas[i]["nota"]);
      }
    }
    
    let participacion =0
    if (nota_participacion.length >0) {
      participacion =nota_participacion[0]['porcentaje']
    }
    
    total_nota = parseFloat(total_nota)+ parseFloat(participacion)
    let asistencias = 32 - parseInt(ausencias.length);
    let porcentaje_asist = (asistencias * 100) / 32;
    $("#calificacionT").text(`${total_nota}%`);
    $("#asistenciareag").text(`${porcentaje_asist.toFixed(2)}%`);

    let numLeccion;
    let fechaInicio = moment(
      filter[0]["grupo"]["fecha_inicio"],
      "DD-MM-YYYY"
    ).format("DD-MM-YYYY");
    let diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), "days");
    let rest;

    if (filter[0]["grupo"]["lecciones_semanales"] === "1") {
      if (diff < 0) {
        rest = (224 - -diff) / 7;
      } else {
        rest = (224 - diff) / 7;
      }
    } else {
      if (diff < 0) {
        rest = (112 - -diff) / 3.5;
      } else {
        rest = (112 - diff) / 3.5;
      }
    }

    numLeccion = 32 - Math.floor(rest);

    if (numLeccion) {
      $(`#leccionActual0`).text(numLeccion);
    } else {
      $(`#leccionActual0`).text(0);
    }

    $(`.bg-success`).removeClass("bg-success");
    $(`#leccion${$("#leccionActual0").text()}`).addClass("bg-success");
    $(`#leccion_actual_reasig`).val($("#leccionActual0").text());
    var historial = await fetch("/historia-caja-academy/" + filter[0]["id"])
      .then((response) => response.json())
      .then((data) => {
        
        return data.obtener_historia;
      });
    if (historial.length == 0) {
      $("#countGrupos").text("0");

      await leccionActualGrupos();
    } else {
      for (let i = 0; i < historial.length; i++) {
        var hora_registro_pago = moment(historial[i]["createdAt"]);
        
        if (
          historial[i]["concepto"] == "Traslado" &&
          moment().isAfter(hora_registro_pago, "d") == false
        ) {
          $("#guarda-grupoNew").removeClass("d-none");
          await leccionActualGrupos();
        } else {
          $("#countGrupos").text("0");

          await leccionActualGrupos();
        }
      }
    }

    /**fin carga modal alumno */
  });
  $("#guarda-grupoNew").click(() => {
    if ($("#grupoId_actual").val() == $("#grupoId").val()) {
      swal.fire(
        "El grupo actual y el seleccionado son el mismo, elija otro grupo"
      );
      return;
    }
    if ($("#countGrupos").val() == 0) {
      swal.fire(
        "No hay grupos disponibles para realizar traslado"
      );
      return;
    }
    if ($("#grupoId").val() == "") {
      swal.fire(
        "No ha seleccionado ningún grupo para realizar traslado"
      );
      return;
    }
    $.ajax({
      url: `/reasignar2-grupopy672`,
      type: "POST",
      data: $("#form-reasignar-grupo").serialize(),
      success: function (data, textStatus, jqXHR) {
        
        $("#body-table-pago").empty();
        $("#itemPrice").val("");
        $("#select-servicio").val("Seleccione");
        $(".select-reposicion").addClass(`d-none`);
        let id = $("#id-alumno-form").val();
        $("#form-reg-pago").empty();
        
        $("#createAppModal").modal("hide");
        $(".alumno-select").val(`default`).trigger("change");
        Swal.fire("Se cambio el grupo con éxito").then((resp) => {
          if (resp.isDismissed || resp.isConfirmed) {
            window.location.reload();
          }
        });
      },
      error: function (jqXHR, textStatus) {
      },
    });
  });

  $("#btn-congelar-alumno").click(async () => {
    Swal.fire({
      title: 'Atención!',
      text: 'Desea congelar el alumno seleccionado?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      showClass: { backdrop: 'swal2-noanimation' },
      hideClass: { backdrop: 'swal2-noanimation' },
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: 'Añadir motivo!',
          icon: 'info',
          html: '<label for="input-comment" class="swal2-input-label mb-1">Comentario</label><input minlength="20" autocapitalize="off" autocorrect="off" class="form-control swal2-input m-0 d-block w-100" id="input-comment" placeholder="Ingresa un comentario" type="text">',
          preConfirm: () => {
            const input = document.querySelector('#input-comment').value
            console.log(input)
            if (input.length < 20) {
              Swal.showValidationMessage(`Agregue mas descripción al comentario`)
            }
          }
        }).then((result2) => {
          let comentario = result2.value,
          id = $('.alumno-select').val()
          let save = new Promise((resolve, reject) => {
            resolve(GuardarComment(id, comentario))

          }).then((response) => {
            //console.log(response)
            if(response === 200) {
              Swal.fire({
                title: 'Verifique la solicitud',
                icon: 'info',
                input: 'password',
                inputLabel: 'Ingrese su contraseña',
                inputPlaceholder: 'Contraseña',
                inputAttributes: {
                  autocapitalize: 'off',
                  autocorrect: 'off'
                },
              }).then((result3) => {
                console.log(result3.value)
                if(result3.isConfirmed) {
                  let comprobarPassw = new Promise ((resolve, reject) => {
                    resolve(ValidatePassw(result3.value))
                  }).then((check) => {
                    
                    if(check.validation) {
                      let id_estudiante = $("#id-alumno-form").val();
                      let data = new FormData();
                      data.append("id", id_estudiante);
                      $.ajax({
                        url: `/congelarestudiantepy672`,
                        type: "POST",
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data, textStatus, jqXHR) {
                          
                          $("#createAppModal").modal("hide");
                          Swal.fire({
                            title: 'Alumno congelado!',
                            icon: 'success',
                          }).then((resp) => {
                            if (resp.isDismissed || resp.isConfirmed) {
                              addReactivacion()
                              //window.location.reload();
                            }
                          });
                        },
                        error: function (jqXHR, textStatus) {
                        },
                      });
                      
                    } else {
                      Swal.fire({
                        title: 'Estimano Usuario!',
                        text: 'La contraseña es incorrecta.',
                        icon: 'error',
                        // optional classes to avoid backdrop blinking between steps
                        showClass: { backdrop: 'swal2-noanimation' },
                        hideClass: { backdrop: 'swal2-noanimation' },
                      })
                    }
                  });

                }
              })
             
            } else {
              Swal.fire({
                title: 'Lo sentimos!',
                text: 'Hubo un error al realizar la tarea.',
                icon: 'error',
                // optional classes to avoid backdrop blinking between steps
                showClass: { backdrop: 'swal2-noanimation' },
                hideClass: { backdrop: 'swal2-noanimation' },
              })
  
            }

          })
          .catch((err) => {
            reject(err)
          })
         
        })

      }
    })

  });

  async function ValidatePassw (passw) {
    let validate = await fetch('/validacionPassw/'+passw)
    let response = await validate.json()

    return response
  }

  async function GuardarComment (id, comentario) {
    let init = await fetch('/guardar_comentario_admin_academy/'+id+"/"+comentario)
    let response = await init.json()
    
    return init.status
  }

  $("#btn-activar-alumno").click(() => {
    
    Swal.fire({
      title: 'Atención!',
      text: 'Desea activar el alumno seleccionado?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      showClass: { backdrop: 'swal2-noanimation' },
      hideClass: { backdrop: 'swal2-noanimation' },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Verifique la solicitud',
          icon: 'info',
          input: 'password',
          inputLabel: 'Ingrese su contraseña',
          inputPlaceholder: 'Contraseña',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
          }
        }).then((result2) => {
          console.log(result2)
          let comprobarPassw = new Promise ((resolve, reject) => {
            resolve(ValidatePassw(result2.value))
          }).then((check) => {
            console.log(check)
            
            if(check.validation) {
              let id_estudiante = $("#id-alumno-form").val();
              let data = new FormData();
              data.append("id", id_estudiante);
              $.ajax({
                url: `/activarestudiantecongeladopy672`,
                type: "POST",
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                  
                  $("#createAppModal").modal("hide");
                  Swal.fire({
                    title: 'Alumno activado!',
                    icon: 'success',
                  }).then((resp) => {
                    if (resp.isDismissed || resp.isConfirmed) {
                      window.location.reload();
                    }
                  });
                },
                error: function (jqXHR, textStatus) {
                },
              });
              
              
            } else {
              Swal.fire({
                title: 'Estimano Usuario!',
                text: 'La contraseña es incorrecta.',
                icon: 'error',
                // optional classes to avoid backdrop blinking between steps
                showClass: { backdrop: 'swal2-noanimation' },
                hideClass: { backdrop: 'swal2-noanimation' },
              })
            }
          });
          
        })

      }
    })

  });

});

function borrarFila(t, identificador) {
  if (identificador === "total") {
    $(`#${t}`).remove();
    let total = 0
    let montos = document.querySelectorAll('#body-table-pago .monto')

    montos.forEach(monto => {
      console.log(monto.innerText)
      total += parseInt(monto.innerText);
    });
    $('#totalMonto').text(total)
    
    return
  }
  $(`#${t}`).remove();
  $(`#${identificador}`).remove();
  let total = 0
  let montos = document.querySelectorAll('#body-table-pago .monto')

  montos.forEach(monto => {
    console.log(monto.innerText)
    total += parseInt(monto.innerText);
  });
  $('#totalMonto').text(total)
}

function TotalAPagar () {
  let total = 0
  let montos = document.querySelectorAll('#body-table-pago .monto')

  montos.forEach(monto => {
    console.log(monto.parentElement)
    if (!monto.parentElement.classList.contains('disabled')) {
      total += parseInt(monto.innerText);
    }
  });
  $('#totalMonto').text(total)
  
}

function deshabilitarFila(row, item) {
  let fila = $('#'+row)
  fila.addClass('disabled')
  $('#'+row+' td').last().html(`<a class="item restaurar mensualidad-mayo-2022" data-observacion="mayo-2022" onclick="restaurarFila('${row} ','${row}')">
    ${feather.icons['refresh-cw'].toSvg()}
  <span>Restaurar</span>
  </a>`)
  console.log(row)
  console.log(item)
  TotalAPagar()
}

function restaurarFila(row, item) {
  let fila = $('#'+row)
  fila.removeClass('disabled')
  
  $('#'+row+' td').last().html(`<a class="item restaurar mensualidad-mayo-2022" data-observacion="mayo-2022" onclick="deshabilitarFila('${row} ','${row}')">
  ${feather.icons['trash'].toSvg()}
  <span>Eliminar</span>
  </a>`)
  
  console.log(row)
  console.log(item)
  TotalAPagar()
}

async function updateHistorial(id_estudiante) {
  $("#historial-list").empty();
  var matricula = JSON.parse($("#matricula_st").val());
  var filter = matricula.filter((element) => element.id == id_estudiante);
  console.log(filter)
  console.log("HISTORIAL LIST")
  /**OBTENER HISTORIAL DE CAJA */
  historial = await fetch("/historia-caja-academy/" + id_estudiante)
    .then((response) => response.json())
    .then((data) => {
      
      return data.obtener_historia;
    });
    
  let fecha_pago_historial,
    pago_mensualidad = [];
  $("#btn-genera-constancia").addClass("btn-light");
  $("#btn-genera-constancia").removeClass("btn-primary");
  $("#btn-genera-constancia").attr("disabled", true);

  $("#btn-descarga-titulo").addClass("btn-light");
  $("#btn-descarga-titulo").removeClass("btn-primary");
  $("#btn-descarga-titulo").attr("disabled", true);

  //console.log(gruposTodos)
  let grupoFind = gruposTodos.filter(grupo => grupo.id === filter[0].grupoId)
  //console.log(grupoFind)

  for (let i = 0; i < historial.length; i++) {
    console.log(historial)
    let mes = moment(historial[i].fecha_pago).locale("es").format("MMM")
    let text = mes.slice(0, -1) + "" +moment(historial[i].fecha_pago).locale("es").format("YYYY");
    fecha_pago_historial = moment(historial[i]["observacion"]).format("DD-MM-YYYY" );
    let lista = `<li class="timeline-item">
    <span class="timeline-point timeline-point-indicator"></span>
    <div class="timeline-event">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center mb-tl">
        <h6 class="fw-bold mb-0">Recargo</h6>
      </div>
      
      <p class="mb-tl">${fecha_pago_historial}</p>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><strong> Grupo:</strong> <span>${grupoFind[0].identificador}</span></p>
      <h6 class="more-info mb-0">₡ ${historial[i]["monto"]}</h6>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><span>${historial[i]["banco"]}-${historial[i]["transaccion"]}</span></p>
      <h6 class="more-info mb-0">${moment(historial[i]["fecha_pago"]).format("DD-MM-YYYY" )}</h6>
    </div>
    </div>
    </li>`;
    let reactivacion = `<li class="timeline-item">
    <span class="timeline-point timeline-point-indicator"></span>
    <div class="timeline-event">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center mb-tl">
        <h6 class="fw-bold mb-0">Reactivación</h6>
      </div>

      <p class="mb-tl">${moment(historial[i]["createdAt"]).format("DD-MM-YYYY")}</p>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><strong> Grupo:</strong> <span>${grupoFind[0].identificador}</span></p>
      <h6 class="more-info mb-0">₡ ${historial[i]["monto"]}</h6>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><span>${historial[i]["banco"]}-${historial[i]["transaccion"]}</span></p>
      <h6 class="more-info mb-0">${moment(historial[i]["fecha_pago"]).format("DD-MM-YYYY")}</h6>
    </div>
    </div>
    </li>`;
    let lista_recargo = `<li class="timeline-item">
    <span class="timeline-point timeline-point-indicator"></span>
    <div class="timeline-event">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center mb-tl">
        <h6 class="fw-bold mb-0">Inscripción</h6>
      </div>

      <p class="mb-tl">${moment(historial[i]["createdAt"]).format("DD-MM-YYYY")}</p>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><strong> Grupo:</strong> <span>${grupoFind[0].identificador}</span></p>
      <h6 class="more-info mb-0">₡ ${historial[i]["monto"]}</h6>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><span>${historial[i]["banco"]}-${historial[i]["transaccion"]}</span></p>
      <h6 class="more-info mb-0">${moment(historial[i]["fecha_pago"]).format("DD-MM-YYYY" )}</h6>
    </div>
    </div>
    </li>`;
    let lista_mensualidad = `<li class="timeline-item">
    <span class="timeline-point timeline-point-indicator"></span>
    <div class="timeline-event">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center mb-tl">
        <h6 class="fw-bold mb-0">Cuota</h6><p class="text-capitalize mb-0">${text}</p>
      </div>

      <p class="mb-tl">${moment(historial[i]["fecha_pago"]).format("DD-MM-YYYY")}</p>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><strong> Grupo:</strong> <span>${grupoFind[0].identificador}</span></p>
      <h6 class="more-info mb-0">₡ ${historial[i]["monto"]}</h6>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><span>${historial[i]["banco"]}-${historial[i]["transaccion"]}</span></p>
      <h6 class="more-info mb-0">${moment(historial[i]["fecha_pago"]).format("DD-MM-YYYY" )}</h6>
    </div>
    </div>
    </li>`;
    let reposicionS = historial[i]["concepto"].split(",");
    if (reposicionS[0] == "Reposicion" && historial[i]["observacion"] != "-") {
      $("#historial-list").append(lista_mensualidad);
      continue
    }
    if (reposicionS[0] == "Inscripción" && historial[i]["observacion"] == "-") {
      $("#historial-list").append(lista_recargo);
      continue
    }
    if (
      historial[i]["concepto"] != "Mensualidad" &&
      historial[i]["observacion"] != "-"
    ) {
      $("#historial-list").append(lista);
    }
    if (
      historial[i]["concepto"] == "Recargo" &&
      historial[i]["observacion"] == "-"
    ) {
      $("#historial-list").append(lista_recargo);
    }

    if (historial[i]["concepto"] == "Mensualidad") {
      $("#historial-list").append(lista_mensualidad);
    }

    if (historial[i]["concepto"] == "Reactivacion" && historial[i]["estado"] === "Pagado") {
      $("#historial-list").append(reactivacion);
    }

    var hora_registro_pago = moment(historial[i]["createdAt"]);
    
    if (
      moment().isAfter(hora_registro_pago, "d") == false &&
      historial[i]["concepto"] == "Constancia"
    ) {

      $("#btn-genera-constancia").removeClass("btn-light");
      $("#btn-genera-constancia").addClass("btn-primary");
      $("#btn-genera-constancia").removeAttr("disabled");
    }

    if (
      moment().isAfter(hora_registro_pago, "d") == false &&
      historial[i]["concepto"] == "Titulo"
    ) {
      
      $("#btn-descarga-titulo").removeClass("btn-light");
      $("#btn-descarga-titulo").addClass("btn-primary");
      $("#btn-descarga-titulo").removeAttr("disabled");
    }
  }
}
async function verificareposicion(id_estudiante) {
  //VERIFICAR QUE LE CORRESPONDE TITULO:
  notas = await fetch("/notas-titulo-academy/" + id_estudiante)
    .then((response) => response.json())
    .then((data) => {
      return data.obtener_notas;
    });
  nota_participacion = await fetch(
    "/participacion-titulo-academy/" + id_estudiante
  )
    .then((response) => response.json())
    .then((data) => {
      return data.obtener_participacion;
    });
  ausencias = await fetch("/ausencias-titulo-academy/" + id_estudiante)
    .then((response) => response.json())
    .then((data) => {
      return data.obtener_ausencias;
    });
    
  var repos
  console.log(historial)
  console.log(notas)
  let observacion ="";
  let filter_historial;
  if (notas.length > 0) {    
    for (let i = 0; i < notas.length; i++) {
      
      if (notas[i].nota == 0) {            
          console.log(historial) 
           console.log(notas[i].n_leccion) 
       let nhistorial = historial.filter(function(reposs) {
          return reposs.observacion == notas[i].n_leccion; 
      });
      console.log(nhistorial)
      if (nhistorial.length > 0) {        
        continue
      }
      if (historial.length == 0) {
        if ($(`#reposicion${notas[i].n_leccion}`).length == 1) {
              
        } else {              
          if ($('#select-servicio option[value="Reposicion"]').length == 0 ) {
            $("#select-servicio").append(`<option value="Reposicion">Reposicion</option>`);
          }
          $("#select-reposicion").append(`<option>${notas[i].n_leccion}</option>`);
          $("#form-reg-pago").append(`<div id="reposicion${notas[i].n_leccion}">
          <input type="text" name="concepto[]" id="concepto-form-reposicion${notas[i].n_leccion}" value="Reposicion,${notas[i].n_leccion}">
<input type="text" name="monto[]" id="monto-form-reposicion${notas[i].n_leccion}" value="10000">
<input type="text" name="mora[]" id="mora-form-reposicion${notas[i].n_leccion}" value="-">
<input type="text" name="observacion[]" id="observacion-form-reposicion${notas[i].n_leccion}" value="${notas[i].n_leccion}">`);
          $("#body-table-pago")
            .append(`<tr id="tr-reposicion${notas[i].n_leccion}">
<td>
<span class="fw-bold">Reposición L${notas[i].n_leccion}</span>
</td>
<td>10000</td>
<td>
<a class="item borrar reposicion${notas[i].n_leccion}" onclick="borrarFila('tr-reposicion${notas[i].n_leccion}','reposicion${notas[i].n_leccion}')">
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" class="feather feather-trash me-50">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
      </path>
  </svg>
  <span>Eliminar</span>
</a>
</td>
</tr>`);
          $("#detalle-servicios").append(`<li class="price-detail">
<div class="detail-title">Reposicion,L-${notas[i].n_leccion}</div>
</li>`);
          $("#total-servicios").text("10000");
          
        }
      }
        for (let j = 0; j < historial.length; j++) {      
          repos = historial[j].concepto;
          repos = repos.split(",");        
          
            if (repos[0] == "Reposicion" ) {    
                 
            if ($(`#reposicion${notas[i].n_leccion}`).length == 1) {
              
            } else {              
              if (notas[i].n_leccion != repos[1]) { 
              if ($('#select-servicio option[value="Reposicion"]').length == 0 ) {
                $("#select-servicio").append(`<option value="Reposicion">Reposicion</option>`);
              }
              $("#select-reposicion").append(`<option>${notas[i].n_leccion}</option>`);
              $("#form-reg-pago").append(`<div id="reposicion${notas[i].n_leccion}">
              <input type="text" name="concepto[]" id="concepto-form-reposicion${notas[i].n_leccion}" value="Reposicion,${notas[i].n_leccion}">
<input type="text" name="monto[]" id="monto-form-reposicion${notas[i].n_leccion}" value="10000">
<input type="text" name="mora[]" id="mora-form-reposicion${notas[i].n_leccion}" value="-">
<input type="text" name="observacion[]" id="observacion-form-reposicion${notas[i].n_leccion}" value="${notas[i].n_leccion}">`);
              $("#body-table-pago")
                .append(`<tr id="tr-reposicion${notas[i].n_leccion}">
<td>
  <span class="fw-bold">Reposición L${notas[i].n_leccion}</span>
</td>
<td>10000</td>
<td>
  <a class="item borrar reposicion${notas[i].n_leccion}" onclick="borrarFila('tr-reposicion${notas[i].n_leccion}','reposicion${notas[i].n_leccion}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" class="feather feather-trash me-50">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
          </path>
      </svg>
      <span>Eliminar</span>
  </a>
</td>
</tr>`);
              $("#detalle-servicios").append(`<li class="price-detail">
<div class="detail-title">Reposicion,L-${notas[i].n_leccion}</div>
</li>`);
              $("#total-servicios").text("10000");
            }
            }
            
          }else{
            if ($(`#reposicion${notas[i].n_leccion}`).length == 1) {
              
            } else {              
              if ($('#select-servicio option[value="Reposicion"]').length == 0 ) {
                $("#select-servicio").append(`<option value="Reposicion">Reposicion</option>`);
              }
              $("#select-reposicion").append(`<option>${notas[i].n_leccion}</option>`);
              $("#form-reg-pago").append(`<div id="reposicion${notas[i].n_leccion}">
              <input type="text" name="concepto[]" id="concepto-form-reposicion${notas[i].n_leccion}" value="Reposicion,${notas[i].n_leccion}">
<input type="text" name="monto[]" id="monto-form-reposicion${notas[i].n_leccion}" value="10000">
<input type="text" name="mora[]" id="mora-form-reposicion${notas[i].n_leccion}" value="-">
<input type="text" name="observacion[]" id="observacion-form-reposicion${notas[i].n_leccion}" value="${notas[i].n_leccion}">`);
              $("#body-table-pago")
                .append(`<tr id="tr-reposicion${notas[i].n_leccion}">
<td>
  <span class="fw-bold">Reposición L${notas[i].n_leccion}</span>
</td>
<td>10000</td>
<td>
  <a class="item borrar reposicion${notas[i].n_leccion}" onclick="borrarFila('tr-reposicion${notas[i].n_leccion}','reposicion${notas[i].n_leccion}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" class="feather feather-trash me-50">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
          </path>
      </svg>
      <span>Eliminar</span>
  </a>
</td>
</tr>`);
              $("#detalle-servicios").append(`<li class="price-detail">
<div class="detail-title">Reposicion,L-${notas[i].n_leccion}</div>
</li>`);
              $("#total-servicios").text("10000");
              
            }

            }
          
          
        }
      }
    }
  }
}

const leccionActualGrupos = async () => {
  $("#grupos_table").dataTable().fnDestroy();
  $("#grupos_table").empty();
  $("#grupos_table").html(`<thead>
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
  $(`#gruposAct`).empty();
  var grupoActual = $("#leccion_actual_reasig").val(),
    numLeccion;
  var jjaa;
  var gruposAct = [];
  let fstChar = $("#grupoReag").text().charAt(0);
  let count = 0;
  for (let i = 0; i < grupos.length; i++) {
    let tipo = grupos[i]["nombre"];
    let inicio = moment(grupos[i]["fecha_inicio"], "DD-MM-YYYY");
    let final = moment(grupos[i]["fecha_finalizacion"], "DD-MM-YYYY");
    let diferencia2 = final.diff(inicio, "w");
    let dia = grupos[i]["dia_horario"].split(":");
    dia = dia[0].toString();
    dia = dia.split("y");
    let fechaInicio = moment(grupos[i]["fecha_inicio"], "DD-MM-YYYY").format(
      "DD-MM-YYYY"
    );
    let diff = moment().diff(moment(fechaInicio, "DD-MM-YYYY"), "days");
    let rest;
    if (grupos[i]["lecciones_semanales"] === "1") {
      if (diff < 0) {
        rest = (224 - -diff) / 7;
      } else {
        rest = (224 - diff) / 7;
      }
    } else {
      if (diff < 0) {
        rest = (112 - -diff) / 3.5;
      } else {
        rest = (112 - diff) / 3.5;
      }
    }

    numLeccion = 32 - Math.floor(rest);

    let prof = grupos[i].usuarioId ? grupos[i].usuario.nombre : 'No asignado'

    let grupoIdentif = gruposTodos.filter(grupo => grupo.id === grupos[i].id)

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
    } else {
      if ($("#grupoReag").text() == grupos[i]["identificador"]) {
      } else {
        let filter_group_alumnos = matricula.filter(
          (filter2) => filter2.grupo.id == grupos[i]["id"]
        ).length;
        gruposAct.push(grupos[i]);
        let fstChar2 = grupos[i]["identificador"].charAt(0);


        if (
          (fstChar == "C" && fstChar2 == "I") ||
          (fstChar == "I" && fstChar2 == "C") ||
          (fstChar == "C" && fstChar2 == "C") ||
          (fstChar == "I" && fstChar2 == "I")
        ) {
          $(`#gruposAct`).append(`<tr>
    <td><div class="form-check"> <input class="form-check-input dt-checkboxes grupoSelected" name="grupoSelected" type="radio" value="${grupos[i]["id"]}" id="checkbox${grupos[i]["id"]}" onclick="grupoSelected(this.value)"/><label class="form-check-label" for="checkbox${grupos[i]["id"]}"></label></div></td>
    <td>${grupoIdentif[0].identificador}</td>
    <td>${jjaa}</td>
    <td>${grupos[i]["dia_horario"]}</td>
    <td>${grupos[i]["dia_pagos"]}</td>
    <td>${filter_group_alumnos}</td>
    <td>${prof}</td>
</tr>`);
count++
        }

        if (fstChar == "N" && fstChar2 == "N") {
          $(`#gruposAct`).append(`<tr>
    <td><div class="form-check"> <input class="form-check-input dt-checkboxes grupoSelected" name="grupoSelected" type="radio" value="${grupos[i]["id"]}" id="checkbox${grupos[i]["id"]}" onclick="grupoSelected(this.value)"/><label class="form-check-label" for="checkbox${grupos[i]["id"]}"></label></div></td>
    <td>${grupoIdentif[0].identificador}</td>
    <td>${jjaa}</td>
    <td>${grupos[i]["dia_horario"]}</td>
    <td>${grupos[i]["dia_pagos"]}</td>
    <td>${filter_group_alumnos}</td>
    <td>${grupos[i]["usuario"]["nombre"]}</td>
</tr>`);
count++
        }
      }

    }
    $("#countGrupos").text("0");
    $("#countGrupos").text(gruposAct.length);
    
  }
  $("#countGrupos").val(count);
  var dt_gruposActi = $("#grupos_table");
  dt_gruposActi.DataTable({
    bPaginate: false,
    bFilter: false,
    bInfo: false,
    order: [[2, "desc"]],
  });
  $('#grupos_table_wrapper').removeClass('dataTables_wrapper')
  $('#grupos_table').removeClass('dataTable')
};
function grupoSelected(valor) {
  $("#grupoId").val(valor);
  $("#guarda-grupoNew").removeAttr("disabled");
}

function SetGrap (item, total, color) {
  console.log(item, total, color) 
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

async function ControlDetalles(id1, id2) {
  let url = `/controlMatricula/${id1}/${id2}`;

  let response = await fetch(url),
  status = await response.status,
  alumnoJson = await response.json();

  $('#controlTitle').text($('#nombre-alumno').text());
  $('#grupoNivel').val(alumnoJson.nivelActualGrupo);
  $('#grupoNivel').trigger('change');

  let valorAsistencia = 3.125
  let leccionesAusentes = parseFloat(alumnoJson.ausentes * valorAsistencia).toFixed(2);
  let totalAsis = parseFloat(100 - leccionesAusentes);
  alumnoJson.leccion9 = alumnoJson.notas.filter(item => item.n_leccion == 9 && item.nivel === alumnoJson.nivelActualGrupo)
  alumnoJson.leccion17 = alumnoJson.notas.filter(item => item.n_leccion == 17 && item.nivel === alumnoJson.nivelActualGrupo)
  alumnoJson.leccion18 = alumnoJson.notas.filter(item => item.n_leccion == 18 && item.nivel === alumnoJson.nivelActualGrupo)
  alumnoJson.leccion25 = alumnoJson.notas.filter(item => item.n_leccion == 25 && item.nivel === alumnoJson.nivelActualGrupo)
  alumnoJson.leccion31 = alumnoJson.notas.filter(item => item.n_leccion == 31 && item.nivel === alumnoJson.nivelActualGrupo)
  alumnoJson.leccion32 = alumnoJson.notas.filter(item => item.n_leccion == 32 && item.nivel === alumnoJson.nivelActualGrupo)
  let totalNotas = alumnoJson.leccion9 + alumnoJson.leccion17 + alumnoJson.leccion18 + alumnoJson.leccion25 + alumnoJson.leccion31+ alumnoJson.leccion32 + alumnoJson.participacion;
  let color1, color2;

  if (totalAsis >= 80) {
    color1 = "#28c76f"
  } else {
    color1 = "#82868b"
  } 
  
  if (totalNotas >= 70) {
    color2 = "#28c76f"
  } else {
    color2 = "#82868b"
  } 

  let asistenciaHtml = `
  <div class="d-flex align-items-center">
    <div class="d-flex align-items-center flex-column justify-content-center">
      <h6 class="m-0 fw-bolder">Asistencias</h6>
      <h6 class="m-0 card-text">${totalAsis}%</h6>
    </div>
    <div id="chartAsistencia${id1}"></div>
  </div>`;
  $('#col-asis').html(asistenciaHtml)

  let item1 = document.querySelector(`#chartAsistencia${id1}`);
  if(item1) {
    SetGrap(item1, totalAsis, color1);
  }

  let notasHtml = `
  <div class="d-flex align-items-center">
    <div class="d-flex align-items-center flex-column justify-content-center">
      <h6 class="m-0 fw-bolder">Calificación</h6>
      <h6 class="m-0 card-text">${totalNotas}%</h6>
    </div>
    <div id="chartNota${id1}"></div>
  </div>`;
  $('#col-notas').html(notasHtml)

  let item2 = document.querySelector(`#chartNota${id1}`);
  if(item2) {
    SetGrap(item2, totalNotas, color2);
  }
  $('#tablaControl').html('');

  let arrayLeccionesAusentes = alumnoJson.fechaLeccionesAusentes, leccion = alumnoJson.leccActual
  
  if(status === 200) {
    let content = new DocumentFragment();

    for (let num = 1; num <= leccion; num++) {
      let row = document.createElement('tr'), td = '', notaLeccion = 0, calif = '', color = '';
      
      if(num === 9 || num === 17 || num === 18 || num === 25 || num === 31 || num === 32) {
        alumnoJson.notas.forEach(item => {
          //console.log(item);
          if (item && parseInt(item.n_leccion) === num) {
            notaLeccion = item.nota
          }
        });
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
      
      if(arrayLeccionesAusentes.length) {

        let result = arrayLeccionesAusentes.filter((lecc => parseInt(lecc.n_leccion) === num));
        //let resultNotas = arrayLeccionesAusentes.filter((lecc => parseInt(lecc.n_leccion) === num));

        if(result.length && parseInt(result[0].n_leccion) === num) {
          /*console.log(result)*/
          td += 
          `
            <div class="d-flex flex-column pb-0">


            <div class="d-flex align-items-center">
                <div class="d-flex align-items-center me-1 me-lg-2">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>

                <div class="me-1 me-lg-2">
                  
                    <span class="emp_post fw-bolder">Fecha</span><br>
                    <span class="emp_post">23-12-2022</span>

                </div>
                <div class="me-1 me-lg-2 text-center">
                
                    <span class="emp_post fw-bolder">Asistencia</span><br>

                    <span class="badge rounded-pill badge-light-danger">
                      Ausente
                    </span>
                    
                </div>

                <div class="text-center">
                    
                    <span class="emp_post fw-bolder">Calificación</span><br>
                    ${calif}

                </div>
              </div>
              <hr class="mb-0">
            </div>
          `;
        } else {
          td += 
          `
            <div class="d-flex flex-column pb-0">

            
            <div class="d-flex align-items-center">
                <div class="d-flex align-items-center me-1 me-lg-2">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>

                <div class="me-1 me-lg-2">
                  
                    <span class="emp_post fw-bolder">Fecha</span><br>
                    <span class="emp_post">23-12-2022</span>

                </div>
                <div class="me-1 me-lg-2 text-center">
                
                    <span class="emp_post fw-bolder">Asistencia</span><br>

                    <span class="badge rounded-pill badge-light-success">
                      Presente
                    </span>
                    
                </div>

                <div class="text-center">
                    
                    <span class="emp_post fw-bolder">Calificación</span><br>
                    ${calif}

                </div>
              </div>
              <hr class="mb-0">
            </div>
          `;
        }

      } else {
        td += 
          `
            <div class="d-flex flex-column pb-0">

            
            <div class="d-flex align-items-center">
                <div class="d-flex align-items-center me-1 me-lg-2">
                  <span class="me-1 fw-bolder">Lección ${num}</span>
                </div>

                <div class="me-1 me-lg-2">
                  
                    <span class="emp_post fw-bolder">Fecha</span><br>
                    <span class="emp_post">23-12-2022</span>

                </div>
                <div class="me-1 me-lg-2 text-center">
                
                    <span class="emp_post fw-bolder">Asistencia</span><br>

                    <span class="badge rounded-pill badge-light-success">
                      Presente
                    </span>
                    
                </div>

                <div class="text-center">
                    
                    <span class="emp_post fw-bolder">Calificación</span><br>
                    ${calif}

                </div>
              </div>
              <hr class="mb-0">
            </div>
          `;
      }
      row.innerHTML = td;
      content.appendChild(row);
    }

    $('#tablaControl').html(content);

    $("#btn-control").click();

  }
}

// * FUNCION CARGAR ARCHIVOS EXCEL
let linkExcel = "", file;
  $('#archivoExcel').on('change', (event)=>{
    subirImagen(event)
  })

  const subirImagen = (event) => {
    //$(`#loading3`).addClass("display");
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
          linkExcel = "/cargarExcelPagos/"+file

          EnviarDatos("Pagos guardados", "succ")
          
          /*$(`#progressBar1`).text('Se cargó correctamente la imágen - 100%');
          setTimeout(() => {
            $(`#progressBar1`).addClass("d-none");
            $(`#loading3`).removeClass("display");
          }, 1000)*/
        },
        error: function (jqXHR, textStatus) { 
          EnviarDatos("Lo sentimos, algo ah ocurrido al realizar la acción", "err")
          /*$("#progressBar1").text('100% - Error al cargar el archivo');
          $("#progressBar1").removeClass("progress-bar-success");
          $("#progressBar1").addClass("progress-bar-danger");*/
        }
      });
  };

  function EnviarDatos(text, type) {
    if(text && type === "succ") {
      Swal.fire({
        title: 'Pagos registrados!',
        icon: 'success',
      }).then((value) => {
        if (value.isConfirmed || value.isDismissed) {
          linkExcel = "/cargarExcelPagos/"+file
          window.location.href = linkExcel
        }
      })
    } else {
      Swal.fire({
        title: 'Estimado Usuario!',
        text: 'Hubo un error al realizar la acción',
        icon: 'error',
      })
    }
  }