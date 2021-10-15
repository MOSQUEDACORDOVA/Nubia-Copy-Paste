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
 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  
  let corte = $('#array_corte').val()
  
  let corte2 = JSON.parse(corte.replace(/&quot;/g,'"'))
    //let stproductos = JSON.parse(corte.productos)
  let Residencial = corte2.filter(status => status.cliente.tipo == 'Residencial'); // return implicito
  let Negocio = corte2.filter(status => status.cliente.tipo == 'Negocio'); // return implicito
  let PuntoVenta = corte2.filter(status => status.cliente.tipo == 'Punto de venta'); // return implicitoreturn implicito

  //TABLA RESIDENCIAL
  let NewResidencial = {}
//Recorremos el arreglo 
Residencial.forEach( x => {
  if( !NewResidencial.hasOwnProperty(x.chofer)){
    NewResidencial[x.chofer] =[]
  }
    NewResidencial[x.chofer].push(x)  
})
let ArrayResidencial = Object.entries(NewResidencial);

//TABLA NEGOCIO
let NewNegocio = {}
//Recorremos el arreglo 
Negocio.forEach( x => {
  if( !NewNegocio.hasOwnProperty(x.chofer)){
    NewNegocio[x.chofer] =[]
  }
    NewNegocio[x.chofer].push(x)  
})
let ArrayNegocio = Object.entries(NewNegocio);


//TABLA PTO VENTA
let NewPuntoVenta = {}
//Recorremos el arreglo 
PuntoVenta.forEach( x => {
  if( !NewPuntoVenta.hasOwnProperty(x.chofer)){
    NewPuntoVenta[x.chofer] =[]
  }
    NewPuntoVenta[x.chofer].push(x)  
})
let ArrayPuntoVenta = Object.entries(NewPuntoVenta);

