var historial

$(function(){   

    var matricula = JSON.parse($('#matricula_st').val())
    var today_day = moment().format('D'), hoy=moment()

    $('.alumno-select').change(async(e)=>{
       var filter = matricula.filter(element => element.id == e.target.value)
       console.log(filter)
$('#historial-list').empty()
$('#body-table-pago').empty()
$('#form-reg-pago').empty()
$('#nombre-alumno').text(filter[0]['nombre'])
$('#grupo-alumno').text(filter[0]['grupo']['identificador'])
$('#horario-alumno').text(filter[0]['grupo']['dia_horario'])
$('#profesor-alumno').text('Isaac')
$('#telefonos-alumno').text(filter[0]['telefono1']+" - "+ filter[0]['telefono2'])
$('#fecha-pago-alumno').text(filter[0]['grupo']['dia_pagos'])

let dias_pago = (filter[0]['grupo']['dia_pagos']).split(' ')
console.log(dias_pago)


/**OBTENER HISTORIAL DE CAJA */
historial =  await fetch('/historia-caja-academy/'+filter[0]['id'])
     .then(response => response.json())
     .then(data => {
         console.log(data)
      return data.obtener_historia
     });
console.log(historial)
let fecha_pago_historial, pago_mensualidad=[]
for (let i = 0; i < historial.length; i++) {
    fecha_pago_historial = moment(historial[i]['fecha_pago']).format('DD-MM-YYYY')
$('#historial-list').append(`<li class="timeline-item">
<span class="timeline-point timeline-point-indicator"></span>
<div class="timeline-event">
    <div class="d-flex justify-content-between">
        <h6>${historial[i]['concepto']}</h6>
        <p class="mb-tl">${fecha_pago_historial}</p>
    </div>
    <div class="d-flex justify-content-between">
        <p class="mb-tl"><strong> Grupo:</strong> <span>${filter[0]['grupo']['identificador']}</span></p>
        <h6 class="more-info mb-0">₡ ${historial[i]['monto']}</h6>
    </div>
</div>
</li>`)
}

if (today_day <= dias_pago[0]) {
    console.log('hoy toca pago')
    $('#pago-mensual-detail').text('17000')
    }else{

console.log('hoy es pago con mora')
console.log(hoy.locale('es').format('MMMM'))
var filter_mensualidad = historial.filter(element => element.concepto == 'Mensualidad' && element.matriculaId ==filter[0]['id'])
console.log(filter_mensualidad)
if (filter_mensualidad.length<1) {
    mes_a_pagar = hoy.locale('es').format('MMMM')
} else {
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
var mes_a_pagar
console.log(filter_mensualidad[0]['observacion'])
for (let i = 0; i < meses.length; i++) {    
    if (meses[i] == filter_mensualidad[filter_mensualidad.length-1]['observacion']) {        
        console.log(meses[i+1])
       mes_a_pagar = meses[i+1]
       break
    }
        mes_a_pagar = hoy.locale('es').format('MMMM')
    
}
}


/**FORM */

$('#form-reg-pago').append(`<input type="text" name="id_alumno" id="id-alumno-form" value="${filter[0]['id']}">
<div id="mensualidad-${mes_a_pagar}" class=".mensualidad-${mes_a_pagar}"><input type="text" name="concepto[]" id="concepto-form" value="Mensualidad">
<input type="text" name="fecha_pago[]" id="fecha_pago-form" value="${moment().format('YYYY-MM-DD')}">
<input type="text" name="monto[]" id="monto-form" value="17000">
<input type="text" name="mora[]" id="mora-form" value="-">
<input type="text" name="observacion[]" id="observacion-form" value="${mes_a_pagar}">
</div>`)
/**FIN FORM */

$('#pago-mensual-detail').text('17000')
/**LLENAR TABLA */
$('#body-table-pago').append(`<tr id="tr-mensualidad-${mes_a_pagar}">
<td>
    <span class="fw-bold">Mensualidad</span>
</td>
<td>${mes_a_pagar}</td>
<td>
    ${moment().format('DD-MM-YYYY')}
</td>
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
</tr>`)  
    }
    
    /**FIN DEL SELECT ALUMNO */})

    $('#btn-traslado').click(async()=>{
        let id_alumno= $('#id-alumno-form').val() 
        
        if (!id_alumno) {
            swal.fire('Debe seleccionar un alumno para habilitar esta opción')
            return
        }
        if ($('#concepto-form-traslado').length >0) {
            swal.fire('Ya ha seleccionado un traslado para este alumno, guarde los cambios')
            return
        }
var filter = matricula.filter(element => element.id == id_alumno)
let value_concepto= $('#concepto-form').val()
let value_fecha= $('#fecha_pago-form').val()
let value_monto = $('#monto-form').val()
let value_mora = $('#mora-form').val()
let value_observacion = $('#observacion-form').val()
 const { value: fecha_pago } = await Swal.fire({
    title: 'Indique la fecha de pago',
    html:
    `<input id="swal-input2" class="swal2-input" type="date" value="${moment().format('YYYY-MM-DD')}">`,
  focusConfirm: false,
  preConfirm: () => {
    return [
      document.getElementById('swal-input2').value,
    ]
  }
  })

let dias_pago = (filter[0]['grupo']['dia_pagos']).split(' ')
let fecha_sup = moment().isBefore(moment(fecha_pago,'YYYY-MM-DD'),'d'); // true
if (fecha_sup == true){
    swal.fire('La fecha seleccionada es superior a la actual')
    return
}
$('#form-reg-pago').append(`<div id="traslado"><input type="text" name="concepto[]" id="concepto-form-traslado" value="Traslado">
<input type="text" name="fecha_pago[]" id="fecha_pago-form-traslado" value="${fecha_pago}">
<input type="text" name="monto[]" id="monto-form-traslado" value="5000">
<input type="text" name="mora[]" id="mora-form-traslado" value="-">
<input type="text" name="observacion[]" id="observacion-form-traslado" value="-"></div>`)



$('#body-table-pago').append(`<tr id="tr-traslado">
<td>
    <span class="fw-bold">Traslado</span>
</td>
<td></td>
<td>
    ${moment(fecha_pago,'YYYY-MM-DD').format('DD-MM-YYYY')}
</td>
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
</tr>`)

$('#detalle-servicios').append(`<li class="price-detail">
<div class="detail-title">Traslado</div>
</li>`)
$('#total-servicios').text('5000')

  /**FIN BNT TRASLADO */  })

    $('#btn-guardar-modal').click(()=>{
 $('#editUser').modal('show')
   /**FIN BTON GUARDAR PAGO */ })
   
  $('#btn-guardar-pago').click(()=>{
        $.ajax({
            url: `/guardar-pago-academy`,
            type: 'POST',
            data: $('#form-reg-pago').serialize(),
            success: function (data, textStatus, jqXHR) {
              console.log(data)

        Swal.fire('Se guardó el pago con éxito')
            },
            error: function (jqXHR, textStatus) {
              console.log('error:' + jqXHR)
            }
          });
   /**FIN BTON GUARDAR PAGO */ })

   $(".borrar").on("click",function(){
    console.log()
    $(`#mensualidad-${mes_a_pagar}`).remove()
    $(this).parents("tr").remove();
  });
/**FIN DOCUMENT READY */})

function borrarFila(t,identificador){
    console.log(t)
    console.log(identificador)
    $(`#${t}`).remove();
    $(`#${identificador}`).remove()
  }

