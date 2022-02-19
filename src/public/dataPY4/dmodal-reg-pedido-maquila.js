/**
 * FUNCIONES REGISTRAR PEDIDO
 */

'use strict';

$(function () {
  'use strict';


  $('#count_relleno_garrafon').on('change', (e) => {
    let cant = e.target.value
    let count_bwaters_garrafon = $('#count_bwaters_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_bwaters_garrafon)

    let monto = parseInt(cant) * 5.50

    $('#relleno_garrafon_mont').val(monto)
  //  $('#total_garrafon').val(suma)
    $('#cant_garrafon-maquila').text(suma)

    let suma_total = parseFloat($('#bwaters_garrafon_mont').val()) + parseFloat($('#relleno_garrafon_mont').val())
    $('#monto_garrafon_input-maquila').val(suma_total)
    $('#monto_garrafon-maquila').text(suma_total)
    $('#total_total_inp-maquila').val(suma_total)
    $('#total_total-maquila').text(suma_total)
  })


  $('#count_bwaters_garrafon').on('change', (e) => {
    let cant = e.target.value
    let count_relleno_garrafon = $('#count_relleno_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_relleno_garrafon)
    let monto = parseInt(cant) * 20
   
    $('#bwaters_garrafon_mont').val(monto)
   // $('#total_garrafon').val(suma)
    $('#cant_garrafon-maquila').text(suma)

    let suma_total = parseFloat($('#bwaters_garrafon_mont').val()) + parseFloat($('#relleno_garrafon_mont').val())
    $('#monto_garrafon_input-maquila').val(suma_total)
    $('#monto_garrafon-maquila').text(suma_total)
    $('#total_total_inp-maquila').val(suma_total)
    $('#total_total-maquila').text(suma_total)
  })


  //OTROS DESPUES DE LOS SELECT DE PRODUCTOS
  var valor = $('#clientes_maquila').val()
  var array = JSON.parse(valor.replace(/&quot;/g, '"'))
  $('#id_cliente_reg_pedido-maquila').on('change', (e) => {
    let id_ = e.target.value
    console.log(id_)
    if (id_=='default') {
      return
    }
    var found = array.find(element => element.id == id_);
    $('#id_cliente-pedido-maquila').val(found.id)
    $('#name_maquila-pedido').val(found.name)
    $('#tlf_maquila-pedido').val(found.phone)
    $('#vehiculo_maquila-pedido').val(found.vehiculo)
    $('#placa_maquila-pedido').val(found.placa)    

  })

  $('#metodo_pago-maquila').on('change', (e) => {
    let metodo = e.target.value
    console.log(metodo)

    if (metodo == "Transferencia") {
      console.log("Por verificar")

      $('#status_pago-maquila').val('Por verificar')
    } else {
      console.log("Pagado")
      if ($('#deuda_anterior').val() !="") {
        return  $('#status_pago-maquila').val('Por verificar')
      }
      $('#status_pago-maquila').val('Pagado')
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

$('#btn-close-cliente').on('click', ()=>{
  $('#form_reg_cliente').trigger("reset");
  $('#municipio').text('')
  $("#select_asentamiento").val('default').trigger('change');
  $("#color_tag_reg_cliente").val('0').trigger('change');
})
});
