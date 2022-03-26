/**
 * DataTables Advanced
 */

 'use strict';


 

 function cargaTableResumen(rechar) {
    
  let valor = $('#carga_').val()
  let valor_pedido = $('#array_pedido').val()
  let array_resumen_carga = "", array_pedido
  if (rechar) {
    
    array_resumen_carga = JSON.parse(valor)
    array_pedido = JSON.parse(valor_pedido)
  }else{
    array_resumen_carga = JSON.parse(valor.replace(/&quot;/g,'"'))
    array_pedido = JSON.parse(valor_pedido.replace(/&quot;/g,'"'))
  }
  let codigosP = $('#array_cp').val()
 let hoy = moment().format('YYYY-MM-DD')
  let pedidos_resumen = array_pedido.filter(status => status.status_pedido == "En proceso" && status.fecha_pedido == hoy|| status.status_pedido == "Rezagado" && status.fecha_pedido == hoy || status.status_pedido == "Por entregar" && status.fecha_pedido == hoy || status.status_pedido == "Devuelto" && status.fecha_pedido == hoy || status.status_pedido == "Reprogramado" && status.fecha_pedido == hoy);
  let pedidos_entregados = array_pedido.filter(status => status.status_pedido == "Entregado" && status.fecha_pedido == hoy ); // return implicito
  console.log(array_resumen_carga)
  console.log(pedidos_resumen)
  console.log(pedidos_entregados)
  var dt_table_resumen = $('.datatables-resumen');

  // DataTable with buttons
  // --------------------------------------------------------------------
  var groupColumn = 4;
  if (dt_table_resumen.length) {
    $('.dt-column-search_resumen thead tr').clone(true).appendTo('.dt-column-search_resumen thead');
    $('.dt-column-search_resumen thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_table_resumenN.column(i).search() !== this.value) {
          dt_table_resumenN.column(i).search(this.value).draw();
        }
      });
    });
    $('.select_chofer_pedidos').on('change', function(){
console.log(this.value)
      dt_table_resumenN.column(4).search(this.value).draw();   
   });
   $('.select_etiqueta_pedidos').on('change', function(){
 
    dt_table_resumenN.search(this.value).draw();   
 });
    var dt_table_resumenN = dt_table_resumen.DataTable({
      data: array_resumen_carga,
      columns: [
        { data: 'recarga' },
        { data: 'recarga' },
        { data: 'recarga' },
        { data: 'recarga' },
        { data: 'personal.name' },
      ], columnDefs: [
        { visible: false, targets: groupColumn,
         
        },
        {
          targets: 0,
          render:function(data, type, full, meta){
            var recarga_arr = encodeURIComponent(JSON.stringify(full['Recargas']));
            return (
             `<span class="badge rounded-pill badge-light-info hover_recarga" style="cursor:pointer;"   data-arrayrecarga="${recarga_arr}" data-cargainicial="${full['cantidad_inicial']}">
              ${data} </span></i>`
            );
          }
        },
        { targets: 1, render: function (data, type, full) {
          let suma =0,suma_entregados = 0
          for (let i = 0; i < pedidos_resumen.length; i++) {
            if (pedidos_resumen[i]['personalId'] == full['personalId']) {
              suma += parseInt(pedidos_resumen[i]['total_garrafones_pedido'])
              
            }
            
          }
          for (let i = 0; i < pedidos_entregados.length; i++) {
            if (pedidos_entregados[i]['personalId'] == full['personalId']) {
              suma_entregados+= parseInt(pedidos_entregados[i]['total_garrafones_pedido'])              
            }
            
          }
          suma = suma
          return suma
        },
         
        },
        { targets: 2, render: function (data, type, full) {
          let suma_entregados = 0
          for (let i = 0; i < pedidos_entregados.length; i++) {
            if (pedidos_entregados[i]['personalId'] == full['personalId']) {
              suma_entregados += parseInt(pedidos_entregados[i]['total_garrafones_pedido'])              
            }
            
          }
          return  suma_entregados

        },
         
        },
        { targets: 3, render: function (data, type, full) {
          let resto =0,suma_entregados=0, suma=0;
          for (let i = 0; i < pedidos_resumen.length; i++) {
            if (pedidos_resumen[i]['personalId'] == full['personalId']) {
              suma += parseInt(pedidos_resumen[i]['total_garrafones_pedido'])              
            }
            
          }
          for (let i = 0; i < pedidos_entregados.length; i++) {
            if (pedidos_entregados[i]['personalId'] == full['personalId']) {
              suma_entregados+= parseInt(pedidos_entregados[i]['total_garrafones_pedido'])              
            }
            
          }
          resto = suma > suma_entregados ? suma - suma_entregados : suma_entregados - suma;//suma- suma_entregados
          return resto
        },
         
        },
      ],
     
      order: [[0, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before('<tr class="group"><td colspan="8"><i class="fas fa-truck me-1"></i>                ' + group + '</td></tr>');//AQUI LOS CHOFERES AGRUPADOS

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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/


    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_table_resumenN.draw();
      });
  }
}

 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  cargaTableResumen()
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  //ACA SE ACTIVAS LOS CONTEXT MENU

$.contextMenu({
  selector: '.hover_recarga',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    console.log(e)
    var Recargas = e.currentTarget['dataset']["arrayrecarga"];
    var carga_inicial = e.currentTarget['dataset']["cargainicial"];
    var my_object = JSON.parse(decodeURIComponent(Recargas));
     var items1 = {"Carga inicial": {name: `Carga inicial =  ${carga_inicial}`}}
    for (let i = 0; i < my_object.length; i++) {
      var newUser = "Recarga" + i;
      items1[newUser] = {name: `Recargó ${i+1}º =  ${my_object[i]['recarga']}`}
    }
      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
              console.log(m);
          },
          items: 
          items1
          
      };
  }
})



  // Responsive Table
  // --------------------------------------------------------------------


  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

 


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