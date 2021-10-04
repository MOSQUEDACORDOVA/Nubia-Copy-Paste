/**
 * FUNCIONES REGISTRAR PEDIDO
 */

 'use strict';

 $(function () {
  'use strict';
  
  
  $('.count_refill_garrafon').on('change', (e) =>{
    let cant = e.target.value
    let count_canje_garrafon = $('.count_canje_garrafon').val()
    let enNew_garrafon_mont = $('.count_enNew_garrafon').val()
    let count_enobsequio_garrafon = $('.count_enobsequio_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_canje_garrafon)+ parseInt(enNew_garrafon_mont)+ parseInt(count_enobsequio_garrafon)
    let monto = parseInt(cant) * 35
    $('.refill_garrafon_mont').val(monto)
    $('.total_garrafon').val(suma)
    $('.cant_garrafon').text(suma)
    let suma_total = parseInt($('.canje_garrafon_mont').val()) + parseInt($('.refill_garrafon_mont').val())+ parseInt($('.enNew_garrafon_mont').val())
    $('.monto_garrafon_input').val(suma_total)
    $('.monto_garrafon').text(suma_total)
    
    let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
    $('.total_total_inp').val(sumar_totales)
    $('.total_total').text(sumar_totales)
    })
    
    
    $('.count_canje_garrafon').on('change', (e) =>{
    let cant = e.target.value
    let count_refill_garrafon = $('.count_refill_garrafon').val()
    let enNew_garrafon_mont = $('.count_enNew_garrafon').val()
    let count_enobsequio_garrafon = $('.count_enobsequio_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_refill_garrafon)+ parseInt(enNew_garrafon_mont)+ parseInt(count_enobsequio_garrafon)
    let monto = parseInt(cant) * 55
    $('.canje_garrafon_mont').val(monto)
    $('.total_garrafon').val(suma)
    $('.cant_garrafon').text(suma)
    let suma_total = parseInt($('.canje_garrafon_mont').val()) + parseInt($('.refill_garrafon_mont').val())+ parseInt($('.enNew_garrafon_mont').val())
    $('.monto_garrafon_input').val(suma_total)
    $('.monto_garrafon').text(suma_total)
    
    let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
    $('.total_total_inp').val(sumar_totales)
    $('.total_total').text(sumar_totales)
    })
    
    $('.count_enNew_garrafon').on('change', (e) =>{
    let cant = e.target.value
    let count_refill_garrafon = $('.count_refill_garrafon').val()
    let count_canje_garrafon = $('.count_canje_garrafon').val()
    let count_enobsequio_garrafon = $('.count_enobsequio_garrafon').val()
    let suma = parseInt(cant) + parseInt(count_refill_garrafon)+ parseInt(count_canje_garrafon)+ parseInt(count_enobsequio_garrafon)
    let monto = parseInt(cant) * 105
    $('.enNew_garrafon_mont').val(monto)
    $('.total_garrafon').val(suma)
    $('.cant_garrafon').text(suma)
    let suma_total = parseInt($('.canje_garrafon_mont').val()) + parseInt($('.refill_garrafon_mont').val())+ parseInt($('.enNew_garrafon_mont').val())
    $('.monto_garrafon_input').val(suma_total)
    $('.monto_garrafon').text(suma_total)
    
    
    let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
    $('.total_total_inp').val(sumar_totales)
    $('.total_total').text(sumar_totales)
    })
  
    $('.count_enobsequio_garrafon').on('change', (e) =>{
      let cant = e.target.value
      let count_refill_garrafon = $('.count_refill_garrafon').val()
      let count_canje_garrafon = $('.count_canje_garrafon').val()
      let enNew_garrafon_mont = $('.count_enNew_garrafon').val()
      let suma = parseInt(cant) + parseInt(count_refill_garrafon)+ parseInt(count_canje_garrafon)+ parseInt(enNew_garrafon_mont)
      
      $('.total_garrafon').val(suma)
      $('.cant_garrafon').text(suma)
      
      })
    
  
    $('.count_refill_botella').on('change', (e) =>{
      let cant = e.target.value
      let count_canje_botella = $('.count_canje_botella').val()
      let enNew_botella_mont = $('.count_enNew_botella').val()
      let count_enobsequio_botella = $('.count_enobsequio_botella').val()
      let suma = parseInt(cant) + parseInt(count_canje_botella)+ parseInt(enNew_botella_mont)+ parseInt(count_enobsequio_botella)
      let monto = parseInt(cant) * 35
      $('.refill_botella_mont').val(monto)
      $('.total_botella').val(suma)
      $('.cant_botella').text(suma)
      let suma_total = parseInt($('.canje_botella_mont').val()) + parseInt($('.refill_botella_mont').val())+ parseInt($('.enNew_botella_mont').val())
      $('.monto_botella_input').val(suma_total)
      $('.monto_botella').text(suma_total)
      
      let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
      $('.total_total_inp').val(sumar_totales)
      $('.total_total').text(sumar_totales)
      })
      
      
      $('.count_canje_botella').on('change', (e) =>{
      let cant = e.target.value
      let count_refill_botella = $('.count_refill_botella').val()
      let enNew_botella_mont = $('.count_enNew_botella').val()
      let count_enobsequio_botella = $('.count_enobsequio_botella').val()
      let suma = parseInt(cant) + parseInt(count_refill_botella)+ parseInt(enNew_botella_mont)+ parseInt(count_enobsequio_botella)
      let monto = parseInt(cant) * 55
      $('.canje_botella_mont').val(monto)
      $('.total_botella').val(suma)
      $('.cant_botella').text(suma)
      let suma_total = parseInt($('.canje_botella_mont').val()) + parseInt($('.refill_botella_mont').val())+ parseInt($('.enNew_botella_mont').val())
      $('.monto_botella_input').val(suma_total)
      $('.monto_botella').text(suma_total)
      
       let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
      $('.total_total_inp').val(sumar_totales)
      $('.total_total').text(sumar_totales)
      })
      
      $('.count_enNew_botella').on('change', (e) =>{
      let cant = e.target.value
      let count_refill_botella = $('.count_refill_botella').val()
      let count_canje_botella = $('.count_canje_botella').val()
      let count_enobsequio_botella = $('.count_enobsequio_botella').val()
      let suma = parseInt(cant) + parseInt(count_refill_botella)+ parseInt(count_canje_botella)+ parseInt(count_enobsequio_botella)
      let monto = parseInt(cant) * 105
      $('.enNew_botella_mont').val(monto)
      $('.total_botella').val(suma)
      $('.cant_botella').text(suma)
      let suma_total = parseInt($('.canje_botella_mont').val()) + parseInt($('.refill_botella_mont').val())+ parseInt($('.enNew_botella_mont').val())
      $('.monto_botella_input').val(suma_total)
      $('.monto_botella').text(suma_total)
      
      
       let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
      $('.total_total_inp').val(sumar_totales)
      $('.total_total').text(sumar_totales)
      })
    
     $('.count_enobsequio_botella').on('change', (e) =>{
      let cant = e.target.value
      let count_refill_botella = $('.count_refill_botella').val()
      let count_canje_botella = $('.count_canje_botella').val()
      let count_enNew_botella = $('.count_enNew_botella').val()
      let suma = parseInt(cant) + parseInt(count_refill_botella)+ parseInt(count_canje_botella)+ parseInt(count_enNew_botella)
      $('.total_botella').val(suma)
      $('.cant_botella').text(suma)
      
      })
      
  
  
      $('.count_refill_garrafon11l').on('change', (e) =>{
        let cant = e.target.value
        let count_canje_garrafon11l = $('.count_canje_garrafon11l').val()
        let enNew_garrafon11l_mont = $('.count_enNew_garrafon11l').val()
        let count_enobsequio_garrafon11l = $('.count_enobsequio_garrafon11l').val()
        let suma = parseInt(cant) + parseInt(count_canje_garrafon11l)+ parseInt(enNew_garrafon11l_mont)+ parseInt(count_enobsequio_garrafon11l)
        let monto = parseInt(cant) * 35
        $('.refill_garrafon11l_mont').val(monto)
        $('.total_garrafon11l').val(suma)
        $('.cant_garrafon11l').text(suma)
        let suma_total = parseInt($('.canje_garrafon11l_mont').val()) + parseInt($('.refill_garrafon11l_mont').val())+ parseInt($('.enNew_garrafon11l_mont').val())
        $('.monto_garrafon11l_input').val(suma_total)
        $('.monto_garrafon11l').text(suma_total)
        
        let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
        $('.total_total_inp').val(sumar_totales)
        $('.total_total').text(sumar_totales)
        })
        
        
        $('.count_canje_garrafon11l').on('change', (e) =>{
        let cant = e.target.value
        let count_refill_garrafon11l = $('.count_refill_garrafon11l').val()
        let enNew_garrafon11l_mont = $('.count_enNew_garrafon11l').val()
        let count_enobsequio_garrafon11l = $('.count_enobsequio_garrafon11l').val()
        let suma = parseInt(cant) + parseInt(count_refill_garrafon11l)+ parseInt(enNew_garrafon11l_mont)+ parseInt(count_enobsequio_garrafon11l)
        let monto = parseInt(cant) * 55
        $('.canje_garrafon11l_mont').val(monto)
        $('.total_garrafon11l').val(suma)
        $('.cant_garrafon11l').text(suma)
        let suma_total = parseInt($('.canje_garrafon11l_mont').val()) + parseInt($('.refill_garrafon11l_mont').val())+ parseInt($('.enNew_garrafon11l_mont').val())
        $('.monto_garrafon11l_input').val(suma_total)
        $('.monto_garrafon11l').text(suma_total)
        
         let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
        $('.total_total_inp').val(sumar_totales)
        $('.total_total').text(sumar_totales)
        })
        
        $('.count_enNew_garrafon11l').on('change', (e) =>{
        let cant = e.target.value
        let count_refill_garrafon11l = $('.count_refill_garrafon11l').val()
        let count_canje_garrafon11l = $('.count_canje_garrafon11l').val()
        let count_enobsequio_garrafon11l = $('.count_enobsequio_garrafon11l').val()
        let suma = parseInt(cant) + parseInt(count_refill_garrafon11l)+ parseInt(count_canje_garrafon11l)+ parseInt(count_enobsequio_garrafon11l)
        let monto = parseInt(cant) * 105
        $('.enNew_garrafon11l_mont').val(monto)
        $('.total_garrafon11l').val(suma)
        $('.cant_garrafon11l').text(suma)
        let suma_total = parseInt($('.canje_garrafon11l_mont').val()) + parseInt($('.refill_garrafon11l_mont').val())+ parseInt($('.enNew_garrafon11l_mont').val())
        $('.monto_garrafon11l_input').val(suma_total)
        $('.monto_garrafon11l').text(suma_total)
      
        
         let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
        $('.total_total_inp').val(sumar_totales)
        $('.total_total').text(sumar_totales)
        })
  
         $('.count_enobsequio_garrafon11l').on('change', (e) =>{
        let cant = e.target.value
        let count_refill_garrafon11l = $('.count_refill_garrafon11l').val()
        let count_canje_garrafon11l = $('.count_canje_garrafon11l').val()
        let count_enNew_garrafon11l = $('.count_enNew_garrafon11l').val()
        let suma = parseInt(cant) + parseInt(count_refill_garrafon11l)+ parseInt(count_canje_garrafon11l)+parseInt(count_enNew_garrafon11l)
        let monto = parseInt(cant) * 105
        $('.enNew_garrafon11l_mont').val(monto)
        $('.total_garrafon11l').val(suma)
        $('.cant_garrafon11l').text(suma)
        })
  
        $('.count_refill_botella5l').on('change', (e) =>{
          let cant = e.target.value
          let count_canje_botella5l = $('.count_canje_botella5l').val()
          let enNew_botella5l_mont = $('.count_enNew_botella5l').val()
          let count_enobsequio_botella5l = $('.count_enobsequio_botella5l').val()
          let suma = parseInt(cant) + parseInt(count_canje_botella5l)+ parseInt(enNew_botella5l_mont)+ parseInt(count_enobsequio_botella5l)
          let monto = parseInt(cant) * 35
          $('.refill_botella5l_mont').val(monto)
          $('.total_botella5l').val(suma)
          $('.cant_botella5l').text(suma)
          let suma_total = parseInt($('.canje_botella5l_mont').val()) + parseInt($('.refill_botella5l_mont').val())+ parseInt($('.enNew_botella5l_mont').val())
          $('.monto_botella5l_input').val(suma_total)
          $('.monto_botella5l').text(suma_total)
          
          let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
          $('.total_total_inp').val(sumar_totales)
          $('.total_total').text(sumar_totales)
          })
          
          
          $('.count_canje_botella5l').on('change', (e) =>{
          let cant = e.target.value
          let count_refill_botella5l = $('.count_refill_botella5l').val()
          let enNew_botella5l_mont = $('.count_enNew_botella5l').val()
          let count_enobsequio_botella5l = $('.count_enobsequio_botella5l').val()
          let suma = parseInt(cant) + parseInt(count_refill_botella5l)+ parseInt(enNew_botella5l_mont)+ parseInt(count_enobsequio_botella5l)
          let monto = parseInt(cant) * 55
          $('.canje_botella5l_mont').val(monto)
          $('.total_botella5l').val(suma)
          $('.cant_botella5l').text(suma)
          let suma_total = parseInt($('.canje_botella5l_mont').val()) + parseInt($('.refill_botella5l_mont').val())+ parseInt($('.enNew_botella5l_mont').val())
          $('.monto_botella5l_input').val(suma_total)
          $('.monto_botella5l').text(suma_total)
          
           let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
          $('.total_total_inp').val(sumar_totales)
          $('.total_total').text(sumar_totales)
          })
          
          $('.count_enNew_botella5l').on('change', (e) =>{
          let cant = e.target.value
          let count_refill_botella5l = $('.count_refill_botella5l').val()
          let count_canje_botella5l = $('.count_canje_botella5l').val()
          let count_enobsequio_botella5l = $('.count_enobsequio_botella5l').val()
          
          let suma = parseInt(cant) + parseInt(count_refill_botella5l)+ parseInt(count_canje_botella5l)+ parseInt(count_enobsequio_botella5l)
          let monto = parseInt(cant) * 105
          $('.enNew_botella5l_mont').val(monto)
          $('.total_botella5l').val(suma)
          $('.cant_botella5l').text(suma)
          let suma_total = parseInt($('.canje_botella5l_mont').val()) + parseInt($('.refill_botella5l_mont').val())+ parseInt($('.enNew_botella5l_mont').val())
          $('.monto_botella5l_input').val(suma_total)
          $('.monto_botella5l').text(suma_total)
        
          
           let sumar_totales = parseInt($('.monto_garrafon_input').val()) + parseInt($('.monto_botella_input').val())+ parseInt($('.monto_garrafon11l_input').val())+ parseInt($('.monto_botella5l_input').val())
          $('.total_total_inp').val(sumar_totales)
          $('.total_total').text(sumar_totales)
          })
    
  
          $('.count_enobsequio_botella5l').on('change', (e) =>{
          let cant = e.target.value
          let count_refill_botella5l = $('.count_refill_botella5l').val()
          let count_canje_botella5l = $('.count_canje_botella5l').val()
          let count_enNew_botella5l = $('.count_enNew_botella5l').val()
          let suma = parseInt(cant) + parseInt(count_refill_botella5l)+ parseInt(count_canje_botella5l)+ parseInt(count_enNew_botella5l)
          let monto = parseInt(cant) * 105
          $('.enNew_botella5l_mont').val(monto)
          $('.total_botella5l').val(suma)
          $('.cant_botella5l').text(suma)
          })

//OTROS DESPUES DE LOS SELECT DE PRODUCTOS

$('.select2-basic').on('change', (e) =>{
  let id_ = e.target.value
  console.log(id_)
  var found = array.find(element => element.id == id_);
      console.log(found)
      $('input[name="firstName"]').val(found.firstName)
      $('input[name="lastName"]').val(found.lastName)

if ( $(".municipio_select option[value='" + found.ciudad + "']").length == 0 ){
console.log("option doesn't exist!");
$('.municipio_select').prepend('<option selected value="' + found.ciudad + '">' + found.ciudad + '</option>');  
}else{
  console.log("option exist!");
  $('.municipio_select').find('option:selected').remove().end();
  $(".municipio_select option[value='" + found.ciudad + "']").attr("selected", true);
}
                //val(found.ciudad)

       $('input[name="fraccionamiento"]').val(found.fraccionamiento)
      $('input[name="coto"]').val(found.coto)
       $('input[name="casa"]').val(found.casa)
      $('input[name="calle"]').val(found.calle)
       $('input[name="avenida"]').val(found.avenida)
        $('input[name="referencia"]').val(found.referencia)
      $('input[name="telefono"]').val(found.telefono)


})

$('.metodo_pago').on('change', (e) =>{
  let metodo = e.target.value
  console.log(metodo)

if(metodo == "Transferencia"){
console.log("Por verificar")

$('.status_pago').val('Por verificar')
  }else{
console.log("Pagado")
$('.status_pago').val('Pagado')
  }
  
  


  })

  $('.chofer').on('change', ()=>{
    var option = $('.chofer').find(':selected');
    
    var id_chofer = option.data("id");
    console.log(id_chofer)
    $(".id_chofer").val(id_chofer);
    })
    $('#chofer').on('change', ()=>{
      var option = $('#chofer').find(':selected');
      
      var id_chofer = option.data("id");
      console.log(id_chofer)
      $("#id_chofer").val(id_chofer);
      })


});
