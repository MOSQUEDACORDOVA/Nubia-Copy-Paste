/**
 * DataTables Advanced
 */

 'use strict';
 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate, maxDate,minDate2, maxDate2;
 
 // Custom filtering function which will search data in column four between two values
 $.fn.dataTable.ext.search.push(
     function( settings, data, dataIndex ) {
         var min = minDate.val();
         var max = maxDate.val();
       

     let f = data[5]
         var date = new Date(f);
         if (
             ( min === null && max === null ) ||
             ( min === null && date <= max ) ||
             ( min <= date   && max === null ) ||
             ( min <= date   && date <= max ) 
         ) {
             return true;
         }
         return false;
     }
 );
   // SUM PLUGIN
   jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
    return this.flatten().reduce( function ( a, b ) {
        if ( typeof a === 'string' ) {
            a = a.replace(/[^\d.-]/g, '') * 1;
        }
        if ( typeof b === 'string' ) {
            b = b.replace(/[^\d.-]/g, '') * 1;
        }

        return a + b;
    }, 0 );
} );
 
 
 // Datepicker for advanced filter
 var separator = ' - ',
   rangePickr = $('.flatpickr-range'),
   dateFormat = 'MM/DD/YYYY';
 var options = {
   autoUpdateInput: false,
   autoApply: true,
   locale: {
     format: dateFormat,
     separator: separator
   },
   opens: $('html').attr('data-textdirection') === 'rtl' ? 'left' : 'right'
 };
 
 //
 if (rangePickr.length) {
   rangePickr.flatpickr({
     mode: 'range',
     dateFormat: 'm/d/Y',
     onClose: function (selectedDates, dateStr, instance) {
       var startDate = '',
         endDate = new Date();
       if (selectedDates[0] != undefined) {
         startDate =
           selectedDates[0].getMonth() + 1 + '/' + selectedDates[0].getDate() + '/' + selectedDates[0].getFullYear();
         $('.start_date').val(startDate);
       }
       if (selectedDates[1] != undefined) {
         endDate =
           selectedDates[1].getMonth() + 1 + '/' + selectedDates[1].getDate() + '/' + selectedDates[1].getFullYear();
         $('.end_date').val(endDate);
       }
       $(rangePickr).trigger('change').trigger('keyup');
     }
   });
 }
 
 // Advance filter function
 // We pass the column location, the start date, and the end date
 var filterByDate = function (column, startDate, endDate) {
   // Custom filter syntax requires pushing the new filter to the global filter array
   $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
     var rowDate = normalizeDate(aData[column]),
       start = normalizeDate(startDate),
       end = normalizeDate(endDate);
       var  min2 = minDate2.val();
       var max2 = maxDate2.val();
       let f = aData[5]
       var date = new Date(f);
     // If our date from the row is between the start and end
     if (
      ( min2 === null && max2 === null ) ||
      ( min2 === null && date <= max2 ) ||
      ( min2 <= date   && max2 === null ) ||
      ( min2 <= date   && date <= max2 ) 
  ) {
      return true;
  }
  return false;
   });
 };
 
 // converts date strings to a Date object, then normalized into a YYYYMMMDD format (ex: 20131220). Makes comparing dates easier. ex: 20131220 > 20121220
 var normalizeDate = function (dateString) {
   var date = new Date(dateString);
   var normalized =
     date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2);
   return normalized;
 };
 function cargaTablas(id_chofer) {
    console.log(id_chofer)
  let corte = $('#array_corte').val()
  
  let corte2 = JSON.parse(corte.replace(/&quot;/g,'"'))
  console.log('aaa')

  let carga = $('#array_carga').val()
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
  var carga2 = JSON.parse(carga.replace(/&quot;/g,'"'))
    //let stproductos = JSON.parse(corte.productos)
   let corte3 = corte2.filter(status => status.personalId == id_chofer); // return implicito

  let Residencial = corte2.filter(status => status.cliente.tipo == 'Residencial' && status.personalId == id_chofer); // return implicito
  let Negocio = corte2.filter(status => status.cliente.tipo == 'Negocio'); // return implicito
  let PuntoVenta = corte2.filter(status => status.cliente.tipo == 'Punto de venta'); // return implicitoreturn implicito

  var dt_residencial = $('.datatables-basic'),
  dt_negocio = $('.datatables-basicNegocio'),
  dt_PuntoVenta = $('.datatables-basicPuntoVenta'),
  dt_Gral = $('.datatables-basicGral'),
    assetPath = '../../dataPY4/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
  minDate = new DateTime($('#min'), {
    format: 'DD/MM/YYYY'
});
maxDate = new DateTime($('#max'), {
    format: 'DD/MM/YYYY'
});

minDate2 = new DateTime($('#min1'), {
  format: 'DD/MM/YYYY'
});
maxDate2 = new DateTime($('#max1'), {
  format: 'DD/MM/YYYY'
});
//TABLA GRAL
let Newcorte2 = {}
//Recorremos el arreglo 
corte3.forEach( x => {
  if( !Newcorte2.hasOwnProperty(x.clienteId)){
    Newcorte2[x.clienteId] =[]
  }
    Newcorte2[x.clienteId].push({data:x, tipo: x.cliente.tipo, nombre:x.cliente.firstName +" "+ x.cliente.lastName,})  
})
let ArrayGral = Object.entries(Newcorte2);

  // DataTable with buttons
  // --------------------------------------------------------------------
  console.log(ArrayGral)
  console.log(corte2)
  if (dt_Gral.length) {
    $('.dt-column-searchGral thead tr').clone(true).appendTo('.dt-column-searchGral thead');
    $('.dt-column-searchGral thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_Gral_t.column(i).search() !== this.value) {
          dt_Gral_t.column(i).search(this.value).draw();
        }
      });
    });
    var dt_Gral_t = dt_Gral.DataTable({
      data: ArrayGral,rowId: 'staffId',
     columns: [
      { data: '1.0.tipo',},
        { data: '1.0.nombre'},
        { data: '1'},
      { data: '1'},        
        { data: '1' },
        { data: '1' },
        { data: '1' },
        { data: '1'},
        { data: '1'},
        { data: '1'},
        { data: '1'},
      ], columnDefs: [
        {
          // Label
          targets:0,visible: false, render: function (data, type, full, meta) {        
            return (data)
          }
      },
      {
        // nombre
        targets: 1,className: "my_class",
        render: function (data, type, full, meta) {
          let asentamiento = ""
          for (let i = 0; i < codigosP_arr.length; i++) {
            if (codigosP_arr[i]['id'] == full[1][0]['data']['cliente']['cpId']) {
              asentamiento = codigosP_arr[i]['asentamiento']
            }            
          }
      var cliente_arr = encodeURIComponent(JSON.stringify(data));
      var color_tag ="", color_text=""     
      if (full[1][0]['data']['cliente']['etiqueta'] ==null) {
        color_tag =0
        color_text="black"
      }else{
        color_tag =full[1][0]['data']['cliente']['etiqueta']['color']
        color_text="white"
      }
      let nombre= data +" / "+ asentamiento
      if (full[1][0]['data']['cliente']['tipo']=="Residencial") {
        

      }
          return (
            '<span class="badge rounded-pill ' +
            '" style="cursor:pointer;background-color: ' +color_tag  + '; color:'+color_text+'">' +
            nombre+
            '</span>'
          );
        }
    },
    {
      // REFILL
      targets:2,render: function (data, type, full, meta) {
        let total=0; let ResOcultoRefill;
        
        for (let i = 0; i < data.length; i++) {
          total += parseInt(data[i]['data']['total_refill_pedido']);
          if (data[i]['tipo'] == "Residencial") {
            ResOcultoRefill="ResOcultoRefill"     
          }
        }
        
             
        if (total == 0) {
          total = "-"
        }
        return (`<span class="refill ${ResOcultoRefill}">${total}</span>`)
      }  
  },
  {
    // canje
    targets:3,render: function (data, type, full, meta) {
      let total=0 , ResOcultoCanje; 
      for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i]['data']['total_canje_pedido']);
        if (data[i]['tipo'] == "Residencial") {
          ResOcultoCanje="ResOcultoCanje"     
        }
      }
      if (total == 0) {
        total = "-"
      }
      return (`<span class="canje ${ResOcultoCanje}">${total}</span>`)
      
    }  

},
{
  // nuevo
  targets:4,render: function (data, type, full, meta) {
    let total=0, ResOcultoNuevo;
      for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i]['data']['total_nv_pedido']);
        ResOcultoNuevo="ResOcultoNuevo"
      }
      if (total == 0) {
        total = "-"
      }
      return (`<span class="nuevo ${ResOcultoNuevo}">${total}</span>`)}  
},
{
  // dañados
  targets:5,render: function (data, type, full, meta) {
          let danados = 0, garrafones_prestamos=0, ResOcultoDanados;
    for (let i = 0; i < data.length; i++) {
      danados += parseInt(data[i]['data']['danados']);
      ResOcultoDanados="ResOcultoDanados";
  }
  if (danados == 0) {
    danados = "-"
  }
    return (`<span class="danados ${ResOcultoDanados}">${danados}</span>`)}  
  },
  {
    // prestados
    targets:6,render: function (data, type, full, meta) {
      
    let danados = 0, garrafones_prestamos=0, ResOcultoPrestados;
    for (let i = 0; i < data.length; i++) {
    garrafones_prestamos += parseInt(data[i]['data']['garrafones_prestamos']);
    ResOcultoPrestados="ResOcultoPrestados"
  }
  if (garrafones_prestamos == 0) {
    garrafones_prestamos = "-"
  }
    return (`<span class="prestados ${ResOcultoPrestados} ">${garrafones_prestamos}</span>`)}  
    },

    {          
      // Label
      targets: 7,
      render: function (data, type, full, meta) {
        var suma = 0, deuda = 0
          for (let i = 0; i < data.length; i++) {
            if (data[i]['data']['metodo_pago'] == "Transferencia") {
              if (Array.isArray(data[i]['data']['monto_total'])) {
                suma += countArray(parseInt(data[i]['data']['data']['monto_total']));
            } else {
                suma += parseInt(data[i]['data']['monto_total']);
            }

            }
            
        }
        let total = parseInt(suma)
        return `$<span style="color:red" class="depositos">${total}</span>`;
      }
    },
    {          
      // Label
      targets: 8,
      render: function (data, type, full, meta) {
        var suma = 0, deuda = 0
          for (let i = 0; i < data.length; i++) {
              if (data[i]['data']['deuda_anterior'] != "0") {
                if (Array.isArray(data[i]['data']['deuda_anterior'])) {
                  deuda += countArray(parseInt(data[i]['data']['deuda_anterior']));
              } else {
                  deuda += parseInt(data[i]['data']['deuda_anterior']);
              }
              }
            
        }
        let total = parseInt(deuda)
        return `$<span class="deuda">${total}</span>`;
      }
    },

    {          
      // Label
      targets: 9,
      render: function (data, type, full, meta) {
        var suma = 0, deuda = 0
          for (let i = 0; i < data.length; i++) {
            if (data[i]['data']['metodo_pago'] == "Efectivo") {
              if (Array.isArray(data[i]['data']['monto_total'])) {
                suma += countArray(parseInt(data[i]['data']['monto_total']));
            } else {
                suma += parseInt(data[i]['data']['monto_total']);
            }

            }
            
        }
        let total = parseInt(suma)
        return `$<span class="efectivo">${total}</span>`;;
      }
    },
    {          
      // Label
      targets: 10,
      render: function (data, type, full, meta) {
        var suma = 0, deuda = 0
          for (let i = 0; i < data.length; i++) {
              if (Array.isArray(data[i]['data']['descuento'])) {
                suma += countArray(parseInt(data[i]['data']['descuento']));
            } else {
                suma += parseInt(data[i]['data']['descuento']);
            }
  
            
        }
        let total = parseInt(suma)
        return `$<span class="descuento">${total}</span>`;;
      }
    },
      ],
      order: [[0, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],  
      rowCallback: function (row, data) {
        let totalrefill=0;
        for (let i = 0; i < data[1].length; i++) {
          if (data[1][i]['tipo'] == "Residencial") {
            console.log(data)
        console.log(row)
       $(row).addClass('d-none');       
       
    }         
        }

    },
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api
          .column(0, { page: 'current' })
          .data()
          .each(function (group, i,full) {
            console.log(full)
              console.log(group)
              console.log(last)
            if (last !== group) {
              if (group =="Residencial") {
                $(rows)
                .eq(i)
                .before('<tr class="group"><td >' + group + '</td><td class="refill_gral"></td><td class="canje_gral"></td><td class="nuevo_gral"></td><td class="danados_gral"></td><td class="prestados_gral"></td><td class="depositos_gral"></td><td class="adeudo_gral"></td><td class="subtotal"></td><td class="descuentogral"></td></tr>');
              }else{
                $(rows)
                .eq(i)
                .before('<tr class="group"><td colspan="10">' + group + '</td></tr>');
              }
              

              last = group;
            }
          });
      },
      language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Total _TOTAL_ registros",
      "infoEmpty": "Total _TOTAL_ registros",
      "infoFiltered": "(Filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });
    // $('div.head-label').html('<h6 class="mb-0">Negocios</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/
  var sumaRefill = 0,sumacanje = 0,sumanuevo = 0,sumadanados = 0,sumaprestados = 0, subefectivo=0,subadeudo=0,efectivoPre=0,cantDepositos=0,subDepositos=0,descuentos=0,resdescuentos=0,subtotal=0,total=0;
  $('.depositos').each(function(){
    if ($(this).text() == "-" || $(this).text() == "0") {
      subDepositos;
      cantDepositos
    }else{
      subDepositos += parseFloat($(this).text());;
      cantDepositos++
    }    
});
$('.efectivo').each(function(){
    if ($(this).text() == "-") {
      subefectivo
    }else{
      subefectivo += parseFloat($(this).text());
    }    
});
$('.deuda').each(function(){
  if ($(this).text() == "-") {
    subadeudo
  }else{
        subadeudo += parseFloat($(this).text());
  }    
});
$('.descuento').each(function(){
  if ($(this).text() == "-") {
    resdescuentos
  }else{
        resdescuentos += parseFloat($(this).text());
  }    
});
let resDpositos = 0, resEfectivo = 0, resDeuda = 0, rescantDepositos=0
$('tr.d-none .depositos').each(function(){
  if ($(this).text() == "-" || $(this).text() == "0") {
    resDpositos;
    rescantDepositos
  }else{
    resDpositos += parseFloat($(this).text());;
    rescantDepositos++
  }    
});
$('tr.d-none .efectivo').each(function(){
  if ($(this).text() == "-") {
    resEfectivo
  }else{
    resEfectivo += parseFloat($(this).text());
  }    
});
$('tr.d-none .deuda').each(function(){
if ($(this).text() == "-") {
  resDeuda
}else{
      resDeuda += parseFloat($(this).text());
}    
});
$('tr.d-none .descuento').each(function(){
  if ($(this).text() == "-") {
    descuentos
  }else{
        descuentos += parseFloat($(this).text());
  }    
  });
