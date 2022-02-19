/**
 * DataTables Advanced
 */

 'use strict';
 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate, maxDate,minDate2, maxDate2;

 
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
       let f = aData[3]
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
 function carga_tabla_pedido_maquila(rechar) {
    
  let pedidos_maquila_st = $('#pedidos_maquila_st').val()
  let pedidos_maquila_parse
  if (rechar) {
    pedidos_maquila_parse = JSON.parse(pedidos_maquila_st)
    pedidos_maquila_parse = JSON.parse(pedidos_maquila_parse)
  }else{
    pedidos_maquila_parse = JSON.parse(pedidos_maquila_st)
  }  

  var dt_pedidos_maquila = $('#pedidos-maquila-table'),
    assetPath = '../../dataPY4/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
minDate2 = new DateTime($('#min1'), {
  format: 'DD/MM/YYYY'
});
maxDate2 = new DateTime($('#max1'), {
  format: 'DD/MM/YYYY'
});
var ventas_dia = new DateTime($('#ventas_day'), {
  format: 'DD/MM/YYYY'
});
  // DataTable with buttons
  // --------------------------------------------------------------------
  let groupColumn = 11;
  console.log(pedidos_maquila_parse)
  if (dt_pedidos_maquila.length) {
    $('.dt-column-search-maquila thead tr').clone(true).appendTo('.dt-column-search-maquila thead');
    $('.dt-column-search-maquila thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" id="P'+title+i+'"/>');
      $('input', this).on('keyup', function () {
        console.log(this.id)
        let valor = this.value
$('#filterPosition').val(this.id)
$('#filterValue').val(this.value)
        if (dt_p_maquila.column(i).search() !== this.value) {

          dt_p_maquila.column(i).search(this.value).draw();
        }else{
          dt_p_maquila.column(i).search(valor).draw();
        }
      });
    });
    $('.select_chofer_pedidos').on('change', function(){

      dt_p_maquila.search(this.value).draw();   
   });
   $('.select_etiqueta_pedidos').on('change', function(){
 
    dt_p_maquila.search(this.value).draw();   
 });
    var dt_p_maquila = dt_pedidos_maquila.DataTable({
      data: pedidos_maquila_parse,
      columns: [
        { data: 'id' },
        { data: 'id' },
        { data: 'clientes_maquila.name' },
        { data: 'fecha_pedido' },
        { data: 'rellenos'}, // used for sorting so will hide this column
        { data: 'bwater'},
        { data: 'monto_total' },
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
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record'+full['id']+'" onclick=\'delete_pedido("'+full['id']+'","#pedidos-maquila-table")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item '+modif+'" onclick=\'edit_pedido("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item share_record '+full['id']+'" onclick=\'share_record("'+full['id']+'")\'>' +
              feather.icons['share-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
             `<p id="CopyPedido${full['id']}" class="d-none">
--------------------------------------------------------------
#Pedido:${full['id']} -
Cliente: --.
Dirección: .
Referencia:--.
Rf:$--.
CJ: $--.
Env: $--.</p>`  
            );
          }, 
        },
      ], columnDefs: [
        {// For Checkboxes
          
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
        { /**NUMERO PEDIDO */
          targets: 1,
          render: function (data, type, full, meta) {

            return (`<span class="badge rounded-pill " style="cursor:pointer; background-color: blue; color: white"> ${full['id']}</span>`);
          }
        },
        {/**NOMBRE PROVEEDOR */
          targets: 2,
          render: function (data, type, full, meta) {

       

        var cliente_arr = encodeURIComponent(JSON.stringify(full['clientes_maquila']));

        //aqui activa el modal info del cliente
            return (`<span class="hover_cliente badge rounded-pill badge-light-info" data-id="${full['clientes_maquila']['id']}" data-arraycliente="${cliente_arr}">${data}</span>
            `);
          }
        },
        {/**FECHA PEDIDO */
          targets: 3,className:'fecha_pedido',
          render:function(data, type, full){
            
           // return moment.tz(data, 'America/Mexico_City').format('L');
         //  return (`<span class="badge rounded-pill">${moment(data).format('L')}</span>`);
           return moment(data).format('L');
          }
        },
        {/**RELLENOS */
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
           // let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones" data-id="'+full['clientes_maquila']['id']+'" style="cursor:pointer;" >' +
              data +
              '</span>'
            );
          }        
        },
        {/**BWATERS */
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
           // let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones" data-id="'+full['clientes_maquila']['id']+'" style="cursor:pointer;" >' +
              data +
              '</span>'
            );
          }        
        },
        {/**MONTO TOTAL */
          // Label
          targets: 6,
          render: function (data, type, full, meta) {
           // let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones" data-id="'+full['clientes_maquila']['id']+'" style="cursor:pointer;" >$' +
              data +
              '</span>'
            );
          }        
        },
      ],
     
     
      order: [[3,'desc'],[2,'asc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      // drawCallback: function (settings) {
      //   var api = this.api();
      //   var rows = api.rows({ page: 'current' }).nodes();
      //   var last = null;

      //   api
      //     .column(groupColumn, { page: 'current' })
      //     .data()
      //     .each(function (group, i) {
      //       if (last !== group) {
      //         $(rows)
      //           .eq(i)
      //           .before('<tr class="group"><td colspan="11"><i class="fas fa-truck me-1"></i>                ' + group + '</td></tr>');//AQUI LOS CHOFERES AGRUPADOS

      //         last = group;
      //       }
      //     });
      // },
      
     
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
      filterByDate(3); // We call our filter function
      dt_p_maquila.draw();
      });
  }
}

 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  carga_tabla_pedido_maquila()
  
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
                                        </thead>`);
        $('.datatables-basic2').dataTable().fnDestroy();
        $('.datatables-basic2').empty();
        $('.datatables-basic2').html(`<thead>
        <tr>
            <th>Nº Pedido</th>
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
    </thead>`);
        
        carga_tabla_pedido_maquila('si')
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
        }
        
  
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  //ACA SE ACTIVAS LOS CONTEXT MENU
$.contextMenu({
  selector: '.hover_cliente1',
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
 
/**RESETEAR FORM */
$('#btnregistro_pedido_modal-maquila').on('click',()=>{
  $('#btn_reg_pedido-maquila').text('Registrar')
  $('.btn-pedido-maquila').remove()
  if ($('#id_cliente_qr').length >0) {
   $(`#id_cliente_reg_pedido-maquila`).val($('#id_cliente_qr').val()).trigger('change')
  }else{
    $(`#id_cliente_reg_pedido-maquila`).val('default').trigger('change')
  }
  
  $('#registro_pedido_modal-maquila .modal-footer').append(`<button tabindex="26" rippleeffect=""
  class="btn btn-primary btn-block waves-effect waves-float waves-light btn-pedido-maquila" type="button"  id="btn_reg_pedido-maquila" onclick="guardar_pedido_maquila()">Regístrar</button>`)
  $('#title-pedido-maquila').text('Agregar Cliente Maquila')
  $('#form-reg-pedido-maquila')[0].reset()
  let hoy = moment().format('YYYY-MM-DD')
  $('#fecha_pedido-maquila').val(hoy)

})
  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

  $('.datatables-basic tbody').on('click', '.share_record', function (e) {
    //dt_p_maquila.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
    /*let direction_copy = location.host + `/ver_pedido/${id_edit}`;
    $('#p1').text(direction_copy)*/
    copyToClipboard(`#CopyPedido${id_edit}`)

  });

