
let aperturasTable = $('#tabla-aperturas'), desde0Table = $('#tablaDesde0'), intensivosTable = $('#tablaIntensivo'), kidsTable = $('#tablaKids'), gruposApertura, gruposDesde0, gruposIntensivos, gruposKids,usuarios;

function FetchData (tabla) {
    if(tabla === 0) {
        fetch('/obtenerusuariospy672')
        .then(response => response.json())
        .then(data => {
            usuarios = data.usuarios
            console.log(usuarios)
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i]['puesto']=="Profesor") {
                   $('.profesor').append(`<option value="${usuarios[i]['id']}">${usuarios[i]['nombre']}</option>`) 
                   $('.profesor2').append(`<option value="${usuarios[i]['nombre']}">${usuarios[i]['nombre']}</option>`) 
                }                
            }
            
        });

    }else  if(tabla === 1) {
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
                cargarTablaIntensivos();
            });

    } else if (tabla === 4) {
        fetch('/obtenergruposkids')
            .then(response => response.json())
            .then(data => {
                gruposKids = data[0]
                cargarTablaKids();
            });

    }
}
  
FetchData(0);
FetchData(1) 
FetchData(2) 
FetchData(3) 
FetchData(4) 

function cargarTablaAperturas() {
    let tableApert;

    if (aperturasTable.length) {
        $('#filtroApertura').on('keyup change', function(){
            tableApert.search(this.value).draw();   
        });  

        tableApert = aperturasTable.DataTable({
            ordering: true,
            paging:   false,
            data: gruposApertura,
            columns: [
                {data: 'nombre'},
            ],
            columnDefs: [
                {
                    targets: 0, render: function (data, type, full) {
                        let profesor
                        if (full.usuario!=null) {
                            profesor = full.usuario.nombre
                        }
                        let identif;
                        if(full['identificador'].includes("C")) {
                            identif = `<b class="text-primary">${full.identificador}</b>`
                        } else if (full['identificador'].includes("I")) {
                            identif = `<b class="text-danger">${full.identificador}</b>`
                        } else {
                            identif = `<b class="text-success">${full.identificador}</b>`
                        }
                        let grupo = `
                        <div>
                            <p class="d-none">${full.nombre}</p>
                            <div class="d-flex align-items-center mb-1">
                                <div class="me-75">
                                    <a href="#" class="text-primary editar-grupo" role="button" data-bs-toggle="modal" data-bs-target="#new-task-modal" data-id="${full.id}" data-horario="${full.dia_horario}" data-nombre="${full.nombre}" data-fecha="${full.fecha_inicio}">${identif}</a>
                                </div>

                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="d-flex">
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-success me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Activos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos" data-consulta="activos" role="button">
                                            ${full.activos}                                       
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-info me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Incorporados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados" data-consulta="incorporados" role="button">
                                            ${full.incorporados}                                                                                   
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-secondary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Inscritos" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos" data-consulta="inscritos" role="button">
                                            ${full.inscritos}                                         
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-warning me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Fusionados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados" data-consulta="fusionados" role="button">
                                                ${full.fusionados}                                            
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-danger me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Congeldos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados" data-consulta="congelados" role="button">
                                            ${full.congelados}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-primary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Total" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total" data-consulta="todos" role="button">
                                            ${full.total}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
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

                            <div class="me-1">
                                <span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                <small class="emp_post text-muted">Fin</small><br><small class="emp_post">${full.fecha_finalizacion}</small>
                            </div>

                            <!---- PAGOS ---->
                            <div class="me-1">
                                    <span class="item-dollar-sign me-75"> <i class="bi-alarm" style="font-size: 1rem; color: currentColor;">₡</i> </span>

                                    <small class="emp_post text-muted">Pagos</small><br><small class="emp_post">${full.dia_pagos}</small>
                            </div>

                            <!---- PROF ---->
                            <div class="">
                                <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                                <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">${profesor}</small>
                            </div>
                            </div>
                        </div>
                        `;

                        return grupo
                    }
                },
            ],
            order: [[0, 'desc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            orderCellsTop: true,
            displayLength: 5,
            lengthMenu: [5, 10, 25, 50, 75, 100],
            language: {
                "decimal": "",
                "emptyTable": "No existen grupos",
                "info": "Total _TOTAL_ grupos",
                "infoEmpty": "Total _TOTAL_ grupos",
                "infoFiltered": "(Filtrado de _MAX_ grupos totales)",
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

    $('#totalAperturas').text(gruposApertura.length);
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
        $('#profesoresGrupo1').on('change', function(){
            console.log(this.value)
            tableDesde0.search(this.value).draw();   
        });

        tableDesde0 = desde0Table.DataTable({
            ordering: true,
            paging:   false,
            data: gruposDesde0,
            columns: [
                {data: 'nombre'},
            ],
            columnDefs: [
                {
                    targets: 0, render: function (data, type, full) {
                        let profesor
                        if (full.usuario!=null) {
                            profesor = full.usuario.nombre
                        }
                        let grupo = `
                        <div>
                            <p class="d-none">${full.nivel}</p>
                            <p class="d-none">${full.dia_pagos}</p>
                            <div class="d-flex align-items-center mb-1">
                                <div class="me-75">
                                    <a href="#" class="text-primary editar-grupo" role="button" data-bs-toggle="modal" data-bs-target="#new-task-modal" data-id="${full.id}" data-horario="${full.dia_horario}" data-nombre="${full.nombre}" data-fecha="${full.fecha_inicio}"><b class="text-primary">${full.identificador}</b></a>
                                </div>
                                
                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="d-flex">
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-success me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Activos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos" data-consulta="activos" role="button">
                                            ${full.activos}                                       
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-info me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Incorporados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados" data-consulta="incorporados" role="button">
                                            ${full.incorporados}                                                                                   
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-secondary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Inscritos" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos" data-consulta="inscritos" role="button">
                                            ${full.inscritos}                                         
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-warning me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Fusionados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados" data-consulta="fusionados" role="button">
                                                ${full.fusionados}                                            
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-danger me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Congeldos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados" data-consulta="congelados" role="button">
                                            ${full.congelados}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-primary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Total" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total" data-consulta="todos" role="button">
                                            ${full.total}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
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

                                <div class="me-1">
                                    <span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    <small class="emp_post text-muted">Fin</small><br><small class="emp_post">${full.fecha_finalizacion}</small>
                                </div>

                                <!---- PAGOS ---->
                                <div class="me-1">
                                    <span class="item-dollar-sign me-75"> <i class="bi-alarm" style="font-size: 1rem; color: currentColor;">₡</i> </span>

                                    <small class="emp_post text-muted">Pagos</small><br><small class="emp_post">${full.dia_pagos}</small>
                                </div>

                                <!---- PROF ---->
                                <div class="">
                                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                                    <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">${profesor}</small>
                                </div>


                            </div>
                        </div>
                        `;

                        return grupo
                    }
                },
            ],
            order: [[0, 'desc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-4"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            orderCellsTop: true,
            displayLength: 5,
            lengthMenu: [5, 10, 25, 50, 75, 100],
            language: {
                "decimal": "",
                "emptyTable": "No existen grupos",
                "info": "Total _TOTAL_ grupos",
                "infoEmpty": "Total _TOTAL_ grupos",
                "infoFiltered": "(Filtrado de _MAX_ grupos totales)",
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

    $('#totalDesde0').text(gruposDesde0.length);
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
        $('#profesorGrupo2').on('change', function(){
            tableIntensivos.search(this.value).draw();   
        }); 

        tableIntensivos = intensivosTable.DataTable({
            ordering: true,
            paging:   false,
            data: gruposIntensivos,
            columns: [
                {data: 'nombre'},
            ],
            columnDefs: [
                {
                    targets: 0, render: function (data, type, full) {
                        let profesor
                        if (full.usuario!=null) {
                            profesor = full.usuario.nombre
                        }
                        let grupo = `
                        <div>
                            <p class="d-none">${full.nivel}</p>
                            <p class="d-none">${full.dia_pagos}</p>
                            <div class="d-flex align-items-center mb-1">
                                <div class="me-75">
                                    <a href="#" class="text-primary editar-grupo" role="button" data-bs-toggle="modal" data-bs-target="#new-task-modal" data-id="${full.id}" data-horario="${full.dia_horario}" data-nombre="${full.nombre}" data-fecha="${full.fecha_inicio}"><b class="text-danger">${full.identificador}</b></a>
                                </div>

                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="d-flex">
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-success me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Activos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos" data-consulta="activos" role="button">
                                            ${full.activos}                                       
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-info me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Incorporados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados" data-consulta="incorporados" role="button">
                                            ${full.incorporados}                                                                                   
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-secondary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Inscritos" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos" data-consulta="inscritos" role="button">
                                            ${full.inscritos}                                         
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-warning me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Fusionados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados" data-consulta="fusionados" role="button">
                                                ${full.fusionados}                                            
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-danger me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Congeldos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados" data-consulta="congelados" role="button">
                                            ${full.congelados}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-primary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Total" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total" data-consulta="todos" role="button">
                                            ${full.total}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
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

                            <div class="me-1">
                                <span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                <small class="emp_post text-muted">Fin</small><br><small class="emp_post">${full.fecha_finalizacion}</small>
                            </div>

                            <!---- PAGOS ---->
                            <div class="me-1">
                                    <span class="item-dollar-sign me-75"> <i class="bi-alarm" style="font-size: 1rem; color: currentColor;">₡</i> </span>

                                    <small class="emp_post text-muted">Pagos</small><br><small class="emp_post">${full.dia_pagos}</small>
                            </div>

                            <!---- PROF ---->
                            <div class="">
                                <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                                <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">${profesor}</small>
                            </div>
                            </div>
                        </div>
                        `;

                        return grupo
                    }
                },
            ],
            order: [[0, 'desc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-4"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            orderCellsTop: true,
            displayLength: 5,
            lengthMenu: [5, 10, 25, 50, 75, 100],
            language: {
                "decimal": "",
                "emptyTable": "No existen grupos",
                "info": "Total _TOTAL_ grupos",
                "infoEmpty": "Total _TOTAL_ grupos",
                "infoFiltered": "(Filtrado de _MAX_ grupos totales)",
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

    $('#totalIntensivo').text(gruposIntensivos.length);
}

function cargarTablaKids() {
    let tablaKids;
    if (kidsTable.length) {
        $('#nivelesGrupo3').on('change', function(){
            tablaKids.search(this.value).draw();   
        });  

        $('#pagosGrupo3').on('change', function(){
            tablaKids.search(this.value).draw();   
        });  
$('#profesorGrupo3').on('change', function(){
            tablaKids.search(this.value).draw();   
        }); 
        tablaKids = kidsTable.DataTable({
            ordering: true,
            paging:   false,
            data: gruposKids,
            columns: [
                {data: 'nombre'},
            ],
            columnDefs: [
                {
                    targets: 0, render: function (data, type, full) {
                        let profesor
                        if (full.usuario!=null) {
                            profesor = full.usuario.nombre
                        }
                        let grupo = `
                        <div>
                            <p class="d-none">${full.nivel}</p>
                            <p class="d-none">${full.dia_pagos}</p>
                            <div class="d-flex align-items-center mb-1">
                                <div class="me-75">
                                    <a href="#" class="text-primary editar-grupo" role="button" data-bs-toggle="modal" data-bs-target="#new-task-modal" data-id="${full.id}" data-horario="${full.dia_horario}" data-nombre="${full.nombre}" data-fecha="${full.fecha_inicio}"><b class="text-success">${full.identificador}</b></a>
                                </div>

                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="d-flex">
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-success me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Activos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos" data-consulta="activos" role="button">
                                            ${full.activos}                                       
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-info me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Incorporados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados" data-consulta="incorporados" role="button">
                                            ${full.incorporados}                                                                                   
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-secondary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Inscritos" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos" data-consulta="inscritos" role="button">
                                            ${full.inscritos}                                         
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-warning me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Fusionados" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados" data-consulta="fusionados" role="button">
                                                ${full.fusionados}                                            
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-danger me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Congeldos" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados" data-consulta="congelados" role="button">
                                            ${full.congelados}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
                                        
                                        <button class="btn-circle btn-sm badge rounded-pill badge-light-primary me-1 btnModalMatricula" data-bs-toggle="tooltip" title="Total" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total" data-consulta="todos" role="button">
                                            ${full.total}                                          
                                            <form action="">
                                                <input type="text" class="d-none" name="id" value="${full.id}">
                                            </form>
                                        </button>
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

                            <div class="me-1">
                                <span class="item-calendar me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-small-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                <small class="emp_post text-muted">Fin</small><br><small class="emp_post">${full.fecha_finalizacion}</small>
                            </div>

                            <!---- PAGOS ---->
                            <div class="me-1">
                                    <span class="item-dollar-sign me-75"> <i class="bi-alarm" style="font-size: 1rem; color: currentColor;">₡</i> </span>

                                    <small class="emp_post text-muted">Pagos</small><br><small class="emp_post">${full.dia_pagos}</small>
                            </div>

                            <!---- PROF ---->
                            <div class="">
                                <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                                <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">${profesor}</small>
                            </div>
                            </div>
                        </div>
                        `;

                        return grupo
                    }
                },
            ],
            order: [[0, 'desc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-4"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            orderCellsTop: true,
            displayLength: 5,
            lengthMenu: [5, 10, 25, 50, 75, 100],
            language: {
                "decimal": "",
                "emptyTable": "No existen grupos",
                "info": "Total _TOTAL_ grupos",
                "infoEmpty": "Total _TOTAL_ grupos",
                "infoFiltered": "(Filtrado de _MAX_ grupos totales)",
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

        $('#tablaKids_wrapper .card-header').addClass('d-none');
        $('#tablaKids thead').addClass('d-none');
        $('#tablaKids_wrapper .d-flex.justify-content-between.align-items-center.mx-0.row').addClass('d-none');
        document.getElementById('tablaKids_info').classList.add('py-2')
        document.getElementById('tablaKids_filter').classList.add('d-none')
        document.getElementById('tablaKids_info').parentElement.parentElement.classList.add('align-items-center')
    }

    $('#totalKids').text(gruposKids.length);
}

let inputDesde0 = document.querySelector('.desde0'),
desde0Form = document.getElementById('desde0Form'),
inputIntensivo = document.querySelector('.intensivo'),
inputKids = document.querySelector('.kids'),
intensivoForm = document.getElementById('intensivoForm'),
kidsForm = document.getElementById('kidsForm'),
actualizarForm = document.getElementById('actualizarForm');

actualizarForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(actualizarForm);
    fetch('/actualizargrupospty672', {
        method: 'POST',
        body: data, 
    }).then(res => res.json())
        .catch(error => {
            //console.error('Error:', error);
            Toast("Error");
        })
        .then(response => {
            //console.log('Success:', response)
            $('.edit-modal .btn-outline-danger').click();
            Toast("Grupo Actualizado");
            UpdateTables();
        });
});

desde0Form.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(desde0Form);
    if ($(`#desde0Form input[name="fechaInicio"]`).val() == "") {
        console.log('hither')
        Swal.fire('Debe seleccionar una fecha para poder continuar')
        
        return $(`#desde0Form input[name="fechaInicio"]`).focus()
    }

    if ($(`#desde0Form input[name="montoMensual"]`).val() == "") {
        console.log('hi')
        Swal.fire('Debe un monto mensual para poder continuar')
        
        return $(`#desde0Form input[name="montoMensual"]`).focus()
    }
    CrearGruposFetch(data)
});

intensivoForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(intensivoForm);
    if ($(`#intensivoForm input[name="fechaInicio"]`).val() == "") {
        console.log('hi')
        Swal.fire('Debe seleccionar una fecha para poder continuar')
        
        return $(`#intensivoForm input[name="fechaInicio"]`).focus()
    }

    if ($(`#intensivoForm input[name="montoMensual"]`).val() == "") {
        console.log('hi')
        Swal.fire('Debe un monto mensual para poder continuar')
        
        return $(`#intensivoForm input[name="montoMensual"]`).focus()
    }
    CrearGruposFetch(data)
});

kidsForm.addEventListener('submit', e => {
    e.preventDefault();
    
    let data = new FormData(kidsForm);
    if ($(`#kidsForm input[name="fechaInicio"]`).val() == "") {
        console.log('hithere2')
        Swal.fire('Debe seleccionar una fecha para poder continuar')
        
        return $(`input[name="fechaInicio"]`).focus()
    }

    if ($(`#kidsForm input[name="montoMensual"]`).val() == "") {
        console.log('hi')
        Swal.fire('Debe un monto mensual para poder continuar')
        
        return $(`#kidsForm input[name="montoMensual"]`).focus()
    }
    CrearGruposFetch(data)
});

function CrearGruposFetch (data) {
    
    fetch('/creargrupopy672', {
        method: 'POST',
        body: data, 
    }).then(res => res.json())
        .catch(error => {
            //console.error('Error:', error);
            Toast("Error");
        })
        .then(response => {
            console.log('Success:', response)
            Toast("Grupo Agregado");
           window.location.href ="/verificargrupos/PYT-672"
            //UpdateTables();
        });
}

function UpdateTables() {
    let selectsHorario = document.querySelectorAll('.horario');
    selectsHorario.forEach(select => {
        select.options[0].selected = true;
    });
    $('.horario').trigger('change');
    
    $('.fecha-inicio').val("")

    $('.profesor').val("")
    $('.profesor').trigger('change');

    $('#tabla-aperturas').dataTable().fnDestroy();
    $('#tabla-aperturas').empty();
    $('#tabla-aperturas').html(`
    <thead>
        <tr>
            <th>Nombre</th>
        </tr>
    </thead>`);

    $('#tablaDesde0').dataTable().fnDestroy();
    $('#tablaDesde0').empty();
    $('#tablaDesde0').html(`
    <thead>
        <tr>
            <th>Nombre</th>
        </tr>
    </thead>`);
    
    $('#tablaIntensivo').dataTable().fnDestroy();
    $('#tablaIntensivo').empty();
    $('#tablaIntensivo').html(`
    <thead>
        <tr>
            <th>Nombre</th>
        </tr>
    </thead>`);
    
    $('#tablaKids').dataTable().fnDestroy();
    $('#tablaKids').empty();
    $('#tablaKids').html(`
    <thead>
        <tr>
            <th>Nombre</th>
        </tr>
    </thead>`);
    
    FetchData(1);
    FetchData(2);
    FetchData(3);
    FetchData(4);
}

inputDesde0.addEventListener('change', () => {
    Reset(1);
});

inputIntensivo.addEventListener('change', () => {
    Reset(2);
});

inputKids.addEventListener('change', () => {
    Reset(3);
});

const Reset = (num) => {
    if (num === 1) {
        desde0Form.classList.remove('d-none')
        intensivoForm.classList.add('d-none')
        kidsForm.classList.add('d-none')
    } else if(num === 2) {
        intensivoForm.classList.remove('d-none')
        desde0Form.classList.add('d-none')
        kidsForm.classList.add('d-none')
    } else {
        kidsForm.classList.remove('d-none')
        intensivoForm.classList.add('d-none')
        desde0Form.classList.add('d-none')
    }
}

let tablaGrupos = document.querySelectorAll('.table'),
idIn = document.querySelectorAll('.id'),
tituloIn = document.getElementById('titulo'),
horarioDesdeCero = document.getElementById('horarioDesdeCero'),
horarioIntensivo = document.getElementById('horarioIntensivo'),
horarioKids = document.getElementById('horarioKids'),
fechaIn = document.getElementById('date');

tituloIn.addEventListener('change', e => {
    horarioDesdeCero.classList.add('d-none')
    horarioIntensivo.classList.add('d-none')
    horarioKids.classList.add('d-none')

    if(tituloIn.value === "Desde cero") {
        horarioDesdeCero.classList.remove('d-none')
    } else if (tituloIn.value === "Intensivo") {
        horarioIntensivo.classList.remove('d-none')
    } else {
        horarioKids.classList.remove('d-none')
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
            let horario = moment(e.target.getAttribute('data-horario'),'DD-MM-YYYY').format('YYYY-MM-DD')
            if(e.target.getAttribute('data-nombre') === "Desde cero") {
                horarioDesdeCero.classList.remove('d-none')
                horarioDesdeCero.value = e.target.getAttribute('data-horario')
            } else if (e.target.getAttribute('data-nombre') === "Intensivo") {
                horarioIntensivo.classList.remove('d-none')
                horarioIntensivo.value = e.target.getAttribute('data-horario')
            } else {
                horarioKids.classList.remove('d-none')
                horarioKids.value = e.target.getAttribute('data-horario')
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
                                newRow.innerHTML = 
                                `
                                    <td>${row.nombre}</td>
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
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre}</td>
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
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre}</td>
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
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre}</td>
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
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre}</td>
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
                                    newRow.innerHTML = 
                                    `
                                        <td>${row.nombre}</td>
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
                        
                    } else if (current === "tablaKids") {
                        FetchData(4);

                    }
                } 
            }).catch(function(err) {
                console.log(err);
            });
        }
    });
});

let hoy = moment()
$('.fecha-inicio').on('change',(e)=>{
    var dia,dia_fechaSelect,fecha_anterior,fecha_h
                
    if($('#customOptionsCheckableRadios1').is(':checked')){
    dia = ($('#horario-cero').val()).split(':')
    }
    if($('#customOptionsCheckableRadios2').is(':checked')){
       dia = ($('#horario-intensivo').val()).split(':')  
       console.log(dia)
       dia = dia[0].toString()
       dia = dia.split('y')  
       console.log(dia) 
    }
    if($('#customOptionsCheckableRadios3').is(':checked')){
       dia = ($('#horario-kids').val()).split(':')  
       console.log(dia)
    }

    
    dia_fechaSelect = moment(e.target.value,'DD-MM-YYYY').locale('es').format('dddd')
    fecha_h = e.target.value
    console.log(dia[0].trim().toLowerCase())    
    console.log(dia_fechaSelect)

	fecha_anterior = moment(hoy).isAfter(moment(fecha_h, 'DD-MM-YYYY'),'d'); // true
    if($('#customOptionsCheckableRadios2').is(':checked')){
        console.log(dia[1].trim().toLowerCase())
        if (dia_fechaSelect == dia[0].trim().toLowerCase() || dia_fechaSelect == dia[1].trim().toLowerCase()) {
                return
        }else {
            swal.fire('La fecha seleccionada no corresponde al dia indicado en el horario')		
                            $('#date').val('')
                return
        }

     }else{
         if (dia_fechaSelect != dia[0].trim().toLowerCase()) {
                swal.fire('La fecha seleccionada no corresponde al dia indicado en el horario')		
								$('#date').val('')
					return
            }
     }
			
				if (fecha_anterior == true){
					swal.fire('Debe seleccionar una fecha superior a la actual.')		
								$('#date').val('')
					return
				}
})
$('#date').on('change',(e)=>{
    let dia = ($('.horario').val()).split(':')
    
    let dia_fechaSelect = moment(e.target.value).locale('es').format('dddd')
    fecha_h = e.target.value
    console.log(dia[0].toLowerCase())
    console.log(dia_fechaSelect)

	let fecha_anterior = moment(hoy).isAfter(moment(fecha_h),'d'); // true
			if (dia_fechaSelect != dia[0].toLowerCase()) {
                swal.fire('La fecha seleccionada no corresponde al dia indicado en el horario')		
								$('#date').val('')
					return
            }
				if (fecha_anterior == true){
					swal.fire('Debe seleccionar una fecha superior a la actual.')		
								$('#date').val('')
					return
				}
})