$('.depositos_gral').html(`<span style="color:red">$${resDpositos}</span>`)
$('.adeudo_gral').html(`<span >$${resDeuda}</span>`)
$('.subtotal').html(`<span >$${resEfectivo}</span>`)
$('.descuentogral').html(`<span >$${descuentos}</span>`)


console.log(subefectivo)
efectivoPre = parseFloat(subefectivo) + parseFloat(subadeudo)
dt_Gral_t.$('.refill').each(function(){
    if ($(this).text() == "-") {
      sumaRefill
    }else{
          sumaRefill += parseFloat($(this).text());
    }    
});
dt_Gral_t.$('.canje').each(function(){
  if ($(this).text() == "-") {
    sumacanje 
  }else{
  sumacanje += parseFloat($(this).text());
  }     
});
dt_Gral_t.$('.nuevo').each(function(){
  if ($(this).text() == "-") {
    sumanuevo
  }else{
  sumanuevo += parseFloat($(this).text());
  }   
});

dt_Gral_t.$('.danados').each(function(){
  if ($(this).text() == "-") {
    sumadanados
  }else{
  sumadanados += parseFloat($(this).text());
  }    
});
dt_Gral_t.$('.prestados').each(function(){
  if ($(this).text() == "-") {
    sumaprestados
  }else{
    sumaprestados += parseFloat($(this).text());
  }
     
});
  $( dt_Gral_t.column(2 ).footer() ).html(sumaRefill);
  $( dt_Gral_t.column(3 ).footer() ).html(sumacanje);
  $( dt_Gral_t.column(4 ).footer() ).html(sumanuevo);
  $( dt_Gral_t.column(5 ).footer() ).html(sumadanados);
  $( dt_Gral_t.column(6 ).footer() ).html(sumaprestados);
  if (parseFloat(efectivoPre) < parseFloat(subDepositos)) {
    subtotal =parseFloat(subDepositos)-parseFloat(efectivoPre)
  }else{
subtotal =parseFloat(efectivoPre)-parseFloat(subDepositos)
  }
  

  let sumaRefillres=0, resCanje =0, resNuevos = 0, resdanados=0, resprestados=0
  dt_Gral_t.$('.ResOcultoRefill').each(function(){
    if ($(this).text() == "-") {
      sumaRefillres
    }else{
      sumaRefillres += parseFloat($(this).text());
    }    
});