$('#ventas_day').change(async (e)=>{
console.log(e.target.value)
let dia = moment(e.target.value,'DD-MM-YYYY').format('YYYY-MM-DD')
var ventas_day =  await fetch('/ventas-del-dia/'+dia)
     .then(response => response.json())
     .then(data => {
         console.log(data)
      return data
     });
console.log(ventas_day)
$('#ventas_del_dia').text(ventas_day.ventas_del_dia)
$('#rellenos').text(ventas_day.rellenos)
$('#bwaters').text(ventas_day.bwaters)
$('#ingresos').text(ventas_day.ingresos)
})

if ($('#id_cliente_qr').length >0) {
  console.log('testing here')
  $(`#id_cliente_reg_pedido-maquila`).val($('#id_cliente_qr').val()).trigger('change')
  $('#btnregistro_pedido_modal-maquila').trigger('click')
  $('#registro_pedido_modal-maquila').modal('show')
}

/**FIN DEL READY FUNCTION */});
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
function copyToClipboard(elemento) {
  var $temp = $("<textarea>")
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val($(elemento).html().replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();
  Swal.fire('Pedido copiado en el portapapeles')
  }
  function copyToClipboardVarios(elemento) {
    console.log(elemento)
    if ($("#checkboxSelectAll").is(':checked')) {
      console.log('borra el primero')
      var new_elemento = elemento.shift()
    }
    console.log(new_elemento)
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
//ACA REGISTRA PEDIDO AJAX
function guardar_pedido_maquila() {
  if ($('#id_cliente_reg_pedido-maquila').val() =="default") {
    Swal.fire('Debe seleccionar un cliente')
    $('#id_cliente_reg_pedido').focus()
    return
  }
if ($('#total_total_inp-maquila').val() == "0") {
    Swal.fire('Debe agregar al menos un producto para continuar')
    return
  }
  $.ajax({
    url: `/reg-pedido-maquila`,
    type: 'POST',
    data: $('#form-reg-pedido-maquila').serialize(),
    success: function (data, textStatus, jqXHR) {
      console.log(data)
      if(data.msg){
        swal.fire(data.msg)
        return
      }
      let data2 = JSON.stringify(data.pedidos_maquila_st)          
      data2.replace(/\//g, "")
      console.log(data2)

        Swal.fire('Se creó con éxito el pedido en maquila')
$('.modal').modal('hide');
$('#form-reg-pedido-maquila').trigger("reset");
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

 $('#pedidos_maquila_st').val(data2)
 $('#pedidos-maquila-table').dataTable().fnDestroy();
 $('#pedidos-maquila-table').empty();
 $('#pedidos-maquila-table').append(`<thead>
 <tr>                                                
     <th></th>
     <th>#Pedido</th>
     <th>Proveedor</th>
     <th>Fecha</th>
     <th>Rellenos</th>
     <th>BWaters</th>
     <th>Total Pagado</th>
     <th>Opciones</th>
 </tr>
</thead>`);
carga_tabla_pedido_maquila('si')
 if ($('#filterPosition').val() != "") {
   console.log($('#filterValue').val())
  $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
}
 $('.modal').modal('hide');     
      

    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
}
function guardar_edit_pedido_maquila() {
  if ($('#id_cliente_reg_pedido-maquila').val() =="default") {
    Swal.fire('Debe seleccionar un cliente')
    $('#id_cliente_reg_pedido').focus()
    return
  }
if ($('#total_total_inp-maquila').val() == "0") {
    Swal.fire('Debe agregar al menos un producto para continuar')
    return
  }
  $.ajax({
    url: `/save-edit-pedido-maquila`,
    type: 'POST',
    data: $('#form-reg-pedido-maquila').serialize(),
    success: function (data, textStatus, jqXHR) {
      console.log(data)
      if(data.msg){
        swal.fire(data.msg)
        return
      }
      let data2 = JSON.stringify(data.pedidos_maquila_st)          
      data2.replace(/\//g, "")
      console.log(data2)

        Swal.fire('Se actualizó con éxito el pedido en maquila')
$('.modal').modal('hide');
$('#form-reg-pedido-maquila').trigger("reset");
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

 $('#pedidos_maquila_st').val(data2)
 $('#pedidos-maquila-table').dataTable().fnDestroy();
 $('#pedidos-maquila-table').empty();
 $('#pedidos-maquila-table').append(`<thead>
 <tr>                                                
     <th></th>
     <th>#Pedido</th>
     <th>Proveedor</th>
     <th>Fecha</th>
     <th>Rellenos</th>
     <th>BWaters</th>
     <th>Total Pagado</th>
     <th>Opciones</th>
 </tr>
</thead>`);
carga_tabla_pedido_maquila('si')
 if ($('#filterPosition').val() != "") {
   console.log($('#filterValue').val())
  $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
}
 $('.modal').modal('hide');     
      

    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
}

function edit_pedido(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_pedido_maquila`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {

console.log(data)
$('#id_pedido-maquila').val(data['pedido_maquila_let']['id'])
$(`#id_cliente_reg_pedido-maquila`).val(data['pedido_maquila_let']['clientesMaquilaId']).trigger('change')

$('#fecha_pedido-maquila').val(data['pedido_maquila_let']['fecha_pedido'])
$('#count_relleno_garrafon').val(data['pedido_maquila_let']['rellenos'])
$('#relleno_garrafon_mont').val(data['pedido_maquila_let']['total_monto_rellenos'])
$('#count_bwaters_garrafon').val(data['pedido_maquila_let']['bwater'])
$('#bwaters_garrafon_mont').val(data['pedido_maquila_let']['total_monto_rellenos'])
$('#cant_garrafon-maquila').text(data['pedido_maquila_let']['total_garrafones_pedido'])
$('#monto_garrafon-maquila').text(data['pedido_maquila_let']['monto_total'])
$('#total_total_inp-maquila').val(data['pedido_maquila_let']['monto_total'])
$('#total_total-maquila').text(data['pedido_maquila_let']['monto_total'])
$(`#metodo_pago-maquila option[value="${data['pedido_maquila_let']['metodo_pago']}"]`).attr("selected", true)
$('#status_pago-maquila').val(data['pedido_maquila_let']['status_pago'])
$('#status_pedido-maquila').val(data['pedido_maquila_let']['status_pedido'])
$('#observacion-maquila').val(data['pedido_maquila_let']['observacion'])

$('#title-cliente-maquila').text('Editar Cliente Maquila')
$('.btn_reg_pedido-maquila').text('Guardar')
$('.btn-maquila').remove()
$('#registro_pedido_modal-maquila .modal-footer').append(`<button tabindex="26" type="button" class="btn btn-primary btn-block waves-effect waves-float waves-light btn_reg_pedido-maquila btn-maquila" onclick="guardar_edit_pedido_maquila()">Guardar</button>`)

$('#registro_pedido_modal-maquila').modal('show')
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
  let dt_p_maquila = tabla
  Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar el pedido indicado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_pedido_maquila/${id}`)
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
      console.log(dt_p_maquila)
      console.log(`${dt_p_maquila} tbody .delete-record${id}`)
      $(`${dt_p_maquila}`).DataTable().row($(`${dt_p_maquila} tbody .delete-record${id}`).parents('tr')).remove().draw();
      Swal.fire({
        title: `Pedido ${id} borrado con éxito`,
      })
      if ($('#filterPosition').val() != "") {
        console.log($('#filterValue').val())
       $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
     }
    }
  })
}
function share_record(id_) {
    //dt_p_maquila.row($(this).parents('tr')).remove().draw();
    var id_edit = id_
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
    /*let direction_copy = location.host + `/ver_pedido/${id_edit}`;
    $('#p1').text(direction_copy)*/
    copyToClipboard(`#CopyPedido${id_edit}`)
}
