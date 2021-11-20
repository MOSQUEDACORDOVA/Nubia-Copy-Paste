/**
 * DataTables Basic
 */
function cargaTabla(rechar) {
  let valor = $('#array').val()
  let array =""
  if (rechar) {
    array = JSON.parse(valor)
console.log(array)
  }else{
   array = JSON.parse(valor.replace(/&quot;/g,'"')) 
  }
  
  

  var dt_basic_table = $('.datatables-basic'),
    dt_date_table = $('.dt-date'),  assetPath = '../../dataPY4/';;

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    $('.dt-column-searchClientes thead tr').clone(true).appendTo('.dt-column-searchClientes thead');
    $('.dt-column-searchClientes thead tr:eq(0) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic.column(i).search() !== this.value) {
          dt_basic.column(i).search(this.value).draw();
        }
      });
    });
    // assetPath+'./clientes.txt'
    var dt_basic = dt_basic_table.DataTable({
      data: array,
      columns: [
        { data: 'id' },
        { data: 'firstName' },
        { data: 'email' }, 
        { data: 'telefono' },
        {   // Actions
          targets: -1,
          title: '',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record ">' +
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
            var $user_img = "-",
              $name = full['firstName'] + " " + full['lastName'],
              $post = "Cliente";
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="' + assetPath + 'images/avatar-s-pyt4.jpg" alt="Avatar" width="32" height="32">';
            } else {
              // For Avatar badge
              var stateNum = full['status'];
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-content">' + $initials + '</span>';
            }

            var colorClass = $user_img === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var color_tag ="", color_text=""
            if (full['etiqueta'] ==null) {
              color_tag =0
              color_text="black"
            }else{
              color_tag =full['etiqueta']['color']
              color_text="white"
            }
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1">' +
              $output +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate fw-bold badge rounded-pill" style="background-color: ' +color_tag  + '; color:'+color_text+'">' +
              $name +
              '</span>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['telefono'];
            var $status = {
              1: { title: 'Current', class: 'badge-light-primary' },
              2: { title: 'Professional', class: ' badge-light-success' },
              3: { title: 'Rejected', class: ' badge-light-danger' },
              4: { title: 'Resigned', class: ' badge-light-warning' },
              5: { title: 'Applied', class: ' badge-light-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status_number +
              '</span>'
            );
          }
        },
      ],
      order: [[1, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><"none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }

}

 $(function () {
  'use strict';
  cargaTabla()

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
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 
  // Delete Record
  $('.datatables-basic tbody').on('click', '.delete-record', function (e) {
   //dt_basic.row($(this).parents('tr')).remove().draw();
   var id = e.target.classList[0]
   Swal.fire({
     title: 'Eliminar',
     text: "Seguro desea cliente, tambien se borraran los pedidos de dicho cliente",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     cancelButtonText: 'Cancelar',
     confirmButtonText: 'Eliminar'
   }).then((result) => {
     if (result.isConfirmed) {
       window.location.href = `/delete_cliente/${id}`;
     }
   })
  });

  $('.datatables-basic tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    if (typeof id_edit =="undefined") {
      return
    }
  window.location.href = `/editar_cliente/${id_edit}`;

  });

  $('.datatables-basic tbody').on('click', '.edit_tag', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    
  });

  $("#ad_tag_cliente").on('show.bs.modal', function (e) {
    var triggerLink = $(e.relatedTarget);
    var id_cliente = triggerLink.data("id");
    var title = triggerLink.data("title");
    $("#modal_detail_garrafonesTitle").text(title); 
  //  $("#home_modalBody").append(txt2);
  $("#modal_detail_garrafonesBody").empty() 
 $("#id_ad_tag_cliente").val(id_cliente);
 console.log($("#id_ad_tag_cliente").val())
});


$('#btn_asignar_tag').on('click', async (e)=>{
  console.log($('#color_tag_cliente').val())
  if ($('#color_tag_cliente').val() =="default") {
    Swal.fire('Debe seleccionar una etiqueta')
    return
  }
  const data_C = new FormData();
  data_C.append("id", $("#id_ad_tag_cliente").val());
  data_C.append("color", $('#color_tag_cliente').val());
  $.ajax({
    url: `/ad_tag_cliente`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data, textStatus, jqXHR) {
      console.log(data)
$('#array').val(JSON.stringify(data.clientes_arr))
$('#exampleClientes').dataTable().fnDestroy();
$('#exampleClientes').empty();
$('#exampleClientes').append(` <thead>
                                        <tr>
                                            <th> </th>
                                            <th>Cliente</th>
                                            <th>Correo</th>
                                            <th>Teléfono</th>   
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>`);
cargaTabla('si')
$('.modal').modal('hide');
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
  
})

$("#button_change_zone").on('click', function (e) {
  let valoresCheck = [];

  $("input[type=checkbox]:checked").each(function(){
      valoresCheck.push(this.value);
  });
  if (valoresCheck.length == 0) {    
    
    Swal.fire('Debe seleccionar por lo menos un cliente para hacer el cambio de zona')

    return
  }else{
    $('#change_zone').modal('show')
  }
$("#ids_cli").val(valoresCheck);
});
  $('#change_zone_btn').on('click', async (e)=>{
    if ($('#zona_clientes').val() =="Seleccione una Zona") {
      Swal.fire('Debe seleccionar una zona')
      return
    }

    $.ajax({
      url: `/change_zone_client`,
      type: 'POST',
      data: $('#change_zone_form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
  $('#array').val(JSON.stringify(data.clientes_arr))
  $('#exampleClientes').dataTable().fnDestroy();
  $('#exampleClientes').empty();
  $('#exampleClientes').append(` <thead>
                                          <tr>
                                              <th> </th>
                                              <th>Cliente</th>
                                              <th>Correo</th>
                                              <th>Teléfono</th>   
                                              <th>Opciones</th>
                                          </tr>
                                      </thead>`);
  cargaTabla('si')
  $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#btn_save_edit_cliente').on('click', async (e)=>{

    $.ajax({
      url: `/editar_cliente`,
      type: 'POST',
      data: $('#edit_cliente_form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
  $('#array').val(JSON.stringify(data.clientes_arr))
  $('#exampleClientes').dataTable().fnDestroy();
  $('#exampleClientes').empty();
  $('#exampleClientes').append(` <thead>
                                          <tr>
                                              <th> </th>
                                              <th>Cliente</th>
                                              <th>Correo</th>
                                              <th>Teléfono</th>   
                                              <th>Opciones</th>
                                          </tr>
                                      </thead>`);
  cargaTabla('si')
  $('.modal').modal('hide');
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

$('#fecha_ultimo_pedido').val(data['cliente_let']['fecha_ultimo_pedido'])
$('#utimos_botellones_edited').val(data['cliente_let']['ultimos_botellones'])

if ( $("#zona_clientes_edited option[value='" + data['cliente_let']['sucursaleId'] + "']").length == 0 ){
  console.log(data['cliente_let']['metodo_pago'])
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