dt_Gral_t.$('.ResOcultoCanje').each(function(){
  if ($(this).text() == "-") {
    resCanje 
  }else{
  resCanje += parseFloat($(this).text());
  }     
});
dt_Gral_t.$('.ResOcultoNuevos').each(function(){
  if ($(this).text() == "-") {
    resNuevos
  }else{
  resNuevos += parseFloat($(this).text());
  }   
});

dt_Gral_t.$('.ResOcultoDanados').each(function(){
  if ($(this).text() == "-") {
    resdanados
  }else{
  resdanados += parseFloat($(this).text());
  }    
});
dt_Gral_t.$('.ResOcultoPrestados').each(function(){
  if ($(this).text() == "-") {
    resprestados
  }else{
    resprestados += parseFloat($(this).text());
  }
     
});

  $('.refill_gral').html(sumaRefillres)
  $('.canje_gral').html(resCanje)
  $('.nuevo_gral').html(resNuevos)
  $('.danados_gral').html(resdanados)
  $('.prestados_gral').html(resprestados)

  $('.adeudoF').text(subadeudo)
  $('.subtotalF').text(efectivoPre)
  $('.depositosF').text(subDepositos)
  $('.cantdepositosF').text(cantDepositos)
  $('.descuentosF').text(resdescuentos)
total =  parseFloat(subtotal) - parseFloat(resdescuentos)
$('.totalefectivoF').text(total)
    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic.draw();
      });
  }
 }

 function cargaTablaResidencial(id_chofer) {
  console.log(id_chofer)
let corte = $('#array_corte').val()

let corte2 = JSON.parse(corte.replace(/&quot;/g,'"'))
console.log('aaa')

let carga = $('#array_carga').val()
let codigosP = $('#array_cp').val()
let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
var carga2 = JSON.parse(carga.replace(/&quot;/g,'"'))
  //let stproductos = JSON.parse(corte.productos)

let Residencial = corte2.filter(status => status.cliente.tipo == 'Residencial' && status.personalId == id_chofer); // return implicito

var dt_residencial = $('.datatables-basic'),
dt_negocio = $('.datatables-basicNegocio'),
dt_PuntoVenta = $('.datatables-basicPuntoVenta'),
dt_Gral = $('.datatables-basicGral'),
  assetPath = '../../dataPY4/';

if ($('body').attr('data-framework') === 'laravel') {
  assetPath = $('body').attr('data-asset-path');
}
minDate = new DateTime($('#min'), {
  format: 'DD/MM/YYYY'
});
maxDate = new DateTime($('#max'), {
  format: 'DD/MM/YYYY'
});

minDate2 = new DateTime($('#min1'), {
format: 'DD/MM/YYYY'
});
maxDate2 = new DateTime($('#max1'), {
format: 'DD/MM/YYYY'
});


let Residencial_arr = {}
//Recorremos el arreglo 
Residencial.forEach( x => {
if( !Residencial_arr.hasOwnProperty(x.clienteId)){
  Residencial_arr[x.clienteId] =[]
}
  Residencial_arr[x.clienteId].push({data:x, tipo: x.cliente.tipo, nombre:x.cliente.firstName +" "+ x.cliente.lastName,})  
})
let ArrayRes = Object.entries(Residencial_arr);

 console.log(ArrayRes)
console.log(corte2)
if (dt_residencial.length) {
  $('.dt-column-searchRes thead tr').clone(true).appendTo('.dt-column-searchRes thead');
  $('.dt-column-searchRes thead tr:eq(1) th').each(function (i) {
    var title = $(this).text();
    $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');

    $('input', this).on('keyup change', function () {
      if (dt_residencial_t.column(i).search() !== this.value) {
        dt_residencial_t.column(i).search(this.value).draw();
      }
    });
  });
  var dt_residencial_t = dt_residencial.DataTable({
    data: ArrayRes,
   columns: [
    { data: '1.0.tipo',},
      { data: '1.0.nombre'},
      { data: '1'},
    { data: '1'},        
      { data: '1' },
      { data: '1' },
      { data: '1' },
      { data: '1'},
      { data: '1'},
      { data: '1'},
      { data: '1'},
    ], columnDefs: [
      {
        // Label
        targets:0,visible: false, render: function (data, type, full, meta) {        
          return (data)
        }
    },
    {
      // nombre
      targets: 1,className: "my_class",
      render: function (data, type, full, meta) {
        let asentamiento = ""
        for (let i = 0; i < codigosP_arr.length; i++) {
          if (codigosP_arr[i]['id'] == full[1][0]['data']['cliente']['cpId']) {
            asentamiento = codigosP_arr[i]['asentamiento']
          }            
        }
    var cliente_arr = encodeURIComponent(JSON.stringify(data));
    var color_tag ="", color_text=""     
    if (full[1][0]['data']['cliente']['etiqueta'] ==null) {
      color_tag =0
      color_text="black"
    }else{
      color_tag =full[1][0]['data']['cliente']['etiqueta']['color']
      color_text="white"
    }
    let nombre= data +" / "+ asentamiento
    if (full[1][0]['data']['cliente']['tipo']=="Residencial") {
      

    }
        return (
          '<span class="badge rounded-pill ' +
          '" style="cursor:pointer;background-color: ' +color_tag  + '; color:'+color_text+'">' +
          nombre+
          '</span>'
        );
      }
  },
  {
    // REFILL
    targets:2,render: function (data, type, full, meta) {
      let total=0;
      for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i]['data']['total_refill_pedido']);
        
      }
      if (total == 0) {
        total = "-"
      }
      return (`<span class="refill">${total}</span>`)
      }  
},
{
  // canje
  targets:3,render: function (data, type, full, meta) {
    let total=0;
    for (let i = 0; i < data.length; i++) {
      total += parseInt(data[i]['data']['total_canje_pedido']);
      
    }
    if (total == 0) {
      total = "-"
    }
    return (`<span class="canje">${total}</span>`)}  
},
{
// nuevo
targets:4,render: function (data, type, full, meta) {
  let total=0;
    for (let i = 0; i < data.length; i++) {
      total += parseInt(data[i]['data']['total_nv_pedido']);
      
    }
    if (total == 0) {
      total = "-"
    }
    return (`<span class="nuevo">${total}</span>`)}  
},
{
// dañados
targets:5,render: function (data, type, full, meta) {
        let danados = 0, garrafones_prestamos=0;
  for (let i = 0; i < data.length; i++) {
    danados += parseInt(data[i]['data']['danados']);
}
if (danados == 0) {
  danados = "-"
}
  return (`<span class="danados">${danados}</span>`)}  
},
{
  // prestados
  targets:6,render: function (data, type, full, meta) {
    
  let danados = 0, garrafones_prestamos=0;
  for (let i = 0; i < data.length; i++) {
  garrafones_prestamos += parseInt(data[i]['data']['garrafones_prestamos']);
}
if (garrafones_prestamos == 0) {
  garrafones_prestamos = "-"
}
  return (`<span class="prestados">${garrafones_prestamos}</span>`)}  
  },

  {          
    // Label
    targets: 7,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i]['data']['metodo_pago'] == "Transferencia") {
            if (Array.isArray(data[i]['data']['monto_total'])) {
              suma += countArray(parseInt(data[i]['data']['data']['monto_total']));
          } else {
              suma += parseInt(data[i]['data']['monto_total']);
          }

          }
          
      }
      let total = parseInt(suma)
      return `$<span style="color:red" class="depositos">${total}</span>`;
    }
  },
  {          
    // Label
    targets: 8,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i]['data']['deuda_anterior'] != "0") {
              if (Array.isArray(data[i]['data']['deuda_anterior'])) {
                deuda += countArray(parseInt(data[i]['data']['deuda_anterior']));
            } else {
                deuda += parseInt(data[i]['data']['deuda_anterior']);
            }
            }
          
      }
      let total = parseInt(deuda)
      return `$<span class="deuda">${total}</span>`;
    }
  },

  {          
    // Label
    targets: 9,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i]['data']['metodo_pago'] == "Efectivo") {
            if (Array.isArray(data[i]['data']['monto_total'])) {
              suma += countArray(parseInt(data[i]['data']['monto_total']));
          } else {
              suma += parseInt(data[i]['data']['monto_total']);
          }

          }
          
      }
      let total = parseInt(suma)
      return `$<span class="efectivo">${total}</span>`;;
    }
  },
  {          
    // Label
    targets: 10,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
            if (Array.isArray(data[i]['data']['descuento'])) {
              suma += countArray(parseInt(data[i]['data']['descuento']));
          } else {
              suma += parseInt(data[i]['data']['descuento']);
          }

          
      }
      let total = parseInt(suma)
      return `$<span class="descuentos">${total}</span>`;;
    }
  },
    ],
    order: [[0, 'desc']],
    dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    orderCellsTop: true,
    displayLength: 10,
    lengthMenu: [7, 10, 25, 50, 75, 100],  
    rowCallback: function (row, data) {
      
      for (let i = 0; i < data[1].length; i++) {
        if (data[1][i]['tipo'] == "Residencial") {
          console.log(data)
          console.log(row)
          // $(row).addClass('d-none');

        }
        
      }
  },
    drawCallback: function (settings) {
      var api = this.api();
      var rows = api.rows({ page: 'current' }).nodes();
      var last = null;

      api
        .column(0, { page: 'current' })
        .data()
        .each(function (group, i) {
          console.log(group)
          if (last !== group) {
            $(rows)
              .eq(i)
              .before('<tr class="group"><td colspan="10">' + group + '</td></tr>');

            last = group;
          }
        });
    },
    language: {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "Total _TOTAL_ registros",
    "infoEmpty": "Total _TOTAL_ registros",
    "infoFiltered": "(Filtrado de _MAX_ registros totales)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ Entradas",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "Sin resultados encontrados",
      paginate: {
        // remove previous & next text from pagination
        previous: '&nbsp;',
        next: '&nbsp;'
      }
    }
  });
  // $('div.head-label').html('<h6 class="mb-0">Negocios</h6>');
    // on key up from input field
