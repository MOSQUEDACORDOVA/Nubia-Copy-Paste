var historial

$(function(){
    var matricula = JSON.parse($('#matricula_st').val())
    console.log(matricula)
    var today = moment().format('D')

    $('.alumno-select').change(async(e)=>{
       console.log(e.target.value)
       var filter = matricula.filter(element => element.id == e.target.value)
       console.log(filter)
$('#historial-list').empty()
$('#nombre-alumno').text(filter[0]['nombre'])
$('#grupo-alumno').text(filter[0]['grupo']['identificador'])
$('#horario-alumno').text(filter[0]['grupo']['dia_horario'])
$('#profesor-alumno').text('Isaac')
$('#telefonos-alumno').text(filter[0]['telefono1']+" - "+ filter[0]['telefono2'])
$('#fecha-pago-alumno').text(filter[0]['grupo']['dia_pagos'])

$('#id-alumno-form').val(filter[0]['id'])

let dias_pago = (filter[0]['grupo']['dia_pagos']).split(' ')
console.log(dias_pago)

if (today == dias_pago[0]) {
console.log('hoy toca pago')
$('#pago-mensual-detail').text('17000')
}else{
    console.log('hoy NO toca pago')
}
/**OBTENER HISTORIAL DE CAJA */
historial =  await fetch('/historia-caja-academy/'+filter[0]['id'])
     .then(response => response.json())
     .then(data => {
         console.log(data)
      return data.obtener_historia
     });
console.log(historial)
let fecha_pago_historial
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
    })

    $('#btn-traslado').click(async()=>{
        let id_alumno= $('#id-alumno-form').val() 
        
        if (!id_alumno) {
            console.log('debe seleccionar un alumno')
            swal.fire('Debe seleccionar un alumno para habilitar esta opción')
            return
        }
        
        var filter = matricula.filter(element => element.id == id_alumno)
        console.log(filter)
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
console.log(fecha_pago)
let fecha_sup = moment().isBefore(moment(fecha_pago,'YYYY-MM-DD'),'d'); // true
console.log(fecha_sup)
if (fecha_sup == true){
    swal.fire('La fecha seleccionada es superior a la actual')
    return
}

$('#concepto-form').val('Traslado')
$('#monto-form').val('5000')
$('#fecha_pago-form').val(fecha_pago)

$('#detalle-servicios').append(`<li class="price-detail">
<div class="detail-title">Traslado</div>
</li>`)
$('#total-servicios').text('5000')
    })

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
    })
})

