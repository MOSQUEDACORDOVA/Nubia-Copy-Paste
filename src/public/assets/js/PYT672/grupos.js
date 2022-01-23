let aperturasTable = $('#tabla-aperturas'), desde0Table = $('#tablaDesde0'), intensivosTable = $('#tablaIntensivo'), gruposApertura, gruposDesde0, gruposIntensivos;

function FetchData (tabla) {
    if(tabla === 1) {
        fetch('/obtenergruposapertura')
            .then(response => response.json())
            .then(data => {
                gruposApertura = data[0]
                cargarTablaAperturas();
            });
    } else if (tabla === 2) {
        fetch('/obtenergruposdesde0')
            .then(response => response.json())
            .then(data => {
                gruposDesde0 = data[0]
                cargarTablaDesde0();
            });

    } else if (tabla === 3) {
        fetch('/obtenergruposintensivo')
            .then(response => response.json())
            .then(data => {
                gruposIntensivos = data[0]
                console.log(gruposIntensivos)
                cargarTablaIntensivos();
            });
    }
}

FetchData(1) 
FetchData(2) 
FetchData(3) 

function cargarTablaAperturas() {
    let tableApert;

    let aperturas = ''
    //console.log(aperturas)
  
    /*let aperturasGruposParsed = ""
    if (editada) {
        
        aperturasGruposParsed = JSON.parse(aperturas)

    } else{
        aperturasGruposParsed = JSON.parse(aperturas.replace(/&quot;/g,'"'))
    }

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }*/

    // --------------------------------------------------------------------

    if (aperturasTable.length) {
        $('#filtroApertura').on('keyup change', function(){
            tableApert.search(this.value).draw();   
        });  

        /* $('.buscar-grupos').on('change', function(){
            tableApert.search(this.value).draw();   
        }); */

        tableApert = aperturasTable.DataTable({
            ordering: false,
            data: gruposApertura,
            columns: [
                {data: 'nombre'},
            ],
            columnDefs: [
                {
                    targets: 0, render: function (data, type, full) {
                        let grupo = `
                        <div>
                            <p class="d-none">${full.nombre}</p>
                            <div class="d-flex align-items-center mb-1">
                                <div class="me-75">
                                    <a href="#" class="text-primary editar-grupo" role="button" data-bs-toggle="modal" data-bs-target="#new-task-modal" data-id="${full.id}" data-horario="${full.dia_horario}" data-nombre="${full.nombre}" data-fecha="${full.fecha_inicio}"><b>${full.identificador}</b></a>
                                </div>

                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="d-flex">
                                        <div class="badge rounded-pill badge-light-success me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos" data-consulta="activos" role="button">
                                            ${full.activos}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                
                                        <div class="badge rounded-pill badge-light-info me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados" data-consulta="incorporados" role="button">
                                            ${full.incorporados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-secondary me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos" data-consulta="inscritos" role="button">
                                            ${full.inscritos}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-warning me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados" data-consulta="fusionados" role="button">
                                            ${full.fusionados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-danger me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados" data-consulta="congelados" role="button">
                                            ${full.congelados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-primary me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total" data-consulta="todos" role="button">
                                            ${full.total}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                    </div>
                                    <div>
                                        <div role="button" class="btn btn-sm text-primary borrar-btn">
                                            <form action="/borrargrupopy672" method="POST">
                                                <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full.id}" required>
                                                <a>
                                                    ${feather.icons['trash'].toSvg()}
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex">
                                <!---- PROF ---->
                                <div class="me-1">
                                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                                    <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">Mosqueda Cor.</small>
                                </div>

                                <!---- PAGOS ---->
                                <div class="me-1">
                                    <span class="item-dollar-sign me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign font-small-4"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>

                                    <small class="emp_post text-muted">Pagos</small><br><small class="emp_post">${full.dia_pagos}</small>
                                </div>

                                <div class="me-1">
                                    <span class="item-clock me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock font-small-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                                    
                                    <small class="emp_post text-muted">Horario</small><br><small class="emp_post texto-horario">${full.dia_horario}</small>
                                    
                                    </div><div class="me-1"><span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    <small class="emp_post text-muted">Inicio</small><br><small class="emp_post">${full.fecha_inicio}</small>
                                </div>
                                <div class="">
                                    <span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    <small class="emp_post text-muted">Fin</small><br><small class="emp_post">${full.fecha_finalizacion}</small>
                                </div>
                            </div>
                        </div>
                        `;

                        return grupo
                    }
                },
            ],
            order: [[0, 'asc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            orderCellsTop: true,
            displayLength: 5,
            lengthMenu: [5, 10, 25, 50, 75, 100],
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

        $('#tabla-aperturas_wrapper .card-header').addClass('d-none');
        $('#tabla-aperturas thead').addClass('d-none');
        $('#tabla-aperturas_wrapper .d-flex.justify-content-between.align-items-center.mx-0.row').addClass('d-none');
        document.getElementById('tabla-aperturas_info').classList.add('py-2')
        document.getElementById('tabla-aperturas_filter').classList.add('d-none')
        document.getElementById('tabla-aperturas_info').parentElement.parentElement.classList.add('align-items-center')
    }

}

function cargarTablaDesde0() {
    let tableDesde0;
    if (desde0Table.length) {
        $('#nivelesGrupo1').on('change', function(){
            tableDesde0.search(this.value).draw();   
        });  
        
        $('#pagosGrupo1').on('change', function(){
            tableDesde0.search(this.value).draw();   
        });  

        tableDesde0 = desde0Table.DataTable({
            ordering: false,
            data: gruposDesde0,
            columns: [
                {data: 'nombre'},
            ],
            columnDefs: [
                {
                    targets: 0, render: function (data, type, full) {
                        let grupo = `
                        <div>
                            <p class="d-none">${full.nivel}</p>
                            <p class="d-none">${full.dia_pagos}</p>
                            <div class="d-flex align-items-center mb-1">
                                <div class="me-75">
                                    <a href="#" class="text-primary editar-grupo" role="button" data-bs-toggle="modal" data-bs-target="#new-task-modal" data-id="${full.id}" data-horario="${full.dia_horario}" data-nombre="${full.nombre}" data-fecha="${full.fecha_inicio}"><b>${full.identificador}</b></a>
                                </div>

                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="d-flex">
                                        <div class="badge rounded-pill badge-light-success me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos" data-consulta="activos" role="button">
                                            ${full.activos}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                
                                        <div class="badge rounded-pill badge-light-info me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados" data-consulta="incorporados" role="button">
                                            ${full.incorporados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-secondary me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos" data-consulta="inscritos" role="button">
                                            ${full.inscritos}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-warning me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados" data-consulta="fusionados" role="button">
                                            ${full.fusionados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-danger me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados" data-consulta="congelados" role="button">
                                            ${full.congelados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-primary me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total" data-consulta="todos" role="button">
                                            ${full.total}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                    </div>
                                    <div>
                                        <div role="button" class="btn btn-sm text-primary borrar-btn">
                                            <form action="/borrargrupopy672" method="POST">
                                                <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full.id}" required>
                                                <a>
                                                    ${feather.icons['trash'].toSvg()}
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex">

                                <!---- HORARIO ---->
                                <div class="me-1">
                                    <span class="item-clock me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock font-small-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                                    
                                    <small class="emp_post text-muted">Horario</small><br><small class="emp_post texto-horario">${full.dia_horario}</small>
                                    
                                </div>

                                <!---- FECHAS ---->
                                <div class="me-1"><span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    <small class="emp_post text-muted">Inicio</small><br><small class="emp_post">${full.fecha_inicio}</small>
                                </div>

                                <div class="">
                                    <span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    <small class="emp_post text-muted">Fin</small><br><small class="emp_post">${full.fecha_finalizacion}</small>
                                </div>

                                <!---- PAGOS ---->
                                <div class="me-1">
                                    <span class="item-dollar-sign me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign font-small-4"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>

                                    <small class="emp_post text-muted">Pagos</small><br><small class="emp_post">${full.dia_pagos}</small>
                                </div>

                                <!---- PROF ---->
                                <div class="me-1">
                                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                                    <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">Mosqueda Cor.</small>
                                </div>


                            </div>
                        </div>
                        `;

                        return grupo
                    }
                },
            ],
            order: [[0, 'asc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-4"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            orderCellsTop: true,
            displayLength: 5,
            lengthMenu: [5, 10, 25, 50, 75, 100],
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

        $('#tablaDesde0_wrapper .card-header').addClass('d-none');
        $('#tablaDesde0 thead').addClass('d-none');
        $('#tablaDesde0_wrapper .d-flex.justify-content-between.align-items-center.mx-0.row').addClass('d-none');
        document.getElementById('tablaDesde0_info').classList.add('py-2')
        document.getElementById('tablaDesde0_filter').classList.add('d-none')
        document.getElementById('tablaDesde0_info').parentElement.parentElement.classList.add('align-items-center')
    }

}

function cargarTablaIntensivos() {
    let tableIntensivos;
    if (intensivosTable.length) {
        $('#nivelesGrupo2').on('change', function(){
            tableIntensivos.search(this.value).draw();   
        });  

        $('#pagosGrupo2').on('change', function(){
            tableIntensivos.search(this.value).draw();   
        });  

        tableIntensivos = intensivosTable.DataTable({
            ordering: false,
            data: gruposIntensivos,
            columns: [
                {data: 'nombre'},
            ],
            columnDefs: [
                {
                    targets: 0, render: function (data, type, full) {
                        let grupo = `
                        <div>
                            <p class="d-none">${full.nivel}</p>
                            <p class="d-none">${full.dia_pagos}</p>
                            <div class="d-flex align-items-center mb-1">
                                <div class="me-75">
                                    <a href="#" class="text-primary editar-grupo" role="button" data-bs-toggle="modal" data-bs-target="#new-task-modal" data-id="${full.id}" data-horario="${full.dia_horario}" data-nombre="${full.nombre}" data-fecha="${full.fecha_inicio}"><b>${full.identificador}</b></a>
                                </div>

                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="d-flex">
                                        <div class="badge rounded-pill badge-light-success me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos" data-consulta="activos" role="button">
                                            ${full.activos}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                
                                        <div class="badge rounded-pill badge-light-info me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados" data-consulta="incorporados" role="button">
                                            ${full.incorporados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-secondary me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos" data-consulta="inscritos" role="button">
                                            ${full.inscritos}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-warning me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados" data-consulta="fusionados" role="button">
                                            ${full.fusionados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-danger me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados" data-consulta="congelados" role="button">
                                            ${full.congelados}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                        
                                        <div class="badge rounded-pill badge-light-primary me-1 btnModalMatricula" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total" data-consulta="todos" role="button">
                                            ${full.total}
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </div>
                                    </div>
                                    <div>
                                        <div role="button" class="btn btn-sm text-primary borrar-btn">
                                            <form action="/borrargrupopy672" method="POST">
                                                <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full.id}" required>
                                                <a>
                                                    ${feather.icons['trash'].toSvg()}
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex">
                                <!---- PROF ---->
                                <div class="me-1">
                                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                                    <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">Mosqueda Cor.</small>
                                </div>

                                <!---- PAGOS ---->
                                <div class="me-1">
                                    <span class="item-dollar-sign me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign font-small-4"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>

                                    <small class="emp_post text-muted">Pagos</small><br><small class="emp_post">${full.dia_pagos}</small>
                                </div>

                                <div class="me-1">
                                    <span class="item-clock me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock font-small-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                                    
                                    <small class="emp_post text-muted">Horario</small><br><small class="emp_post texto-horario">${full.dia_horario}</small>
                                    
                                    </div><div class="me-1"><span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    <small class="emp_post text-muted">Inicio</small><br><small class="emp_post">${full.fecha_inicio}</small>
                                </div>
                                <div class="">
                                    <span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    <small class="emp_post text-muted">Fin</small><br><small class="emp_post">${full.fecha_finalizacion}</small>
                                </div>
                            </div>
                        </div>
                        `;

                        return grupo
                    }
                },
            ],
            order: [[0, 'asc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-4"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            orderCellsTop: true,
            displayLength: 5,
            lengthMenu: [5, 10, 25, 50, 75, 100],
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

        $('#tablaIntensivo_wrapper .card-header').addClass('d-none');
        $('#tablaIntensivo thead').addClass('d-none');
        $('#tablaIntensivo_wrapper .d-flex.justify-content-between.align-items-center.mx-0.row').addClass('d-none');
        document.getElementById('tablaIntensivo_info').classList.add('py-2')
        document.getElementById('tablaIntensivo_filter').classList.add('d-none')
        document.getElementById('tablaIntensivo_info').parentElement.parentElement.classList.add('align-items-center')
    }

}

let inputDesde0 = document.querySelector('.desde0'),
desde0Form = document.getElementById('desde0Form'),
inputIntensivo = document.querySelector('.intensivo'),
intensivoForm = document.getElementById('intensivoForm');

inputDesde0.addEventListener('change', () => {
    Reset(1);
});
inputIntensivo.addEventListener('change', () => {
    Reset(2);
});

const Reset = (num) => {
    if (num === 1) {
        desde0Form.classList.remove('d-none')
        desde0Form.classList.add('d-block')
        intensivoForm.classList.remove('d-block')
        intensivoForm.classList.add('d-none')
    } else {
        intensivoForm.classList.remove('d-none')
        intensivoForm.classList.add('d-block')
        desde0Form.classList.remove('d-block')
        desde0Form.classList.add('d-none')
    }
}

let tablaGrupos = document.querySelectorAll('.table'),
idIn = document.querySelectorAll('.id'),
tituloIn = document.getElementById('titulo'),
horarioDesdeCero = document.getElementById('horarioDesdeCero'),
horarioIntensivo = document.getElementById('horarioIntensivo'),
fechaIn = document.getElementById('date');

tituloIn.addEventListener('change', e => {
    horarioDesdeCero.classList.add('d-none')
    horarioIntensivo.classList.add('d-none')
    if(tituloIn.value === "Desde cero") {
        horarioDesdeCero.classList.remove('d-none')
    } else {
        horarioIntensivo.classList.remove('d-none')
    }
});

let btnModalTabla = document.querySelector('#modalTable'),
identificadorGrupo = document.querySelector('#identificadorGrupo'),
btnModalRows = document.querySelector('#tableRows');

tablaGrupos.forEach(tabla => {
    tabla.addEventListener('click', e => {
        let current = tabla.getAttribute('id');
        // MODAL EDITAR
        if(e.target.classList.contains('editar-grupo')) {
            tituloIn.value = e.target.getAttribute('data-nombre');
            fechaIn.value = e.target.getAttribute('data-fecha');
            
            idIn.forEach(inp => {
                inp.value = e.target.getAttribute('data-id')
            });
            
            horarioDesdeCero.classList.add('d-none')
            horarioIntensivo.classList.add('d-none')
            if(e.target.getAttribute('data-nombre') === "Desde cero") {
                horarioDesdeCero.classList.remove('d-none')
                horarioDesdeCero.value = e.target.getAttribute('data-horario')
            } else {
                horarioIntensivo.classList.remove('d-none')
                horarioIntensivo.value = e.target.getAttribute('data-horario')
            }
        }
    
        // MODAL DETALLES DE ALUMNOS
        if(e.target.classList.contains('btnModalMatricula')) {
            let consulta = e.target.getAttribute('data-consulta'),
            form = new FormData(e.target.childNodes[1]);
            
            identificadorGrupo.innerText = '';
            btnModalRows.innerHTML = '';
            
            if(consulta === 'todos') {
                fetch('/obtenermatriculagrupo', {
                    method: 'POST', 
                    body: form,
                }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                        let data = response.find,
                        fragment = new DocumentFragment();
                        console.log(data)
            
                        if(data.length >= 1) {
                            let id;
                            data.forEach(row => {
                                let newRow = document.createElement('tr');
                                let telefonos = row.telefono1, estado;
                                id = row.grupo.identificador;
                                
                                if(row.estado.id === 1) {
                                    estado = `<span class="badge rounded-pill badge-light-success">${row.estado.estado}</span>`
                                } else if(row.estado.id === 2) {
                                    estado = `<span class="badge rounded-pill badge-light-info">${row.estado.estado}</span>`
                                } else if(row.estado.id === 3) {
                                    estado = `<span class="badge rounded-pill badge-light-secondary">${row.estado.estado}</span>`
                                } else if(row.estado.id === 4) {
                                    estado = `<span class="badge rounded-pill badge-light-warning">${row.estado.estado}</span>`
                                } else if(row.estado.id === 5) {
                                    estado = `<span class="badge rounded-pill badge-light-danger">${row.estado.estado}</span>`
                                }
            
                                if (row.telefono2 != '-' && row.telefono2) {
                                    telefonos += ', ' + row.telefono2;
                                } 
                                if (row.telefono3 != '-' && row.telefono3) {
                                    telefonos += ', ' + row.telefono3;
                                }
                                newRow.innerHTML = 
                                `
                                    <td>${row.nombre} ${row.primer_apellido}</td>
                                    <td>${row.email}</td>
                                    <td>${row.tipo_estudiante.tipo}</td>
                                    <td>${row.nro_identificacion}</td>
                                    <td>${row.fecha_nacimiento}</td>
                                    <td>${telefonos}</td>
                                    <td>${row.provincia}</td>
                                    <td>${row.canton}</td>
                                    <td>${row.distrito}</td>
                                    <td>
                                        ${estado}
                                    </td>
                                `;
                                fragment.appendChild(newRow);
                            });
                            identificadorGrupo.innerText = id;
                            btnModalRows.appendChild(fragment);
                        } else {
                            let newRow = document.createElement('tr');
                            newRow.innerHTML = '<td>Este grupo no poseé estudiantes actualmente.</td>'
                            btnModalRows.appendChild(newRow);
                        }
                        btnModalTabla.click();
                  });
            
            } else if(consulta === 'activos') {
                fetch('/obtenermatriculagrupo', {
                    method: 'POST', 
                    body: form,
                }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                        let data = response.find,
                        fragment = new DocumentFragment();
                        console.log(data)
            
                        if(data.length >= 1) {
                            let id;
                            data.forEach(row => {
                                if(row.estado.id === 1) {
                                    let newRow = document.createElement('tr');
                                    let telefonos = row.telefono1;
                                    id = row.grupo.identificador;
                                    console.log(row)
                                    if (row.telefono2 != '-') {
                                        telefonos += ', ' + row.telefono2;
                                    } 
                                    if (row.telefono3 != '-') {
                                        telefonos += ', ' + row.telefono3;
                                    }
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre} ${row.primer_apellido}</td>
                                        <td>${row.email}</td>
                                        <td>${row.tipo_estudiante.tipo}</td>
                                        <td>${row.nro_identificacion}</td>
                                        <td>${row.fecha_nacimiento}</td>
                                        <td>${telefonos}</td>
                                        <td>${row.provincia}</td>
                                        <td>${row.canton}</td>
                                        <td>${row.distrito}</td>
                                        <td>
                                            <span class="badge rounded-pill badge-light-success">${row.estado.estado}</span>
                                        </td>
                                    `;
                                    fragment.appendChild(newRow);
                                }
                            });
                            identificadorGrupo.innerText = id;
                            btnModalRows.appendChild(fragment);
                        } else {
                            let newRow = document.createElement('tr');
                            newRow.innerHTML = '<td>Este grupo no poseé estudiantes actualmente.</td>'
                            btnModalRows.appendChild(newRow)
                        }
                        btnModalTabla.click();
                  });
            } else if(consulta === 'incorporados') {
                fetch('/obtenermatriculagrupo', {
                    method: 'POST', 
                    body: form,
                }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                        let data = response.find,
                        fragment = new DocumentFragment();
                        console.log(data)
            
                        if(data.length >= 1) {
                            let id;
                            data.forEach(row => {
                                if(row.estado.id === 2) {
                                    let newRow = document.createElement('tr');
                                    let telefonos = row.telefono1;
                                    id = row.grupo.identificador;
                                    console.log(row)
                                    if (row.telefono2 != '-') {
                                        telefonos += ', ' + row.telefono2;
                                    } 
                                    if (row.telefono3 != '-') {
                                        telefonos += ', ' + row.telefono3;
                                    }
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre} ${row.primer_apellido}</td>
                                        <td>${row.email}</td>
                                        <td>${row.tipo_estudiante.tipo}</td>
                                        <td>${row.nro_identificacion}</td>
                                        <td>${row.fecha_nacimiento}</td>
                                        <td>${telefonos}</td>
                                        <td>${row.provincia}</td>
                                        <td>${row.canton}</td>
                                        <td>${row.distrito}</td>
                                        <td>
                                            <span class="badge rounded-pill badge-light-info">${row.estado.estado}</span>
                                        </td>
                                    `;
                                    fragment.appendChild(newRow);
                                }
                            });
                            identificadorGrupo.innerText = id;
                            btnModalRows.appendChild(fragment);
                        } else {
                            let newRow = document.createElement('tr');
                            newRow.innerHTML = '<td>Este grupo no poseé estudiantes actualmente.</td>'
                            btnModalRows.appendChild(newRow)
                        }
                        btnModalTabla.click();
                  });
            } else if(consulta === 'inscritos') {
                fetch('/obtenermatriculagrupo', {
                    method: 'POST', 
                    body: form,
                }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                        let data = response.find,
                        fragment = new DocumentFragment();
                        console.log(data)
            
                        if(data.length >= 1) {
                            let id;
                            data.forEach(row => {
                                if(row.estado.id === 3) {
                                    let newRow = document.createElement('tr');
                                    let telefonos = row.telefono1;
                                    id = row.grupo.identificador;
                                    console.log(row)
                                    if (row.telefono2 != '-') {
                                        telefonos += ', ' + row.telefono2;
                                    } 
                                    if (row.telefono3 != '-') {
                                        telefonos += ', ' + row.telefono3;
                                    }
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre} ${row.primer_apellido}</td>
                                        <td>${row.email}</td>
                                        <td>${row.tipo_estudiante.tipo}</td>
                                        <td>${row.nro_identificacion}</td>
                                        <td>${row.fecha_nacimiento}</td>
                                        <td>${telefonos}</td>
                                        <td>${row.provincia}</td>
                                        <td>${row.canton}</td>
                                        <td>${row.distrito}</td>
                                        <td>
                                            <span class="badge rounded-pill badge-light-secondary">${row.estado.estado}</span>
                                        </td>
                                    `;
                                    fragment.appendChild(newRow);
                                }
                            });
                            identificadorGrupo.innerText = id;
                            btnModalRows.appendChild(fragment);
                        } else {
                            let newRow = document.createElement('tr');
                            newRow.innerHTML = '<td>Este grupo no poseé estudiantes actualmente.</td>'
                            btnModalRows.appendChild(newRow)
                        }
                        btnModalTabla.click();
                  });
            } else if(consulta === 'fusionados') {
                fetch('/obtenermatriculagrupo', {
                    method: 'POST', 
                    body: form,
                }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                        let data = response.find,
                        fragment = new DocumentFragment();
                        console.log(data)
            
                        if(data.length >= 1) {
                            let id;
                            data.forEach(row => {
                                if(row.estado.id === 4) {
                                    let newRow = document.createElement('tr');
                                    let telefonos = row.telefono1;
                                    id = row.grupo.identificador;
                                    console.log(row)
                                    if (row.telefono2 != '-') {
                                        telefonos += ', ' + row.telefono2;
                                    } 
                                    if (row.telefono3 != '-') {
                                        telefonos += ', ' + row.telefono3;
                                    }
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre} ${row.primer_apellido}</td>
                                        <td>${row.email}</td>
                                        <td>${row.tipo_estudiante.tipo}</td>
                                        <td>${row.nro_identificacion}</td>
                                        <td>${row.fecha_nacimiento}</td>
                                        <td>${telefonos}</td>
                                        <td>${row.provincia}</td>
                                        <td>${row.canton}</td>
                                        <td>${row.distrito}</td>
                                        <td>
                                            <span class="badge rounded-pill badge-light-warning">${row.estado.estado}</span>
                                        </td>
                                    `;
                                    fragment.appendChild(newRow);
                                }
                            });
                            identificadorGrupo.innerText = id;
                            btnModalRows.appendChild(fragment);
                        } else {
                            let newRow = document.createElement('tr');
                            newRow.innerHTML = '<td>Este grupo no poseé estudiantes actualmente.</td>'
                            btnModalRows.appendChild(newRow)
                        }
                        btnModalTabla.click();
                  });
            } else if(consulta === 'congelados') {
                fetch('/obtenermatriculagrupo', {
                    method: 'POST', 
                    body: form,
                }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                        let data = response.find,
                        fragment = new DocumentFragment();
                        console.log(data)
            
                        if(data.length >= 1) {
                            let id;
                            data.forEach(row => {
                                if(row.estado.id === 5) {
                                    let newRow = document.createElement('tr');
                                    let telefonos = row.telefono1;
                                    id = row.grupo.identificador;
                                    console.log(row)
                                    if (row.telefono2 != '-') {
                                        telefonos += ', ' + row.telefono2;
                                    } 
                                    if (row.telefono3 != '-') {
                                        telefonos += ', ' + row.telefono3;
                                    }
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre} ${row.primer_apellido}</td>
                                        <td>${row.email}</td>
                                        <td>${row.tipo_estudiante.tipo}</td>
                                        <td>${row.nro_identificacion}</td>
                                        <td>${row.fecha_nacimiento}</td>
                                        <td>${telefonos}</td>
                                        <td>${row.provincia}</td>
                                        <td>${row.canton}</td>
                                        <td>${row.distrito}</td>
                                        <td>
                                            <span class="badge rounded-pill badge-light-danger">${row.estado.estado}</span>
                                        </td>
                                    `;
                                    fragment.appendChild(newRow);
                                }
                            });
                            identificadorGrupo.innerText = id;
                            btnModalRows.appendChild(fragment);
                        } else {
                            let newRow = document.createElement('tr');
                            newRow.innerHTML = '<td>Este grupo no poseé estudiantes actualmente.</td>'
                            btnModalRows.appendChild(newRow)
                        }
                        btnModalTabla.click();
                  });
            }
        }
    
        // BORRAR GRUPOS
        if (e.target.classList.contains('borrar-btn')) {
            const data = new FormData(e.target.childNodes[1]);
          
            fetch('/borrargrupopy672', {
                method: 'POST',
                body: data
            }).then(function(response) {
                if(response.ok) {
                    $(`#${current}`).dataTable().fnDestroy();
                    $(`#${current}`).empty();
                    $(`#${current}`).html(`
                    <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </thead>`);
                    
                    // NOTIFICACION
                    Toast("Grupo Eliminado");

                    if(current === "tabla-aperturas") {
                        FetchData(1);

                    } else if (current === "tablaDesde0") {
                        FetchData(2);
                        
                    } else if (current === "tablaIntensivo") {
                        FetchData(3);

                    }
                } 
            }).catch(function(err) {
                console.log(err);
            });
        }
    });
})