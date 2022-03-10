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
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record'+full['id']+'" onclick=\'delete_cliente_maquila("'+full['id']+'")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'edit_cliente_maquila("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  +
              '<a href="javascript:;" title="QR" class="'+full['id']+' dropdown-item edit_tag " onclick=\'verQRCliente("'+full['id']+'")\'>' +
              feather.icons['slack'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
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
  $('#btnadd_cliente-maquila').on('click',()=>{
    $('.btnreg-client-maquila').text('Registrar')
    $('.btn-maquila').remove()
    $('#add_cliente-maquila .modal-footer').append(`<button tabindex="26" type="button" class="btn btn-primary btn-block waves-effect waves-float waves-light btnreg-client-maquila btn-maquila" onclick="registrarclienteMa()">Registrar</button>`)
    $('#title-cliente-maquila').text('Agregar Cliente Maquila')
    $('#reg-cliente-maquila-form')[0].reset()

  })
  $('#btnadd_cliente_res-maquila').on('click',()=>{
    $('.btnreg-client-maquila').text('Registrar')
    $('.btn-maquila').remove()
    $('#add_cliente-maquila .modal-footer').append(`<button tabindex="26" type="button" class="btn btn-primary btn-block waves-effect waves-float waves-light btnreg-client-maquila btn-maquila" onclick="registrarclienteMa()">Registrar</button>`)
    $('#title-cliente-maquila').text('Agregar Cliente Maquila')
    $('#reg-cliente-maquila-form')[0].reset()

  })

});
function edit_cliente_maquila(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_cliente_manila`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data) 
$('#id_cliente-maquila').val(data['cliente_let']['id'])
$('#name_maquila').val(data['cliente_let']['name'])
$('#tlf_maquila').val(data['cliente_let']['phone'])
$('#vehiculo_maquila').val(data['cliente_let']['vehiculo'])
$('#placa_maquila').val(data['cliente_let']['placa'])
$('#title-cliente-maquila').text('Editar Cliente Maquila')
$('.btnreg-client-maquila').text('Guardar')
$('.btn-maquila').remove()
$('#add_cliente-maquila .modal-footer').append(`<button tabindex="26" type="button" class="btn btn-primary btn-block waves-effect waves-float waves-light btnedit-client-maquila btn-maquila" onclick="saveEditarclienteMa()">Guardar</button>`)
$('#add_cliente-maquila').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
function delete_cliente_maquila(id_) {
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
      return fetch(`/delete_cliente_maquila/${id}`)
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
      $('.table-clientes-maquila').DataTable().row($(`.table-clientes-maquila tbody .delete-record${id}`).parents('tr')).remove().draw();
      Swal.fire({
        title: `Cliente ${id} borrado con éxito`,
      })
    }
  })
}
const  registrarclienteMa = ()=>{
  if ($('#name_maquila').val()=="") {
      $('#name_maquila').focus()
      return
  }
  if ($('#tlf_maquila').val()=="") {
$('#tlf_maquila').focus() 
return
  }
  if ($('#vehiculo_maquila').val()=="") {
$('#vehiculo_maquila').focus()
return
  }
  if ($('#placa_maquila').val()=="") {
$('#placa_maquila').focus()
return
  }
    $.ajax({
      url: `/save-cliente-maquila`,
      type: 'POST',
      data: $('#reg-cliente-maquila-form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        if(data.msg){
          swal.fire(data.msg)
          return
        }
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
 $('#reg-cliente-maquila-form')[0].reset()
  $('.modal').modal('hide');
  Swal.fire('Se guardo con éxito la información del cliente maquila')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
  
      
}
const  saveEditarclienteMa = ()=>{
  console.log('entro aqui')
      $.ajax({
        url: `/save-edit-cliente-maquila`,
        type: 'POST',
        data: $('#reg-cliente-maquila-form').serialize(),
        success: function (data, textStatus, jqXHR) {
          console.log(data)
          if(data.msg){
            swal.fire(data.msg)
            return
          }
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
   $('#reg-cliente-maquila-form')[0].reset()
    $('.modal').modal('hide');
    Swal.fire('Se actualizó con éxito la información del cliente maquila')
        },
        error: function (jqXHR, textStatus) {
          console.log('error:' + jqXHR)
        }
      });
}
function verQRCliente(id) {
  $('#qrcode').empty()
  new QRCode(document.getElementById("qrcode"), {
    text: "https://alcalina.bwater.mx/maquila-qr/"+id,
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
});
$('#ver_qr').modal('show')
}