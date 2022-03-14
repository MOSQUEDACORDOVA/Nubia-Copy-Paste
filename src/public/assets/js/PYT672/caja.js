var historial;

$(function () {
  var matricula = JSON.parse($("#matricula_st").val());
  var today_day = moment().format("D"),
    hoy = moment();

  /**FUNCIONES AL SELECCIONAR EL ALUMNO */
  $(".alumno-select").change(async (e) => {
    $('#btn-add-commnet').removeAttr('disabled')
    var filter = matricula.filter((element) => element.id == e.target.value);
    console.log(filter);
    $("#historial-list").empty();
    $("#body-table-pago").empty();
    $("#form-reg-pago").empty();
    $("#nombre-alumno").text(filter[0]["nombre"]);
    $("#grupo-alumno").text(filter[0]["grupo"]["identificador"]);
    $("#horario-alumno").text(filter[0]["grupo"]["dia_horario"]);
    $("#profesor-alumno").text("Isaac");
    $("#telefonos-alumno").text(
      filter[0]["telefono1"] + " - " + filter[0]["telefono2"]
    );
    $("#fecha-pago-alumno").text(filter[0]["grupo"]["dia_pagos"]);
    let dias_pago = filter[0]["grupo"]["dia_pagos"].split(" ");
    /**OBTENER HISTORIAL DE CAJA */
    historial = await fetch("/historia-caja-academy/" + filter[0]["id"])
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data.obtener_historia;
      });
    let fecha_pago_historial,
      pago_mensualidad = [];
 
    if (today_day <= dias_pago[0]) {
      $("#pago-mensual-detail").text("17000");
      console.log('Aun no le toca pagar')
      console.log(today_day)
      console.log(dias_pago[0])
            /**FORM */
            $("#form-reg-pago")
            .append(`<input type="text" name="id_alumno" id="id-alumno-form" value="${
            filter[0]["id"]
          }">`);
          updateHistorial(e.target.value)
          verificareposicion(e.target.value)
    } else {
      var filter_mensualidad = historial.filter(
        (element) =>
          element.concepto == "Mensualidad" &&
          element.matriculaId == filter[0]["id"]
      );
      console.log(filter_mensualidad);
      if (filter_mensualidad.length < 1) {
        mes_a_pagar = hoy.locale("es").format("MMMM");
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
        var mes_a_pagar;
        console.log(filter_mensualidad[0]["observacion"]);
        for (let i = 0; i < meses.length; i++) {
          if (
            meses[i] ==
            filter_mensualidad[filter_mensualidad.length - 1]["observacion"]
          ) {
            console.log(meses[i + 1]);
            mes_a_pagar = meses[i + 1];
            break;
          }
          mes_a_pagar = hoy.locale("es").format("MMMM");
        }
      }

      /**FORM */
      $("#form-reg-pago")
        .append(`<input type="text" name="id_alumno" id="id-alumno-form" value="${
        filter[0]["id"]
      }">
<div id="mensualidad-${mes_a_pagar}" class=".mensualidad-${mes_a_pagar}"><input type="text" name="concepto[]" id="concepto-form" value="Mensualidad">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form" value="${moment().format(
        "YYYY-MM-DD"
      )}">-->
<input type="text" name="monto[]" id="monto-form" value="17000">
<input type="text" name="mora[]" id="mora-form" value="-">
<input type="text" name="observacion[]" id="observacion-form" value="${mes_a_pagar}">
</div>`);
      /**FIN FORM */

      $("#pago-mensual-detail").text("17000");
      /**LLENAR TABLA */
      $("#body-table-pago").append(`<tr id="tr-mensualidad-${mes_a_pagar}">
<td>
    <span class="fw-bold">Mensualidad</span>
</td>
<td class="text-capitalize">${mes_a_pagar}</td>
<td>17000</td>
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
updateHistorial(e.target.value)
verificareposicion(e.target.value)

    }

    /**FIN DEL SELECT ALUMNO */
  });

  $('#add_pago-btn').click(()=>{
    let id_alumno = $("#id-alumno-form").val();

  if (!id_alumno) {
    swal.fire("Debe seleccionar un alumno para procesar un pago");
    return;
  } 
    let servicio = $('#select-servicio').val()

    switch (servicio) {
      case 'Traslado':        
    if ($("#concepto-form-traslado").length > 0) {
      swal.fire("Ya ha seleccionado un traslado para este alumno, guarde los cambios");
      return;
    }
        translado()
        break;
        case 'Constancia':
          if ($("#concepto-form-constancia").length > 0) {
            swal.fire("Ya ha seleccionado una constancia para este alumno, guarde los cambios" );
            return;
          }
        constancia()
          break;
          case 'Titulo':            
    if ($("#concepto-form-titulo").length > 0) {
      swal.fire("Ya ha seleccionado un titulo para este alumno, guarde los cambios");
      return;
    }
        titulo()
        break;
        case 'Reposicion':
          reposicion()
        break;
        case 'Mensualidad':
          mensualidad()
        break;
      default:
        break;
    }
  })
 $('#select-servicio').change((e)=>{
  let id_alumno = $("#id-alumno-form").val();

  if (!id_alumno) {
    swal.fire("Debe seleccionar un alumno para procesar un pago");
    return;
  }
  let servicio = $('#select-servicio').val()
  // $('#fecha-servicio').val(moment().format(
  //   "YYYY-MM-DD" ))
    $('.select-reposicion').addClass(`d-none`) 
  switch (servicio) {
    case 'Mensualidad':
      addMensualidadFormat()
      $('#itemPrice').val(17000)
      break;
    case 'Recargo':
      removeMensualidadFormat()
      $("#itemPrice").prop("readonly", false);
      $('#itemPrice').val('')
      break;
    case 'Traslado':
      removeMensualidadFormat()
      $('#itemPrice').val(5000)
      break;
    case 'Constancia':
      removeMensualidadFormat()
      $('#itemPrice').val(5000)
      break;
    case 'Titulo':
      removeMensualidadFormat()
      $('#itemPrice').val(20000)
      break;
      case 'Reposicion':
        removeMensualidadFormat()
        $('.select-reposicion').removeClass(`d-none`)  
      $('#itemPrice').val(10000)
      break;
    default:
      break;
  }
 })

  function addMensualidadFormat() {
    $("#itemPrice").prop("readonly", true);
    document.getElementById("mContenedor").classList.replace("row-cols-3", "row-cols-4");
    document.getElementById("precio").classList.replace("col", "col-4");
    // document.getElementById("banco").classList.replace("col-6", "col-4");
    // document.getElementById("transct").classList.replace("col-6", "col-4");
    $('.mensualidadAdd').removeClass('d-none');
  }

  function removeMensualidadFormat() {
    $("#itemPrice").prop("readonly", true);
    document.getElementById("mContenedor").classList.replace("row-cols-4", "row-cols-3");
    document.getElementById("precio").classList.replace("col-4", "col");
    // document.getElementById("banco").classList.replace("col-4", "col-6");
    // document.getElementById("transct").classList.replace("col-4", "col-6");
    $('.mensualidadAdd').addClass('d-none')
  }
  
  /**INICIO HABILITAR MENSUALIDAD */
  const mensualidad =async ()=>{
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    let mes = $("#select-mes").val();
    // let value_fecha = $("#fecha_pago-form").val();
    let anio = $("#select-anio").val();
    let mes_a_pagar = mes + "-"+anio;
   console.log(mes_a_pagar)

     /**FORM */
     $("#form-reg-pago")
     .append(`
<div id="mensualidad-${mes_a_pagar}" class=".mensualidad-${mes_a_pagar}">
<input type="text" name="concepto[]" id="concepto-form" value="Mensualidad">
<input type="text" name="monto[]" id="monto-form" value="${$('#itemPrice').val()}">
<input type="text" name="mora[]" id="mora-form" value="-">
<input type="text" name="observacion[]" id="observacion-form" value="${mes_a_pagar}">
</div>`);
   /**FIN FORM */

   $("#pago-mensual-detail").text($('#itemPrice').val());
   /**LLENAR TABLA */
   $("#body-table-pago").append(`<tr id="tr-mensualidad-${mes_a_pagar}">
<td>
 <span class="fw-bold">Mensualidad</span>
</td>
<td class="text-capitalize">${mes_a_pagar}</td>
<td>${$('#itemPrice').val()}</td>
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
  }/**FIN BNT MENSUALIDAD */

  /**INICIO HABILITAR TRASLADO */
  const translado =async ()=>{
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    var filter = matricula.filter((element) => element.id == id_alumno);
    let value_concepto = $("#concepto-form").val();
    // let value_fecha = $("#fecha_pago-form").val();
    let value_monto = $("#monto-form").val();
    let value_mora = $("#mora-form").val();
    let value_observacion = $("#observacion-form").val();

   
    //const fecha_pago = $('#fecha-servicio').val()

    let dias_pago = filter[0]["grupo"]["dia_pagos"].split(" ");
    // let fecha_sup = moment().isBefore(moment(fecha_pago, "YYYY-MM-DD"), "d"); // true
    // if (fecha_sup == true) {
    //   swal.fire("La fecha seleccionada es superior a la actual");
    //   return;
    // }
    

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
<td></td>
<td>5000</td>
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
  }/**FIN BNT TRASLADO */

/**HABILITAR CONSTANCIA */
  const constancia =async ()=>{
    let id_alumno = $("#id-alumno-form").val();
    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
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
<td></td>
<td>5000</td>
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
  }/**FIN BNT TRASLADO */

/**BTN HABILITAR TITULO */
  const titulo =async ()=>{
    let id_alumno = $("#id-alumno-form").val();

    if (!id_alumno) {
      swal.fire("Debe seleccionar un alumno para habilitar esta opción");
      return;
    }
    //VERIFICAR QUE LE CORRESPONDE TITULO:
    notas = await fetch("/notas-titulo-academy/" + id_alumno)
      .then((response) => response.json())
      .then((data) => {
        return data.obtener_notas;
      });
    nota_participacion= await fetch("/participacion-titulo-academy/" + id_alumno)
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
      swal.fire('Aún no cumple con el total de lecciones para obtar al Titulo')
      return
    }
    if (notas.length < 6) {
      swal.fire('Le falta al menos 1 o mas notas para obtar al Titulo')
      return
    }
    let total_nota = 0

    for (let i = 0; i < notas.length; i++) {
      if (notas[i]['nota'] == 'undefined') {
        total_nota += 0
      }else{
        total_nota += parseInt(notas[i]['nota']) 
      }
           
    }

    let asistencias = 32-parseInt(ausencias.length)
    let porcentaje_asist = (asistencias * 100)/32
    if (porcentaje_asist < 70) {
      swal.fire(`Su asistencia es: ${porcentaje_asist}% (menor a 70%), no obta a Titulo`)
      return
    }
console.log(total_nota)
    if (total_nota <= 79) {
      swal.fire(`Su nota final es: ${total_nota}% (menor a 80%), no obta a Titulo`)
      return
    }
    
    //CONTINUA HABILITANDO EL TITULO
    var filter = matricula.filter((element) => element.id == id_alumno);

    let dias_pago = filter[0]["grupo"]["dia_pagos"].split(" ");
    $("#form-reg-pago")
      .append(`<div id="Titulo"><input type="text" name="concepto[]" id="concepto-form-Titulo" value="Titulo">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form-Titulo" value="">-->
<input type="text" name="monto[]" id="monto-form-Titulo" value="20000">
<input type="text" name="mora[]" id="mora-form-Titulo" value="-">
<input type="text" name="observacion[]" id="observacion-form-Titulo" value="-">>
</div>`);

    $("#body-table-pago").append(`<tr id="tr-Titulo">
<td>
<span class="fw-bold">Titulo</span>
</td>
<td></td>
<td>20000</td>
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
  }/**FIN BNT TITULO */

/**BTN HABILITAR REPOSICION */
const reposicion =async ()=>{
  let id_estudiante = $("#id-alumno-form").val();

  if (!id_estudiante) {
    swal.fire("Debe seleccionar un alumno para habilitar esta opción");
    return;
  }
  let leccion = $('#select-reposicion').val()
  if ($(`#reposicion${leccion}`).length>0) {
    swal.fire("Ya la lección esta agregada, seleccione otra o guarde el pago");
    return;
  } else {
   
    $("#form-reg-pago")
    .append(`<div id="reposicion${leccion}"><input type="text" name="concepto[]" id="concepto-form-reposicion${leccion}" value="Reposicion,L-${leccion}">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form-reposicion${leccion}" value="">-->
<input type="text" name="monto[]" id="monto-form-reposicion${leccion}" value="10000">
<input type="text" name="mora[]" id="mora-form-reposicion${leccion}" value="-">
<input type="text" name="observacion[]" id="observacion-form-reposicion${leccion}" value="-">`);

  $("#body-table-pago").append(`<tr id="tr-reposicion${leccion}">
<td>
  <span class="fw-bold">Reposicion,L-${leccion}</span>
</td>
<td></td>
<td>10000</td>
<td>
  <a class="item borrar reposicion${leccion}" onclick="borrarFila('tr-reposicion${leccion}','reposicion${leccion}')">
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


  }
  
}/**FIN BNT REPOSICION */
  
  /**BTN GENERAR CONSTANCIA */
  $("#btn-genera-constancia").click(async () => {
    let id_estudiante = $("#id-alumno-form").val();
    console.log(id_estudiante);
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
  console.log(id_estudiante);
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
      title: 'Datos adicionales',
      html: `<div class="mb-1">
      <label class="form-label" for="itemcost">Fecha</label>
      <input type="date" id="fecha-servicio" class="form-control flatpickr-basic" placeholder="DD-MM-YYYY" name="fecha" required>
    </div>
      <div class="mb-1">
      <label class="form-label" for="itemquantity">Banco</label>
                                      <select class="form-select" id="bank-serv">
        <option>Seleccione</option>
                                          <option>BNA</option>
                                          <option>BCR</option>
        <option>BAC</option>
        <option>BPO</option>																	
      </select>
    </div> 
    <div id="transct" class="col-6">
    <div class="mb-1">
      <label class="form-label" for="itemquantity">Transaccion #:</label>
      <input type="text" class="form-control" id="trans-serv" aria-describedby="precio" value="">
    </div>
  </div>`,
      confirmButtonText: 'Continuar',
      focusConfirm: false,
      preConfirm: () => {
        const fecha_pago = Swal.getPopup().querySelector('#fecha-servicio').value
        const banco = Swal.getPopup().querySelector('#bank-serv').value
        const transaction = Swal.getPopup().querySelector('#trans-serv').value
        if (!fecha_pago || !banco|| !transaction) {
          Swal.showValidationMessage(`Debe llenar todos los campos, por favor!`)
        }
        return { fecha_pago: fecha_pago, banco: banco, transaction:transaction }
      }
    }).then((result) => {
      console.log(result.value.fecha_pago)
      console.log(result.value.banco)
      console.log(result.value.transaction)
      $("#form-reg-pago")
      .append(`<input type="text" name="fecha_pago" id="fecha_pago-form" value="${result.value.fecha_pago}">
  <input type="text" name="banco" id="banco-form" value="${result.value.banco}">
  <input type="text" name="transaccion" id="transaction-form" value="${result.value.transaction}">`);

      $.ajax({
        url: `/guardar-pago-academy`,
        type: "POST",
        data: $("#form-reg-pago").serialize(),
        success: function (data, textStatus, jqXHR) {
          console.log(data);
          $('#body-table-pago').empty()
          $('#itemPrice').val('')
          $('#select-servicio').val('Seleccione')
          $('.select-reposicion').addClass(`d-none`) 
          $('#bank-serv').val('Seleccione')
          $('#trans-serv').val(``) 
          Swal.fire("Se guardó el pago con éxito");
  
          updateHistorial($("#id-alumno-form").val());
        },
        error: function (jqXHR, textStatus) {
          console.log("error:" + jqXHR);
        },
      });
    })

   
    /**FIN BTON GUARDAR PAGO */
  });

  $(".borrar").on("click", function () {
    console.log();
    $(`#mensualidad-${mes_a_pagar}`).remove();
    $(this).parents("tr").remove();
  });

  /** CARGAR COMENTARIOS DEL ALUMNO AL PRESIONAR CLICK EN EL BOTON COMENTARIOS */
  $('#btn-add-commnet').click(async ()=>{
    $('#commentAdmin').empty()
    let id_alumno = $("#id-alumno-form").val();
       let comentariosA = await fetch("/comentarios_admin_get-academy/" + id_alumno)
          .then((response) => response.json())
          .then((data) => {
            return data.obtener_comentarios;
          });
          console.log(comentariosA)
          for (let i=0; i < comentariosA.length; i++){
            $('#commentAdmin').append(`<div class="col-12">
             <div class="mb-1">
               <label class="form-label" for="exampleFormControlTextarea1">Comentario del ${moment(comentariosA[i].createdAt).format('DD/MM/YYYY')}</label>
               <textarea class="form-control" id="coment${comentariosA[i].id}" rows="1" data-id="47" readonly>${comentariosA[i].commentAdminForm}</textarea>
             </div>
           </div>`)                        
        }
    })
            //**VER CREADOR DE COMENTARIOS */
            $('#commentAdminShow').click(()=>{
             $('#accordionMargin').addClass('collapse');
             $('#commentAdmin').removeClass('collapse');
            })
            
            //**MOSTRAR COMENTARIOS DEL ADMIN */
            $('#addCommentShow').click(()=>{
             $('#accordionMargin').removeClass('collapse');
             $('#commentAdmin').addClass('collapse');
             $('#addComment').val('');
            })
            /** AGREGAR COMENTARIO */
            $('#addComment').change(function(){
                console.log($(this).val())
                let id_alumno = $("#id-alumno-form").val();
                const data_C = new FormData();
    data_C.append("id_alumno", id_alumno);
    data_C.append("comentario", $(this).val());
                 $.ajax({
      url: `/guardar_comentario_admin_academy`,
      type: 'POST',
      data: data_C,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data, textStatus, jqXHR) {
    console.log(data);
    $('#addComment').val('');
    $('#commentAdmin').empty()
        for (let i=0; i < data.obtener_comentarios.lenght; i++){
            $('#commentAdmin').append(`<div class="col-12">
             <div class="mb-1">
               <label class="form-label" for="exampleFormControlTextarea1">Comentario del</label>
               <textarea class="form-control addCommentShow" id="comentP47" rows="1" placeholder="${comentarios[i].addCommentShowForm}" data-id="47" readonly></textarea>
             </div>
           </div>`)                        
        }
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
            })/**FIN ADDCOMMENT */
            
  /**FIN DOCUMENT READY */
});

function borrarFila(t, identificador) {
  console.log(t);
  console.log(identificador);
  $(`#${t}`).remove();
  $(`#${identificador}`).remove();
}
async function updateHistorial(id_estudiante) {
  $("#historial-list").empty();
  var matricula = JSON.parse($("#matricula_st").val());
  var filter = matricula.filter((element) => element.id == id_estudiante);
  /**OBTENER HISTORIAL DE CAJA */
  historial = await fetch("/historia-caja-academy/" + id_estudiante)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.obtener_historia;
    });
  console.log(historial);
  let fecha_pago_historial,
    pago_mensualidad = [];
  $("#btn-genera-constancia").addClass("btn-light");
  $("#btn-genera-constancia").removeClass("btn-primary");
  $("#btn-genera-constancia").attr("disabled", true);

  $("#btn-descarga-titulo").addClass("btn-light");
  $("#btn-descarga-titulo").removeClass("btn-primary");
  $("#btn-descarga-titulo").attr("disabled", true);

  for (let i = 0; i < historial.length; i++) {
    fecha_pago_historial = moment(historial[i]["fecha_pago"]).format("DD-MM-YYYY");
    let lista = `<li class="timeline-item">
    <span class="timeline-point timeline-point-indicator"></span>
    <div class="timeline-event">
    <div class="d-flex justify-content-between">
      <h6>${historial[i]["concepto"]}</h6>
      <p class="mb-tl">${fecha_pago_historial}</p>
    </div>
    <div class="d-flex justify-content-between">
      <p class="mb-tl"><strong> Grupo:</strong> <span>${filter[0]["grupo"]["identificador"]}</span></p>
      <h6 class="more-info mb-0">₡ ${historial[i]["monto"]}</h6>
    </div>
    </div>
    </li>`
    if (historial[i]["concepto"] == "Traslado" && historial[i]["observacion"] != "-" || historial[i]["concepto"] == "Constancia" && historial[i]["observacion"] != "-") {      
      $("#historial-list").append(lista);
    }
    if (historial[i]["concepto"] == "Mensualidad") {      
      $("#historial-list").append(lista);
    }

    var hora_registro_pago = moment(historial[i]["createdAt"]);
    console.log(moment().isAfter(hora_registro_pago, "d"));
    if (
      moment().isAfter(hora_registro_pago, "d") == false &&
      historial[i]["concepto"] == "Constancia"
    ) {
      console.log("habilita el boton");

      $("#btn-genera-constancia").removeClass("btn-light");
      $("#btn-genera-constancia").addClass("btn-primary");
      $("#btn-genera-constancia").removeAttr("disabled");
    }

    if (
      moment().isAfter(hora_registro_pago, "d") == false &&
      historial[i]["concepto"] == "Titulo"
    ) {
      console.log("habilita el boton");
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
nota_participacion= await fetch("/participacion-titulo-academy/" + id_estudiante)
.then((response) => response.json())
.then((data) => {
  return data.obtener_participacion;
});
ausencias = await fetch("/ausencias-titulo-academy/" + id_estudiante)
    .then((response) => response.json())
    .then((data) => {
      return data.obtener_ausencias;
    });
console.log(notas)
console.log(nota_participacion)
// $('#fecha-servicio').val(`${moment().format(
//   "YYYY-MM-DD"
// )}`)
if (notas.length >0) {  
for (let i = 0; i < notas.length; i++) {
  if (notas[i].nota == 0) {
    console.log($('#select-servicio option[value="Reposicion"]').length)
    if ($('#select-servicio option[value="Reposicion"]').length ==0 ){
        $('#select-servicio').append(`<option value="Reposicion">Reposicion</option>`)
    }
    
    //$('.select-reposicion').removeClass(`d-none`)    
    $('#select-reposicion').append(`<option>${notas[i].n_leccion}</option>`)

    $("#form-reg-pago")
    .append(`<div id="reposicion${notas[i].n_leccion}"><input type="text" name="concepto[]" id="concepto-form-reposicion${notas[i].n_leccion}" value="Reposicion,${notas[i].n_leccion}">
<!--<input type="text" name="fecha_pago[]" id="fecha_pago-form-reposicion${notas[i].n_leccion}" value="${moment().format(
  "YYYY-MM-DD"
)}">-->
<input type="text" name="monto[]" id="monto-form-reposicion${notas[i].n_leccion}" value="10000">
<input type="text" name="mora[]" id="mora-form-reposicion${notas[i].n_leccion}" value="-">
<input type="text" name="observacion[]" id="observacion-form-reposicion${notas[i].n_leccion}" value="-">`);

  $("#body-table-pago").append(`<tr id="tr-reposicion${notas[i].n_leccion}">
<td>
  <span class="fw-bold">Reposicion,L-${notas[i].n_leccion}</span>
</td>
<td></td>
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