/* $('input.dt-input').on('keyup change', function () {
  filterColumn($(this).attr('data-column'), $(this).val());
});**/
var sumaRefill = 0,sumacanje = 0,sumanuevo = 0,sumadanados = 0,sumaprestados = 0, subefectivo=0,subadeudo=0,efectivoPre=0,cantDepositos=0,subDepositos=0,subtotal=0, descuentos=0, total=0;

dt_residencial_t.$('.depositos').each(function(){
  if ($(this).text() == "-" || $(this).text() == "0") {
    subDepositos;
    cantDepositos
  }else{
    subDepositos += parseFloat($(this).text());;
    cantDepositos++
  }    
});
dt_residencial_t.$('.efectivo').each(function(){
  if ($(this).text() == "-") {
    subefectivo
  }else{
    subefectivo += parseFloat($(this).text());
  }    
});
dt_residencial_t.$('.deuda').each(function(){
if ($(this).text() == "-") {
  subadeudo
}else{
      subadeudo += parseFloat($(this).text());
}    
});
dt_residencial_t.$('.descuentos').each(function(){
  if ($(this).text() == "-") {
    descuentos
  }else{
        descuentos += parseFloat($(this).text());
  }    
  });
console.log(subefectivo)
efectivoPre = parseFloat(subefectivo) + parseFloat(subadeudo)

dt_residencial_t.$('.refill').each(function(){
  if ($(this).text() == "-") {
    sumaRefill
  }else{
    sumaRefill += parseFloat($(this).text());
  }    
});

dt_residencial_t.$('.canje').each(function(){
if ($(this).text() == "-") {
  sumacanje 
}else{
sumacanje += parseFloat($(this).text());
}     
});
dt_residencial_t.$('.nuevo').each(function(){
if ($(this).text() == "-") {
  sumanuevo
}else{
sumanuevo += parseFloat($(this).text());
}   
});

