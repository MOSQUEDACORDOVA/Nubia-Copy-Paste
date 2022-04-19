/**
 * DataTables Advanced
 */

 'use strict';
 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate, maxDate,minDate2, maxDate2;
 var zonas, copyReady;

 // Custom filtering function which will search data in column four between two values
//  $.fn.dataTable.ext.search.push(
//      function( settings, data, dataIndex ) {
//          var min = minDate.val();
//          var max = maxDate.val();
       

//      let f = data[9]
    
//          var date = new Date(f);
//          if (
//              ( min === null && max === null ) ||
//              ( min === null && date <= max ) ||
//              ( min <= date   && max === null ) ||
//              ( min <= date   && date <= max ) 
//          ) {
//              return true;
//          }
//          return false;
//      }
//  );
 
 
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
       let f = aData[10]       
       let fechaN = f.split('-')       
       var date1 = moment(fechaN[1],'DD/MM/YYYY').format('MM/DD/YYYY')//new Date(fechaN[1]);
       var date = new Date(date1);
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
 async function cargaTablas(rechar) {
zonas =await  fetch('/obtenerzonaspy4')
.then(response => response.json())
.then(data => {
    return data.zonas
});
  let valor = $('#array_pedido').val()
  let array2 = ""
  if (rechar) {    
    array2 = JSON.parse(valor)
  }else{
    array2 = JSON.parse(valor.replace(/&quot;/g,'"'))
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
  //let stproductos = JSON.parse(array.productos)
  let status_pedido = array2.filter(status => status.status_pedido == "En proceso" || status.status_pedido == "Reprogramado" || status.status_pedido == "Por entregar" || status.status_pedido == "Devuelto"); // return implicito
  let status_pedido2 = array2.filter(status => status.status_pedido == "Entregado" || status.status_pedido == "Reasignado" || status.status_pedido == "Cancelado"); // return implicito
  var dt_basic_table = $('.datatables-basic'),
    dt_date_table = $('.dt-date'),
    dt_basic_table2 = $('.datatables-basic2'),
    dt_adv_filter_table = $('.datatables-basic'),
    dt_row_grouping_table = $('.dt-row-grouping'),
    dt_multilingual_table = $('.dt-multilingual'),
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
  let groupColumn = 12;
  if (dt_basic_table.length) {
    $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
    $('.dt-column-search thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" id="P'+title+i+'"/>');
      $('input', this).on('keyup', function () {
        let valor = this.value
$('#filterPosition').val(this.id)
$('#filterValue').val(this.value)
        if (dt_basic.column(i).search() !== this.value) {

          dt_basic.column(i).search(this.value).draw();
        }else{
          dt_basic.column(i).search(valor).draw();
          
        }
      });
    });
    $('.select_chofer_pedidos').on('change', function(){

      dt_basic.column(12).search(this.value).draw();   
   });
   $('.select_etiqueta_pedidos').on('change', function(){
    dt_basic.search(this.value).draw();   
 });

copyReady= await fetch("/shareStatusPY4/")
  .then((response) => response.json())
  .then((data) => {
    return data.findStatusCompartir;
  });

    var dt_basic = dt_basic_table.DataTable({
      data: status_pedido,
      columns: [
        { data: 'id' },
        { data: 'id' },
        { data: 'sucursaleId' },
        { data: 'cliente.firstName' },
        { data: 'total_garrafones_pedido' },
        { data: 'monto_total'}, // used for sorting so will hide this column
        { data: 'deuda_anterior'},
        { data: 'status_pedido' },
        { data: 'status_pago' },
        { data: 'metodo_pago' },
        { data: 'fecha_pedido'},
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            
            let rf= parseInt((JSON.parse(full['botella1L']))['refill_cant'])+parseInt((JSON.parse(full['botella5L']))['refill_cant'])+parseInt((JSON.parse(full['garrafon11L']))['refill_cant'])+parseInt((JSON.parse(full['garrafon19L']))['refill_cant'])
            let CJ= parseInt((JSON.parse(full['botella1L']))['canje_cant'])+parseInt((JSON.parse(full['botella5L']))['canje_cant'])+parseInt((JSON.parse(full['garrafon11L']))['canje_cant'])+parseInt((JSON.parse(full['garrafon19L']))['canje_cant'])
            let Env= parseInt((JSON.parse(full['botella1L']))['nuevo_cant'])+parseInt((JSON.parse(full['botella5L']))['nuevo_cant'])+parseInt((JSON.parse(full['garrafon11L']))['nuevo_cant'])+parseInt((JSON.parse(full['garrafon19L']))['nuevo_cant'])
            let asentamiento = ""
for (let i = 0; i < codigosP_arr.length; i++) {
  if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
    asentamiento = codigosP_arr[i]['asentamiento']
  }
  
}
if ($('#otro_rol').length>0) {
let Hoy = moment().format('DD/MM/YYYY'); 
let fecha =moment(full['fecha_pedido']).format('DD/MM/YYYY')
    var fecha_final= moment(Hoy).isAfter(fecha); // true        
} 
let modif = "";
if (fecha_final == true) {
  modif = "d-none";
}
let styleCopy = "";
for (let i = 0; i < copyReady.length; i++) {
  if (full['id'] == copyReady[i]['idPedido'] && moment().isSame(moment(copyReady[i]['createdAt']),'d')) {
    styleCopy = "style='background-color: #001871; color: white;'";
  }
  
}
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record'+full['id']+'" onclick=\'delete_pedido("'+full['id']+'",".datatables-basic")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item '+modif+'" onclick=\'edit_pedido("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
              '<a href="javascript:;" '+styleCopy+' class="'+full['id']+' dropdown-item share_record'+full['id']+'" onclick=\'share_record("'+full['id']+'")\'>' +
              feather.icons['share-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
             `<p id="CopyPedido${full['id']}" class="d-none">
--------------------------------------------------------------
#Pedido:${full['id']} -
Cliente:  ${full['cliente']['firstName']} ${full['cliente']['lastName']}.
Dirección: ${asentamiento}, Coto ${full['cliente']['coto']}, Casa ${full['cliente']['casa']},Calle ${full['cliente']['calle']}, Avenida ${full['cliente']['avenida']}.
Referencia:${full['cliente']['referencia']}.
Rf:${rf}.
CJ: ${CJ}.
Env: ${Env}.
Tipo Pago:${full['metodo_pago']}
Deuda anterior: ${full['deuda_anterior']}
Garrafones prestados: ${full['garrafones_prestamos']}
Observaciones:${full['observacion']}
</p>`  
            );
          }, 
        },
        { data: 'personal.name' },
        { data: 'cliente.cpId' },
      ], columnDefs: [
        { visible: false, targets: groupColumn,
        },
        {
          // For Checkboxes
          targets: 0,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return (
              '<div class="form-check"> <input class="form-check-input dt-checkboxes" type="checkbox" value="'+data+'" id="checkbox' +
              data +
              '" /><label class="form-check-label" for="checkbox' +
              data +
              '"></label></div>'
            );
          },
          checkboxes: {
            selectAllRender:
              '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>'
          }
        },
        { visible: false, targets: 13,
          render: function (data, type, full) {
            let asentamiento = ""
            for (let i = 0; i < codigosP_arr.length; i++) {
              if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
                asentamiento = codigosP_arr[i]['asentamiento']
              }
              
            }
            return asentamiento
          }
         
        },
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            var color_tag ="", color_text="", nombre;
            if (full['cliente']['etiqueta'] ==null) {
              color_tag =0
              color_text="black"
              nombre=""
            }else{
              color_tag =full['cliente']['etiqueta']['color']
              color_text="white"
              nombre=full['cliente']['etiqueta']['etiquetas']
            }
            return (`<span class="d-none">${nombre}</span><span class="badge rounded-pill " style="cursor:pointer; background-color: ${color_tag}; color:${color_text}"> ${full['id']}</span>`);
          }
        },
        {
          // Label
          targets: 2,
          render: function (data, type, full, meta) {
            
            for (let i = 0; i < zonas.length; i++) {
              if (zonas[i].id == data) {
                var zona_arr = encodeURIComponent(JSON.stringify(zonas[i]));       
              }                     
            }
            return (`<span class="zona" style="cursor:pointer;" data-arrzona="${zona_arr}">${data}</span>`);
          }
        },
        {
          // Label
          targets: 3,
          render: function (data, type, full, meta) {
            let asentamiento = ""
            for (let i = 0; i < codigosP_arr.length; i++) {
              if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
                asentamiento = codigosP_arr[i]['asentamiento']
              }
              
            }
       
            var $status_number = full['cliente']['tipo'];
            var $status = {
              "Residencial": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: 'badge-light-info' },
              "Punto de venta": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-success' },
              "Negocio": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-danger' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
        var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
        var color_tag ="", color_text=""
        if (full['cliente']['etiqueta'] ==null) {
          color_tag =0
          color_text="black"
        }else{
          color_tag =full['cliente']['etiqueta']['color']
          color_text="white"
        }
        //aqui activa el modal info del cliente
            return (
              `<span class="d-none">${asentamiento}</span><span class="hover_cliente badge rounded-pill ${$status[$status_number].class}" data-id="${full['cliente']['id']}" data-arraycliente="${cliente_arr}" data-title="Datos de ${full['cliente']['firstName']}" >${$status[$status_number].title}</span><span class="d-none">${full['cliente']['calle']} ${full['cliente']['casa']} ${full['cliente']['avenida']}</span>`
            );
          }
        },
         {
          // Label
          targets: 4,className:'to_garra',
          render: function (data, type, full, meta) {
            let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones cantidad" data-id="'+full['cliente']['id']+'" data-rfeill="'+full['total_refill_pedido']+'" data-total="'+data+'" data-canje="'+full['total_canje_pedido']+'" data-env="'+full['total_nv_pedido']+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-title="Detalle garrafones"  style="cursor:pointer;" >' +
              total +
              '</span>'
            );
          }

        
        },
        {
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            let detailRefill = 0, detailCanje = 0, detailNuevo=0,desc=0,sindesc, condesc=0, adeudo=0
            detailRefill = parseFloat(full['total_refill_pedido'])*35
            if (full['cliente']['tipo']=="Negocio" || full['cliente']['tipo'] =="Punto de venta") {
              detailRefill = parseFloat(full['total_refill_pedido'])*parseFloat(full['cliente']['monto_nuevo'])              
            }
            detailCanje = parseFloat(full['total_canje_pedido'])*55
            detailNuevo = parseFloat(full['total_nv_pedido'])*105
            adeudo = full['deuda_anterior']
            desc = full['descuento']
            sindesc = data
            condesc =parseFloat(data)- parseFloat(desc) 
           return (
            '<span class="badge rounded-pill badge-light-info detail_monto " data-id="'+full['cliente']['id']+'" data-rfeill="'+detailRefill+'" data-total="'+data+'" data-canje="'+detailCanje+'" data-env="'+detailNuevo+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-descuento="'+desc+'" data-title="Detalle monto total" data-sindesc="'+sindesc+'" data-condesc="'+condesc+'" data-adeudo="'+adeudo+'" style="cursor:pointer;" >$' +
            condesc +
            '</span>'
          );
        }
      },
      {
        // Label
        targets: 6,
        render: function (data, type, full, meta) {
         return (
          '<span class="badge rounded-pill badge-light-danger " >$' +
          data +
          '</span>'
        );
      }
    },
        {
          // Label
          targets: 7,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pedido'];
            var $status = {
              "Devuelto": { title: 'En proceso', class: 'badge-light-primary' },
              "Por entregar": { title: 'Por entregar', class: ' badge-light-yellow' },
              "Devuelto": { title: 'Devuelto', class: ' badge-light-danger' },
              "Reprogramado": { title: 'Reprogramado', class: ' badge-light-warning' },
              "En proceso": { title: 'En proceso', class: ' badge-light-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer"   onclick=\'cambioSP("'+full['id'] +'","'+full['status_pedido'] +'")\' data-status="'+full['status_pedido'] +'" data-id="'+full['id']+'">' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Label
          targets: 8,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pago'];
            var $status = {
              "Pagado": { title: 'Pagado', class: 'badge-light-success' },
              "Por verificar": { title: 'Por verificar', class: ' badge-light-yellow' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer" onclick=\'cambioPago("'+full['id'] +'","'+full['status_pago'] +'","'+full['fecha_pedido'] +'","'+full['monto_total'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          targets: 10,className:'fecha_pedido',
          render:function(data, type, full){
            let fecha = `<span class="d-none">${moment(data).format('YYYYMMDD')}-</span>${moment(data).format('DD/MM/YYYY')}`
            return fecha;
          }
        },
        
      ],
     
     
      order: [[10,'desc'],[12,'asc'],[3,'asc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      initComplete: function(settings, json) {
        var api = this.api();
      if ($('#otro_rol').length>0) {
        api.column(2).visible( false );
      }
        
      },
      drawCallback: function (settings) {
        let sumaG = 0
$('.datatables-basic').dataTable().$('.cantidad').each(function(){
    if ($(this).text() == "-") {
      sumaG
    }else{
          sumaG += parseFloat($(this).text());
    }    
  });
  $('#example_info').append(`<span> / Total garrafones: ${sumaG} </span>`)

        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;
        var sumaT = 0
        api
          .column(groupColumn, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before('<tr class="group"><td colspan="12"><i class="fas fa-truck me-1"></i>                ' + group + '</td></tr>');//AQUI LOS CHOFERES AGRUPADOS

              last = group;
            }
          });

          api.column(4, { page: 'current' }).data().each(function(group, i){
            sumaT +=parseInt(group)
           
        });
        $('tfoot .to_garra').text(sumaT)
        
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
    

    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(10); // We call our filter function
      dt_basic.draw();
      });
  }
  if (dt_basic_table2.length) {
  let groupColumn2 = 10
    $('.dt-column-search2 thead tr').clone(true).appendTo('.dt-column-search2 thead');
    $('.dt-column-search2 thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" id="V'+title+i+'"/>');

      $('input', this).on('keyup', function () {
        $('#filterPosition').val(this.id)
        $('#filterValue').val(this.value)
        if (dt_basic2.column(i).search() !== this.value) {
          dt_basic2.column(i).search(this.value).draw();
        }
      });
    });
    $('.select_chofer_ventas').on('change', function(){
      
      dt_basic2.column(10).search(this.value).draw();   
   });  
    $('.select_etiqueta_ventas').on('change', function(){
      
      dt_basic2.search(this.value).draw();   
   });
    var dt_basic2 = dt_basic_table2.DataTable({
      data: status_pedido2,
      columns: [
        { data: 'id' },
        { data: 'sucursaleId' },
        { data: 'cliente.firstName' },
        { data: 'total_garrafones_pedido' },
        { data: 'monto_total'}, // used for sorting so will hide this column
        { data: 'status_pedido' },
        { data: 'status_pago' },
        { data: 'metodo_pago' },
        { data: 'fecha_pedido'},
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            if ($('#otro_rol').length>0) {
              
                
            let Hoy = moment().format('DD/MM/YYYY'); 
            
            let fecha =moment(full['fecha_pedido']).format('DD/MM/YYYY')
            
                var fecha_final= moment(Hoy).isAfter(fecha); // true
                    
            } 
            let modif = ""
            
            if (fecha_final == true) {
              modif = "d-none"
            }
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record'+full['id']+'" onclick=\'delete_pedido("'+full['id']+'",".datatables-basic2")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item '+modif+'" onclick=\'edit_pedido("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'              
            );
          } },
          { data: 'personal.name' },
          { data: 'cliente.cpId' },
        ], columnDefs: [
          { visible: false, targets: groupColumn2,
           
          },
          { visible: false, targets: 11,
            render: function (data, type, full) {
              let asentamiento = ""
              for (let i = 0; i < codigosP_arr.length; i++) {
                if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
                  asentamiento = codigosP_arr[i]['asentamiento']
                }
                
              }
              return asentamiento
            }
          },
          {
            // Label
            targets: 0,
            render: function (data, type, full, meta) {
            //  let fecha_creado = full['fecha_pedido'], modificado = full['updatedAt']
            //  let modificacion = moment(fecha_creado).isSame(modificado)
            //   if (modificacion == false) {
            //     return (`<span class="badge rounded-pill badge-light-danger"> ${full['id']}</span>`);
            //   }
              var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
              var color_tag ="", color_text="", nombre;
              if (full['cliente']['etiqueta'] ==null) {
                color_tag =0
                color_text="black"
                nombre=""
              }else{
                color_tag =full['cliente']['etiqueta']['color']
                color_text="white"
                nombre=full['cliente']['etiqueta']['etiquetas']
              }
  
              return (`<span class="d-none">${nombre}</span><span class="badge rounded-pill " style="cursor:pointer; background-color: ${color_tag}; color:${color_text}"> ${full['id']}</span>`);
            }
          },
          {
            // Label
            targets: 1,
            render: function (data, type, full, meta) {
              for (let i = 0; i < zonas.length; i++) {
                if (zonas[i].id == data) {
                  var zona_arr = encodeURIComponent(JSON.stringify(zonas[i]));       
                }                     
              }
              return (`<span class="zona" style="cursor:pointer;" data-arrzona="${zona_arr}">${data}</span>`);
            }
          },
          {
            // Label
            targets: 2,
            render: function (data, type, full, meta) {
              let asentamiento = ""
              for (let i = 0; i < codigosP_arr.length; i++) {
                if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
                  asentamiento = codigosP_arr[i]['asentamiento']
                }
                
              }
              var $status_number = full['cliente']['tipo'];
              var $status = {
                "Residencial": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: 'badge-light-info' },
                "Punto de venta": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-success' },
                "Negocio": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-danger' },
              };
              if (typeof $status[$status_number] === 'undefined') {
                return data;
              }
          var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
          var color_tag ="", color_text=""
          if (full['cliente']['etiqueta'] ==null) {
            color_tag =0
            color_text="black"
          }else{
            color_tag =full['cliente']['etiqueta']['color']
            color_text="white"
          }
          return (
            `<span class="d-none">${asentamiento}</span><span class="hover_cliente badge rounded-pill ${$status[$status_number].class}" data-id="${full['cliente']['id']}" data-arraycliente="${cliente_arr}" data-title="Datos de ${full['cliente']['firstName']}" >${$status[$status_number].title}</span><span class="d-none">${full['cliente']['calle']} ${full['cliente']['casa']} ${full['cliente']['avenida']}</span>`
          );
            }
          },
        {
          // Label
          targets: 3,className:'to_garra2',
          render: function (data, type, full, meta) {
            let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones cantidad"  data-id="'+full['cliente']['id']+'" data-rfeill="'+full['total_refill_pedido']+'" data-total="'+data+'" data-canje="'+full['total_canje_pedido']+'" data-env="'+full['total_nv_pedido']+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-title="Detalle garrafones"   style="cursor:pointer;" >' +
              total +
              '</span>'
            );
          }
        
        
        },
        {
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            
            let detailRefill = 0, detailCanje = 0, detailNuevo=0,desc=0,sindesc, condesc=0
            detailRefill = parseFloat(full['total_refill_pedido'])*35
            detailCanje = parseFloat(full['total_canje_pedido'])*55
            detailNuevo = parseFloat(full['total_nv_pedido'])*105
            desc = full['descuento']
            sindesc = data
            condesc =parseFloat(data)- parseFloat(desc) 
           return (
            '<span class="badge rounded-pill badge-light-info detail_monto " data-id="'+full['cliente']['id']+'" data-rfeill="'+detailRefill+'" data-total="'+data+'" data-canje="'+detailCanje+'" data-env="'+detailNuevo+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-descuento="'+desc+'" data-title="Detalle monto total" data-sindesc="'+sindesc+'" data-condesc="'+condesc+'" style="cursor:pointer;" >$' +
            condesc +
            '</span>'
          );
        }
      },
        {
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pedido'];
            var $status = {
              "Reasignado": { title: 'Reasignado', class: 'badge-light-primary' },
              "Entregado": { title: 'Entregado', class: ' badge-light-success' },
              "Cancelado": { title: 'Devuelto', class: ' badge-light-danger' , motivo: ' motivo_hover'},
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill' +
              $status[$status_number].class +" "+ $status[$status_number].motivo +
              '" style="cursor:pointer"   data-status="'+full['status_pedido'] +'" data-motivo="'+full['motivo'] +'" data-id="'+full['id']+'" onclick=\'cambioSP("'+full['id'] +'","'+full['status_pedido'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Label
          targets: 6,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pago'];
            var $status = {
              "Pagado": { title: 'Pagado', class: 'badge-light-success' },
              "Por verificar": { title: 'Por verificar', class: ' badge-light-yellow' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer" onclick=\'cambioPago("'+full['id'] +'","'+full['status_pago'] +'","'+full['fecha_pedido'] +'","'+full['monto_total'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },{
          targets: 8,
          render:function(data){
            let fecha = `<span class="d-none">${moment(data).format('YYYYMMDD')}</span>${moment(data).format('DD/MM/YYYY')}`
            return fecha;
          }
        },
      ],
     
      order: [[8,'desc'],[10,'asc'],[2,'asc']],
      dom: '<" none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100], initComplete: function(settings, json) {
        var api = this.api();
      if ($('#otro_rol').length>0) {
        api.column(1).visible( false );
      }
        
      },
      drawCallback: function (settings) {
        let sumaG = 0;
        $('.datatables-basic2').dataTable().$('.cantidad').each(function(){
    if ($(this).text() == "-") {
      sumaG
    }else{
          sumaG += parseFloat($(this).text());
    }    
  });
  $('#ventas-table_info').append(`<span> / Total garrafones: ${sumaG} </span>`)

        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;
        let sumaT = 0;
        api
          .column(groupColumn2, { page: 'current' })
          .data()
          .each(function (group, i) {
            let icono =`<i class="fas fa-truck"></i>`
            if (last !== group) {
              $(rows)
                .eq(i)

                .before('<tr class="group"><td colspan="9"><i class="fas fa-truck me-1"></i>' + group + '</td></tr>');


              last = group;
            }
          });
          api.column(3, { page: 'current' }).data().each(function(group, i){
            sumaT +=parseInt(group)
           
        });
        $('tfoot .to_garra2').text(sumaT)
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


  $('#min, #max').on('change', function () {
    dt_basic2.draw();
    });

  }
}

 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  cargaTablas()
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  //CAMBIA CHOFER TABLA PEDIDOS
  $("#button_change_chofer").on('click', function (e) {
    let valoresCheck = [];
  
    $("input[type=checkbox]:checked").each(function(){
        valoresCheck.push(this.value);
    });
    if (valoresCheck.length == 0) {    
      
      Swal.fire('Debe seleccionar por lo menos un pedido para hacer el cambio de chofer')
  
      return
    }else{
      $('#change_chofer').modal('show')
    }
  $("#ids_pedido").val(valoresCheck);
  });

  $('#change_chofer_btn').on('click', async (e)=>{
    if ($('#chofer_cambia').val() =="default") {
      Swal.fire('Debe seleccionar un chofer')
      return
    }

    $.ajax({
      url: `/change_chofer_pedido`,
      type: 'POST',
      data: $('#change_chofer_form').serialize(),
      success: async function (data, textStatus, jqXHR) {
        $('#array_pedido').val(JSON.stringify(data.pedidos_let))
        $('.datatables-basic').dataTable().fnDestroy();
         $('.datatables-basic').empty();
        $('.datatables-basic').html(`<thead>
        <tr>                                                
            <th></th>
            <th>#Pedido</th>
            <th></th>
            <th class="cliente">Cliente</th>
            <th>To. garr.</th>
            <th>Monto Total</th>
            <th>Adeudo</th>
            <th>Status del Pedido</th>
            <th>Status de Pago</th>
            <th>Forma de Pago</th>
            <th>Fecha</th>
            <th>Opciones</th>
            <th>oculto choferes </th> 
            <th>oculto asentamiento </th> 
        </tr>
    </thead>
    <tfoot>
<tr>
<th colspan="4" style="text-align:right"> Total</th>
<th></th>
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
</tfoot>`);
        $('.datatables-basic2').dataTable().fnDestroy();
        $('.datatables-basic2').empty();
        $('.datatables-basic2').html(`<thead>
        <tr>
            <th>Nº Pedido</th>
            <th></th>
            <th>Cliente</th>
            <th>Total garrafones</th>
            <th>Monto Total</th>
            <th>Status del Pedido</th>
            <th>Status de Pago</th>
            <th>Metodo de Pago</th>
            <th>Fecha</th>
            <th>Opciones</th>
            <th>oculto choferes </th> 
        <th>oculto asentamiento </th> 
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
</tr>
</tfoot>`);
        
      await  cargaTablas('si').then(()=>{
          if ($('#filterPosition').val() != "") {
            console.log($('#filterValue').val()) 
             $(`#${$('#filterPosition').val()}`).val(`${$('#filterValue').val()}`).trigger('keyup');
            }
        });     
        
  $('.modal').modal('hide');
  Swal.fire('Se cambió con éxito el(los) choferes')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })

  //COPIA VARIOS PEDIDOS
  $("#button_copiar_varios").on('click', function (e) {
    let valoresCheck = [];
  
    $("input[type=checkbox]:checked").each(function(){
        valoresCheck.push(this.value);
    });
    if (valoresCheck.length == 0) {    
      
      Swal.fire('Debe seleccionar por lo menos un pedido para Copiar el pedido')
  
      return
    }else{
      console.log('copiando...')
    }
    copyToClipboardVarios(valoresCheck)
  });
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
               if (data.fail) {
          Swal.fire(data.msg)
          return
          
        }
        if ($('#carga_').length>0) {
          $('#array_pedido').val(JSON.stringify(data.pedidos_let))
        $('.datatables-basic').dataTable().fnDestroy();
         $('.datatables-basic').empty();
        $('.datatables-basic').html(`<thead>
        <tr>                                                
            <th></th>
            <th>#Pedido</th>
            <th></th>
            <th class="cliente">Cliente</th>
            <th>To. garr.</th>
            <th>Monto Total</th>
            <th>Adeudo</th>
            <th>Status del Pedido</th>
            <th>Status de Pago</th>
            <th>Forma de Pago</th>
            <th>Fecha</th>
            <th>Opciones</th>
            <th>oculto choferes </th> 
            <th>oculto asentamiento </th> 
        </tr>
    </thead>
    <tfoot>
<tr>
<th colspan="4" style="text-align:right"> Total</th>
<th></th>
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
</tfoot>`);
        $('.datatables-basic2').dataTable().fnDestroy();
        $('.datatables-basic2').empty();
        $('.datatables-basic2').html(`<thead>
        <tr>
            <th>Nº Pedido</th>
            <th></th>
            <th>Cliente</th>
            <th>Total garrafones</th>
            <th>Monto Total</th>
            <th>Status del Pedido</th>
            <th>Status de Pago</th>
            <th>Metodo de Pago</th>
            <th>Fecha</th>
            <th>Opciones</th>
            <th>oculto choferes </th> 
        <th>oculto asentamiento </th> 
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
</tr>
</tfoot>`);
        
        cargaTablas('si');
        $('.datatables-resumen').dataTable().fnDestroy();
        $('.datatables-resumen').empty();
        $('.datatables-resumen').html(`<thead>
        <tr>
            <th>Carga Inicial</th>
            <th>Pedidos</th>
            <th>Entregados</th>
            <th>Pendientes</th>                                                
        
        <th>oculto choferes </th>  
        </tr>
    </thead>`);
        cargaTableResumen('si')
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
   $("#id_cliente_reg_pedido option[value='default']").attr("selected", true);
   $("#id_cliente_reg_pedido").val('default').trigger('change');
   if ($('#filterPosition').val() != "") {
    $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
   }
  
        } else {
          Swal.fire('Se creó con éxito el pedido')
  $('.modal').modal('hide');
  $('#reg_pedido_modal1').trigger("reset");
  $('#cant_garrafon').text('0')
  $('#monto_garrafon').text('0')
  $('#sub_total_total').text('0')
  $('#deuda_verf').text('0')
   $('#total_total').text('0')
   $('#deuda_box').attr('style','display:none')
   $("#id_cliente_reg_pedido option[value='default']").attr("selected", true);
   $("#id_cliente_reg_pedido").val('default').trigger('change');
   let hoy= moment().format('YYYY-MM-DD')
$('#fecha_pedido').val(hoy)
if ($('#filterPosition').val() != "") {
  $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
 }
        }
        
  
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  //ACA SE ACTIVAS LOS CONTEXT MENU
  $.contextMenu({
    selector: '.motivo_hover',
    trigger: 'hover',
    autoHide: true,
    build: function ($trigger, e) {
      var motivo = e.currentTarget['dataset']["motivo"];
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
            },
            items: {
                "Motivo": { name: `Motivo: ${motivo}`},
            }
        };
    }
  });

  $.contextMenu({
    selector: '.modal_detail_garrafones',
    trigger: 'hover',
    autoHide: true,
    build: function ($trigger, e) {
      var title = e.currentTarget['dataset']["title"];
      var rfeill = e.currentTarget['dataset']["rfeill"];
      var canje = e.currentTarget['dataset']["canje"];
     var Env = e.currentTarget['dataset']["env"] 
     var obsequio = e.currentTarget['dataset']["obsequio"];
     var total = e.currentTarget['dataset']["total"] 
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
            },
            items: {
                "Refill": { name: `Refill: ${rfeill}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Canje": { name: `Canje: ${canje}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Envase Nuevo": { name: `Envase Nuevo: ${Env}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Total": { name: `Total: ${total}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
            }
        };
    }
  });

$.contextMenu({
  selector: '.detail_monto',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    
    var title = e.currentTarget['dataset']["title"];
    var rfeill = e.currentTarget['dataset']["rfeill"];
    var canje = e.currentTarget['dataset']["canje"];
   var Env = e.currentTarget['dataset']["env"] 
   var desc = e.currentTarget['dataset']["descuento"] 
   var sindesc = e.currentTarget['dataset']["sindesc"] 
   var condesc = e.currentTarget['dataset']["condesc"] 
   var adeudo = e.currentTarget['dataset']["adeudo"] 
   var obsequio = e.currentTarget['dataset']["obsequio"];
   //var total = e.currentTarget['dataset']["total"] 
   var total = (parseInt(sindesc) +parseInt(adeudo))-parseInt(desc)

      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
          },
          items: {
              "Refill": { name: `Refill: $${rfeill}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Canje": { name: `Canje: $${canje}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Envase Nuevo": { name: `Envase Nuevo: $${Env}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Sub-Total": { name: `Sub-Total: $${sindesc}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Adeudo": { name: `Adeudo: $${adeudo}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Desc.": { name: `Desc.: $${desc}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Total": { name: `Total: $${total}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
          }
      };
  }
});
$.contextMenu({
  selector: '.hover_cliente',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    var title = e.currentTarget['dataset']["title"];
    var Array = e.currentTarget['dataset']["arraycliente"];
     var my_object = JSON.parse(decodeURIComponent(Array));
   //  $("#home_modalBody").append(txt2);
   let asentamiento =""
   for (let i = 0; i < codigosP_arr.length; i++) {
   if (my_object['cpId'] == codigosP_arr[i]['id']) {
     asentamiento = codigosP_arr[i]['asentamiento']
   }
   }
      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
          },
          items: {
              "Asentamiento": { name: `Asentamiento: ${asentamiento}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Coto": { name: `Coto: ${my_object['coto']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Casa": { name: `Casa: ${my_object['casa']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Tel": { name: `Tel: ${my_object['telefono']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
          }
      };
  }
});

$.contextMenu({
  selector: '.zona',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    var Array = e.currentTarget['dataset']["arrzona"];
     var zona = JSON.parse(decodeURIComponent(Array));
   console.log(zona)
   
      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
          },
          items: {
              "Zona": { name: `Zona: ${zona.nombre}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
          }
      };
  }
});
 

  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

 

  $('#form_edit_pedido').submit((e)=>{
    e.preventDefault()
    $.ajax({
      url: `/editar_pedido_save`,
      type: 'POST',
      data:$("#form_edit_pedido").serialize(),
      success: async function (data, textStatus, jqXHR) {
        console.log(data)
  $('#array_pedido').val(JSON.stringify(data.pedidos_let))

  $('.datatables-basic').dataTable().fnDestroy();
   $('.datatables-basic').empty();
   $('.datatables-basic').html(`<thead>
   <tr>                                                
       <th></th>
       <th>#Pedido</th>
       <th></th>
       <th class="cliente">Cliente</th>
       <th>To. garr.</th>
       <th>Monto Total</th>
       <th>Adeudo</th>
       <th>Status del Pedido</th>
       <th>Status de Pago</th>
       <th>Forma de Pago</th>
       <th>Fecha</th>
       <th>Opciones</th>
       <th>oculto choferes </th> 
       <th>oculto asentamiento </th> 
   </tr>
</thead>
<tfoot>
<tr>
<th colspan="4" style="text-align:right"> Total</th>
<th></th>
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
</tfoot>`);
   
   $('.datatables-basic2').dataTable().fnDestroy();
   $('.datatables-basic2').empty();
   $('.datatables-basic2').html(`<thead>
   <tr>
       <th>Nº Pedido</th>
       <th></th>
       <th>Cliente</th>
       <th>Total garrafones</th>
       <th>Monto Total</th>
       <th>Status del Pedido</th>
       <th>Status de Pago</th>
       <th>Metodo de Pago</th>
       <th>Fecha</th>
       <th>Opciones</th>
       <th>oculto choferes </th> 
   <th>oculto asentamiento </th> 
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
</tr>
</tfoot>`);
   
   await cargaTablas('si').then(()=>{
    if ($('#filterPosition').val() != "") {
      $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
     }
   });

if ($('.select_chofer_pedidos').val() != "") {
  $(".select_chofer_pedidos").val(`${$('.select_chofer_pedidos').val()}`).trigger('change');
}
if ($('.select_etiqueta_pedidos').val() != "") {
  $(".select_etiqueta_pedidos").val(`${$('.select_etiqueta_pedidos').val()}`).trigger('change');
}
   $('.datatables-resumen').dataTable().fnDestroy();
   $('.datatables-resumen').empty();
   $('.datatables-resumen').html(`<thead>
   <tr>
       <th>Carga Inicial</th>
       <th>Pedidos</th>
       <th>Entregados</th>
       <th>Pendientes</th>                                                
   
   <th>oculto choferes </th>  
   </tr>
   </thead>`);
   
   cargaTableResumen('si')
   if ($('#filterPosition').val() != "") {
    $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
  }
  $('#edit_pedido').modal('hide')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });   
  });
  $('.datatables-basic tbody').on('click', '.share_record', function (e) {
    var id_edit = e.target.classList[0]
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
    copyToClipboard(`#CopyPedido${id_edit}`,id_edit)

  });

  $('.datatables-basic2 tbody').on('click', '.edit_record', function (e) {
    var id_edit2 = e.target.classList[0]
    if (typeof id_edit2 =="undefined") {
      return console.log(id_edit2)
    }
$('#edit_pedido').modal('show')

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
async function copyToClipboard(elemento,id_edit) {
  var $temp = $("<textarea>")
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val($(elemento).html().replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();
  await fetch("/ChangeshareStatusPY4/" + id_edit)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    $(`.share_record${id_edit}`).attr('style','background-color: #001871; color: white;');
    //return data.obtener_historia;
  });

  Swal.fire('Pedido copiado en el portapapeles')

  }
  function copyToClipboardVarios(elemento) {
    if ($("#checkboxSelectAll").is(':checked')) {
      var new_elemento = elemento.shift()
    }
    var $temp = $("<textarea>")
    var brRegex = /<br\s*[\/]?>/gi;
    $("body").append($temp);
    for (let i = 0; i < elemento.length; i++) {
      const element = array[i];
      $temp.append($(`#CopyPedido${elemento[i]}`).html().replace(brRegex, "\r\n")).select();
    }

    
    document.execCommand("copy");
    $temp.remove();
    Swal.fire('Pedido copiado en el portapapeles')
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
// cambiar estados
 async function cambioSP(id, status) {
 const { value: estado } = await Swal.fire({
  title: 'Seleccione un nuevo Status',
  input: 'select',
  inputOptions: {
      Entregado: 'Entregado',
      Cancelado: 'Cancelado',
      Reprogramado: 'Reprogramado',
      'Por entregar': 'Por entregar',
  },
  inputPlaceholder: 'Seleccione un nuevo Status',
  showCancelButton: true,
  inputValidator: (value) => {
    return new Promise((resolve) => {
      console.log(value)
      if (value ==='Reprogramado') {
        resolve() 
      } else if (value === status) {
        resolve('Debe seleccionar un estado diferente')
      } else {
         resolve()
      }
    })
  }
})
if (!estado) {
  Swal.fire(`Debe llenar todos los campos, por favor!`);
  return
} 
if (estado) { 
  var motiv, fecha_rep
  if (estado == "Cancelado") {
    const { value: motivo } = await Swal.fire({
      title: 'Indique el motivo',
      input: 'text',
      inputPlaceholder: 'Motivo',
     // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        
        return new Promise((resolve) => {
          
          if (!value) {
            resolve('Debe colocar un motivo')
          } else {
             resolve()
          }
        })
      }
    })
  if (!motivo) {
    Swal.fire(`Debe llenar todos los campos, por favor!`);
    return
  }  

    motiv = motivo
  }
  if (estado == "Reprogramado") {
    const { value: fecha_re } = await Swal.fire({
      title: 'Indique la fecha',
      html:
      '<input id="swal-input1" class="swal2-input" type="date">',
    focusConfirm: false,
    preConfirm: () => {
      const fecha_pago =
      Swal.getPopup().querySelector("#swal-input1").value;      
    if (!fecha_pago) {
      Swal.showValidationMessage(
        `Debe llenar todos los campos, por favor!`
      );
    }
      return [
        document.getElementById('swal-input1').value,
      ]
    }
    })
    if (!fecha_re) {
      Swal.fire(`Debe llenar todos los campos, por favor!`);
      return
    }  
    fecha_rep =fecha_re
  }
  
  const data_C = new FormData();
  data_C.append("id", id);
  data_C.append("status", estado);
  data_C.append("motivo", motiv);
  data_C.append("fecha_re", fecha_rep);
  $.ajax({
    url: `/cambiaS_pedido`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: async function (data, textStatus, jqXHR) {
      console.log(data)
$('#array_pedido').val(JSON.stringify(data.pedidos_let))
$('#carga_').val(JSON.stringify(data.carga_let))
$('.datatables-basic').dataTable().fnDestroy();
 $('.datatables-basic').empty();
$('.datatables-basic').html(`<thead>
<tr>                                                
    <th></th>
    <th>#Pedido</th>
    <th></th>
    <th class="cliente">Cliente</th>
    <th>To. garr.</th>
    <th>Monto Total</th>
    <th>Adeudo</th>
    <th>Status del Pedido</th>
    <th>Status de Pago</th>
    <th>Forma de Pago</th>
    <th>Fecha</th>
    <th>Opciones</th>
    <th>oculto choferes </th> 
    <th>oculto asentamiento </th> 
</tr>
</thead>
<tfoot>
<tr>
<th colspan="4" style="text-align:right"> Total</th>
<th></th>
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
</tfoot>`);

$('.datatables-basic2').dataTable().fnDestroy();
$('.datatables-basic2').empty();
$('.datatables-basic2').html(`<thead>
<tr>
    <th>Nº Pedido</th>
    <th></th>
    <th>Cliente</th>
    <th>Total garrafones</th>
    <th>Monto Total</th>
    <th>Status del Pedido</th>
    <th>Status de Pago</th>
    <th>Metodo de Pago</th>
    <th>Fecha</th>
    <th>Opciones</th>
    <th>oculto choferes </th> 
<th>oculto asentamiento </th> 
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
</tr>
</tfoot>`);

await cargaTablas('si').then(()=>{
  if ($('#filterPosition').val() != "") {
    $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
   }
 });
$('.datatables-resumen').dataTable().fnDestroy();
$('.datatables-resumen').empty();
$('.datatables-resumen').html(`<thead>
<tr>
    <th>Carga Inicial</th>
    <th>Pedidos</th>
    <th>Entregados</th>
    <th>Pendientes</th>                                                

<th>oculto choferes </th>  
</tr>
</thead>`);

cargaTableResumen('si')
if ($('#filterPosition').val() != "") {
 $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
}
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });


// window.location.href = `/cambiaS_pedido/${id}/${estado}`;
}
 }

async function cambioPago(id, status, fecha_pedido, monto) {
  
  if (moment().isSame(fecha_pedido, 'day')) {
    const { value: estado } = await Swal.fire({
      title: 'Seleccione un nuevo Status',
      input: 'select',
      inputOptions: {
          Pagado: 'Pagado',
          'Por verificar': 'Por verificar',
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
        
      const data_C = new FormData();
      data_C.append("id", id);
      data_C.append("status", estado);
      $.ajax({
        url: `/cambia_S_pago`,
        type: 'POST',
        data: data_C,
        cache: false,
        contentType: false,
        processData: false,
        success: async function (data, textStatus, jqXHR) {
    $('#array_pedido').val(JSON.stringify(data.pedidos_let))
    
    $('.datatables-basic').dataTable().fnDestroy();
    $('.datatables-basic').empty();
    $('.datatables-basic').html(`<thead>
    <tr>                                                
        <th></th>
        <th>#Pedido</th>
        <th></th>
        <th class="cliente">Cliente</th>
        <th>To. garr.</th>
        <th>Monto Total</th>
        <th>Adeudo</th>
        <th>Status del Pedido</th>
        <th>Status de Pago</th>
        <th>Forma de Pago</th>
        <th>Fecha</th>
        <th>Opciones</th>
        <th>oculto choferes </th> 
        <th>oculto asentamiento </th> 
    </tr>
</thead>
<tfoot>
<tr>
<th colspan="4" style="text-align:right"> Total</th>
<th></th>
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
</tfoot>`);
    $('.datatables-basic2').dataTable().fnDestroy();
    $('.datatables-basic2').empty();
    $('.datatables-basic2').html(`<thead>
    <tr>
        <th>Nº Pedido</th>
        <th></th>
        <th>Cliente</th>
        <th>Total garrafones</th>
        <th>Monto Total</th>
        <th>Status del Pedido</th>
        <th>Status de Pago</th>
        <th>Metodo de Pago</th>
        <th>Fecha</th>
        <th>Opciones</th>
        <th>oculto choferes </th> 
    <th>oculto asentamiento </th> 
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
</tr>
</tfoot>`);
    
    await cargaTablas('si').then(()=>{
      if ($('#filterPosition').val() != "") {
        $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
       }
     });
        },
        error: function (jqXHR, textStatus) {
          console.log('error:' + jqXHR)
        }
      });
    
    }
  } else {
    let chof = $('#choferes').val();
    let choferes  = JSON.parse(chof.replace(/&quot;/g,'"'));
    let arr=[]
  for (let i = 0; i < choferes.length; i++) {
    arr.push({id:choferes[i]['id'],name: choferes[i]['name']+ " "+ choferes[i]['lastName']})  
  }
  var options = {};
  $.map(arr,
      function(o) {
          options[o.id] = o.name;
      });
    const { value: status_ } = await Swal.fire({
      title: 'Seleccione un nuevo Status',
      input: 'select',
      inputOptions: {
          Pagado: 'Pagado',
          'Por verificar': 'Por verificar',
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
    
    if (status_) {  
    var tipo_p, fecha_pago, chofer_r
    if (status_ == "Pagado") {
      const { value: tipo } = await Swal.fire({
        title: 'Indique el tipo',
        input: 'select',
      inputOptions: {
          Efectivo: 'Efectivo',
          'Tarjeta': 'Tarjeta',
          'Transferencia': 'Transferencia'
      },
        inputPlaceholder: 'tipo',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (!value) {
              resolve('Debe colocar un tipo')
            } else {
               resolve()
            }
          })
        }
      })
      if (!tipo) {
        Swal.fire(`Debe llenar todos los campos, por favor!`);
        return
      } 
      tipo_p = tipo    
    }
   
    if (tipo_p == "Efectivo") {
      const { value: chofer } = await Swal.fire({
        title: 'Indique el chofer',
        input: 'select',
      inputOptions: options,
        inputPlaceholder: 'Chofer',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (!value) {
              resolve('Debe colocar un chofer')
            } else {
               resolve()
            }
          })
        }
      })
      if (!chofer) {
        Swal.fire(`Debe llenar todos los campos, por favor!`);
        return
      } 
      chofer_r = chofer
      const { value: fecha_re } = await Swal.fire({
        title: 'Indique la fecha',
        html:
        '<input id="swal-input2" class="swal2-input" type="date">',
      focusConfirm: false,
      preConfirm: () => {
        const fecha_pago =
        Swal.getPopup().querySelector("#swal-input2").value;      
      if (!fecha_pago) {
        Swal.showValidationMessage(
          `Debe llenar todos los campos, por favor!`
        );
      }
        return [
          document.getElementById('swal-input2').value,
        ]
      }
      })
      if (!fecha_re) {
        Swal.fire(`Debe llenar todos los campos, por favor!`);
        return
      }
      fecha_pago =fecha_re
    }else{
      const { value: fecha_re } = await Swal.fire({
        title: 'Indique la fecha',
        html:
        '<input id="swal-input1" class="swal2-input" type="date">',
      focusConfirm: false,
      preConfirm: () => {
        const fecha_pago =
        Swal.getPopup().querySelector("#swal-input1").value;      
      if (!fecha_pago) {
        Swal.showValidationMessage(
          `Debe llenar todos los campos, por favor!`
        );
      }
        return [
          document.getElementById('swal-input1').value,
        ]
      }
      })
      if (!fecha_re) {
        Swal.fire(`Debe llenar todos los campos, por favor!`);
        return
      }
      chofer_r = 'Null'
      fecha_pago =fecha_re
    }         
      const data_C = new FormData();
      data_C.append("id", id);
      data_C.append("status", status_);
      data_C.append("tipo_pago", tipo_p);
      data_C.append("chofer_r", chofer_r);
      data_C.append("fecha_pago", fecha_pago);
      data_C.append("monto", monto);
      $.ajax({
        url: `/cambia_S_pago_deudor`,
        type: 'POST',
        data: data_C,
        cache: false,
        contentType: false,
        processData: false,
        success:async function (data, textStatus, jqXHR) {
    console.log(data)
       $('#array_pedido').val(JSON.stringify(data.pedidos_let))
    
    $('.datatables-basic').dataTable().fnDestroy();
    $('.datatables-basic').empty();
    $('.datatables-basic').html(`<thead>
    <tr>                                                
        <th></th>
        <th>#Pedido</th>
        <th></th>
        <th class="cliente">Cliente</th>
        <th>To. garr.</th>
        <th>Monto Total</th>
        <th>Adeudo</th>
        <th>Status del Pedido</th>
        <th>Status de Pago</th>
        <th>Forma de Pago</th>
        <th>Fecha</th>
        <th>Opciones</th>
        <th>oculto choferes </th> 
        <th>oculto asentamiento </th> 
    </tr>
</thead>
<tfoot>
<tr>
<th colspan="4" style="text-align:right"> Total</th>
<th></th>
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
</tfoot>`);
    $('.datatables-basic2').dataTable().fnDestroy();
    $('.datatables-basic2').empty();
    $('.datatables-basic2').html(`<thead>
    <tr>
        <th>Nº Pedido</th>
        <th></th>
        <th>Cliente</th>
        <th>Total garrafones</th>
        <th>Monto Total</th>
        <th>Status del Pedido</th>
        <th>Status de Pago</th>
        <th>Metodo de Pago</th>
        <th>Fecha</th>
        <th>Opciones</th>
        <th>oculto choferes </th> 
    <th>oculto asentamiento </th> 
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
</tr>
</tfoot>`);
    
  await  cargaTablas('si').then(()=>{
      if ($('#filterPosition').val() != "") {
        $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
       }
     });
        },
        error: function (jqXHR, textStatus) {
          console.log('error:' + jqXHR)
        }
      });
    
    }
  }

}
function edit_pedido(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;

const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_pedido`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
if ( $(".chofer option[value='" + data['personalId'] + "']").length == 0 ){
//$('.chofer').prepend('<option selected value="' + data['chofer'] + '">' + data['chofer'] + '</option>');  
}else{
  //$('.chofer').find('option:selected').remove().end();
  $(".chofer option[value='" + data['personalId'] + "']").attr("selected", true);
}

$('#id_chofer_edit').val(data['personalId'])
$('#edit_pedido_id').val(data['id'])
$('#edit_pedido_id_cliente').val(data['clienteId'])
let garrafon19L = JSON.parse(data['garrafon19L'])
let garrafon11L = JSON.parse(data['garrafon11L'])
let botella1L = JSON.parse(data['botella1L'])
let botella5L = JSON.parse(data['botella5L'])
$('.count_refill_garrafon').val(garrafon19L['refill_cant'])
$('.refill_garrafon_mont').val(garrafon19L['refill_mont'])
$('.count_canje_garrafon').val(garrafon19L['canje_cant'])
$('.canje_garrafon_mont').val(garrafon19L['canje_mont'])
$('.count_enNew_garrafon').val(garrafon19L['nuevo_cant'])
$('.enNew_garrafon_mont').val(garrafon19L['nuevo_mont'])
$('.count_enobsequio_garrafon').val(garrafon19L['enobsequio_cant_garrafon'])
$('.total_garrafon').val(garrafon19L['total_cant'])
$('.cant_garrafon').text(garrafon19L['total_cant'])
$('.monto_garrafon_input').val(garrafon19L['total_cost'])
$('.monto_garrafon').text(garrafon19L['total_cost'])

$('.count_refill_botella').val(botella1L['refill_cant'])
$('.refill_botella_mont').val(botella1L['refill_mont'])
$('.count_canje_botella').val(botella1L['canje_cant'])
$('.canje_botella_mont').val(botella1L['canje_mont'])
$('.count_enNew_botella').val(botella1L['nuevo_cant'])
$('.enNew_botella_mont').val(botella1L['nuevo_mont'])
$('.count_enobsequio_botella').val(botella1L['enobsequio_cant_botella'])
$('.total_botella').val(botella1L['total_cant'])
$('.cant_botella').text(botella1L['total_cant'])
$('.monto_botella_input').val(botella1L['total_cost'])
$('.monto_botella').text(botella1L['total_cost'])

$('.count_refill_garrafon11l').val(garrafon11L['refill_cant'])
$('.refill_garrafon11l_mont').val(garrafon11L['refill_mont'])
$('.count_canje_garrafon11l').val(garrafon11L['canje_cant'])
$('.canje_garrafon11l_mont').val(garrafon11L['canje_mont'])
$('.count_enNew_garrafon11l').val(garrafon11L['nuevo_cant'])
$('.enNew_garrafon11l_mont').val(garrafon11L['nuevo_mont'])
$('.count_enobsequio_garrafon11l').val(garrafon11L['enobsequio_cant_garrafon11l'])
$('.total_garrafon11l').val(garrafon11L['total_cant'])
$('.cant_garrafon11l').text(garrafon11L['total_cant'])
$('.monto_garrafon11l_input').val(garrafon11L['total_cost'])
$('.monto_garrafon11l').text(garrafon11L['total_cost'])

$('.count_refill_botella5l').val(botella5L['refill_cant'])
$('.refill_botella5l_mont').val(botella5L['refill_mont'])
$('.count_canje_botella5l').val(botella5L['canje_cant'])
$('.canje_botella5l_mont').val(botella5L['canje_mont'])
$('.count_enNew_botella5l').val(botella5L['nuevo_cant'])
$('.enNew_botella5l_mont').val(botella5L['nuevo_mont'])
$('.count_enobsequio_botella5l').val(botella5L['enobsequio_cant_botella5l'])
$('.total_botella5l').val(botella5L['total_cant'])
$('.cant_botella5l').text(botella5L['total_cant'])
$('.monto_botella5l_input').val(botella5L['total_cost'])
$('.monto_botella5l').text(botella5L['total_cost'])

$('.total_total_inp').val(data['monto_total'])
$('.total_total').text(data['monto_total'])

if ( $("#metodo_pago_edit option[value='" + data['metodo_pago'] + "']").length == 0 ){
$('#metodo_pago_edit').prepend('<option selected value="' + data['metodo_pago'] + '">' + data['metodo_pago'] + '</option>');  
}else{
//  $('#metodo_pago_edit').find('option:selected').remove().end();
  $("#metodo_pago_edit option[value='" + data['metodo_pago'] + "']").attr("selected", true);
}

if (data['cliente']['tipo']=="Negocio" || data['cliente']['tipo'] =="Punto de venta") {
  console.log(data)
  $('#descuento_upd_cliente2').val(data['cliente']['monto_nuevo']);
  console.log($('#descuento_upd_cliente2').val())
}

$('.status_pago').val(data['status_pago'])
$('#status_pedido_edit').val(data['status_pedido'])
$('#edit_fecha_pedido').val(data['fecha_pedido'])
$('#prestados_edit').val(data['garrafones_prestamos'])
$('#danados_edit').val(data['danados'])
$('#descuento_edit').val(data['descuento'])
$('#total_total_inp').val(data['monto_total'])
if (data['descuento']>0) {
  $('#monto_descuento').removeClass('d-none')
  console.log($('#total_total_inp').val())
  let descuento = parseInt($('#total_total_inp').val()) - parseInt(data['descuento'])
  $('#total_desc').text(descuento)
}
$('#observacion_edit').val(data['observacion'])
$('#edit_pedido').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
function delete_pedido(id_, tabla) {
  if ($('#otro_rol').length) {
    Swal.fire("Función valida solo para directores")
    return
  }
  var id = id_
  let dt_basic = tabla
  Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar el pedido indicado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_pedido/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`              
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      $(`${dt_basic}`).DataTable().row($(`${dt_basic} tbody .delete-record${id}`).parents('tr')).remove().draw();
      Swal.fire({
        title: `Pedido ${id} borrado con éxito`,
      })
      if ($('#filterPosition').val() != "") {
       $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('keyup');
     }
    }
  })
}
function share_record(id_) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = id_
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
    /*let direction_copy = location.host + `/ver_pedido/${id_edit}`;
    $('#p1').text(direction_copy)*/
    copyToClipboard(`#CopyPedido${id_edit}`,id_edit)
}