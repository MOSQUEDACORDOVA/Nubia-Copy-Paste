/**
 * DataTables Basic
 */
 
function cargaTabla(rechar) {
  let valor = $('#array').val();
  let array ="";
  if (rechar) {
    array = JSON.parse(valor);
    console.log(array);
  }else{
   array = JSON.parse(valor.replace(/&quot;/g,'"')) ;
  }
  
  let sucursales = $('#array_sucursales').val();
  let array_sucursales = JSON.parse(sucursales.replace(/&quot;/g,'"'));

  let codigosP = $('#array_cp').val();
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'));
  var dt_basic_table = $('.datatables-basic'),
    dt_date_table = $('.dt-date'),  assetPath = '../../dataPY4/';

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    $('.dt-column-searchClientes thead tr').clone(true).appendTo('.dt-column-searchClientes thead');
    $('.dt-column-searchClientes thead tr:eq(0) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" id="'+title+i+'"/>');
  
      $('input', this).on('keyup change', function () {
        $('#filterPosition').val(this.id);
        $('#filterValue').val(this.value);
        if (dt_basic.column(i).search() !== this.value) {
          dt_basic.column(i).search(this.value).draw();
        }
      });
      
    });
    $('#cliente_nuevo').on('change', function (e) {
      if ($('#cliente_nuevo').is(':checked')) {
        if (dt_basic.column(10).search() !== 'SI') {
        dt_basic.column(10).search('SI').draw();
      }
      }else{
        if (dt_basic.column(10).search() !== '') {
          dt_basic.column(10).search('').draw();
        }
      }
      
    });
    $('#view-puntosVenta').on('change', function (e) {
      if ($('#view-puntosVenta').is(':checked')) {
        if (dt_basic.column(1).search() !== 'Punto de venta') {
        dt_basic.column(1).search('Punto de venta').draw();
      }
      }else{
        if (dt_basic.column(1).search() !== '') {
          dt_basic.column(1).search('').draw();
        }
      }
      
    });
    $('#view-Negocios').on('change', function (e) {
      if ($('#view-Negocios').is(':checked')) {
        if (dt_basic.column(1).search() !== 'Negocio') {
        dt_basic.column(1).search('Negocio').draw();
      }
      }else{
        if (dt_basic.column(1).search() !== '') {
          dt_basic.column(1).search('').draw();
        }
      }
      
    });
    console.log(array)
    // assetPath+'./clientes.txt'
    var dt_basic = dt_basic_table.DataTable({
      data: array,
      columns: [
        { data: 'id' },
        { data: 'firstName' },
        { data: 'sucursaleId' },
        { data: 'etiqueta' },
        { data: 'id' },
        { data: 'telefono' },
        { data: 'email' }, 
        { data: 'cantidad_referidos' }, 
        { data: 'id' },
        { data: 'enabled' }, 
        { data: 'nuevo' }, 
        {   // Actions
          targets: -1,
          title: '',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
             ` <div class="">
                    <a href="#" class="dropdown-toggle text-center text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown">
                      ${feather.icons["more-vertical"].toSvg()}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 40px);">
                    <div class="d-inline-flex">
                    <a href="javascript:;" class="${full['id']} dropdown-item delete-record${full['id']}" onclick=\'delete_cliente("${full['id']}")\'>
                   ${feather.icons['trash-2'].toSvg()} 
                    </a>
                    <a href="javascript:;" class="${full['id']} dropdown-item" onclick=\'edit_cliente("${full['id']}")\'>
                    ${feather.icons['file-text'].toSvg()}
                    </a>
                    <a href="javascript:;" title="Etiqueta" class="${full['id']} dropdown-item edit_tag " data-bs-toggle="modal" data-id="${full['id']}" data-title="Cambiar tag"  data-bs-target="#ad_tag_cliente">
                    ${feather.icons['tag'].toSvg()}
                    </a>
                    <a href="javascript:;" class="${full['id']} dropdown-item share_record ${full['id']}" onclick=\'share_record("${full['id']}")\'>
                    ${feather.icons['share-2'].toSvg()}
                    </a>
                    <a id="CopyPedido${full['id']}" class="d-none"></a>
                </div>`
               
             //https://alcalina.bwater.mx/referido-bwater/${full['id']}
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
            let asentamiento = ""
            for (let i = 0; i < codigosP_arr.length; i++) {
              if (codigosP_arr[i]['id'] == full['cpId']) {
                asentamiento = codigosP_arr[i]['asentamiento']
              }
              
            }
            var $user_img = "-"
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="' + assetPath + 'images/avatar-s-pyt4.jpg" alt="Avatar" width="32" height="32">';
            }
            var $status_number = full['tipo'];
            var $status = {
              "Residencial": { title: full['firstName'] +" "+ full['lastName'] + " / "+ asentamiento, class: 'badge-light-info' },
              "Punto de venta": { title: full['firstName'] +" "+ full['lastName'] + " / "+ asentamiento, class: ' badge-light-success' },
              "Negocio": { title: full['firstName'] +" "+ full['lastName'] + " / "+ asentamiento, class: ' badge-light-danger' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
        var color_tag ="", color_text="";
        if (full['etiqueta'] ==null) {
          color_tag =0
          color_text="black"
        }else{
          color_tag =full['etiqueta']['color']
          color_text="white"
        }
        //aqui activa el modal info del cliente
            return (`<div class="d-flex justify-content-left align-items-center">
            <div class="avatar me-1">${$output}</div>
            <div class="d-flex flex-column">
              <span class="hover_cliente badge rounded-pill ${$status[$status_number].class}" >${$status[$status_number].title}</span>
              <span class="d-none" > ${full['tipo']}</span>
              </div>
              </div>`
            );
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            let sucursal_name=""
            for (let i = 0; i < array_sucursales.length; i++) {
              if (array_sucursales[i]['id']==data) {
                sucursal_name =array_sucursales[i]['nombre']  
              }
              
            }
            return (
              '<span class="badge rounded-pill badge-light-success' +
              '" >' +
              sucursal_name +
              '</span>'
            );
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 3,
          render: function (data, type, full, meta) {
      if (data == null) {
        return "Sin etiqueta"
      }else{
        return data['etiquetas']
      }
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 3,
          render: function (data, type, full, meta) {
         
        return "S/T"
          }
        },
        {
          targets: 8,
          render: function(data, type, full, meta){
            let referidos = [];
          for (let i = 0; i < array.length; i++) {
            if (array[i].referido_de == data) {
              referidos.push(array[i])
            }
          }
          var arrRef = encodeURIComponent(JSON.stringify(referidos));
          let ver = `<span class="referidos" data-referidos="${arrRef}">Ver</span>`
          return ver;
          }
        },
        {
          targets: 9,
          render: function (data, type, full, meta) {
            // var idx = dt_basic_table.DataTable().row( this ).index()
            // console.log(idx)
            var statusObj = {
              1: { title: 'Activo', class: 'badge-light-success' },
              0: { title: 'Inactivo', class: 'badge-light-secondary' }
            };
            var status = data;
            return (`<span class="badge rounded-pill ${statusObj[status].class}" text-capitalized onclick="DisEn('${full['id']}','${data}')" style="cursor: pointer">${statusObj[status].title}</span>`
            );
          }
        },
        {
          targets: 10,visible: false
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
   if ($('#otro_rol').length) {
    console.log('no eres admin')
    Swal.fire("Función valida solo para directores")
    return
  }
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
$('#exampleClientes').append(`<thead>
<tr>
    <th> </th>
    <th>Nombre</th>
    <th>Zona</th>
    <th>Etiqueta</th>
    <th>Titulo</th>
    <th>Teléfono</th>
    <th>Correo</th> 
    <th>Descuentos Disp.</th>
    <th>Referidos</th>
    <th>Estado</th>     
    <th>Nuevo </th>
    <th>Opciones</th>
</tr>
</thead>`);
cargaTabla('si')
if ($('#filterPosition').val() != "") {
  console.log($('#filterValue').val())
 $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
}
$('.modal').modal('hide');
Swal.fire('Se asignó con éxito la(s) etiqueta al cliente')
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + JSON.stringify(jqXHR))
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

$("#button_change_tags").on('click', function (e) {
  let valoresCheck = [];

  $("input[type=checkbox]:checked").each(function(){
      valoresCheck.push(this.value);
  });
  if (valoresCheck.length == 0) {    
    
    Swal.fire('Debe seleccionar por lo menos un cliente para hacer el cambio de etiqueta')

    return
  }else{
    $('#ad_tag_cliente').modal('show')
  }
$("#id_ad_tag_cliente").val(valoresCheck);
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
  $('#exampleClientes').append(`<thead>
  <tr>
      <th> </th>
      <th>Nombre</th>
      <th>Zona</th>
      <th>Etiqueta</th>
      <th>Titulo</th>
      <th>Teléfono</th>
      <th>Correo</th> 
      <th>Descuentos Disp.</th>
      <th>Referidos</th>
      <th>Estado</th>     
      <th>Nuevo </th>
      <th>Opciones</th>
  </tr>
</thead>`);
  cargaTabla('si')
  if ($('#filterPosition').val() != "") {
    console.log($('#filterValue').val())
   $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
 }
  $('.modal').modal('hide');
  Swal.fire('Se cambió con éxito la(s) Zona')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#btn_save_edit_cliente').on('click', async (e)=>{
console.log('entro aqui')
    $.ajax({
      url: `/editar_cliente`,
      type: 'POST',
      data: $('#edit_cliente_form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array').val(JSON.stringify(data.clientes_arr))
  $('#exampleClientes').dataTable().fnDestroy();
  $('#exampleClientes').empty();
  $('#exampleClientes').append(`<thead>
  <tr>
      <th> </th>
      <th>Nombre</th>
      <th>Zona</th>
      <th>Etiqueta</th>
      <th>Titulo</th>
      <th>Teléfono</th>
      <th>Correo</th> 
      <th>Descuentos Disp.</th>
      <th>Referidos</th>
      <th>Estado</th>     
      <th>Nuevo </th>
      <th>Opciones</th>
  </tr>
</thead>`);
  cargaTabla('si')
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

  $('#add_cliente_modal').click(()=>{
    if ($('#nombre-cliente-reg').val() == "") {
      Swal.fire('Debe colocar un nombre al cliente')
      return $('#nombre-cliente-reg').focus()
      
    }
    if ($('#apellido-cliente-reg').val() == "") {
      Swal.fire('Debe colocar un número de teléfono')
      return $('#apellido-cliente-reg').focus()
      
    }
    if ($('#select_asentamiento').val() == null) {
      Swal.fire('Debe ingresar el código postal')
     return $('#cp_select').focus()
    }
    if ($('#tlf-add-cliente').val() == "") {
      Swal.fire('Debe colocar un número de teléfono')
     return $('#tlf-add-cliente').focus()
    }
if ($('#reg_zona_cliente').val() == '0') {
      Swal.fire('Debe colocar una zona de cliente')
    return  $('#reg_zona_cliente').focus()
    }

if ($('#color_tag_reg_cliente').val() == '0') {
      Swal.fire('Debe colocar una etiqueta al cliente')
     return $('#color_tag_reg_cliente').focus()
    }

    $.ajax({
      url: `/save_cliente_py4`,
      type: 'POST',
      data: $('#form_reg_cliente').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        if (data.error) {
          $('.modal').modal('hide');
          Swal.fire(data.error)
          return
        }
        $('#form_reg_cliente')[0].reset()
        $('#array').val(JSON.stringify(data.clientes))
        $('#exampleClientes').dataTable().fnDestroy();
        $('#exampleClientes').empty();
        $('#exampleClientes').append(`<thead>
        <tr>
            <th> </th>
            <th>Nombre</th>
            <th>Zona</th>
            <th>Etiqueta</th>
            <th>Titulo</th>
            <th>Teléfono</th>
            <th>Correo</th> 
            <th>Descuentos Disp.</th>
            <th>Referidos</th>
            <th>Estado</th>     
            <th>Nuevo </th>
            <th>Opciones</th>
        </tr>
    </thead>`);
        cargaTabla('si')
        if ($('#filterPosition').val() != "") {
          console.log($('#filterValue').val())
         $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
       }
        $('.modal').modal('hide');
        Swal.fire('Se creó con éxito al cliente')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
  })
  $('#btn_add_cp').click(()=>{
    if ($('#cp_add').val() == "") {
      Swal.fire('Debe colocar un código postal')
     return $('#cp_add').focus()
    }
  if ($('#asentamiento_add').val() == '') {
      Swal.fire('Debe colocar asentamiento')
    return  $('#asentamiento_add').focus()
    }
  
  if ($('#municipio_add').val() == '0') {
      Swal.fire('Debe seleccionar un municipio')
     return $('#municipio_add').focus()
    }
  
    $.ajax({
      url: `/save_cp_new`,
      type: 'POST',
      data: $('#agregar_cp').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        if (data.error) {
          $('#add_cp').modal('hide');
          Swal.fire(data.error)
          return
        }
        $('#agregar_cp')[0].reset()
  $('#add_cp').modal('hide');
  Swal.fire('Se creó con éxito asentamiento')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
  })

  $.contextMenu({
    selector: '.referidos',
    trigger: 'hover',
    autoHide: true,
    build: function ($trigger, e) {
      var Array = e.currentTarget['dataset']["referidos"];
       var referidos = JSON.parse(decodeURIComponent(Array));
     console.log(referidos);
      var items1;
     if (referidos.length == 0) {
        items1 = {"Referido-1": {name: `Ref:  No tiene referidos`}};
     }else{
       items1 = {"Referido-1": {name: `Ref:  ${referidos[0]['firstName']} ${referidos[0]['lastName']}`}};
 for (let i = 0; i < referidos.length; i++) {
        var newUser = "Referido-" + i;
        items1[newUser] = {name: `Ref:  ${referidos[i]['firstName']} ${referidos[0]['lastName']}`}
      }
     }
    
     
     console.log(items1)
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
                console.log(m);
            },
            items: 
            items1
            
        };
    }
  });
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
$('#descuento-edit-cliente').addClass('d-none');
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
  if (data['cliente_let']['tipo']=="Negocio" || data['cliente_let']['tipo'] =="Punto de venta") {
    $('#descuento-edit-cliente').removeClass('d-none');
    $('#descuento_edit_cliente1').val(data['cliente_let']['monto_nuevo']);
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
    text: "Seguro desea eliminar el cliente indicado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (de) => {
      return fetch(`/delete_cliente/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        }).then((data) => {
          console.log(data);
          if (data.Disabled) {
            $('#array').val(JSON.stringify(data.clientes_arr))
        $('#exampleClientes').dataTable().fnDestroy();
        $('#exampleClientes').empty();
        $('#exampleClientes').append(`<thead>
        <tr>
            <th> </th>
            <th>Nombre</th>
            <th>Zona</th>
            <th>Etiqueta</th>
            <th>Titulo</th>
            <th>Teléfono</th>
            <th>Correo</th> 
            <th>Descuentos Disp.</th>
            <th>Referidos</th>
            <th>Estado</th>     
            <th>Nuevo </th>
            <th>Opciones</th>
        </tr>
    </thead>`);
        cargaTabla('si')
        if ($('#filterPosition').val() != "") {
          console.log($('#filterValue').val())
         $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
       }
       Swal.fire({
        title: `El cliente ${id} tiene uno o más pedidos en el sistema, solo se le ha deshabilitado`,
      })
          } else {
      $('.datatables-basic').DataTable().row($(`.datatables-basic tbody .delete-record${id}`).parents('tr')).remove().draw();
      Swal.fire({
        title: `Cliente ${id} borrado con éxito`,
      })
          }
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
    }
  })
}
async function share_record(id_) {
  //dt_basic.row($(this).parents('tr')).remove().draw();
  var id_edit = id_
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
  let codigo_referido = await fetch("/crea_codigo_ref/" + id_)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    return data.id_referido;
  });
  console.log(codigo_referido)
  $(`#CopyPedido${id_edit}`).text(`
  Toma B•Water Alcalina y siente el cambio. Registra tu pedido 💦
  ¡REFIERE Y GANA! $$: 
  https://alcalina.bwater.mx/referido-bwater/${codigo_referido}`)
  copyToClipboard(`#CopyPedido${id_edit}`)
}
function copyToClipboard(elemento) {
  var $temp = $("<textarea>")
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val($(elemento).html().replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();

  Swal.fire('Link de referido copiado en el portapapeles')
  }
function DisEn(id,estadoActual) {
  let nuevoEstado = 0, desc= "desactivar";
  if (estadoActual == 0) {
    nuevoEstado = 1;
    desc= "activar";
  }

  Swal.fire({
    title: 'Cambiar estado',
    text: `Seguro desea ${desc} el cliente indicado`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Cambiar',
    showLoaderOnConfirm: true,
    preConfirm: (de) => {
      return fetch(`/enordesClient/${id}/${nuevoEstado}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        }).then((data) => {
          console.log(data);
            $('#array').val(JSON.stringify(data.clientes_arr))
        $('#exampleClientes').dataTable().fnDestroy();
        $('#exampleClientes').empty();
        $('#exampleClientes').append(`<thead>
        <tr>
            <th> </th>
            <th>Nombre</th>
            <th>Zona</th>
            <th>Etiqueta</th>
            <th>Titulo</th>
            <th>Teléfono</th>
            <th>Correo</th> 
            <th>Descuentos Disp.</th>
            <th>Referidos</th>
            <th>Estado</th>     
            <th>Nuevo </th>
            <th>Opciones</th>
        </tr>
    </thead>`);
        cargaTabla('si')
        if ($('#filterPosition').val() != "") {
          console.log($('#filterValue').val())
         $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
       }
       Swal.fire({
        title: `Se cambió con éxito el estado del cliente ${id}`,
      })
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`              
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  })

}