dt_residencial_t.$('.danados').each(function(){
if ($(this).text() == "-") {
  sumadanados
}else{
sumadanados += parseFloat($(this).text());
}    
});
dt_residencial_t.$('.prestados').each(function(){
if ($(this).text() == "-") {
  sumaprestados
}else{
  sumaprestados += parseFloat($(this).text());
}
   
});
$( dt_residencial_t.column(2 ).footer() ).html(sumaRefill);
$( dt_residencial_t.column(3 ).footer() ).html(sumacanje);
$( dt_residencial_t.column(4 ).footer() ).html(sumanuevo);
$( dt_residencial_t.column(5 ).footer() ).html(sumadanados);
$( dt_residencial_t.column(6 ).footer() ).html(sumaprestados);
if (parseFloat(efectivoPre) < parseFloat(subDepositos)) {
  subtotal =parseFloat(subDepositos)-parseFloat(efectivoPre)
}else{
subtotal =parseFloat(efectivoPre)-parseFloat(subDepositos)
}
$('.adeudoF').text(subadeudo)
$('.subtotalF').text(efectivoPre)
$('.depositosF').text(subDepositos)
$('.cantdepositosF').text(cantDepositos)
$('.descuentosF').text(descuentos)
total =  parseFloat(subtotal) - parseFloat(descuentos)
$('.totalefectivoF').text(total)
  // Refilter the table
  $('#min1, #max1').on('change', function () {
    filterByDate(5); // We call our filter function
    dt_basic.draw();
    });
}  
}
function cargaTablaNegocio(id_chofer) {
  console.log(id_chofer)
let corte = $('#array_corte').val()

let corte2 = JSON.parse(corte.replace(/&quot;/g,'"'))
console.log('aaa')

let carga = $('#array_carga').val()
let codigosP = $('#array_cp').val()
let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
var carga2 = JSON.parse(carga.replace(/&quot;/g,'"'))
  //let stproductos = JSON.parse(corte.productos)

let Negocio = corte2.filter(status => status.cliente.tipo == 'Negocio'&& status.personalId == id_chofer); // return implicito
var dt_negocio = $('.datatables-basicnegocio'),
dt_PuntoVenta = $('.datatables-basicPuntoVenta'),
dt_Gral = $('.datatables-basicGral'),
  assetPath = '../../dataPY4/';

if ($('body').attr('data-framework') === 'laravel') {
  assetPath = $('body').attr('data-asset-path');
}
minDate = new DateTime($('#min'), {
  format: 'DD/MM/YYYY'
});
maxDate = new DateTime($('#max'), {
  format: 'DD/MM/YYYY'
});

minDate2 = new DateTime($('#min1'), {
format: 'DD/MM/YYYY'
});
maxDate2 = new DateTime($('#max1'), {
format: 'DD/MM/YYYY'
});


let Negocio_arr = {}
//Recorremos el arreglo 
Negocio.forEach( x => {
if( !Negocio_arr.hasOwnProperty(x.clienteId)){
  Negocio_arr[x.clienteId] =[]
}
  Negocio_arr[x.clienteId].push({data:x, tipo: x.cliente.tipo, nombre:x.cliente.firstName +" "+ x.cliente.lastName,})  
})
let ArrayNeg = Object.entries(Negocio_arr);

 console.log(ArrayNeg)
if (dt_negocio.length) {
  $('.dt-column-searchnegocio thead tr').clone(true).appendTo('.dt-column-searchnegocio thead');
  $('.dt-column-searchnegocio thead tr:eq(1) th').each(function (i) {
    var title = $(this).text();
    $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');

    $('input', this).on('keyup change', function () {
      if (dt_negocio_t.column(i).search() !== this.value) {
        dt_negocio_t.column(i).search(this.value).draw();
      }
    });
  });
  var dt_negocio_t = dt_negocio.DataTable({
    data: ArrayNeg,
   columns: [
    { data: '1.0.tipo',},
      { data: '1.0.nombre'},
      { data: '1'},
    { data: '1'},        
      { data: '1' },
      { data: '1' },
      { data: '1' },
      { data: '1'},
      { data: '1'},
      { data: '1'},
      { data: '1'},
    ], columnDefs: [
      {
        // Label
        targets:0,visible: false, render: function (data, type, full, meta) {        
          return (data)
        }
    },
    {
      // nombre
      targets: 1,className: "my_class",
      render: function (data, type, full, meta) {
        let asentamiento = ""
        for (let i = 0; i < codigosP_arr.length; i++) {
          if (codigosP_arr[i]['id'] == full[1][0]['data']['cliente']['cpId']) {
            asentamiento = codigosP_arr[i]['asentamiento']
          }            
        }
    var cliente_arr = encodeURIComponent(JSON.stringify(data));
    var color_tag ="", color_text=""     
    if (full[1][0]['data']['cliente']['etiqueta'] ==null) {
      color_tag =0
      color_text="black"
    }else{
      color_tag =full[1][0]['data']['cliente']['etiqueta']['color']
      color_text="white"
    }
    let nombre= data +" / "+ asentamiento
    if (full[1][0]['data']['cliente']['tipo']=="Residencial") {
      

    }
        return (
          '<span class="badge rounded-pill ' +
          '" style="cursor:pointer;background-color: ' +color_tag  + '; color:'+color_text+'">' +
          nombre+
          '</span>'
        );
      }
  },
  {
    // REFILL
    targets:2,render: function (data, type, full, meta) {
      let total=0;
      for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i]['data']['total_refill_pedido']);
        
      }
      if (total == 0) {
        total = "-"
      }
      return (`<span class="refill">${total}</span>`)
      }  
},
{
  // canje
  targets:3,render: function (data, type, full, meta) {
    let total=0;
    for (let i = 0; i < data.length; i++) {
      total += parseInt(data[i]['data']['total_canje_pedido']);
      
    }
    if (total == 0) {
      total = "-"
    }
    return (`<span class="canje">${total}</span>`)}  
},
{
// nuevo
targets:4,render: function (data, type, full, meta) {
  let total=0;
    for (let i = 0; i < data.length; i++) {
      total += parseInt(data[i]['data']['total_nv_pedido']);
      
    }
    if (total == 0) {
      total = "-"
    }
    return (`<span class="nuevo">${total}</span>`)}  
},
{
// dañados
targets:5,render: function (data, type, full, meta) {
        let danados = 0, garrafones_prestamos=0;
  for (let i = 0; i < data.length; i++) {
    danados += parseInt(data[i]['data']['danados']);
}
if (danados == 0) {
  danados = "-"
}
  return (`<span class="danados">${danados}</span>`)}  
},
{
  // prestados
  targets:6,render: function (data, type, full, meta) {
    
  let danados = 0, garrafones_prestamos=0;
  for (let i = 0; i < data.length; i++) {
  garrafones_prestamos += parseInt(data[i]['data']['garrafones_prestamos']);
}
if (garrafones_prestamos == 0) {
  garrafones_prestamos = "-"
}
  return (`<span class="prestados">${garrafones_prestamos}</span>`)}  
  },

  {          
    // Label
    targets: 7,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i]['data']['metodo_pago'] == "Transferencia") {
            if (Array.isArray(data[i]['data']['monto_total'])) {
              suma += countArray(parseInt(data[i]['data']['data']['monto_total']));
          } else {
              suma += parseInt(data[i]['data']['monto_total']);
          }

          }
          
      }
      let total = parseInt(suma)
      return `$<span style="color:red" class="depositos">${total}</span>`;
    }
  },
  {          
    // Label
    targets: 8,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i]['data']['deuda_anterior'] != "0") {
              if (Array.isArray(data[i]['data']['deuda_anterior'])) {
                deuda += countArray(parseInt(data[i]['data']['deuda_anterior']));
            } else {
                deuda += parseInt(data[i]['data']['deuda_anterior']);
            }
            }
          
      }
      let total = parseInt(deuda)
      return `$<span class="deuda">${total}</span>`;
    }
  },

  {          
    // Label
    targets: 9,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i]['data']['metodo_pago'] == "Efectivo") {
            if (Array.isArray(data[i]['data']['monto_total'])) {
              suma += countArray(parseInt(data[i]['data']['monto_total']));
          } else {
              suma += parseInt(data[i]['data']['monto_total']);
          }

          }
          
      }
      let total = parseInt(suma)
      return `$<span class="efectivo">${total}</span>`;;
    }
  },
  {          
    // Label
    targets: 10,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
            if (Array.isArray(data[i]['data']['descuento'])) {
              suma += countArray(parseInt(data[i]['data']['descuento']));
          } else {
              suma += parseInt(data[i]['data']['descuento']);
          }

          
      }
      let total = parseInt(suma)
      return `$<span class="descuentos">${total}</span>`;;
    }
  },
    ],
    order: [[0, 'desc']],
    dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    orderCellsTop: true,
    displayLength: 10,
    lengthMenu: [7, 10, 25, 50, 75, 100],  
    rowCallback: function (row, data) {
      
      for (let i = 0; i < data[1].length; i++) {
        if (data[1][i]['tipo'] == "Residencial") {
          console.log(data)
      console.log(row)
     // $(row).addClass('d-none');

        }
        
      }
  },
    drawCallback: function (settings) {
      var api = this.api();
      var rows = api.rows({ page: 'current' }).nodes();
      var last = null;

      api
        .column(0, { page: 'current' })
        .data()
        .each(function (group, i) {
          console.log(group)
          if (last !== group) {
            $(rows)
              .eq(i)
              .before('<tr class="group"><td colspan="10">' + group + '</td></tr>');

            last = group;
          }
        });
    },
    language: {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "Total _TOTAL_ registros",
    "infoEmpty": "Total _TOTAL_ registros",
    "infoFiltered": "(Filtrado de _MAX_ registros totales)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ Entradas",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "Sin resultados encontrados",
      paginate: {
        // remove previous & next text from pagination
        previous: '&nbsp;',
        next: '&nbsp;'
      }
    }
  });
  // $('div.head-label').html('<h6 class="mb-0">Negocios</h6>');
    // on key up from input field
