var tabla_seguimiento1_2 = $('.datatables-seguimiento1_2'),
tabla_seguimiento3_5 = $('.datatables-seguimiento3_5'),
tabla_seguimiento6_12 = $('.datatables-seguimiento6_12'),
 //basic_used_cupons = $('.datatables-basic_notificaciones_usados'),
   dt_date_table = $('.dt-date'),
   assetPath = '../../dataPY4/';
function tablanotif1_2(editada) {

  let valor_seguimiento1 = $('#notif1_2').val()
  let array_seguimiento = ""
  if (editada) {
    
    array_seguimiento = JSON.parse(valor_seguimiento1)

  }else{
    array_seguimiento = JSON.parse(valor_seguimiento1.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  // DataTable with buttons
  // --------------------------------------------------------------------
 
  if (tabla_seguimiento1_2.length) {
    console.log(array_seguimiento)
    var seguimiento1_2 = tabla_seguimiento1_2.DataTable({
      data: array_seguimiento,
      columns: [

        { data: 'nombre_cliente' },
        { data: 'id_pedido' }, 
        { data: 'total_g' },
        { data: 'fecha_' },
        { data: 'tiempo_desde' },
      ],
      columnDefs: [
        {
          // Avatar image/badge, Name and post
          targets: 0,
          render: function (data, type, full, meta) {
console.log(full)
let nombre = full['nombre_cliente']+ " " + full['apellido_cliente']+ " / "+ full['asentamiento']

        //aqui activa el modal info del cliente
            return nombre;
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 3,
          render: function (data, type, full, meta) {

            return moment(data).format('L');
          }
        },
      ],
      order: [[1, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><"none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 5,
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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }

}
function tablanotif3_5(editada) {

  let valor_seguimiento3_5 = $('#notif3_5').val()
  let array_seguimiento = ""
  if (editada) {
    
    array_seguimiento = JSON.parse(valor_seguimiento3_5)

  }else{
    array_seguimiento = JSON.parse(valor_seguimiento3_5.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  // DataTable with buttons
  // --------------------------------------------------------------------
 
  if (tabla_seguimiento3_5.length) {
    console.log(array_seguimiento)
    var seguimiento3_5 = tabla_seguimiento3_5.DataTable({
      data: array_seguimiento,
      columns: [
        { data: 'nombre_cliente' },
        { data: 'id_pedido' }, 
        { data: 'total_g' },
        { data: 'fecha_' },
        { data: 'tiempo_desde' },
      ],
      columnDefs: [
        {
          // Avatar image/badge, Name and post
          targets: 0,
          render: function (data, type, full, meta) {
console.log(full)
let nombre = full['nombre_cliente']+ " " + full['apellido_cliente']+ " / "+ full['asentamiento']

        //aqui activa el modal info del cliente
            return nombre;
          }
        },
         
        {
          // Avatar image/badge, Name and post
          targets: 3,
          render: function (data, type, full, meta) {

            return moment(data).format('L');
          }
        },
      ],
      order: [[1, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><"none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 5,
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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }

}
function tablanotif6_12(editada) {

  let valor_seguimiento6_12 = $('#notif6_12').val()
  let array_seguimiento = ""
  if (editada) {
    
    array_seguimiento = JSON.parse(valor_seguimiento6_12)

  }else{
    array_seguimiento = JSON.parse(valor_seguimiento6_12.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  // DataTable with buttons
  // --------------------------------------------------------------------
 
  if (tabla_seguimiento6_12.length) {
    console.log(array_seguimiento)
    var seguimiento6_12 = tabla_seguimiento6_12.DataTable({
      data: array_seguimiento,
      columns: [
        
        { data: 'nombre_cliente' },
        { data: 'id_pedido' }, 
        { data: 'total_g' },
        { data: 'fecha_' },
        { data: 'tiempo_desde' },
      ],
      columnDefs: [
        {
          // Avatar image/badge, Name and post
          targets: 0,
          render: function (data, type, full, meta) {
console.log(full)
let nombre = full['nombre_cliente']+ " " + full['apellido_cliente']+ " / "+ full['asentamiento']

        //aqui activa el modal info del cliente
            return nombre;
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 3,
          render: function (data, type, full, meta) {

            return moment(data).format('L');
          }
        },
      ],
      order: [[1, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><"none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 5,
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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }

}
 $(function () {
  'use strict';
  tablanotif1_2()
  tablanotif3_5()
  tablanotif6_12()
  // Add New record
  // ? Remove/Update this code as per your requirements ?
  var count = 101;

  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

});
