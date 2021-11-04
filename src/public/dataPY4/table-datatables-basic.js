/**
 * DataTables Basic
 */
function cargaTabla(rechar) {
  let valor = $('#array').val()
  console.log(valor)
  let array =""
  if (rechar) {
    console.log(rechar)
    console.log(valor)
    array = JSON.parse(valor)

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
              '<a href="javascript:;" class="'+full['id']+' dropdown-item edit_record ">' +
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
          // Avatar image/badge, Name and post
          targets: 0,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            console.log("a"+full['firstName'])
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
              '<small class="emp_post text-truncate text-muted">' +
              $post +
              '</small>' +
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
      order: [[2, 'desc']],
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
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_cliente/${id_edit}`;

  });

  $('.datatables-basic tbody').on('click', '.edit_tag', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    
  });

  $("#ad_tag_cliente").on('show.bs.modal', function (e) {
    var triggerLink = $(e.relatedTarget);
    var id_cliente = triggerLink.data("id");
    var title = triggerLink.data("title");
    $("#modal_detail_garrafonesTitle").text(title); 
  //  $("#home_modalBody").append(txt2);
  $("#modal_detail_garrafonesBody").empty() 
 $("#id_ad_tag_cliente").val(id_cliente);
});

$('#btn_asignar_tag').on('click', async (e)=>{
  if ($('#color_tag').val() =="default") {
    Swal.fire('Debe seleccionar una etiqueta')
    return
  }
  const data_C = new FormData();
  data_C.append("id", $("#id_ad_tag_cliente").val());
  data_C.append("color", $('#color_tag').val());
  $.ajax({
    url: `/ad_tag_cliente`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data, textStatus, jqXHR) {
$('#array').val(JSON.stringify(data.clientes_arr))
$('#exampleClientes').dataTable().fnDestroy();
$('#exampleClientes').empty();
$('#exampleClientes').append(` <thead>
<tr>

  <th>Usuario</th>
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