//TABLA GRAL
let Newcorte2 = {}
//Recorremos el arreglo 
corte2.forEach( x => {
  if( !Newcorte2.hasOwnProperty(x.chofer)){
    Newcorte2[x.chofer] =[]
  }
    Newcorte2[x.chofer].push(x)  
})
let ArrayGral = Object.entries(Newcorte2);


  var dt_basic_table = $('.datatables-basic'),
  dt_negocio = $('.datatables-basicNegocio'),
  dt_PuntoVenta = $('.datatables-basicPuntoVenta'),
  dt_Gral = $('.datatables-basicGral'),
    dt_date_table = $('.dt-date'),
    dt_basic_table2 = $('.datatables-basic2'),
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
  // DataTable with buttons
  // --------------------------------------------------------------------
 
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
      data: ArrayGral,
     columns: [
      { data: '0',render: function (data, type, full, meta) {
        let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
        let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0;
        let Tbotella1LR=0, Tbotella5LR =0, Tgarrafon11LR=0, Tgarrafon19LR =0;
        let Tbotella1LC=0, Tbotella5LC =0, Tgarrafon11LC=0, Tgarrafon19LC =0;
        let Tbotella1LN=0, Tbotella5LN =0, Tgarrafon11LN=0, Tgarrafon19LN =0;
        let Tbotella1LO=0, Tbotella5LO =0, Tgarrafon11LO=0, Tgarrafon19LO =0;        
        let danados = 0, garrafones_prestamos=0;
          for (let i = 0; i < full[1].length; i++) {
            botella1L = JSON.parse(full[1][i]['botella1L'])
            botella5L = JSON.parse(full[1][i]['botella5L'])
            garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
            garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
            console.log(botella1L)
            if (Array.isArray(botella1L)) {
              Tbotella1L += countArray(parseInt(botella1L['total_cant']));
              Tbotella1LR += countArray(parseInt(botella1L['refill_cant']));
              Tbotella1LC += countArray(parseInt(botella1L['canje_cant']));
              Tbotella1LN += countArray(parseInt(botella1L['nuevo_cant']));
              Tbotella1LO += countArray(parseInt(botella1L['enobsequio_cant_botella']));

          } else {
            Tbotella1L += parseInt(botella1L['total_cant']);
            Tbotella1LR += parseInt(botella1L['refill_cant']);
            Tbotella1LC += parseInt(botella1L['canje_cant']);
            Tbotella1LN += parseInt(botella1L['nuevo_cant']);
            Tbotella1LO += parseInt(botella1L['enobsequio_cant_botella']);
          }

          if (Array.isArray(botella5L)) {
            Tbotella5L += countArray(parseInt(botella5L['total_cant']));
             Tbotella5LR += countArray(parseInt(botella5L['refill_cant']));
              Tbotella5LC += countArray(parseInt(botella5L['canje_cant']));
              Tbotella5LN += countArray(parseInt(botella5L['nuevo_cant']));
Tbotella5LO += countArray(parseInt(botella5L['enobsequio_cant_botella5l']));
        } else {
          Tbotella5L += parseInt(botella5L['total_cant']);
           Tbotella5LR += parseInt(botella5L['refill_cant']);
              Tbotella5LC += parseInt(botella5L['canje_cant']);
              Tbotella5LN += parseInt(botella5L['nuevo_cant']);
              Tbotella5LO += parseInt(botella5L['enobsequio_cant_botella5l']);
        }

        if (Array.isArray(garrafon11L)) {
          Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
           Tgarrafon11LR += countArray(parseInt(garrafon11L['refill_cant']));
              Tgarrafon11LC += countArray(parseInt(garrafon11L['canje_cant']));
              Tgarrafon11LN += countArray(parseInt(garrafon11L['nuevo_cant']));
              Tgarrafon11LO += countArray(parseInt(garrafon11L['enobsequio_cant_garrafon11l']));
      } else {
        Tgarrafon11L += parseInt(garrafon11L['total_cant']);
         Tgarrafon11LR += parseInt(garrafon11L['refill_cant']);
              Tgarrafon11LC += parseInt(garrafon11L['canje_cant']);
              Tgarrafon11LN += parseInt(garrafon11L['nuevo_cant']);
              Tgarrafon11LO += parseInt(garrafon11L['enobsequio_cant_garrafon11l']);
      }


          if (Array.isArray(garrafon19L)) {
            Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
            
         Tgarrafon19LR += countArray(parseInt(garrafon19L['refill_cant']));
              Tgarrafon19LC += countArray(parseInt(garrafon19L['canje_cant']));
              Tgarrafon19LN += countArray(parseInt(garrafon19L['enobsequio_cant_garrafon']));
Tgarrafon19LO += countArray(parseInt(garrafon19L['nuevo_cant']));
        } else {
          Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          
         Tgarrafon19LR += parseInt(garrafon19L['refill_cant']);
              Tgarrafon19LC += parseInt(garrafon19L['canje_cant']);
              Tgarrafon19LN += parseInt(garrafon19L['nuevo_cant']);
              Tgarrafon19LO += parseInt(garrafon19L['enobsequio_cant_garrafon']);
        }

            if (Array.isArray(full[1][i]['danados'])) {
              danados += countArray(parseInt(full[1][i]['danados']));
          } else {
              danados += parseInt(full[1][i]['danados']);
          }

          if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
            garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
        } else {
            garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
        }


        }
        let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)//+parseInt(garrafones_prestamos)
        let totalRefill = parseInt(Tbotella1LR)+parseInt(Tbotella5LR)+parseInt(Tgarrafon11LR)+parseInt(Tgarrafon19LR)
        let totalCanje = parseInt(Tbotella1LC)+parseInt(Tbotella5LC)+parseInt(Tgarrafon11LC)+parseInt(Tgarrafon19LC)
        let totalObsequio = parseInt(Tbotella1LO)+parseInt(Tbotella5LO)+parseInt(Tgarrafon11LO)+parseInt(Tgarrafon19LO)
        let totalNuevo = parseInt(Tbotella1LN)+parseInt(Tbotella5LN)+parseInt(Tgarrafon11LN)+parseInt(Tgarrafon19LN)
        return '<button class="btn btn-primary" data-bs-toggle="modal" data-id="'+total_garrafones+'" data-totalRefill="'+totalRefill+'" data-totalCanje="'+totalCanje+'" data-totalObsequio="'+totalObsequio+'" data-totalNuevo="'+totalNuevo+'" data-totaldanados="'+danados+'" data-garrafones_prestamos="'+garrafones_prestamos+'"data-title="Total Garrafones Detallado de '+data+'"  data-bs-target="#corte_modal">'+data+'</button>'}  },
        { data: '0'},
        { data: '0' },
        { data: '0' },
        { data: '0' },
        { data: '0'},
        { data: '0'},
      ], columnDefs: [
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            let marca="", modelo ="", matricula="", vehiculo ="";
              for (let i = 0; i < full[1].length; i++) {
                marca = full[1][i]['personal']['vehiculo']['marca']
                modelo = full[1][i]['personal']['vehiculo']['modelo']
                matricula = full[1][i]['personal']['vehiculo']['matricula']
            }
            vehiculo = marca +" "+ modelo+" "+ matricula
            return vehiculo;
          }
      },
      {
        // Label
        targets: 2,
        render: function (data, type, full, meta) {
          let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
          let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0, danados=0,garrafones_prestamos=0;
            for (let i = 0; i < full[1].length; i++) {
              botella1L = JSON.parse(full[1][i]['botella1L'])
              botella5L = JSON.parse(full[1][i]['botella5L'])
              garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
              garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
              if (Array.isArray(botella1L)) {
                Tbotella1L += countArray(parseInt(botella1L['total_cant']));
            } else {
              Tbotella1L += parseInt(botella1L['total_cant']);
            }

            if (Array.isArray(botella5L)) {
              Tbotella5L += countArray(parseInt(botella5L['total_cant']));
          } else {
            Tbotella5L += parseInt(botella5L['total_cant']);
          }

          if (Array.isArray(garrafon11L)) {
            Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
        } else {
          Tgarrafon11L += parseInt(garrafon11L['total_cant']);
        }


            if (Array.isArray(garrafon19L)) {
              Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
          } else {
            Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          }

          if (Array.isArray(full[1][i]['danados'])) {
            danados += countArray(parseInt(full[1][i]['danados']));
        } else {
          danados += parseInt(full[1][i]['danados']);
        }

        if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
          garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
      } else {
        garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
      }

          }
          let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)+parseInt(garrafones_prestamos)
          return total_garrafones;
        }
    },
          {
            // Label
            targets: 3,
            render: function (data, type, full, meta) {
              var suma = 0, deuda =0
                for (let i = 0; i < full[1].length; i++) {
                  if (full[1][i]['metodo_pago'] == "Efectivo") {
                    console.log(full[1][i]['deuda_anterior'])
                    if (full[1][i]['deuda_anterior'] != "0") {
                      if (Array.isArray(full[1][i]['deuda_anterior'])) {
                        deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                    } else {
                        deuda += parseInt(full[1][i]['deuda_anterior']);
                    }
                    }
                    if (Array.isArray(full[1][i]['monto_total'])) {
                      suma += countArray(parseInt(full[1][i]['monto_total']));
                  } else {
                      suma += parseInt(full[1][i]['monto_total']);
                  }

                  }
                  
              }
              let total = parseInt(suma) + parseInt(deuda)
                  console.log(total)
              return '$ '+ total;
            }
        },{
          
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Transferencia") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Tarjeta") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          
          // Label
          targets: 6,
          render: function (data, type, full, meta) {
            var deuda_ant = 0
              for (let i = 0; i < full[1].length; i++) {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda_ant += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda_ant += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                
            }
            return '$ '+ deuda_ant;
          }
        },
      ],
      order: [[2, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],  
    
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

      $("#corte_modalTitle").text(title);
      $(this).find(".modal-body").html("<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Total Refill: <span class='badge bg-primary rounded-pill'>" + totalrefill +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Canej: <span class='badge bg-primary rounded-pill'>" +totalcanje +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Nuevos: <span class='badge bg-primary rounded-pill'>"+
      totalnuevo+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Obsequio: <span class='badge bg-primary rounded-pill'>"+
      totalObsequio+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Dañados: <span class='badge bg-primary rounded-pill'>"+
      totaldanados+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Prestados: <span class='badge bg-primary rounded-pill'>"+
      garrafones_prestamos+"</span></li><li class='list-group-item list-group-item-primary d-flex justify-content-between align-items-center'>Total General: <span class='badge bg-primary rounded-pill'>"+
      Total_total+"</span></li></ul>");
  });
    // $('div.head-label').html('<h6 class="mb-0">Negocios</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/

  
    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic.draw();
      });
  }
  if (dt_basic_table.length) {
    $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
    $('.dt-column-search thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic.column(i).search() !== this.value) {
          dt_basic.column(i).search(this.value).draw();
        }
      });
    });
    var dt_basic = dt_basic_table.DataTable({
      data: ArrayResidencial,
     columns: [
      { data: '0',render: function (data, type, full, meta) {
        console.log(full[1])
        let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
        let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0;
        let Tbotella1LR=0, Tbotella5LR =0, Tgarrafon11LR=0, Tgarrafon19LR =0;
        let Tbotella1LC=0, Tbotella5LC =0, Tgarrafon11LC=0, Tgarrafon19LC =0;
        let Tbotella1LN=0, Tbotella5LN =0, Tgarrafon11LN=0, Tgarrafon19LN =0;
        let Tbotella1LO=0, Tbotella5LO =0, Tgarrafon11LO=0, Tgarrafon19LO =0;        
        let danados = 0, garrafones_prestamos=0;
          for (let i = 0; i < full[1].length; i++) {
            botella1L = JSON.parse(full[1][i]['botella1L'])
            botella5L = JSON.parse(full[1][i]['botella5L'])
            garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
            garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
            console.log(botella1L)
            if (Array.isArray(botella1L)) {
              Tbotella1L += countArray(parseInt(botella1L['total_cant']));
              Tbotella1LR += countArray(parseInt(botella1L['refill_cant']));
              Tbotella1LC += countArray(parseInt(botella1L['canje_cant']));
              Tbotella1LN += countArray(parseInt(botella1L['nuevo_cant']));
              Tbotella1LO += countArray(parseInt(botella1L['enobsequio_cant_botella']));

          } else {
            Tbotella1L += parseInt(botella1L['total_cant']);
            Tbotella1LR += parseInt(botella1L['refill_cant']);
            Tbotella1LC += parseInt(botella1L['canje_cant']);
            Tbotella1LN += parseInt(botella1L['nuevo_cant']);
            Tbotella1LO += parseInt(botella1L['enobsequio_cant_botella']);
          }

          if (Array.isArray(botella5L)) {
            Tbotella5L += countArray(parseInt(botella5L['total_cant']));
             Tbotella5LR += countArray(parseInt(botella5L['refill_cant']));
              Tbotella5LC += countArray(parseInt(botella5L['canje_cant']));
              Tbotella5LN += countArray(parseInt(botella5L['nuevo_cant']));
Tbotella5LO += countArray(parseInt(botella5L['enobsequio_cant_botella5l']));
        } else {
          Tbotella5L += parseInt(botella5L['total_cant']);
           Tbotella5LR += parseInt(botella5L['refill_cant']);
              Tbotella5LC += parseInt(botella5L['canje_cant']);
              Tbotella5LN += parseInt(botella5L['nuevo_cant']);
              Tbotella5LO += parseInt(botella5L['enobsequio_cant_botella5l']);
        }

        if (Array.isArray(garrafon11L)) {
          Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
           Tgarrafon11LR += countArray(parseInt(garrafon11L['refill_cant']));
              Tgarrafon11LC += countArray(parseInt(garrafon11L['canje_cant']));
              Tgarrafon11LN += countArray(parseInt(garrafon11L['nuevo_cant']));
              Tgarrafon11LO += countArray(parseInt(garrafon11L['enobsequio_cant_garrafon11l']));
      } else {
        Tgarrafon11L += parseInt(garrafon11L['total_cant']);
         Tgarrafon11LR += parseInt(garrafon11L['refill_cant']);
              Tgarrafon11LC += parseInt(garrafon11L['canje_cant']);
              Tgarrafon11LN += parseInt(garrafon11L['nuevo_cant']);
              Tgarrafon11LO += parseInt(garrafon11L['enobsequio_cant_garrafon11l']);
      }


          if (Array.isArray(garrafon19L)) {
            Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
            
         Tgarrafon19LR += countArray(parseInt(garrafon19L['refill_cant']));
              Tgarrafon19LC += countArray(parseInt(garrafon19L['canje_cant']));
              Tgarrafon19LN += countArray(parseInt(garrafon19L['enobsequio_cant_garrafon']));
Tgarrafon19LO += countArray(parseInt(garrafon19L['nuevo_cant']));
        } else {
          Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          
         Tgarrafon19LR += parseInt(garrafon19L['refill_cant']);
              Tgarrafon19LC += parseInt(garrafon19L['canje_cant']);
              Tgarrafon19LN += parseInt(garrafon19L['nuevo_cant']);
              Tgarrafon19LO += parseInt(garrafon19L['enobsequio_cant_garrafon']);
        }

            if (Array.isArray(full[1][i]['danados'])) {
              danados += countArray(parseInt(full[1][i]['danados']));
          } else {
              danados += parseInt(full[1][i]['danados']);
          }

          if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
            garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
        } else {
            garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
        }


        }
        let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)//+parseInt(garrafones_prestamos)
        let totalRefill = parseInt(Tbotella1LR)+parseInt(Tbotella5LR)+parseInt(Tgarrafon11LR)+parseInt(Tgarrafon19LR)
        let totalCanje = parseInt(Tbotella1LC)+parseInt(Tbotella5LC)+parseInt(Tgarrafon11LC)+parseInt(Tgarrafon19LC)
        let totalObsequio = parseInt(Tbotella1LO)+parseInt(Tbotella5LO)+parseInt(Tgarrafon11LO)+parseInt(Tgarrafon19LO)
        let totalNuevo = parseInt(Tbotella1LN)+parseInt(Tbotella5LN)+parseInt(Tgarrafon11LN)+parseInt(Tgarrafon19LN)
         console.log(danados)
        return '<button class="btn btn-primary" data-bs-toggle="modal" data-id="'+total_garrafones+'" data-totalRefill="'+totalRefill+'" data-totalCanje="'+totalCanje+'" data-totalObsequio="'+totalObsequio+'" data-totalNuevo="'+totalNuevo+'" data-totaldanados="'+danados+'" data-garrafones_prestamos="'+garrafones_prestamos+'"data-title="Total Garrafones Detallado de '+data+'"  data-bs-target="#corte_modal">'+data+'</button>'}  },
        { data: '0'},
        { data: '0' },
        { data: '0' },
        { data: '0' },
        { data: '0'},
        { data: '0'},
      ], columnDefs: [
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            let marca="", modelo ="", matricula="", vehiculo ="";
              for (let i = 0; i < full[1].length; i++) {
                marca = full[1][i]['personal']['vehiculo']['marca']
                modelo = full[1][i]['personal']['vehiculo']['modelo']
                matricula = full[1][i]['personal']['vehiculo']['matricula']
            }
            vehiculo = marca +" "+ modelo+" "+ matricula
            return vehiculo;
          }
      },
      {
        // Label
        targets: 2,
        render: function (data, type, full, meta) {
          let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
          let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0, danados=0,garrafones_prestamos=0;
            for (let i = 0; i < full[1].length; i++) {
              botella1L = JSON.parse(full[1][i]['botella1L'])
              botella5L = JSON.parse(full[1][i]['botella5L'])
              garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
              garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
              if (Array.isArray(botella1L)) {
                Tbotella1L += countArray(parseInt(botella1L['total_cant']));
            } else {
              Tbotella1L += parseInt(botella1L['total_cant']);
            }

            if (Array.isArray(botella5L)) {
              Tbotella5L += countArray(parseInt(botella5L['total_cant']));
          } else {
            Tbotella5L += parseInt(botella5L['total_cant']);
          }

          if (Array.isArray(garrafon11L)) {
            Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
        } else {
          Tgarrafon11L += parseInt(garrafon11L['total_cant']);
        }


            if (Array.isArray(garrafon19L)) {
              Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
          } else {
            Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          }

          if (Array.isArray(full[1][i]['danados'])) {
            danados += countArray(parseInt(full[1][i]['danados']));
        } else {
          danados += parseInt(full[1][i]['danados']);
        }

        if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
          garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
      } else {
        garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
      }

          }
          let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)+parseInt(garrafones_prestamos)
          return total_garrafones;
        }
    },
          {
            // Label
            targets: 3,
            render: function (data, type, full, meta) {
              var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Efectivo") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
            }
        },
        {
          
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Transferencia") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Tarjeta") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          
          // Label
          targets: 6,
          render: function (data, type, full, meta) {
            var deuda_ant = 0
              for (let i = 0; i < full[1].length; i++) {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda_ant += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda_ant += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                
            }
            return '$ '+ deuda_ant;
          }
        },
      ],
      order: [[2, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],  
    
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

      $("#corte_modalTitle").text(title);
      $(this).find(".modal-body").html("<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Total Refill: <span class='badge bg-primary rounded-pill'>" + totalrefill +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Canej: <span class='badge bg-primary rounded-pill'>" +totalcanje +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Nuevos: <span class='badge bg-primary rounded-pill'>"+
      totalnuevo+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Obsequio: <span class='badge bg-primary rounded-pill'>"+
      totalObsequio+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Dañados: <span class='badge bg-primary rounded-pill'>"+
      totaldanados+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Prestados: <span class='badge bg-primary rounded-pill'>"+
      garrafones_prestamos+"</span></li><li class='list-group-item list-group-item-primary d-flex justify-content-between align-items-center'>Total General: <span class='badge bg-primary rounded-pill'>"+
      Total_total+"</span></li></ul>");
  });
    // $('div.head-label').html('<h6 class="mb-0">Negocios</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/

  
    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic.draw();
      });
  }
  if (dt_negocio.length) {
    $('.dt-column-searchNegocio thead tr').clone(true).appendTo('.dt-column-searchNegocio thead');
    $('.dt-column-searchNegocio thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic_N.column(i).search() !== this.value) {
          dt_basic_N.column(i).search(this.value).draw();
        }
      });
    });
    var dt_basic_N = dt_negocio.DataTable({
      data: ArrayNegocio,
     columns: [
      { data: '0',render: function (data, type, full, meta) {
        console.log(full[1])
        let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
        let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0;
        let Tbotella1LR=0, Tbotella5LR =0, Tgarrafon11LR=0, Tgarrafon19LR =0;
        let Tbotella1LC=0, Tbotella5LC =0, Tgarrafon11LC=0, Tgarrafon19LC =0;
        let Tbotella1LN=0, Tbotella5LN =0, Tgarrafon11LN=0, Tgarrafon19LN =0;
        let Tbotella1LO=0, Tbotella5LO =0, Tgarrafon11LO=0, Tgarrafon19LO =0;        
        let danados = 0, garrafones_prestamos=0;
          for (let i = 0; i < full[1].length; i++) {
            botella1L = JSON.parse(full[1][i]['botella1L'])
            botella5L = JSON.parse(full[1][i]['botella5L'])
            garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
            garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
            console.log(botella1L)
            if (Array.isArray(botella1L)) {
              Tbotella1L += countArray(parseInt(botella1L['total_cant']));
              Tbotella1LR += countArray(parseInt(botella1L['refill_cant']));
              Tbotella1LC += countArray(parseInt(botella1L['canje_cant']));
              Tbotella1LN += countArray(parseInt(botella1L['nuevo_cant']));
              Tbotella1LO += countArray(parseInt(botella1L['enobsequio_cant_botella']));

          } else {
            Tbotella1L += parseInt(botella1L['total_cant']);
            Tbotella1LR += parseInt(botella1L['refill_cant']);
            Tbotella1LC += parseInt(botella1L['canje_cant']);
            Tbotella1LN += parseInt(botella1L['nuevo_cant']);
            Tbotella1LO += parseInt(botella1L['enobsequio_cant_botella']);
          }

          if (Array.isArray(botella5L)) {
            Tbotella5L += countArray(parseInt(botella5L['total_cant']));
             Tbotella5LR += countArray(parseInt(botella5L['refill_cant']));
              Tbotella5LC += countArray(parseInt(botella5L['canje_cant']));
              Tbotella5LN += countArray(parseInt(botella5L['nuevo_cant']));
Tbotella5LO += countArray(parseInt(botella5L['enobsequio_cant_botella5l']));
        } else {
          Tbotella5L += parseInt(botella5L['total_cant']);
           Tbotella5LR += parseInt(botella5L['refill_cant']);
              Tbotella5LC += parseInt(botella5L['canje_cant']);
              Tbotella5LN += parseInt(botella5L['nuevo_cant']);
              Tbotella5LO += parseInt(botella5L['enobsequio_cant_botella5l']);
        }

        if (Array.isArray(garrafon11L)) {
          Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
           Tgarrafon11LR += countArray(parseInt(garrafon11L['refill_cant']));
              Tgarrafon11LC += countArray(parseInt(garrafon11L['canje_cant']));
              Tgarrafon11LN += countArray(parseInt(garrafon11L['nuevo_cant']));
              Tgarrafon11LO += countArray(parseInt(garrafon11L['enobsequio_cant_garrafon11l']));
      } else {
        Tgarrafon11L += parseInt(garrafon11L['total_cant']);
         Tgarrafon11LR += parseInt(garrafon11L['refill_cant']);
              Tgarrafon11LC += parseInt(garrafon11L['canje_cant']);
              Tgarrafon11LN += parseInt(garrafon11L['nuevo_cant']);
              Tgarrafon11LO += parseInt(garrafon11L['enobsequio_cant_garrafon11l']);
      }


          if (Array.isArray(garrafon19L)) {
            Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
            
         Tgarrafon19LR += countArray(parseInt(garrafon19L['refill_cant']));
              Tgarrafon19LC += countArray(parseInt(garrafon19L['canje_cant']));
              Tgarrafon19LN += countArray(parseInt(garrafon19L['enobsequio_cant_garrafon']));
Tgarrafon19LO += countArray(parseInt(garrafon19L['nuevo_cant']));
        } else {
          Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          
         Tgarrafon19LR += parseInt(garrafon19L['refill_cant']);
              Tgarrafon19LC += parseInt(garrafon19L['canje_cant']);
              Tgarrafon19LN += parseInt(garrafon19L['nuevo_cant']);
              Tgarrafon19LO += parseInt(garrafon19L['enobsequio_cant_garrafon']);
        }

            if (Array.isArray(full[1][i]['danados'])) {
              danados += countArray(parseInt(full[1][i]['danados']));
          } else {
              danados += parseInt(full[1][i]['danados']);
          }

          if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
            garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
        } else {
            garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
        }


        }
        let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)//+parseInt(garrafones_prestamos)
        let totalRefill = parseInt(Tbotella1LR)+parseInt(Tbotella5LR)+parseInt(Tgarrafon11LR)+parseInt(Tgarrafon19LR)
        let totalCanje = parseInt(Tbotella1LC)+parseInt(Tbotella5LC)+parseInt(Tgarrafon11LC)+parseInt(Tgarrafon19LC)
        let totalObsequio = parseInt(Tbotella1LO)+parseInt(Tbotella5LO)+parseInt(Tgarrafon11LO)+parseInt(Tgarrafon19LO)
        let totalNuevo = parseInt(Tbotella1LN)+parseInt(Tbotella5LN)+parseInt(Tgarrafon11LN)+parseInt(Tgarrafon19LN)
         console.log(danados)
        return '<button class="btn btn-primary" data-bs-toggle="modal" data-id="'+total_garrafones+'" data-totalRefill="'+totalRefill+'" data-totalCanje="'+totalCanje+'" data-totalObsequio="'+totalObsequio+'" data-totalNuevo="'+totalNuevo+'" data-totaldanados="'+danados+'" data-garrafones_prestamos="'+garrafones_prestamos+'"data-title="Total Garrafones Detallado de '+data+'"  data-bs-target="#corte_modal">'+data+'</button>'}  },
        { data: '0'},
        { data: '0' },
        { data: '0' },
        { data: '0' },
        { data: '0'},
        { data: '0'},
      ], columnDefs: [
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            let marca="", modelo ="", matricula="", vehiculo ="";
              for (let i = 0; i < full[1].length; i++) {
                marca = full[1][i]['personal']['vehiculo']['marca']
                modelo = full[1][i]['personal']['vehiculo']['modelo']
                matricula = full[1][i]['personal']['vehiculo']['matricula']
            }
            vehiculo = marca + " " + modelo + " " + matricula
            return vehiculo;
          }
      },
      {
        // Label
        targets: 2,
        render: function (data, type, full, meta) {
          let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
          let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0, danados=0,garrafones_prestamos=0;
            for (let i = 0; i < full[1].length; i++) {
              botella1L = JSON.parse(full[1][i]['botella1L'])
              botella5L = JSON.parse(full[1][i]['botella5L'])
              garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
              garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
              if (Array.isArray(botella1L)) {
                Tbotella1L += countArray(parseInt(botella1L['total_cant']));
            } else {
              Tbotella1L += parseInt(botella1L['total_cant']);
            }

            if (Array.isArray(botella5L)) {
              Tbotella5L += countArray(parseInt(botella5L['total_cant']));
          } else {
            Tbotella5L += parseInt(botella5L['total_cant']);
          }

          if (Array.isArray(garrafon11L)) {
            Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
        } else {
          Tgarrafon11L += parseInt(garrafon11L['total_cant']);
        }


            if (Array.isArray(garrafon19L)) {
              Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
          } else {
            Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          }

          if (Array.isArray(full[1][i]['danados'])) {
            danados += countArray(parseInt(full[1][i]['danados']));
        } else {
          danados += parseInt(full[1][i]['danados']);
        }

        if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
          garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
      } else {
        garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
      }

          }
          let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)+parseInt(garrafones_prestamos)
          return total_garrafones;
        }
    },
          {
            // Label
            targets: 3,
            render: function (data, type, full, meta) {
              var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Efectivo") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
            }
        },
        {
          
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Transferencia") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Tarjeta") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          
          // Label
          targets: 6,
          render: function (data, type, full, meta) {
            var deuda_ant = 0
              for (let i = 0; i < full[1].length; i++) {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda_ant += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda_ant += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                
            }
            return '$ '+ deuda_ant;
          }
        },
      ],
      order: [[2, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],  
    
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

      $("#corte_modalTitle").text(title);
      $(this).find(".modal-body").html("<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Total Refill: <span class='badge bg-primary rounded-pill'>" + totalrefill +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Canej: <span class='badge bg-primary rounded-pill'>" +totalcanje +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Nuevos: <span class='badge bg-primary rounded-pill'>"+
      totalnuevo+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Obsequio: <span class='badge bg-primary rounded-pill'>"+
      totalObsequio+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Dañados: <span class='badge bg-primary rounded-pill'>"+
      totaldanados+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Prestados: <span class='badge bg-primary rounded-pill'>"+
      garrafones_prestamos+"</span></li><li class='list-group-item list-group-item-primary d-flex justify-content-between align-items-center'>Total General: <span class='badge bg-primary rounded-pill'>"+
      Total_total+"</span></li></ul>");
  });
    // $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/

  
    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic.draw();
      });
  }