/* $('input.dt-input').on('keyup change', function () {
  filterColumn($(this).attr('data-column'), $(this).val());
});**/
var sumaRefill = 0,sumacanje = 0,sumanuevo = 0,sumadanados = 0,sumaprestados = 0, subefectivo=0,subadeudo=0,efectivoPre=0,cantDepositos=0,subDepositos=0,descuentos=0, subtotal=0, total=0;
dt_negocio_t.$('.depositos').each(function(){
  if ($(this).text() == "-" || $(this).text() == "0") {
    subDepositos;
    cantDepositos
  }else{
    subDepositos += parseFloat($(this).text());;
    cantDepositos++
  }    
});
dt_negocio_t.$('.efectivo').each(function(){
  if ($(this).text() == "-") {
    subefectivo
  }else{
    subefectivo += parseFloat($(this).text());
  }    
});
dt_negocio_t.$('.deuda').each(function(){
if ($(this).text() == "-") {
  subadeudo
}else{
      subadeudo += parseFloat($(this).text());
}    
});
dt_negocio_t.$('.descuentos').each(function(){
  if ($(this).text() == "-") {
    descuentos
  }else{
        descuentos += parseFloat($(this).text());
  }    
  });
console.log(subefectivo)
efectivoPre = parseFloat(subefectivo) + parseFloat(subadeudo)
dt_negocio_t.$('.refill').each(function(){
  if ($(this).text() == "-") {
    sumaRefill
  }else{
        sumaRefill += parseFloat($(this).text());
  }    
});
dt_negocio_t.$('.canje').each(function(){
if ($(this).text() == "-") {
  sumacanje 
}else{
sumacanje += parseFloat($(this).text());
}     
});
dt_negocio_t.$('.nuevo').each(function(){
if ($(this).text() == "-") {
  sumanuevo
}else{
sumanuevo += parseFloat($(this).text());
}   
});

dt_negocio_t.$('.danados').each(function(){
if ($(this).text() == "-") {
  sumadanados
}else{
sumadanados += parseFloat($(this).text());
}    
});
dt_negocio_t.$('.prestados').each(function(){
if ($(this).text() == "-") {
  sumaprestados
}else{
  sumaprestados += parseFloat($(this).text());
}
   
});
$( dt_negocio_t.column(2 ).footer() ).html(sumaRefill);
$( dt_negocio_t.column(3 ).footer() ).html(sumacanje);
$( dt_negocio_t.column(4 ).footer() ).html(sumanuevo);
$( dt_negocio_t.column(5 ).footer() ).html(sumadanados);
$( dt_negocio_t.column(6 ).footer() ).html(sumaprestados);
if (parseFloat(efectivoPre) < parseFloat(subDepositos)) {
  subtotal =parseFloat(subDepositos)-parseFloat(efectivoPre)
}else{
subtotal =parseFloat(efectivoPre)-parseFloat(subDepositos)
}
$('.adeudoF').text(subadeudo)
$('.subtotalF').text(efectivoPre)
$('.depositosF').text(subDepositos)
$('.cantdepositosF').text(cantDepositos)
$('.descuentosF').text(descuentos)
total =  parseFloat(subtotal) - parseFloat(descuentos)
$('.totalefectivoF').text(total)
  // Refilter the table
  $('#min1, #max1').on('change', function () {
    filterByDate(5); // We call our filter function
    dt_basic.draw();
    });
}  
}
function cargaTablaPto(id_chofer) {
  console.log(id_chofer)
let corte = $('#array_corte').val()

let corte2 = JSON.parse(corte.replace(/&quot;/g,'"'))
console.log('aaa')

let carga = $('#array_carga').val()
let codigosP = $('#array_cp').val()
let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
var carga2 = JSON.parse(carga.replace(/&quot;/g,'"'))
  //let stproductos = JSON.parse(corte.productos)
let PuntoVenta = corte2.filter(status => status.cliente.tipo == 'Punto de venta' && status.personalId == id_chofer); // return implicitoreturn implicito
var dt_PuntoVenta = $('.datatables-basicPto'),
  assetPath = '../../dataPY4/';

if ($('body').attr('data-framework') === 'laravel') {
  assetPath = $('body').attr('data-asset-path');
}
minDate = new DateTime($('#min'), {
  format: 'DD/MM/YYYY'
});
maxDate = new DateTime($('#max'), {
  format: 'DD/MM/YYYY'
});

minDate2 = new DateTime($('#min1'), {
format: 'DD/MM/YYYY'
});
maxDate2 = new DateTime($('#max1'), {
format: 'DD/MM/YYYY'
});


let PuntoVenta_arr = {}
//Recorremos el arreglo 
PuntoVenta.forEach( x => {
if( !PuntoVenta_arr.hasOwnProperty(x.clienteId)){
  PuntoVenta_arr[x.clienteId] =[]
}
  PuntoVenta_arr[x.clienteId].push({data:x, tipo: x.cliente.tipo, nombre:x.cliente.firstName +" "+ x.cliente.lastName,})  
})
let ArrayPto = Object.entries(PuntoVenta_arr);

 console.log(ArrayPto)
if (dt_PuntoVenta.length) {
  $('.dt-column-searchPto thead tr').clone(true).appendTo('.dt-column-searchPto thead');
  $('.dt-column-searchPto thead tr:eq(1) th').each(function (i) {
    var title = $(this).text();
    $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');

    $('input', this).on('keyup change', function () {
      if (dt_PuntoVenta_t.column(i).search() !== this.value) {
        dt_PuntoVenta_t.column(i).search(this.value).draw();
      }
    });
  });
  var dt_PuntoVenta_t = dt_PuntoVenta.DataTable({
    data: ArrayPto,
   columns: [
    { data: '1.0.tipo',},
      { data: '1.0.nombre'},
      { data: '1'},
    { data: '1'},        
      { data: '1' },
      { data: '1' },
      { data: '1' },
      { data: '1'},
      { data: '1'},
      { data: '1'},
      { data: '1'},
    ], columnDefs: [
      {
        // Label
        targets:0,visible: false, render: function (data, type, full, meta) {        
          return (data)
        }
    },
    {
      // nombre
      targets: 1,className: "my_class",
      render: function (data, type, full, meta) {
        let asentamiento = ""
        for (let i = 0; i < codigosP_arr.length; i++) {
          if (codigosP_arr[i]['id'] == full[1][0]['data']['cliente']['cpId']) {
            asentamiento = codigosP_arr[i]['asentamiento']
          }            
        }
    var cliente_arr = encodeURIComponent(JSON.stringify(data));
    var color_tag ="", color_text=""     
    if (full[1][0]['data']['cliente']['etiqueta'] ==null) {
      color_tag =0
      color_text="black"
    }else{
      color_tag =full[1][0]['data']['cliente']['etiqueta']['color']
      color_text="white"
    }
    let nombre= data +" / "+ asentamiento
    if (full[1][0]['data']['cliente']['tipo']=="Residencial") {
      

    }
        return (
          '<span class="badge rounded-pill ' +
          '" style="cursor:pointer;background-color: ' +color_tag  + '; color:'+color_text+'">' +
          nombre+
          '</span>'
        );
      }
  },
  {
    // REFILL
    targets:2,render: function (data, type, full, meta) {
      let total=0;
      for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i]['data']['total_refill_pedido']);
        
      }
      if (total == 0) {
        total = "-"
      }
      return (`<span class="refill">${total}</span>`)
      }  
},
{
  // canje
  targets:3,render: function (data, type, full, meta) {
    let total=0;
    for (let i = 0; i < data.length; i++) {
      total += parseInt(data[i]['data']['total_canje_pedido']);
      
    }
    if (total == 0) {
      total = "-"
    }
    return (`<span class="canje">${total}</span>`)}  
},
{
// nuevo
targets:4,render: function (data, type, full, meta) {
  let total=0;
    for (let i = 0; i < data.length; i++) {
      total += parseInt(data[i]['data']['total_nv_pedido']);
      
    }
    if (total == 0) {
      total = "-"
    }
    return (`<span class="nuevo">${total}</span>`)}  
},
{
// dañados
targets:5,render: function (data, type, full, meta) {
        let danados = 0, garrafones_prestamos=0;
  for (let i = 0; i < data.length; i++) {
    danados += parseInt(data[i]['data']['danados']);
}
if (danados == 0) {
  danados = "-"
}
  return (`<span class="danados">${danados}</span>`)}  
},
{
  // prestados
  targets:6,render: function (data, type, full, meta) {
    
  let danados = 0, garrafones_prestamos=0;
  for (let i = 0; i < data.length; i++) {
  garrafones_prestamos += parseInt(data[i]['data']['garrafones_prestamos']);
}
if (garrafones_prestamos == 0) {
  garrafones_prestamos = "-"
}
  return (`<span class="prestados">${garrafones_prestamos}</span>`)}  
  },

  {          
    // Label
    targets: 7,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i]['data']['metodo_pago'] == "Transferencia") {
            if (Array.isArray(data[i]['data']['monto_total'])) {
              suma += countArray(parseInt(data[i]['data']['data']['monto_total']));
          } else {
              suma += parseInt(data[i]['data']['monto_total']);
          }

          }
          
      }
      let total = parseInt(suma)
      return `$<span style="color:red" class="depositos">${total}</span>`;
    }
  },
  {          
    // Label
    targets: 8,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i]['data']['deuda_anterior'] != "0") {
              if (Array.isArray(data[i]['data']['deuda_anterior'])) {
                deuda += countArray(parseInt(data[i]['data']['deuda_anterior']));
            } else {
                deuda += parseInt(data[i]['data']['deuda_anterior']);
            }
            }
          
      }
      let total = parseInt(deuda)
      return `$<span class="deuda">${total}</span>`;
    }
  },

  {          
    // Label
    targets: 9,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i]['data']['metodo_pago'] == "Efectivo") {
            if (Array.isArray(data[i]['data']['monto_total'])) {
              suma += countArray(parseInt(data[i]['data']['monto_total']));
          } else {
              suma += parseInt(data[i]['data']['monto_total']);
          }

          }
          
      }
      let total = parseInt(suma)
      return `$<span class="efectivo">${total}</span>`;;
    }
  },
  {          
    // Label
    targets: 10,
    render: function (data, type, full, meta) {
      var suma = 0, deuda = 0
        for (let i = 0; i < data.length; i++) {
            if (Array.isArray(data[i]['data']['descuento'])) {
              suma += countArray(parseInt(data[i]['data']['descuento']));
          } else {
              suma += parseInt(data[i]['data']['descuento']);
          }

          
      }
      let total = parseInt(suma)
      return `$<span class="descuentos">${total}</span>`;;
    }
  },
    ],
    order: [[0, 'desc']],
    dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    orderCellsTop: true,
    displayLength: 10,
    lengthMenu: [7, 10, 25, 50, 75, 100],  
    rowCallback: function (row, data) {
      
      for (let i = 0; i < data[1].length; i++) {
        if (data[1][i]['tipo'] == "Residencial") {
          console.log(data)
      console.log(row)
     // $(row).addClass('d-none');

        }
        
      }
  },
    drawCallback: function (settings) {
      var api = this.api();
      var rows = api.rows({ page: 'current' }).nodes();
      var last = null;

      api
        .column(0, { page: 'current' })
        .data()
        .each(function (group, i) {
          console.log(group)
          if (last !== group) {
            $(rows)
              .eq(i)
              .before('<tr class="group"><td colspan="10">' + group + '</td></tr>');

            last = group;
          }
        });
    },
    language: {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "Total _TOTAL_ registros",
    "infoEmpty": "Total _TOTAL_ registros",
    "infoFiltered": "(Filtrado de _MAX_ registros totales)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ Entradas",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "Sin resultados encontrados",
      paginate: {
        // remove previous & next text from pagination
        previous: '&nbsp;',
        next: '&nbsp;'
      }
    }
  });
  // $('div.head-label').html('<h6 class="mb-0">Negocios</h6>');
    // on key up from input field
