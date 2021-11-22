/**
 * DataTables Basic
 */
function cargaZonas(editar) {
  let valor_sucursales = $('#array_sucursales').val()
  let array_sucursales =""
  if (editar) {
    
    array_sucursales = JSON.parse(valor_sucursales)

  }else{
    array_sucursales = JSON.parse(valor_sucursales.replace(/&quot;/g,'"'))
  }
  
console.log(valor_sucursales)  

  var dt_basic_table_sucursales = $('.datatables-basic_sucursales'),
    dt_date_table = $('.dt-date'),
    assetPath = '../../dataPY4/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
  console.log('aqui')
  if (dt_basic_table_sucursales.length) {
    
    var dt_basic_sucursales = dt_basic_table_sucursales.DataTable({
      data: array_sucursales,
      columns: [
        { data: 'id' },
        { data: 'nombre' },
        { data: 'telefono'  },
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'" onclick=\'delete_zone("'+full['id']+'")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item " onclick=\'edit_zona("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  
            );
          }  },
      ],
      columnDefs: [
    
      ],
      order: [[2, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><"none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }
}
 $(function () {
  'use strict';
  cargaZonas()



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
      dt_basic_sucursales.row
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
  $('.datatables-basic_sucursales tbody').on('click', '.delete-record', function (e) {
   //dt_basic.row($(this).parents('tr')).remove().draw();
   var id = e.target.classList[0]
    Swal.fire({
      title: 'Eliminar',
      text: "Seguro desea eliminar la zona indicada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`/delete_sucursales/${id}`)
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
        $('.datatables-basic_sucursales').DataTable().row($(this).parents('tr')).remove().draw();
        Swal.fire({
          title: `Zona ${id} borrado con éxito`,
        })
      }
    })
  });

  $('.datatables-basic_sucursales tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_sucursales/${id_edit}`;

  });
  $('#edit_zona_save').on('click', async (e)=>{
 
    if ($('#nombre_zona_edit').val() =="") {
      Swal.fire('Debe colocar un nombre')
      return
    }
    if ($('#tlf_zona_edit').val() =="") {
      Swal.fire('Debe colocar un teléfono')
      return
    }
    $.ajax({
      url: `/editar_sucursales_save`,
      type: 'POST',
      data: $('#editar_zona').serialize(),
      success: function (data, textStatus, jqXHR) {
        $('#array_sucursales').val(JSON.stringify(data.sucursales_let))
        $('.datatables-basic_sucursales').dataTable().fnDestroy();
         $('.datatables-basic_sucursales').empty();
        $('.datatables-basic_sucursales').html(`<thead>
        <tr>
          <th>id</th>
          <th>Nombre</th>                              
          <th>Teléfono</th>
          <th>Opciones</th>
        </tr>
      </thead>`);
      cargaZonas('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
});
function edit_zona(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_sucursales`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)
$('#edit_id_zona').val(data['sucursales_let']['id'])
$('#nombre_zona_edit').val(data['sucursales_let']['nombre'])
$('#tlf_zona_edit').val(data['sucursales_let']['telefono'])

$('#edit_zone').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
function delete_zone(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
  var id = id_edit
  Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar la zona indicada",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_sucursales/${id}`)
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
      $('.datatables-basic_sucursales').DataTable().row($('.datatables-basic_sucursales tbody .delete-record').parents('tr')).remove().draw();
      Swal.fire({
        title: `Zona ${id} borrado con éxito`,
      })
    }
  })
}
