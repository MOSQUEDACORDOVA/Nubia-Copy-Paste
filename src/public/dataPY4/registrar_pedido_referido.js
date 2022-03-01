/**
 * FUNCIONES REGISTRAR PEDIDO
 */

'use strict';

$(function () {
  'use strict';
  console.log('cargo aqui')
$('#registro_pedido_modal_referido').modal('show')
  $('#count_refill_garrafon').on('change', (e) => {
    let cant = e.target.value
    let count_canje_garrafon = $('#count_canje_garrafon').val()
    let enNew_garrafon_mont = $('#count_enNew_garrafon').val()
    let count_enobsequio_garrafon = $('#count_enobsequio_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_canje_garrafon) + parseInt(enNew_garrafon_mont) + parseInt(count_enobsequio_garrafon)

    let monto = parseInt(cant) * 35

    $('#refill_garrafon_mont').val(monto)
    $('#total_garrafon').val(suma)
    $('#cant_garrafon').text(suma)
    let suma_total = parseInt($('#canje_garrafon_mont').val()) + parseInt($('#refill_garrafon_mont').val()) + parseInt($('#enNew_garrafon_mont').val())
    $('#monto_garrafon_input').val(suma_total)
    $('#monto_garrafon').text(suma_total)

    $('#total_total_inp').val(suma_total)
    $('#total_total').text(suma_total)
  })


  $('#count_canje_garrafon').on('change', (e) => {
    let cant = e.target.value
    let count_refill_garrafon = $('#count_refill_garrafon').val()
    let enNew_garrafon_mont = $('#count_enNew_garrafon').val()
    let count_enobsequio_garrafon = $('#count_enobsequio_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_refill_garrafon) + parseInt(enNew_garrafon_mont) + parseInt(count_enobsequio_garrafon)
    let monto = parseInt(cant) * 55

    $('#canje_garrafon_mont').val(monto)
    $('#total_garrafon').val(suma)
    $('#cant_garrafon').text(suma)
    let suma_total = parseInt($('#canje_garrafon_mont').val()) + parseInt($('#refill_garrafon_mont').val()) + parseInt($('#enNew_garrafon_mont').val())
    $('#monto_garrafon_input').val(suma_total)
    $('#monto_garrafon').text(suma_total)

    $('#total_total_inp').val(suma_total)  
    $('#total_total').text(suma_total)
  })

  $('#count_enNew_garrafon').on('change', (e) => {
    let cant = e.target.value
    let count_refill_garrafon = $('#count_refill_garrafon').val()
    let count_canje_garrafon = $('#count_canje_garrafon').val()
    let count_enobsequio_garrafon = $('#count_enobsequio_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_refill_garrafon) + parseInt(count_canje_garrafon) + parseInt(count_enobsequio_garrafon)
    let monto = parseInt(cant) * 105
    $('#enNew_garrafon_mont').val(monto)
    $('#total_garrafon').val(suma)
    $('#cant_garrafon').text(suma)
    let suma_total = parseInt($('#canje_garrafon_mont').val()) + parseInt($('#refill_garrafon_mont').val()) + parseInt($('#enNew_garrafon_mont').val())
    $('#monto_garrafon_input').val(suma_total)
    $('#monto_garrafon').text(suma_total)


    $('#total_total_inp').val(suma_total)
    $('#total_total').text(suma_total)
  })

  $('#count_enobsequio_garrafon').on('change', (e) => {
    let cant = e.target.value
    let count_refill_garrafon = $('#count_refill_garrafon').val()
    let count_canje_garrafon = $('#count_canje_garrafon').val()
    let enNew_garrafon_mont = $('#count_enNew_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_refill_garrafon) + parseInt(count_canje_garrafon) + parseInt(enNew_garrafon_mont)

    $('#total_garrafon').val(suma)
    $('#cant_garrafon').text(suma)

  })

  $('#metodo_pago').on('change', (e) => {
    let metodo = e.target.value
    console.log(metodo)

    if (metodo == "Transferencia") {
      console.log("Por verificar")

      $('#status_pago').val('Por verificar')
    } else {
      console.log("Pagado")
      if ($('#deuda_anterior').val() !="") {
        return  $('#status_pago').val('Por verificar')
      }
      $('#status_pago').val('Pagado')
    }


  })

$('#btn-close-pedido').on('click', ()=>{
  $('#reg_pedido_modal1').trigger("reset");
  let hoy= moment().format('YYYY-MM-DD')
$('#fecha_pedido').val(hoy)
$('#cant_garrafon').text('0')
$('#monto_garrafon').text('0')
$('#sub_total_total').text('0')
$('#deuda_verf').text('0')
 $('#total_total').text('0')
 $('#deuda_box').attr('style','display:none')
 $("#id_cliente_reg_pedido option[value='default']").attr("selected", true);
 $("#id_cliente_reg_pedido").val('default').trigger('change');
 
})

$('#btn_reg_pedido_referido').on('click', ()=>{
  console.log('hello')
  if ($('#total_total_inp').val() == "0") {
    Swal.fire('Debe agregar al menos un producto para continuar')
    return
  }
  $.ajax({
    url: `/reg_pedido_referido`,
    type: 'POST',
    data: $('#reg_pedido_modal1').serialize(),
    success: function (data, textStatus, jqXHR) {
      console.log(data)

      if (data.fail) {
        Swal.fire(data.msg)
        return
        
      }
      Swal.fire('Se creó con éxito el pedido')
$('.modal').modal('hide');
$('#reg_pedido_modal1').trigger("reset");
let hoy= moment().format('YYYY-MM-DD')
$('#fecha_pedido').val(hoy)
$('#cant_garrafon').text('0')
$('#monto_garrafon').text('0')
$('#sub_total_total').text('0')
$('#deuda_verf').text('0')
 $('#total_total').text('0')
 $('#deuda_box').attr('style','display:none')
      

    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
 
})
});