/* $('input.dt-input').on('keyup change', function () {
  filterColumn($(this).attr('data-column'), $(this).val());
});**/
var sumaRefill = 0,sumacanje = 0,sumanuevo = 0,sumadanados = 0,sumaprestados = 0, subefectivo=0,subadeudo=0,efectivoPre=0,cantDepositos=0,subDepositos=0,subtotal=0, descuentos=0, total=0;
dt_PuntoVenta_t.$('.depositos').each(function(){
  if ($(this).text() == "-" || $(this).text() == "0") {
    subDepositos;
    cantDepositos
  }else{
    subDepositos += parseFloat($(this).text());;
    cantDepositos++
  }    
});
dt_PuntoVenta_t.$('.efectivo').each(function(){
  if ($(this).text() == "-") {
    subefectivo
  }else{
    subefectivo += parseFloat($(this).text());
  }    
});
dt_PuntoVenta_t.$('.deuda').each(function(){
if ($(this).text() == "-") {
  subadeudo
}else{
      subadeudo += parseFloat($(this).text());
}    
});
dt_PuntoVenta_t.$('.descuentos').each(function(){
  if ($(this).text() == "-") {
    descuentos
  }else{
        descuentos += parseFloat($(this).text());
  }    
  });
console.log(subefectivo)
efectivoPre = parseFloat(subefectivo) + parseFloat(subadeudo)
dt_PuntoVenta_t.$('.refill').each(function(){
  if ($(this).text() == "-") {
    sumaRefill
  }else{
        sumaRefill += parseFloat($(this).text());
  }    
});
dt_PuntoVenta_t.$('.canje').each(function(){
if ($(this).text() == "-") {
  sumacanje 
}else{
sumacanje += parseFloat($(this).text());
}     
});
dt_PuntoVenta_t.$('.nuevo').each(function(){
if ($(this).text() == "-") {
  sumanuevo
}else{
sumanuevo += parseFloat($(this).text());
}   
});

