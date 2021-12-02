var moment = require('moment'); // require
module.exports = {
	showAlerts: (message = {}, alerts) => {
		const categoria = Object.keys(message);

		let html = '';

		if(categoria.length) {
			html += '<div class="form-message-container">';
			message[categoria].forEach(error => {
				html += `<p class="form-message form-message-${categoria}">${error}</p>`;
			});
			html += '</div>';
		}

		return alerts.fn().html = html;
	},
	showCurrentMembership: (str1, str2) => {
		if(str1 === str2) {
			return '(actual)';
		}
	},
	showBtnMembership: (str1, str2, btnClass, url, monto, modo) => {
		if(str1 !== str2) {
			return `
			<form action="${url}" method="post">
			<input type="hidden"   name="amount" value="${monto}" id="monto_plan">
			<input type="hidden"   name="modo" value="${modo}" id="modo_plan">
			<input type="hidden"   name="product" value="${str2}" id="tipo_plan">
			<input type="submit"   class="btn btn-block btn-${btnClass}" value="Obtener Plan">
			</form>
			`;
		}
	},
	// ----- PYT-24
	paymethodspy24: (banks, paym, btc, wallet) => {
		console.log("HBS")
		console.log(banks)
		console.log(paym)
		console.log(btc)
		console.log(wallet)
		if (banks.length) {
			return true;	
		} else {
			return false;
		}
	},
	duracionplanespy24: (item) => {
		if (item === 12) {
			return 'docemeses';
		} else {
			return 'veinticuatromeses';
		}
	},
	planesclasepy24: (item) => {
		if (item > 6 && item <= 13) {
			return 'standard-pricing popular';
		} else if(item <= 6) {
			return 'basic-pricing';
		}
	},
	statusretreatspy24: (status) => {
		if (status === 'Solicitado') {
			return `<span class="badge rounded-pill badge-light-info">${status}</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-success">${status}</span>`;
		}
	},
	paqueteNombrepy24: (name) => {
		if(name) {
			return name;
		} else {
			return 'Personalizado'
		}
	},
	roleuserpy24: (role) => {
		if(role === 'Inversionista') {
			return `<span class="badge rounded-pill badge-light-info">${role}</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-warning">${role}</span>`;
		}
	},
	roleuserpy27: (role) => {
		if(role === 'Inversionista') {
			return `<span class="badge rounded-pill badge-light-info">Investor</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-warning">${role}</span>`;
		}
	},
	usertosellerpy21: (id, role) => {
		if(role === 'Inversionista') {
			return `<form action="/usertosellerpy21" method="POST">
			<input type="text" name="id" value="${id}" class="d-none">
			<input type="text" name="status" value="{{item.status}}" class="d-none">
			<button type="submit" class="dropdown-item w-100 d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text font-small-4 me-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>Dar permisos de Vendedor</button>
			</form>`;
		} else {
			return `<form action="/sellertouserpy21" method="POST">
			<input type="text" name="id" value="${id}" class="d-none">
			<input type="text" name="status" value="{{item.status}}" class="d-none">
			<button type="submit" class="dropdown-item w-100 d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text font-small-4 me-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>Remover permisos de Vendedor</button>
			</form>`;
		}
	},
	capitalinvertidopy24: (capital) => {
		let total = 0;
		capital.forEach(element => {
			total += parseInt(element.amount); 
		})
		return total;
	},
	gananciasgeneralespy24: (earnings) => {
		let total = 0;
		earnings.forEach(element => {
			total += parseInt(element.earnings); 
		})
		return total;
	},
	statususerpy24: (status) => {
		if(status === 'activo') {
			return `<span class="badge rounded-pill badge-light-success">${status}</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-warning">${status}</span>`;
		}
	},
	statususerpy27: (status) => {
		if(status === 'activo') {
			return `<span class="badge rounded-pill badge-light-success">Active</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-warning">Not Verified</span>`;
		}
	},
	statususerpay: (status) => {
		if(status === 'Pagado') {
			return `<span class="badge rounded-pill badge-light-success">${status}</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-warning">${status}</span>`;
		}
	},
	accountverifiedpy24: (verify) => {
		if(verify === 'No verificado') {
			return `<span class="badge rounded-pill badge-light-danger">${verify}</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-success">${verify}</span>`;
		}
	},
	accountverifiedpy27: (verify) => {
		if(verify === 'No verificado') {
			return `<span class="badge rounded-pill badge-light-danger">Not Verified</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-success">Verified</span>`;
		}
	},
	estadodepositospy27: (status) => {
		if(status === 'No verificado') {
			return `<span class="badge rounded-pill badge-light-warning">Not Verified</span>`;
		} else if (status === 'Finalizado') {
			return `<span class="badge rounded-pill badge-light-info">Finalized</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-success">Approved</span>`;
		}
	},
	estadodepositospy24: (status) => {
		if(status === 'No verificado') {
			return `<span class="badge rounded-pill badge-light-warning">${status}</span>`;
		} else if (status === 'Finalizado') {
			return `<span class="badge rounded-pill badge-light-info">${status}</span>`;
		} else {
			return `<span class="badge rounded-pill badge-light-success">${status}</span>`;
		}
	},
	statusmetodospagospy24: (status) => {
		if(status === 'Habilitado') {
			return `<span class="badge rounded-pill badge-light-success">${status}</span>`
		} else {
			return `<span class="badge rounded-pill badge-light-danger">${status}</span>`
		}
	},
	statuspaymethodspy24: (state) => {
		if(state === 'Deshabilitado') {
			return 'Habilitar';
		} else {
			return 'Deshabilitar';
		}
	},
	statuspaymethodspy27: (state) => {
		if(state === 'Deshabilitado') {
			return 'Enable';
		} else {
			return 'Disable';
		}
	},
	formatDatapy24: (date) => {
		if(date) {
			return date.slice(0,10)
		} else {
			return ''
		}
	},
	userdepositspy24: (id, arr) => {
		if(arr.length) {
			return `<a href="#" role="button" class="btn btn-primary btn-paquetes" data-id="${id}">Ver</a>`
		} else {
			return '<span class="badge rounded-pill bg-light-dark text-primary">Ninguno</span>'
		}
	},
	planesinfopy24: (th, name) => {
		console.log(th);
		console.log(name);
		if (th <= 6) {
			return `
			<img src="../../../app-assets/images/illustration/btc.png" class="img-fluid mb-2 mt-5" style="max-width: 80px" alt="svg img">
			<h3>${name}</h3>
			<p class="card-text">Inicial</p>`;
		} else if(th > 6 && th <= 15) {
			return `
			<div class="pricing-badge text-end">
				<span class="badge rounded-pill bg-light-primary text-primary">Popular</span>
			</div>
			<img src="../../../app-assets/images/illustration/btc.png" class="img-fluid mb-1" style="max-width: 80px" alt="svg img">
			<h3>${name}</h3>
			<p class="card-text">Mejor compra</p>
			`
		} else {
			return `
			<img src="../../../app-assets/images/illustration/btc.png" class="img-fluid mb-2" style="max-width: 80px" alt="svg img">
			<h3>${name}</h3>
			<p class="card-text">Profesional</p>`;
		}
	},
	totalth: (totalth) => {
		let total = 0;
		console.log(totalth)
		totalth.forEach(element => {
			total += parseInt(element.th_capacity);
		});
		return total;
	},
	totalthvendidos: (vendidos) => {
		let total = 0;
		vendidos.forEach(element => {
			total += parseInt(element.sold_out);
		});
		return total;
	},
	totalthdisponibles: (disponibles) => {
		let total = 0;
		disponibles.forEach(element => {
			total += parseInt(element.avalible);
		});
		return total;
	},
	contadormaquinas: (num) => {
		let total = num + 1;
		return total;
	},
	// --------
	empleados_disponibles: (sucursales, id_empleado) => {
		//console.log(sucursales)
		//console.log(id_suc)
		var aux = sucursales.split(",");
		let cont =	aux.length;
		var out = "";
		console.log(id_empleado)
			 for (let i = 0; i < id_empleado.length; i++) {
				 
				 console.log(id_empleado[i].sucursaleId)
				 if (id_empleado[i].id ==  aux[i]) {
					out	+=`<label><input type="radio" id="empleado${id_empleado[i].id}" value="${id_empleado[i].id}" name="empleado" class="empleado_check${id_empleado[i].id}" > ${id_empleado[i].nombre}</label><br>` 
				 }
			
			}
		 return out;
	},
	getMembershipDesc: (membership) => {
		switch(membership.toLowerCase()) {
			case 'gold':
				return '¡Eres todo un maestro!';
				break;
			case 'vip':
				return '¡Eres todo un experto!';
				break;
			default:
				return '¡Conviértete en experto!';
				break;
		}
	},
	acceptFiles(membership, accept) {
		if(accept) {
			return membership.toLowerCase() !== 'basic' ? 'audio/*, .zip' : '.zip';
		}
		return membership.toLowerCase() !== 'basic' ? '.mp3, .wav, .aiff, .zip' : '.zip';
	},
	fotoPrincipalPublicacion: (fotos) => {
	var aux = fotos.split(",");
	 let cont =	aux.length;
	 var out = aux[0];
	// console.log(aux[0])
	 return out;
	},
	fotoPublicacion1: (fotos) => {
		var aux = fotos.split(",");
		 var out = "";
			 if (aux[0]=="") {
				out+=	 `foto_camara.png`
			 }else{
				out+=	`${aux[0]}`
			 }
		// console.log(aux[0])
		 return out;
		},
		fotoPublicacion2: (fotos) => {
			var aux = fotos.split(",");
			 var out = "";
				 if (aux[1]=="") {
					out+=	 `foto_camara.png`
				 }else{
					out+=	`${aux[1]}`
				 }
			// console.log(aux[0])
			 return out;
			},
			fotoPublicacion3: (fotos) => {
				var aux = fotos.split(",");
				 var out = "";
					 if (aux[2]=="") {
						out+=	 `foto_camara.png`
					 }else{
						out+=	`${aux[2]}`
					 }
				// console.log(aux[0])
				 return out;
				},
				fotoPublicacion4: (fotos) => {
					var aux = fotos.split(",");
					 var out = "";
						 if (aux[3]=="") {
							out+=	 `foto_camara.png`
						 }else{
							out+=	`${aux[3]}`
						 }
					// console.log(aux[0])
					 return out;
					},
					fotoPublicacion5: (fotos) => {
						var aux = fotos.split(",");
						 var out = "";
							 if (aux[4]=="") {
								out+=	 `foto_camara.png`
							 }else{
								out+=	`${aux[4]}`
							 }
						// console.log(aux[0])
						 return out;
						},

		empleados_publicacion: (sucursal, id_suc) => {
			let cont =	sucursal.length;
			var out = "";
			console.log(cont)
			out	+=`<div class="sucur${id_suc}" style="display:none;"> `
				 for (let i = 0; i < cont; i++) {
				out	+=`	 
				<label><input type="checkbox" id="empleado${sucursal[i].id}" value="${sucursal[i].id}" name="empleados[]" class="empleados_check${sucursal[i].sucursaleId}" > ${sucursal[i].nombre}</label><br>
				`
				}
				out	+=`</div>`
			 return out;
			},
			chek_suc: (id_suc, sucursales) => {
			var aux = sucursales.split(",");
			let cont =	aux.length;
			var out = "";
			console.log(cont)
				 for (let i = 0; i < cont; i++) {
					 if (id_suc ==  aux[i]) {
						out	+=`checked` 
					 }
				
				}
			 return out;
			},
			empleados_publicacionchek: (id_empleado, empleados) => {
				var aux = empleados.split(",");
				let cont =	aux.length;
				var out = "";
				console.log(aux)
					 for (let i = 0; i < cont; i++) {
						 if (id_empleado ==  aux[i]) {
							console.log('cont'+ aux[i])
							out	+=`checked` 
						 }
					
					}
				 return out;
				},
			formatoFecha2: (fecha, user) => {
				var fecha_dia =moment(fecha).locale('es').format("dddd, Do MMMM  YYYY, h:mm a");

						//console.log(fecha_)
					 return fecha_dia;
					},
					formatoFecha: (fecha, user) => {
						const f = new Date(fecha);
						f.toLocaleString()
						 
						var Anyo = f.getFullYear();
						var Mes = ('0' + (f.getMonth()+1)).slice(-2)
						var Dia = f.getDate();
							var fecha_ = Anyo+ '-'+Mes+ '-'+Dia
							
							//console.log(fecha_)
						 return fecha_;
						},
			estadoCupon: (fecha, cantidad) => {
					const f = new Date(fecha);
						Hoy = new Date();

					var estado = "";
					if (Hoy > f) {
						estado = "Caducado"
					}else if (cantidad == 0){
						estado = "Agotado"
					}else{
						estado = "Activo"
					}
						

					 return estado;
			},

			ColorSucursal: (sucursal) => {
				var color = "";
				
				if (sucursal == "Principal" || sucursal == "Activa") {
					color = "green"
				}if(sucursal == "Inactiva" ){
					color = "orange"
				}
				else{
					color = "#06cc60"
				}
				return color;
		},
		mathposition: (posicion) => {
			
			return posicion+1;
	},	
	breaklines: (text) => {
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return text;
},
	
}