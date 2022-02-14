/**
 * DataTables Basic
 */
function ClientesMaquilaTable(rechar) {
  let valor = $('#clientes_maquila').val()
  let arr_clientes =""
  if (rechar) {
    arr_clientes = JSON.parse(valor) 
    arr_clientes = JSON.parse(arr_clientes)
  }else{
    arr_clientes = JSON.parse(valor) 
  }  
  
  var dt_clientes_maquila = $('.table-clientes-maquila'), assetPath = '../../dataPY4/';

  // DataTable with buttons
  // --------------------------------------------------------------------
console.log(arr_clientes)
  if (dt_clientes_maquila.length) {
    $('.dt-column-search-clientes-maquila thead tr').clone(true).appendTo('.dt-column-search-clientes-maquila thead');
    $('.dt-column-search-clientes-maquila thead tr:eq(0) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" id="'+title+i+'"/>');
  
      $('input', this).on('keyup change', function () {
        $('#filterPosition').val(this.id)
        $('#filterValue').val(this.value)
        if (dt_c_maquila.column(i).search() !== this.value) {
          dt_c_maquila.column(i).search(this.value).draw();
        }
      });
      
    });
    $('#cliente_nuevo').on('change', function (e) {
      console.log(e)
      if ($('#cliente_nuevo').is(':checked')) {
        console.log('hello')
        if (dt_c_maquila.column(7).search() !== 'SI') {
        dt_c_maquila.column(7).search('SI').draw();
      }
      }else{
        console.log('worfdl')
        if (dt_c_maquila.column(7).search() !== '') {
          dt_c_maquila.column(7).search('').draw();
        }
      }
      
    });
    // assetPath+'./clientes.txt'
    var dt_c_maquila = dt_clientes_maquila.DataTable({
      data: arr_clientes,
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'phone' },
        { data: 'placa' },
        { data: 'vehiculo' },
        {   // Actions
          targets: -1,
          title: '',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record'+full['id']+'" onclick=\'delete_cliente("'+full['id']+'")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'edit_cliente("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  +
              '<a href="javascript:;" title="Etiqueta" class="'+full['id']+' dropdown-item edit_tag " data-bs-toggle="modal" data-id="'+full['id']+'" data-title="Cambiar tag"  data-bs-target="#ad_tag_cliente">' +
              feather.icons['tag'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' 
            );
          }  },
      ],
      columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          orderable: false,
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
        {
          // Avatar image/badge, Name and post
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
              var output =
                '<img src="' + assetPath + 'images/avatar-s-pyt4.jpg" alt="Avatar" width="32" height="32">';
        var cliente_arr = encodeURIComponent(JSON.stringify(full));
        return (`<div class="d-flex justify-content-left align-items-center">
                  <div class="avatar me-1">${output}</div>
                  <div class="d-flex flex-column">
                    <span class="hover_cliente rounded-pill" >${data}</span>
                  </div>
                </div>`)
          }
        },
        
      ],
      order: [[1, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><""<"col-sm-12 col-md-6"l><"none"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100,120,130,140,150,200],

      language: {
        "decimal": "",
      "emptyTable": "No hay información",
      "info": "Total _TOTAL_ registros",
      "infoEmpty": "Total _TOTAL_ registros",
      "infoFiltered": "(Filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ clientes",
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
  ClientesMaquilaTable()

  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 
  
/** GRABAR DATOS**/
$('.btnreg-client-maquila').on('click', async (e)=>{
  console.log('entro aqui')
      $.ajax({
        url: `/save-cliente-maquila`,
        type: 'POST',
        data: $('#reg-cliente-maquila-form').serialize(),
        success: function (data, textStatus, jqXHR) {
          console.log(data)
          let data2 = JSON.stringify(data.clientes_maquila_st)          
          data2.replace(/\//g, "")
          console.log(data2)
    $('#clientes_maquila').val(data2)
    $('.table-clientes-maquila').dataTable().fnDestroy();
    $('.table-clientes-maquila').empty();
    $('.table-clientes-maquila').append(`<thead>
    <tr>
        <th></th>
        <th>Nombre</th>
        <th>Teléfono</th>
        <th>Placa</th>
        <th>Vehiculo</th>
        <th>Opciones</th>
    </tr>
</thead>`);
    ClientesMaquilaTable('si')
    if ($('#filterPosition').val() != "") {
      console.log($('#filterValue').val())
     $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
   }
   $('#reg-cliente-maquila-form').reset()
    $('.modal').modal('hide');
    Swal.fire('Se guardo con éxito la información del cliente maquila')
        },
        error: function (jqXHR, textStatus) {
          console.log('error:' + jqXHR)
        }
      });
      
    })

    /** EDITAR DATOS **/
  $('#btn_save_edit_cliente').on('click', async (e)=>{
console.log('entro aqui')
    $.ajax({
      url: `/editar_cliente`,
      type: 'POST',
      data: $('#edit_cliente_form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
  $('#array').val(JSON.stringify(data.clientes_arr))
  $('#table-clientes-maquila').dataTable().fnDestroy();
  $('#table-clientes-maquila').empty();
  $('#table-clientes-maquila').append(` <thead>
                                        <tr>
                                            <th> </th>
                                            <th>Nombre</th>
                                            <th>Zona</th>
                                            <th>Etiqueta</th>
                                            <th>Titulo</th>
                                            <th>Teléfono</th>
                                            <th>Correo</th>  
                                            <th>Nuevo </th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>`);
  ClientesMaquilaTable('si')
  if ($('#filterPosition').val() != "") {
    console.log($('#filterValue').val())
   $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
 }
  $('.modal').modal('hide');
  Swal.fire('Se editó con éxito la información del cliente')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
});
function edit_cliente(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_cliente_id`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)
$('#cliente_nuevo_edited').attr('checked', false);  
$('#id_cliente_edited').val(data['cliente_let']['id'])
$('#firstName_edited').val(data['cliente_let']['firstName'])
$('#lastName_edited').val(data['cliente_let']['lastName'])
$('#cp_select_edited').val(data['cliente_let']['estado'])
$('#municipio_edited').val(data['cliente_let']['municipio'])

if ( $("#select_asentamiento_edited option[value='" + data['cliente_let']['cp']['id']+ "']").length == 0 ){
console.log(data['cliente_let']['tipo'])
$('#select_asentamiento_edited').prepend('<option selected value="' + data['cliente_let']['cp']['id'] + '">' + data['cliente_let']['cp']['asentamiento'] + '</option>');  
}else{
//  $('#tipo_edit').find('option:selected').remove().end();
  $("#select_asentamiento_edited option[value='" + data['cliente_let']['cp']['id'] + "']").attr("selected", true);
}

$('#coto_edited').val(data['cliente_let']['coto'])
$('#casa_edited').val(data['cliente_let']['casa'])
$('#calle_edited').val(data['cliente_let']['calle'])
$('#avenida_edited').val(data['cliente_let']['avenida'])
$('#referencia_edited').val(data['cliente_let']['referencia'])
$('#telefono_edited').val(data['cliente_let']['telefono'])

$('#nombre_familiar_1_edited').val(data['cliente_let']['nombre_familiar_1'])
$('#apellido_familiar_1_edited').val(data['cliente_let']['apellido_familiar_1'])
$('#telefono_familiar_1_edited').val(data['cliente_let']['telefono_familiar_1'])
$('#nombre_familiar_2_edited').val(data['cliente_let']['nombre_familiar_2'])
$('#apellido_familiar_2_edited').val(data['cliente_let']['apellido_familiar_2'])
$('#telefono_familiar_2_edited').val(data['cliente_let']['telefono_familiar_2'])

if ( $("#tipo_cliente_edited option[value='" + data['cliente_let']['tipo'] + "']").length == 0 ){
  $('#tipo_cliente_edited').prepend('<option selected value="' + data['cliente_let']['tipo'] + '">' + data['cliente_let']['tipo'] + '</option>');  
  }else{
  //  $('#metodo_pago_edit').find('option:selected').remove().end();
    $("#tipo_cliente_edited option[value='" + data['cliente_let']['tipo'] + "']").attr("selected", true);
  }
  if ( data['cliente_let']['nuevo']=="SI" ){
    $('#cliente_nuevo_edited').attr('checked', true);  
    }
$('#fecha_ultimo_pedido').val(data['cliente_let']['fecha_ultimo_pedido'])
$('#utimos_botellones_edited').val(data['cliente_let']['ultimos_botellones'])

if ( $("#zona_clientes_edited option[value='" + data['cliente_let']['sucursaleId'] + "']").length == 0 ){
  $('#zona_clientes_edited').prepend('<option selected value="' + data['cliente_let']['sucursaleId'] + '">' + data['cliente_let']['sucursaleId'] + '</option>');  
  }else{
  //  $('#metodo_pago_edit').find('option:selected').remove().end();
    $("#zona_clientes_edited option[value='" + data['cliente_let']['sucursaleId'] + "']").attr("selected", true);
  }
  $('#correo_edit_cliente_edited').val(data['cliente_let']['email'])
$('#edit_cliente').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
function delete_cliente(id_) {
  if ($('#otro_rol').length) {
    console.log('no eres admin')
    Swal.fire("Función valida solo para directores")
    return
  }
  if (typeof id_ =="undefined") {
    return console.log(id_)
  }
  var id = id_
  Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar el cliente indicado, se borraran los pedidos de ese cliente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_cliente/${id}`)
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
      console.log(result)
      $('.table-clientes').DataTable().row($(`.table-clientes tbody .delete-record${id}`).parents('tr')).remove().draw();
      Swal.fire({
        title: `Cliente ${id} borrado con éxito`,
      })
    }
  })
}