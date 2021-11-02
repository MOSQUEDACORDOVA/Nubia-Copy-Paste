/**
 * DataTables Basic
 */
function cargaTablaEtiquetas(rechar) {
  let valor_etiquetas = $('#etiquetas_').val()
  let array_etiquetas =""
  if (rechar) {
    console.log(rechar)
    array_etiquetas = JSON.parse(valor_etiquetas)

  }else{
    array_etiquetas = JSON.parse(valor_etiquetas.replace(/&quot;/g,'"')) 
  }

  var dt_basic_table_etiquetas = $('.datatables-basicEtiquetas'),
    dt_date_table = $('.dt-date'),
    assetPath = '../../dataPY4/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
  if (dt_basic_table_etiquetas.length) {
    var dt_basic_etiquetas = dt_basic_table_etiquetas.DataTable({
      data: array_etiquetas,
      columns: [
        { data: 'id' },
        { data: 'etiquetas' },
        { data: 'color' },
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item edit_record">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  
            );
          }  },
      ],
      columnDefs: [        
        {
          // Label
          targets: 2,
          render: function (data, type, full, meta) {
            return (
             `<span class="badge rounded-pill" style="background-color: ${data}; display:block" </span>`
            );
          }
        },
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
  cargaTablaEtiquetas()
  // Flat Date picker
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
      dt_basic_etiquetas.row
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
  $('#exampleEtiquetas tbody').on('click', '.delete-record', function (e) {
   //dt_basic.row($(this).parents('tr')).remove().draw();
   var id = e.target.classList[0]
   Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar la etiqueta indicada",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_etiqueta/${id}`)
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
      console.log(result.value.etiquetas_let)
      var opts = result.value.etiquetas_let;
      $('#exampleEtiquetas').DataTable().row($(this).parents('tr')).remove().draw();
      $("#color_tag").find('option').not(':first').remove();
      $.each(opts, function(i, d) {
        console.log(d)
        // You will need to alter the below to get the right values from your json object.  Guessing that d.id / d.modelName are columns in your carModels data
        $('#color_tag').append('<option value="' + d.id + '">' + d.etiquetas + '</option>');
    });
      Swal.fire({
        title: `Etiqueta ${id} borrada con éxito`,
      })
    }
  })
  });

  $('.datatables-basic_etiquetas tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_etiquetas/${id_edit}`;

  });

   $('#btn_crear_tag').on('click', async (e)=>{
    if ($('#nombre_color_tag_crear').val() =="") {
      Swal.fire('Debe colocar nombre a etiqueta')
      return
    }
    const data_C = new FormData();
    data_C.append("id", $("#id_ad_tag_cliente").val());
    data_C.append("color", $('#color_tag').val());
    $.ajax({
      url: `/save_etiqueta`,
      type: 'POST',
      data: $('#form_crear_tag').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
  //$('#etiquetas_').val(JSON.stringify(data.etiquetas_let))
//   $('#exampleEtiquetas').dataTable().fnDestroy();
//   $('#exampleEtiquetas').empty();
//   $('#exampleEtiquetas').append(` <thead>
//   <tr>
//       <th>Id</th>
//       <th>Nombre de etiqueta</th>
//       <th>Color</th>
//       <th>Opciones</th>
//   </tr>
// </thead>`);
$('#exampleEtiquetas').DataTable().row.add({
  id: data.respuesta_let.id,
  etiquetas: data.respuesta_let.etiquetas,
  color: data.respuesta_let.color,
})
.draw();
var opts = data;
$.each(opts, function(i, d) {
        console.log(d)
        // You will need to alter the below to get the right values from your json object.  Guessing that d.id / d.modelName are columns in your carModels data
        $('#color_tag').append('<option value="' + d.id + '">' + d.etiquetas + '</option>');
    });
//cargaTablaEtiquetas('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
});