if (dt_PuntoVenta.length) {
    $('.dt-column-searchPuntoVenta thead tr').clone(true).appendTo('.dt-column-searchPuntoVenta thead');
    $('.dt-column-searchPuntoVenta thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic_PV.column(i).search() !== this.value) {
          dt_basic_PV.column(i).search(this.value).draw();
        }
      });
    });
    var dt_basic_PV= dt_PuntoVenta.DataTable({
      data: ArrayPuntoVenta,
     columns: [
      { data: '0',render: function (data, type, full, meta) {
        console.log(full[1])
        let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
        let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0;
        let Tbotella1LR=0, Tbotella5LR =0, Tgarrafon11LR=0, Tgarrafon19LR =0;
        let Tbotella1LC=0, Tbotella5LC =0, Tgarrafon11LC=0, Tgarrafon19LC =0;
        let Tbotella1LN=0, Tbotella5LN =0, Tgarrafon11LN=0, Tgarrafon19LN =0;
        let Tbotella1LO=0, Tbotella5LO =0, Tgarrafon11LO=0, Tgarrafon19LO =0;        
        let danados = 0, garrafones_prestamos=0;
          for (let i = 0; i < full[1].length; i++) {
            botella1L = JSON.parse(full[1][i]['botella1L'])
            botella5L = JSON.parse(full[1][i]['botella5L'])
            garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
            garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
            console.log(botella1L)
            if (Array.isArray(botella1L)) {
              Tbotella1L += countArray(parseInt(botella1L['total_cant']));
              Tbotella1LR += countArray(parseInt(botella1L['refill_cant']));
              Tbotella1LC += countArray(parseInt(botella1L['canje_cant']));
              Tbotella1LN += countArray(parseInt(botella1L['nuevo_cant']));
              Tbotella1LO += countArray(parseInt(botella1L['enobsequio_cant_botella']));

          } else {
            Tbotella1L += parseInt(botella1L['total_cant']);
            Tbotella1LR += parseInt(botella1L['refill_cant']);
            Tbotella1LC += parseInt(botella1L['canje_cant']);
            Tbotella1LN += parseInt(botella1L['nuevo_cant']);
            Tbotella1LO += parseInt(botella1L['enobsequio_cant_botella']);
          }

          if (Array.isArray(botella5L)) {
            Tbotella5L += countArray(parseInt(botella5L['total_cant']));
             Tbotella5LR += countArray(parseInt(botella5L['refill_cant']));
              Tbotella5LC += countArray(parseInt(botella5L['canje_cant']));
              Tbotella5LN += countArray(parseInt(botella5L['nuevo_cant']));
Tbotella5LO += countArray(parseInt(botella5L['enobsequio_cant_botella5l']));
        } else {
          Tbotella5L += parseInt(botella5L['total_cant']);
           Tbotella5LR += parseInt(botella5L['refill_cant']);
              Tbotella5LC += parseInt(botella5L['canje_cant']);
              Tbotella5LN += parseInt(botella5L['nuevo_cant']);
              Tbotella5LO += parseInt(botella5L['enobsequio_cant_botella5l']);
        }

        if (Array.isArray(garrafon11L)) {
          Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
           Tgarrafon11LR += countArray(parseInt(garrafon11L['refill_cant']));
              Tgarrafon11LC += countArray(parseInt(garrafon11L['canje_cant']));
              Tgarrafon11LN += countArray(parseInt(garrafon11L['nuevo_cant']));
              Tgarrafon11LO += countArray(parseInt(garrafon11L['enobsequio_cant_garrafon11l']));
      } else {
        Tgarrafon11L += parseInt(garrafon11L['total_cant']);
         Tgarrafon11LR += parseInt(garrafon11L['refill_cant']);
              Tgarrafon11LC += parseInt(garrafon11L['canje_cant']);
              Tgarrafon11LN += parseInt(garrafon11L['nuevo_cant']);
              Tgarrafon11LO += parseInt(garrafon11L['enobsequio_cant_garrafon11l']);
      }


          if (Array.isArray(garrafon19L)) {
            Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
            
         Tgarrafon19LR += countArray(parseInt(garrafon19L['refill_cant']));
              Tgarrafon19LC += countArray(parseInt(garrafon19L['canje_cant']));
              Tgarrafon19LN += countArray(parseInt(garrafon19L['enobsequio_cant_garrafon']));
Tgarrafon19LO += countArray(parseInt(garrafon19L['nuevo_cant']));
        } else {
          Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          
         Tgarrafon19LR += parseInt(garrafon19L['refill_cant']);
              Tgarrafon19LC += parseInt(garrafon19L['canje_cant']);
              Tgarrafon19LN += parseInt(garrafon19L['nuevo_cant']);
              Tgarrafon19LO += parseInt(garrafon19L['enobsequio_cant_garrafon']);
        }

            if (Array.isArray(full[1][i]['danados'])) {
              danados += countArray(parseInt(full[1][i]['danados']));
          } else {
              danados += parseInt(full[1][i]['danados']);
          }

          if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
            garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
        } else {
            garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
        }


        }
        let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)//+parseInt(garrafones_prestamos)
        let totalRefill = parseInt(Tbotella1LR)+parseInt(Tbotella5LR)+parseInt(Tgarrafon11LR)+parseInt(Tgarrafon19LR)
        let totalCanje = parseInt(Tbotella1LC)+parseInt(Tbotella5LC)+parseInt(Tgarrafon11LC)+parseInt(Tgarrafon19LC)
        let totalObsequio = parseInt(Tbotella1LO)+parseInt(Tbotella5LO)+parseInt(Tgarrafon11LO)+parseInt(Tgarrafon19LO)
        let totalNuevo = parseInt(Tbotella1LN)+parseInt(Tbotella5LN)+parseInt(Tgarrafon11LN)+parseInt(Tgarrafon19LN)
         console.log(danados)
        return '<button class="btn btn-primary" data-bs-toggle="modal" data-id="'+total_garrafones+'" data-totalRefill="'+totalRefill+'" data-totalCanje="'+totalCanje+'" data-totalObsequio="'+totalObsequio+'" data-totalNuevo="'+totalNuevo+'" data-totaldanados="'+danados+'" data-garrafones_prestamos="'+garrafones_prestamos+'"data-title="Total Garrafones Detallado de '+data+'"  data-bs-target="#corte_modal">'+data+'</button>'}  },
        { data: '0'},
        { data: '0' },
        { data: '0' },
        { data: '0' },
        { data: '0'},
        { data: '0'},
      ], columnDefs: [
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            let marca="", modelo ="", matricula="", vehiculo ="";
              for (let i = 0; i < full[1].length; i++) {
                marca = full[1][i]['personal']['vehiculo']['marca']
                modelo = full[1][i]['personal']['vehiculo']['modelo']
                matricula = full[1][i]['personal']['vehiculo']['matricula']
            }
            vehiculo = marca + " " + modelo + " " + matricula
            return vehiculo;
          }
      },
      {
        // Label
        targets: 2,
        render: function (data, type, full, meta) {
          let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
          let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0, danados=0,garrafones_prestamos=0
            for (let i = 0; i < full[1].length; i++) {
              botella1L = JSON.parse(full[1][i]['botella1L'])
              botella5L = JSON.parse(full[1][i]['botella5L'])
              garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
              garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
              if (Array.isArray(botella1L)) {
                Tbotella1L += countArray(parseInt(botella1L['total_cant']));
            } else {
              Tbotella1L += parseInt(botella1L['total_cant']);
            }

            if (Array.isArray(botella5L)) {
              Tbotella5L += countArray(parseInt(botella5L['total_cant']));
          } else {
            Tbotella5L += parseInt(botella5L['total_cant']);
          }

          if (Array.isArray(garrafon11L)) {
            Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
        } else {
          Tgarrafon11L += parseInt(garrafon11L['total_cant']);
        }


            if (Array.isArray(garrafon19L)) {
              Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
          } else {
            Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          }
          if (Array.isArray(full[1][i]['danados'])) {
            danados += countArray(parseInt(full[1][i]['danados']));
        } else {
          danados += parseInt(full[1][i]['danados']);
        }

        if (Array.isArray(full[1][i]['garrafones_prestamos'])) {
          garrafones_prestamos += countArray(parseInt(full[1][i]['garrafones_prestamos']));
      } else {
        garrafones_prestamos += parseInt(full[1][i]['garrafones_prestamos']);
      }

          }
          let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)+parseInt(danados)+parseInt(garrafones_prestamos)
          return total_garrafones;
        }
    },
          {
            // Label
            targets: 3,
            render: function (data, type, full, meta) {
              var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Efectivo") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
            }
        },
        {
          
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Transferencia") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            var suma = 0, deuda = 0
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Tarjeta") {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }

                }
                
            }
            let total = parseInt(suma) + parseInt(deuda)
                console.log(total)
            return '$ '+ total;
          }
        },
        {
          
          // Label
          targets: 6,
          render: function (data, type, full, meta) {
            var deuda_ant = 0
              for (let i = 0; i < full[1].length; i++) {
                  console.log(full[1][i]['deuda_anterior'])
                  if (full[1][i]['deuda_anterior'] != "0") {
                    if (Array.isArray(full[1][i]['deuda_anterior'])) {
                      deuda_ant += countArray(parseInt(full[1][i]['deuda_anterior']));
                  } else {
                      deuda_ant += parseInt(full[1][i]['deuda_anterior']);
                  }
                  }
                
            }
            return '$ '+ deuda_ant;
          }
        },
      ],
      order: [[2, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],  
    
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

      $("#corte_modalTitle").text(title);
      $(this).find(".modal-body").html("<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Total Refill: <span class='badge bg-primary rounded-pill'>" + totalrefill +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Canej: <span class='badge bg-primary rounded-pill'>" +totalcanje +"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Nuevos: <span class='badge bg-primary rounded-pill'>"+
      totalnuevo+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Obsequio: <span class='badge bg-primary rounded-pill'>"+
      totalObsequio+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Dañados: <span class='badge bg-primary rounded-pill'>"+
      totaldanados+"</span></li><li class='list-group-item d-flex justify-content-between align-items-center'>Total Prestados: <span class='badge bg-primary rounded-pill'>"+
      garrafones_prestamos+"</span></li><li class='list-group-item list-group-item-primary d-flex justify-content-between align-items-center'>Total General: <span class='badge bg-primary rounded-pill'>"+
      Total_total+"</span></li></ul>");
  });
    // $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/

  
    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic.draw();
      });
  }

  
  // Flat Date picker
  if (dt_date_table.length) {
    dt_date_table.flatpickr({
      monthSelectorType: 'static',
      dateFormat: 'm/d/Y'
    });
  }

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