dt_PuntoVenta_t.$('.danados').each(function(){
if ($(this).text() == "-") {
  sumadanados
}else{
sumadanados += parseFloat($(this).text());
}    
});
dt_PuntoVenta_t.$('.prestados').each(function(){
if ($(this).text() == "-") {
  sumaprestados
}else{
  sumaprestados += parseFloat($(this).text());
}
   
});
$( dt_PuntoVenta_t.column(2 ).footer() ).html(sumaRefill);
$( dt_PuntoVenta_t.column(3 ).footer() ).html(sumacanje);
$( dt_PuntoVenta_t.column(4 ).footer() ).html(sumanuevo);
$( dt_PuntoVenta_t.column(5 ).footer() ).html(sumadanados);
$( dt_PuntoVenta_t.column(6 ).footer() ).html(sumaprestados);
if (parseFloat(efectivoPre) < parseFloat(subDepositos)) {
  subtotal =parseFloat(subDepositos)-parseFloat(efectivoPre)
}else{
subtotal =parseFloat(efectivoPre)-parseFloat(subDepositos)
}
$('.adeudoF').text(subadeudo)
$('.subtotalF').text(efectivoPre)
$('.depositosF').text(subDepositos)
$('.cantdepositosF').text(cantDepositos)
$('.descuentosF').text(descuentos)
total =  parseFloat(subtotal) - parseFloat(descuentos)
$('.totalefectivoF').text(total)
  // Refilter the table
  $('#min1, #max1').on('change', function () {
    filterByDate(5); // We call our filter function
    dt_basic.draw();
    });
}  
}
 // Advanced Search Functions Ends
 $(function () {
  'use strict';

  $("#corte_modal").on('show.bs.modal', function (e) {
    var triggerLink = $(e.relatedTarget);
    var Total_total = triggerLink.data("id");
    var title = triggerLink.data("title");
    var totalrefill = triggerLink.data("totalrefill");
    var totalcanje = triggerLink.data("totalcanje");
    var totalObsequio = triggerLink.data("totalobsequio");
    var totaldanados = triggerLink.data("totaldanados");
    var totalnuevo = triggerLink.data("totalnuevo");
    var garrafones_prestamos = triggerLink.data("garrafones_prestamos");
    var id_personal = triggerLink.data("id_personal");
    
    console.log(carga2)
    let cant_ini=0
    for (let i = 0; i < carga2.length; i++) {
      for (let j = 0; j < carga2[i].length; j++) {
        console.log(carga2[i][j]['personalId'])
      if (carga2[i][j]['personalId'] == id_personal) {
        cant_ini = parseInt(cant_ini) +parseInt(carga2[i][j]['cantidad_inicial'])
      }
      }
      
      
    }
    console.log(cant_ini)
    let carga_final = parseInt(cant_ini)-(parseInt(totalrefill)+parseInt(totalcanje)+parseInt(totalnuevo)+parseInt(totalObsequio))
    $("#corte_modalTitle").text(title);
    $(this).find(".modal-body").html("<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Carga Inicial: <span class='badge bg-primary rounded-pill'>" + cant_ini +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Refill: <span class='badge bg-primary rounded-pill'>" + totalrefill +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Canej: <span class='badge bg-primary rounded-pill'>" +totalcanje +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Nuevos: <span class='badge bg-primary rounded-pill'>"+ totalnuevo+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Obsequio: <span class='badge bg-primary rounded-pill'>"+ totalObsequio+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Carga Final: <span class='badge bg-primary rounded-pill'>"+carga_final+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Dañados: <span class='badge bg-primary rounded-pill'>"+ totaldanados+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Prestados: <span class='badge bg-primary rounded-pill'>"+garrafones_prestamos+"</span></li><li class='list-group-item list-group-item-primary d-flex justify-content-between align-items-center'>Total General: <span class='badge bg-primary rounded-pill'>"+Total_total+"</span></li></ul>");
});

  // Add New record
  // ? Remove/Update this code as per your requirements ?
  var count = 101;
  $('.data-submit').on('click', function () {
    var $new_name = $('.add-new-record .dt-full-name').val(),
      $new_post = $('.add-new-record .dt-post').val(),
      $new_email = $('.add-new-record .dt-email').val(),
      $new_date = $('.add-new-record .dt-date').val(),
      $new_salary = $('.add-new-record .dt-salary').val();

    if ($new_name != '') {
      dt_basic.row
        .add({
          responsive_id: null,
          id: count,
          full_name: $new_name,
          post: $new_post,
          email: $new_email,
          start_date: $new_date,
          salary: '$' + $new_salary,
          status: 5
        })
        .draw();
      count++;
      $('.modal').modal('hide');
    }
  });



  // Responsive Table
  // --------------------------------------------------------------------


  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

  $('.datatables-basic tbody').on('click', '.delete-record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id = e.target.classList[0]
    Swal.fire({
      title: 'Eliminar',
      text: "Seguro desea eliminar el pedido indicado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `//${id}`;
      }
    })

  });
  $('.datatables-basic tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `//${id_edit}`;

  });

  $("#corte_modal_general_tabla").on('show.bs.modal', function (e) {
    var triggerLink = $(e.relatedTarget);
    var id = triggerLink.data("id");
    var nombre = triggerLink.data("nombre");
    var fecha = triggerLink.data("fecha");
console.log(id)
$('.choferF').text(nombre);
$('#pedidos_corteGral').dataTable().fnDestroy();
 $('#pedidos_corteGral').empty();
$('#pedidos_corteGral').html(`<thead>
<tr>
    <th>Tipo oculto</th>
    <th>-</th>
    <th>Refil</th>
    <th>Canje</th>
    <th>Nuevo Envase</th>
    <th>Dañados</th>
    <th>Prestados</th>
    <th>Depositos</th>
    <th>Adeudo</th>
    <th>Subtotal</th>
    <th>Descuento</th>
</tr>
</thead>
<tfoot>
<tr>
<th colspan="2" style="text-align:right"> Total</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</tfoot`);

cargaTablas(id)
});
  $("#corte_modal_residencial_tabla").on('show.bs.modal', function (e) {
    var triggerLink = $(e.relatedTarget);
    var id = triggerLink.data("id");
    var nombre = triggerLink.data("nombre");
    var fecha = triggerLink.data("fecha");
console.log(id)
$('.fechaF').text(fecha);
$('.choferF').text(nombre);
$('#residencial_table').dataTable().fnDestroy();
 $('#residencial_table').empty();
$('#residencial_table').html(`<thead>
<tr>
    <th>Tipo oculto</th>
    <th>-</th>
    <th>Refil</th>
    <th>Canje</th>
    <th>Nuevo Envase</th>
    <th>Dañados</th>
    <th>Prestados</th>
    <th>Depositos</th>
    <th>Adeudo</th>
    <th>Subtotal</th>
    <th>Descuentos</th>
</tr>
</thead>
<tfoot>
<tr>
<th colspan="2" style="text-align:right"> Total</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</tfoot`);

cargaTablaResidencial(id)
});
$("#corte_modal_negocio").on('show.bs.modal', function (e) {
  var triggerLink = $(e.relatedTarget);
  var id = triggerLink.data("id");
  var nombre = triggerLink.data("nombre");
  var fecha = triggerLink.data("fecha");
console.log(id)
$('.fechaF').text(fecha);
$('.choferF').text(nombre);
$('#negocio_table').dataTable().fnDestroy();
$('#negocio_table').empty();
$('#negocio_table').html(`<thead>
<tr>
  <th>Tipo oculto</th>
  <th>-</th>
  <th>Refil</th>
  <th>Canje</th>
  <th>Nuevo Envase</th>
  <th>Dañados</th>
  <th>Prestados</th>
  <th>Depositos</th>
  <th>Adeudo</th>
  <th>Subtotal</th>
  <th>Descuentos</th>
</tr>
</thead>
<tfoot>
<tr>
<th colspan="2" style="text-align:right"> Total</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</tfoot`);

cargaTablaNegocio(id)
});
$("#corte_modal_ptovta").on('show.bs.modal', function (e) {
  var triggerLink = $(e.relatedTarget);
  var id = triggerLink.data("id");
  var nombre = triggerLink.data("nombre");
  var fecha = triggerLink.data("fecha");
console.log(id)
$('.fechaF').text(fecha);
$('.choferF').text(nombre);
$('#Pto_table').dataTable().fnDestroy();
$('#Pto_table').empty();
$('#Pto_table').html(`<thead>
<tr>
  <th>Tipo oculto</th>
  <th>-</th>
  <th>Refil</th>
  <th>Canje</th>
  <th>Nuevo Envase</th>
  <th>Dañados</th>
  <th>Prestados</th>
  <th>Depositos</th>
  <th>Adeudo</th>
  <th>Subtotal</th>
  <th>Descuentos</th>
</tr>
</thead>
<tfoot>
<tr>
<th colspan="2" style="text-align:right"> Total</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</tfoot`);

cargaTablaPto(id)
});
});
// Filter column wise function
function filterColumn(i, val) {
  if (i == 5) {
    var startDate = $('.start_date').val(),
      endDate = $('.end_date').val();
    if (startDate !== '' && endDate !== '') {
      
      filterByDate(i, startDate, endDate); // We call our filter function
    }
    
    if (startDate == '' && endDate == '') {
      
      location.reload();
    }
    $('.datatables-basic').dataTable().fnDraw();
    
  } else {
    $('.datatables-basic').DataTable().column(i).search(val, false, true).draw();
  }
}
// Filter column wise function
function filterColumn2(i, val) {
  if (i == 5) {
    var startDate = $('.start_date2').val(),
      endDate = $('.end_date2').val();
    if (startDate !== '' && endDate !== '') {
      
      filterByDate(i, startDate, endDate); // We call our filter function
    }
    
 /*   if (startDate == '' && endDate == '') {
      
      location.reload();
    }*/
    $('.datatables-basic2').dataTable().fnDraw();
    
  } else {
    $('.datatables-basic2').DataTable().column(i).search(val, false, true).draw();
  }
}
// Filter column wise function
async function cambioSP(id, status) {
  console.log(status)
  const { value: estado } = await Swal.fire({
    title: 'Seleccione un nuevo Status',
    input: 'select',
    inputOptions: {
        Entregado: 'Entregado',
        Cancelado: 'Cancelado',
        'Por entregar': 'Por entregar',
    },
    inputPlaceholder: 'Seleccione un nuevo Status',
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === status) {
          resolve('Debe seleccionar un estado diferente')
        } else {
           resolve()
        }
      })
    }
  })
  
  if (estado) {
    window.location.href = `/cambiaS_pedido/${id}/${estado}`;
  }

}