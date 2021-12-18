let inputDesde0 = document.querySelector('.desde0'),
desde0Form = document.getElementById('desde0Form'),
inputIntensivo = document.querySelector('.intensivo'),
intensivoForm = document.getElementById('intensivoForm');

const filtroApertura = document.getElementById('filtroApertura');

inputDesde0.addEventListener('change', () => {
    Reset(1);
});
inputIntensivo.addEventListener('change', () => {
    Reset(2);
});

let gruposDesde0 = document.querySelectorAll('.desde0'),
gruposIntensivo = document.querySelectorAll('.intensivo');

filtroApertura.addEventListener('change', () => {
    let seleccion = filtroApertura.value;
    filtroAperturaGrupos(seleccion);  
});

const filtroAperturaGrupos = (target) => {
    if(target === 'todos') {
        gruposDesde0.forEach(grupo => {
            grupo.classList.remove('d-none');
            grupo.classList.add('d-block');
        });
        gruposIntensivo.forEach(grupo => {
            grupo.classList.remove('d-none');
            grupo.classList.add('d-block');
        });
    } else if(target === 'desde cero') {
        gruposDesde0.forEach(grupo => {
            grupo.classList.remove('d-none');
            grupo.classList.add('d-block');
        });
        gruposIntensivo.forEach(grupo => {
            grupo.classList.remove('d-block');
            grupo.classList.add('d-none');
        });  
    } else {
        gruposIntensivo.forEach(grupo => {
            grupo.classList.remove('d-none');
            grupo.classList.add('d-block');
        });
        gruposDesde0.forEach(grupo => {
            grupo.classList.remove('d-block');
            grupo.classList.add('d-none');
        });
    }
}

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

let grupo = document.querySelectorAll('.editar-grupo'),
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

grupo.forEach(btn => {
    btn.addEventListener('click', e => {
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
    });
});

let btnModalMatricula = document.querySelectorAll('.btnModalMatricula'),
btnModalTabla = document.querySelector('#modalTable'),
identificadorGrupo = document.querySelector('#identificadorGrupo'),
btnModalRows = document.querySelector('#tableRows');

btnModalMatricula.forEach(btn => {
    btn.addEventListener('click', e => {
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
    });
});

let borrarBtn = document.querySelectorAll('.borrar-btn');

borrarBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        //e.target.parentElement.submit()
        const data = new FormData(e.target.childNodes[1]);
        const fila = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        fetch('/borrargrupopy672', {
            method: 'POST',
            body: data
        }).then(function(response) {
            if(response.ok) {
                fila.remove();
            } else {
                throw "Error en la llamada Ajax";
            }
        }).catch(function(err) {
            console.log(err);
        });
    });
});

let selectGrupo1 = document.getElementById('nivelesGrupo1'),
selectGrupo2 = document.getElementById('nivelesGrupo2');

selectGrupo1.addEventListener('change', e => {
    let selected = selectGrupo1.value;
    pagosGrupo1.options[0].selected = true;
    filtroPagosGrupoDesde0('todos');
    filtroGruposDesde0(selected);
});

selectGrupo2.addEventListener('change', e => {
    let selected = selectGrupo2.value;
    pagosGrupo2.options[0].selected = true;
    filtroPagosGrupoIntensivos('todos');
    filtroGruposIntensivo(selected);
});

const filtroGruposDesde0 = (item) => {
    let todos = document.querySelectorAll(`#tablaDesde0 .desde0`);
    let rows = document.querySelectorAll(`#tablaDesde0 .desde0.${item}`);
    console.log(rows)
    todos.forEach(row => {
        row.classList.add('d-none');
        row.classList.remove('d-block');
    });
    if(item === 'todos') {
        todos.forEach(row => {
            row.classList.remove('d-none');
            row.classList.add('d-block');
        });
    } else {
        rows.forEach(col => {
            console.log(col)
            col.classList.remove('d-none');
            col.classList.add('d-block');
        });
    }
}
  
const filtroGruposIntensivo = (item) => {
    let todos = document.querySelectorAll(`#tablaIntensivo .intensivo`);
    let rows = document.querySelectorAll(`#tablaIntensivo .intensivo.${item}`);
    todos.forEach(row => {
        row.classList.add('d-none');
        row.classList.remove('d-block');
    });
    if(item === 'todos') {
        todos.forEach(row => {
            row.classList.remove('d-none');
            row.classList.add('d-block');
        });
    } else {
        rows.forEach(col => {
            console.log(col)
            col.classList.remove('d-none');
            col.classList.add('d-block');
        });
    }
}

let pagosGrupo1 = document.getElementById('pagosGrupo1'),
pagosGrupo2 = document.getElementById('pagosGrupo2');

pagosGrupo1.addEventListener('change', e => {
    selectGrupo1.options[0].selected = true;
    filtroGruposDesde0('todos');
    filtroPagosGrupoDesde0(pagosGrupo1.value);
});

const filtroPagosGrupoDesde0 = (item) => {
    let todos = document.querySelectorAll(`#tablaDesde0 .desde0`);
    console.log(item)
    todos.forEach(row => {
        row.classList.add('d-none');
        row.classList.remove('d-block');
    });
    if(item === 'todos') {
        todos.forEach(row => {
            row.classList.remove('d-none');
            row.classList.add('d-block');
        });
    } else if (item === '01') {
        todos.forEach(row => {
            if(row.getAttribute('data-pagos') === '01 de cada mes') {
                row.classList.remove('d-none');
                row.classList.add('d-block');
            }
        });
    } else {
        todos.forEach(row => {
            if(row.getAttribute('data-pagos') === '15 de cada mes') {
                row.classList.remove('d-none');
                row.classList.add('d-block');
            }
        });
    }
}

pagosGrupo2.addEventListener('change', e => {
    selectGrupo2.options[0].selected = true;
    filtroGruposIntensivo('todos');
    filtroPagosGrupoIntensivos(pagosGrupo2.value);
});

const filtroPagosGrupoIntensivos = (item) => {
    let todos = document.querySelectorAll(`#tablaIntensivo .intensivo`);

    todos.forEach(row => {
        row.classList.add('d-none');
        row.classList.remove('d-block');
    });
    if(item === 'todos') {
        todos.forEach(row => {
            row.classList.remove('d-none');
            row.classList.add('d-block');
        });
    } else if (item === '01') {
        todos.forEach(row => {
            if(row.getAttribute('data-pagos') === '01 de cada mes') {
                row.classList.remove('d-none');
                row.classList.add('d-block');
            }
        });
    } else {
        todos.forEach(row => {
            if(row.getAttribute('data-pagos') === '15 de cada mes') {
                row.classList.remove('d-none');
                row.classList.add('d-block');
            }
        });
    }
}