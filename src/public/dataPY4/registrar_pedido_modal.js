/**
 * FUNCIONES REGISTRAR PEDIDO
 */

 'use strict';

 $(function () {
   'use strict'; 
   $('#count_refill_garrafon').on('change', (e) => {
     let cant = e.target.value
     let count_canje_garrafon = $('#count_canje_garrafon').val()
     let enNew_garrafon_mont = $('#count_enNew_garrafon').val()
     let count_enobsequio_garrafon = $('#count_enobsequio_garrafon').val()
     let suma = parseInt(cant) + parseInt(count_canje_garrafon) + parseInt(enNew_garrafon_mont) + parseInt(count_enobsequio_garrafon)
 
 
     let monto = parseInt(cant) * 38
 
     if ($('#tipo_c_pedido').val() == "Punto de venta" || $('#tipo_c_pedido').val() == "Negocio") {
       monto = parseInt(cant) * 30
     }
     if ($('#descuento_upd_cliente1').val()>0) {
       monto = parseInt(cant) * $('#descuento_upd_cliente1').val();
     }
 
     $('#refill_garrafon_mont').val(monto)
     $('#total_garrafon').val(suma)
     $('#cant_garrafon').text(suma)
     let suma_total = parseInt($('#canje_garrafon_mont').val()) + parseInt($('#refill_garrafon_mont').val()) + parseInt($('#enNew_garrafon_mont').val())
     $('#monto_garrafon_input').val(suma_total)
     $('#monto_garrafon').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.20
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
     
   })
 
 
   $('#count_canje_garrafon').on('change', (e) => {
     let cant = e.target.value
     let count_refill_garrafon = $('#count_refill_garrafon').val()
     let enNew_garrafon_mont = $('#count_enNew_garrafon').val()
     let count_enobsequio_garrafon = $('#count_enobsequio_garrafon').val()
     let suma = parseInt(cant) + parseInt(count_refill_garrafon) + parseInt(enNew_garrafon_mont) + parseInt(count_enobsequio_garrafon)
     let monto = parseInt(cant) * 65
 
     if ($('#tipo_c_pedido').val() == "Punto de venta" || $('#tipo_c_pedido').val() == "Negocio") {
       monto = parseInt(cant) * 30
     }
     $('#canje_garrafon_mont').val(monto)
     $('#total_garrafon').val(suma)
     $('#cant_garrafon').text(suma)
     let suma_total = parseInt($('#canje_garrafon_mont').val()) + parseInt($('#refill_garrafon_mont').val()) + parseInt($('#enNew_garrafon_mont').val())
     $('#monto_garrafon_input').val(suma_total)
     $('#monto_garrafon').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.20
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
   $('#count_enNew_garrafon').on('change', (e) => {
     let cant = e.target.value
     let count_refill_garrafon = $('#count_refill_garrafon').val()
     let count_canje_garrafon = $('#count_canje_garrafon').val()
     let count_enobsequio_garrafon = $('#count_enobsequio_garrafon').val()
     let suma = parseInt(cant) + parseInt(count_refill_garrafon) + parseInt(count_canje_garrafon) + parseInt(count_enobsequio_garrafon)
     let monto = parseInt(cant) * 115
     // if ($('#tipo_c_pedido').val() == "Punto de venta") {
     //   monto = parseInt(cant) * 30
     // }
     
     $('#enNew_garrafon_mont').val(monto)
     $('#total_garrafon').val(suma)
     $('#cant_garrafon').text(suma)
     let suma_total = parseInt($('#canje_garrafon_mont').val()) + parseInt($('#refill_garrafon_mont').val()) + parseInt($('#enNew_garrafon_mont').val())
     $('#monto_garrafon_input').val(suma_total)
     $('#monto_garrafon').text(suma_total)
 
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
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
 
 
   $('#count_refill_botella').on('change', (e) => {
     let cant = e.target.value
     let count_canje_botella = $('#count_canje_botella').val()
     let enNew_botella_mont = $('#count_enNew_botella').val()
     let count_enobsequio_botella = $('#count_enobsequio_botella').val()
     let suma = parseInt(cant) + parseInt(count_canje_botella) + parseInt(enNew_botella_mont) + parseInt(count_enobsequio_botella)
     let monto = parseInt(cant) * 38
     if ($('#tipo_c_pedido').val() == "Punto de venta" || $('#tipo_c_pedido').val() == "Negocio") {
       monto = parseInt(cant) * 30
     }
     
     $('#refill_botella_mont').val(monto)
     $('#total_botella').val(suma)
     $('#cant_botella').text(suma)
     let suma_total = parseInt($('#canje_botella_mont').val()) + parseInt($('#refill_botella_mont').val()) + parseInt($('#enNew_botella_mont').val())
     $('#monto_botella_input').val(suma_total)
     $('#monto_botella').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
 
   $('#count_canje_botella').on('change', (e) => {
     let cant = e.target.value
     let count_refill_botella = $('#count_refill_botella').val()
     let enNew_botella_mont = $('#count_enNew_botella').val()
     let count_enobsequio_botella = $('#count_enobsequio_botella').val()
     let suma = parseInt(cant) + parseInt(count_refill_botella) + parseInt(enNew_botella_mont) + parseInt(count_enobsequio_botella)
     let monto = parseInt(cant) * 65
     
     $('#canje_botella_mont').val(monto)
     $('#total_botella').val(suma)
     $('#cant_botella').text(suma)
     let suma_total = parseInt($('#canje_botella_mont').val()) + parseInt($('#refill_botella_mont').val()) + parseInt($('#enNew_botella_mont').val())
     $('#monto_botella_input').val(suma_total)
     $('#monto_botella').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
   $('#count_enNew_botella').on('change', (e) => {
     let cant = e.target.value
     let count_refill_botella = $('#count_refill_botella').val()
     let count_canje_botella = $('#count_canje_botella').val()
     let count_enobsequio_botella = $('#count_enobsequio_botella').val()
     let suma = parseInt(cant) + parseInt(count_refill_botella) + parseInt(count_canje_botella) + parseInt(count_enobsequio_botella)
     let monto = parseInt(cant) * 115
     
     $('#enNew_botella_mont').val(monto)
     $('#total_botella').val(suma)
     $('#cant_botella').text(suma)
     let suma_total = parseInt($('#canje_botella_mont').val()) + parseInt($('#refill_botella_mont').val()) + parseInt($('#enNew_botella_mont').val())
     $('#monto_botella_input').val(suma_total)
     $('#monto_botella').text(suma_total)
 
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
   $('#count_enobsequio_botella').on('change', (e) => {
     let cant = e.target.value
     let count_refill_botella = $('#count_refill_botella').val()
     let count_canje_botella = $('#count_canje_botella').val()
     let count_enNew_botella = $('#count_enNew_botella').val()
     let suma = parseInt(cant) + parseInt(count_refill_botella) + parseInt(count_canje_botella) + parseInt(count_enNew_botella)
     $('#total_botella').val(suma)
     $('#cant_botella').text(suma)
 
   })
 
 
 
   $('#count_refill_garrafon11l').on('change', (e) => {
     let cant = e.target.value
     let count_canje_garrafon11l = $('#count_canje_garrafon11l').val()
     let enNew_garrafon11l_mont = $('#count_enNew_garrafon11l').val()
     let count_enobsequio_garrafon11l = $('#count_enobsequio_garrafon11l').val()
     let suma = parseInt(cant) + parseInt(count_canje_garrafon11l) + parseInt(enNew_garrafon11l_mont) + parseInt(count_enobsequio_garrafon11l)
     let monto = parseInt(cant) * 38
     if ($('#tipo_c_pedido').val() == "Punto de venta" || $('#tipo_c_pedido').val() == "Negocio") {
       monto = parseInt(cant) * 30
     }
     if ($('#descuento_upd_cliente1').val()>0) {
       monto = parseInt(cant) * $('#descuento_upd_cliente1').val();
     }
     $('#refill_garrafon11l_mont').val(monto)
     $('#total_garrafon11l').val(suma)
     $('#cant_garrafon11l').text(suma)
     let suma_total = parseInt($('#canje_garrafon11l_mont').val()) + parseInt($('#refill_garrafon11l_mont').val()) + parseInt($('#enNew_garrafon11l_mont').val())
     $('#monto_garrafon11l_input').val(suma_total)
     $('#monto_garrafon11l').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
 
   $('#count_canje_garrafon11l').on('change', (e) => {
     let cant = e.target.value
     let count_refill_garrafon11l = $('#count_refill_garrafon11l').val()
     let enNew_garrafon11l_mont = $('#count_enNew_garrafon11l').val()
     let count_enobsequio_garrafon11l = $('#count_enobsequio_garrafon11l').val()
     let suma = parseInt(cant) + parseInt(count_refill_garrafon11l) + parseInt(enNew_garrafon11l_mont) + parseInt(count_enobsequio_garrafon11l)
     let monto = parseInt(cant) * 65
     
     $('#canje_garrafon11l_mont').val(monto)
     $('#total_garrafon11l').val(suma)
     $('#cant_garrafon11l').text(suma)
     let suma_total = parseInt($('#canje_garrafon11l_mont').val()) + parseInt($('#refill_garrafon11l_mont').val()) + parseInt($('#enNew_garrafon11l_mont').val())
     $('#monto_garrafon11l_input').val(suma_total)
     $('#monto_garrafon11l').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
   $('#count_enNew_garrafon11l').on('change', (e) => {
     let cant = e.target.value
     let count_refill_garrafon11l = $('#count_refill_garrafon11l').val()
     let count_canje_garrafon11l = $('#count_canje_garrafon11l').val()
     let count_enobsequio_garrafon11l = $('#count_enobsequio_garrafon11l').val()
     let suma = parseInt(cant) + parseInt(count_refill_garrafon11l) + parseInt(count_canje_garrafon11l) + parseInt(count_enobsequio_garrafon11l)
     let monto = parseInt(cant) * 115
     
     $('#enNew_garrafon11l_mont').val(monto)
     $('#total_garrafon11l').val(suma)
     $('#cant_garrafon11l').text(suma)
     let suma_total = parseInt($('#canje_garrafon11l_mont').val()) + parseInt($('#refill_garrafon11l_mont').val()) + parseInt($('#enNew_garrafon11l_mont').val())
     $('#monto_garrafon11l_input').val(suma_total)
     $('#monto_garrafon11l').text(suma_total)
 
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
   $('#count_enobsequio_garrafon11l').on('change', (e) => {
     let cant = e.target.value
     let count_refill_garrafon11l = $('#count_refill_garrafon11l').val()
     let count_canje_garrafon11l = $('#count_canje_garrafon11l').val()
     let count_enNew_garrafon11l = $('#count_enNew_garrafon11l').val()
     let suma = parseInt(cant) + parseInt(count_refill_garrafon11l) + parseInt(count_canje_garrafon11l) + parseInt(count_enNew_garrafon11l)
 
     let monto = parseInt(cant) * 115
     
     
     $('#enNew_garrafon11l_mont').val(monto)
     $('#total_garrafon11l').val(suma)
     $('#cant_garrafon11l').text(suma)
   })
 
   $('#count_refill_botella5l').on('change', (e) => {
     let cant = e.target.value
     let count_canje_botella5l = $('#count_canje_botella5l').val()
     let enNew_botella5l_mont = $('#count_enNew_botella5l').val()
     let count_enobsequio_botella5l = $('#count_enobsequio_botella5l').val()
     let suma = parseInt(cant) + parseInt(count_canje_botella5l) + parseInt(enNew_botella5l_mont) + parseInt(count_enobsequio_botella5l)
     let monto = parseInt(cant) * 38
     $('#refill_botella5l_mont').val(monto)
     $('#total_botella5l').val(suma)
     $('#cant_botella5l').text(suma)
     let suma_total = parseInt($('#canje_botella5l_mont').val()) + parseInt($('#refill_botella5l_mont').val()) + parseInt($('#enNew_botella5l_mont').val())
     $('#monto_botella5l_input').val(suma_total)
     $('#monto_botella5l').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
 
   $('#count_canje_botella5l').on('change', (e) => {
     let cant = e.target.value
     let count_refill_botella5l = $('#count_refill_botella5l').val()
     let enNew_botella5l_mont = $('#count_enNew_botella5l').val()
     let count_enobsequio_botella5l = $('#count_enobsequio_botella5l').val()
     let suma = parseInt(cant) + parseInt(count_refill_botella5l) + parseInt(enNew_botella5l_mont) + parseInt(count_enobsequio_botella5l)
     let monto = parseInt(cant) * 65
     
     $('#canje_botella5l_mont').val(monto)
     $('#total_botella5l').val(suma)
     $('#cant_botella5l').text(suma)
     let suma_total = parseInt($('#canje_botella5l_mont').val()) + parseInt($('#refill_botella5l_mont').val()) + parseInt($('#enNew_botella5l_mont').val())
     $('#monto_botella5l_input').val(suma_total)
     $('#monto_botella5l').text(suma_total)
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
   $('#count_enNew_botella5l').on('change', (e) => {
     let cant = e.target.value
     let count_refill_botella5l = $('#count_refill_botella5l').val()
     let count_canje_botella5l = $('#count_canje_botella5l').val()
     let count_enobsequio_botella5l = $('#count_enobsequio_botella5l').val()
 
     let suma = parseInt(cant) + parseInt(count_refill_botella5l) + parseInt(count_canje_botella5l) + parseInt(count_enobsequio_botella5l)
     let monto = parseInt(cant) * 115
     
     $('#enNew_botella5l_mont').val(monto)
     $('#total_botella5l').val(suma)
     $('#cant_botella5l').text(suma)
     let suma_total = parseInt($('#canje_botella5l_mont').val()) + parseInt($('#refill_botella5l_mont').val()) + parseInt($('#enNew_botella5l_mont').val())
     $('#monto_botella5l_input').val(suma_total)
     $('#monto_botella5l').text(suma_total)
 
 
     let sumar_totales = parseInt($('#monto_garrafon_input').val()) + parseInt($('#monto_botella_input').val()) + parseInt($('#monto_garrafon11l_input').val()) + parseInt($('#monto_botella5l_input').val())
     $('#total_total_inp').val(sumar_totales)
     if ($('input[name="deuda_anterior"]').val() > 0) {
       $('#sub_total_total').text(sumar_totales)
       sumar_totales = parseInt(sumar_totales) + parseInt($('input[name="deuda_anterior"]').val())
       
     }
     $('#total_total').text(sumar_totales)
     if ($('#descuento_referido_box').is(':visible')) {
       let descuento = sumar_totales*0.2
       $('#desc_referido').text(descuento)
       $('#inp_desc_ref').val(descuento)
       let total_desc = sumar_totales - descuento
       $('#total_total').text(total_desc)
       $('#total_total_inp').val(total_desc)
     }
   })
 
 
   $('#count_enobsequio_botella5l').on('change', (e) => {
     let cant = e.target.value
     let count_refill_botella5l = $('#count_refill_botella5l').val()
     let count_canje_botella5l = $('#count_canje_botella5l').val()
     let count_enNew_botella5l = $('#count_enNew_botella5l').val()
     let suma = parseInt(cant) + parseInt(count_refill_botella5l) + parseInt(count_canje_botella5l) + parseInt(count_enNew_botella5l)
     let monto = parseInt(cant) * 115
     
     $('#enNew_botella5l_mont').val(monto)
     $('#total_botella5l').val(suma)
     $('#cant_botella5l').text(suma)
   })
 
 
   //OTROS DESPUES DE LOS SELECT DE PRODUCTOS
 
   $('#id_cliente_reg_pedido').on('change', (e) => {
    if (!$('#registro_pedido_modal').hasClass('show')) {
      return
    }
     $('#modifica_cliente_input').val('NO');
     var valor = $('#array').val()
     var array = JSON.parse(valor.replace(/&quot;/g, '"'))
     $('#descuento_referido_box').addClass('d-none')
     $('#descuento-upd-cliente').addClass('d-none');
     let id_ = e.target.value
     console.log(array_pedido)
     var found = array.find(element => element.id == id_);
     console.log(found)
     if (found.cantidad_referidos > 0) {
       let pedidos_refido_entregado = array_pedido.filter(status => status.status_pedido == "Entregado" && status.cliente.referido_de == id_); // return implicito
       console.log(pedidos_refido_entregado)  
       if (pedidos_refido_entregado.length > 0) {
         $('#id_referenciado').val(pedidos_refido_entregado[0]['cliente']['id'])
         $('#descuento_referido_box').removeClass('d-none')
         $('#observaciion-reg-pedido').val('Descuento por referido')
       }
     }
 $('#tipo_c_pedido').val(found.tipo)
     $('#nombre_c_pedido').val(found.firstName)
     $('#apellido_c_pedido').val(found.lastName)
     $('#cp_select_pedido').val(found.estado)
     $('#municipio_pedido').val(found.municipio)
     if ($("#select_asentamiento_me option[value='" + found.cpId + "']").length == 0) {
       console.log("option doesn't exist!");
       $('#select_asentamiento_me').prepend('<option selected value="' + found.cpId + '">' + found.cp.asentamiento + '</option>');
     } else {
       console.log("option exist!");
      // $('#select_asentamiento_me').find('option:selected').remove().end();
       $("#select_asentamiento_me option[value='" + found.cpId + "']").attr("selected", true);
     }
 
     if (found['tipo']=="Negocio" || found['tipo'] =="Punto de venta") {
       $('#descuento-upd-cliente').removeClass('d-none');
       $('#descuento_upd_cliente1').val(found['monto_nuevo']);
     }
 
     if ($("#reg_zona_cliente_pedido option[value='" + found.sucursaleId + "']").length == 0) {
       console.log("option doesn't exist!");
      // $('#reg_zona_cliente_pedido').prepend('<option selected value="' + found.cpId + '">' + found.cp.asentamiento + '</option>');
     } else {
       console.log("option exist!");
      // $('#reg_zona_cliente_pedido').find('option:selected').remove().end();
       $("#reg_zona_cliente_pedido option[value='" + found.sucursaleId + "']").attr("selected", true);
     }
 
     if ($("#color_tag_reg_pedido option[value='" + found.etiquetaId + "']").length == 0) {
       console.log("option doesn't exist!");
      // $('#color_tag_reg_pedido').prepend('<option selected value="' + found.cpId + '">' + found.cp.asentamiento + '</option>');
     } else {
       console.log("option exist!");
      // $('#color_tag_reg_pedido').find('option:selected').remove().end();
       $("#color_tag_reg_pedido option[value='" + found.etiquetaId + "']").attr("selected", true);
     }
     $("#color_tag_reg_pedido").val(`${found.etiquetaId}`).trigger('change');
 
     $('#fraccionamiento_pedido').val(found.fraccionamiento)
     $('#coto_c_pedido').val(found.coto)
     $('#casa_c_pedido').val(found.casa)
     $('#calle_c_pedido').val(found.calle)
     $('#avenida_c_pedido').val(found.avenida)
     $('#referencia_c_pedido').val(found.referencia)
     $('#telefono_c_pedido').val(found.telefono)
 
     const data = new FormData();
     data.append('id_cliente', id_);
     $.ajax({
       url: '/verificar_deuda',
       type: 'POST',
       data: data,
       cache: false,
       contentType: false,
       processData: false,
 
       success: function (data, textStatus, jqXHR) {
         $('#deuda_box').attr('style', 'display:none')
         $('#prestados_box').attr('style', 'display:none')
         $('input[name="deuda_anterior"]').val('0')
         console.log(data)
         if (data['deuda']>0) {
           $('#deuda_box').removeAttr('style')
           $('#deuda_verf').text(data['deuda'])
           $('#prestados_anterior').text(data['prestados'])
           $('input[name="deuda_anterior"]').val(data['deuda'])
 
           $('#status_pago').val('Por verificar')
         }
 
       },
       error: function (jqXHR, textStatus) {
         console.log('error:' + jqXHR)
       }
     });
 
      fetch("/prestadospy4")
       .then((response) => response.json())
       .then((data) => {       
         let prestados = JSON.parse(data.prestamos_byday)
           console.log(prestados)
           let filter_prestados = prestados.filter(element => element.clienteId == id_ && element.cantidad > 0)
           console.log(filter_prestados)
           if (filter_prestados.length > 0) {
             $('#prestados_box').removeAttr('style')
             let suma_cantidad_corte = 0;
             for (let i = 0; i < filter_prestados.length; i++) {
               suma_cantidad_corte += parseInt(filter_prestados[i]['cantidad'])
             }
         $('#prestados_anterior').text(suma_cantidad_corte)
           }      
       });
   })
 
   $('#metodo_pago').on('change', (e) => {
     let metodo = e.target.value
     console.log(metodo)
 
     if (metodo == "Transferencia") {
       console.log("Por verificar")
 
       $('#status_pago').val('Por verificar')
     } else {
       console.log("Pagado")
       
      let deuda_anterior =$('#deuda_anterior').val();
      
       if (deuda_anterior >0) {
         console.log(deuda_anterior)
         return  $('#status_pago').val('Por verificar')
       }
       $('#status_pago').val('Pagado')
     }
 
 
   })
   $('#chofer').on('change', () => {
     var option = $('#chofer').find(':selected');
 
     var id_chofer = option.data("id");
     console.log(id_chofer)
     $("#id_chofer").val(id_chofer);
   })
 
  $('#tipo-cliente-reg').change((e)=>{
 console.log(e.target.value)
 let valor= e.target.value;
 if (valor=="Negocio" || valor =="Punto de venta") {
   $('#descuento-reg-cliente').removeClass('d-none');
   $('#descuento_reg_cliente1').val(0);
 }
 
  })
  
   if ($('#exampleClientes').length == 0) {
     $('#add_cliente_modal').click(()=>{
     if ($('#nombre-cliente-reg').val() == "") {
       Swal.fire('Debe colocar un nombre al cliente')
       return $('#nombre-cliente-reg').focus()
       
     }
     if ($('#apellido-cliente-reg').val() == "") {
       Swal.fire('Debe colocar un número de teléfono')
       return $('#apellido-cliente-reg').focus()
       
     }
     if ($('#select_asentamiento').val() == null) {
       Swal.fire('Debe ingresar el código postal')
      return $('#cp_select').focus()
     }
     if ($('#tlf-add-cliente').val() == "") {
       Swal.fire('Debe colocar un número de teléfono')
      return $('#tlf-add-cliente').focus()
     }
 if ($('#reg_zona_cliente').val() == '0') {
       Swal.fire('Debe colocar una zona de cliente')
     return  $('#reg_zona_cliente').focus()
     }
 
 if ($('#color_tag_reg_cliente').val() == '0') {
       Swal.fire('Debe colocar una etiqueta al cliente')
      return $('#color_tag_reg_cliente').focus()
     }
 
     $.ajax({
       url: `/save_cliente_py4`,
       type: 'POST',
       data: $('#form_reg_cliente').serialize(),
       success: function (data, textStatus, jqXHR) {
         console.log(data)        
         if (data.error) {
           $('.modal').modal('hide');
           Swal.fire(data.error)
           return
         }
         let clientes
         if ($('#pedidostable').length ==0) {
           console.log('here');
          clientes= data.clientes;
          $('#array').val(JSON.stringify(data.clientes));
         }else{
          clientes= JSON.parse(data.clientes);
          $('#array').val(data.clientes);
          console.log(JSON.parse($('#array').val()));
         }
         
         $('#id_cliente_reg_pedido').empty();
         $('#id_cliente_reg_pedido').append(`<option selected="" value="default"> Seleccione un cliente </option>`);
         let asentamiento
         for (let i = 0; i < clientes.length; i++) {  
             
           if (clientes[i]['cp'] == null) {
             console.log(clientes[i]['cp'])
              console.log(clientes[i])
              asentamiento ="";
           }else{
             if (clientes[i]['cp']['asentamiento']) {
           asentamiento = clientes[i]['cp']['asentamiento'];
         }
           }     
         
           $('#id_cliente_reg_pedido').append(`<option value="${clientes[i].id}"> ${clientes[i].firstName} ${clientes[i].lastName} / ${asentamiento}</option>`)
         }
         $('#form_reg_cliente')[0].reset();
   $('.modal').modal('hide');
   Swal.fire('Se creó con éxito al cliente');
       },
       error: function (jqXHR, textStatus) {
         console.log('error:' + jqXHR);
       }
     });
   })
 $('#btn_add_cp').click(()=>{
   if ($('#cp_add').val() == "") {
     Swal.fire('Debe colocar un código postal')
    return $('#cp_add').focus()
   }
 if ($('#asentamiento_add').val() == '') {
     Swal.fire('Debe colocar asentamiento')
   return  $('#asentamiento_add').focus()
   }
 
 if ($('#municipio_add').val() == '0') {
     Swal.fire('Debe seleccionar un municipio')
    return $('#municipio_add').focus()
   }
 
   $.ajax({
     url: `/save_cp_new`,
     type: 'POST',
     data: $('#agregar_cp').serialize(),
     success: function (data, textStatus, jqXHR) {
       console.log(data)
       if (data.error) {
         $('#add_cp').modal('hide');
         Swal.fire(data.error)
         return
       }
       $('#agregar_cp')[0].reset()
 $('#add_cp').modal('hide');
 Swal.fire('Se creó con éxito asentamiento')
     },
     error: function (jqXHR, textStatus) {
       console.log('error:' + jqXHR)
     }
   });
 })
   }
   
 
 
 if ($('#carga_').length>0) {
        
 } else {
 
  //ACA REGISTRA PEDIDO AJAX
  $('#btn_reg_pedido').on('click', async (e)=>{
   if ($('#id_cliente_reg_pedido').val() =="default") {
     Swal.fire('Debe seleccionar un cliente')
     $('#id_cliente_reg_pedido').focus()
     return
   }
   if ($('#chofer').val() =="default") {
     Swal.fire('Debe seleccionar un chofer')
     $('#chofer').focus()
     return
   }
   if ($('#reg_zona_cliente_pedido').val() == "0" ) {
     Swal.fire('Debe asignar una zona al cliente')
     return
   }
   if ($('#color_tag_reg_pedido').val() == "0") {
     Swal.fire('Debe asignar una etiqueta al cliente')
     return
   }
 if ($('#total_total_inp').val() == "0") {
     Swal.fire('Debe agregar al menos un producto para continuar')
     return
   }
   $.ajax({
     url: `/reg_pedido_modal`,
     type: 'POST',
     data: $('#reg_pedido_modal1').serialize(),
     success: function (data, textStatus, jqXHR) {
       console.log(data)
      
         Swal.fire('Se creó con éxito el pedido, debe acceder al "Tablero" para observarlo a detalle')
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
  $('#prestados_box').attr('style','display:none')
  $("#id_cliente_reg_pedido option[value='default']").attr("selected", true);
  $("#id_cliente_reg_pedido").val('default').trigger('change');
 
       
       
 
     },
     error: function (jqXHR, textStatus) {
       console.log('error:' + jqXHR)
     }
   });
   
 })
 }
 
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
  $('#prestados_box').attr('style','display:none')
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
 
 $('#modifica_cliente_btn').on('click', function () {  
   console.log('Testing');
   $('#modifica_cliente_input').val('SI');
 })
 