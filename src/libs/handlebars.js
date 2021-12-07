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
	userstatuspy27: (state) => {
		if(state === 'activo') {
			return 'Active';
		} else {
			return 'Disable';
		}
	},
	useraccountstatuspy27: (state) => {
		if(state === 'No verificado') {
			return 'Not Verified';
		} else {
			return 'Verified';
		}
	},
	imgfrontuserpy27: (img) => {
		if(!img) {
			return '';
		} else {
			return `
			<div class="col-12 col-sm-6 mb-1 dni-img">
				<label class="form-label" for="">Image Front DNI</label>
				<a href="/assets/img_up/${img}" target="_blank">
					<img src="/assets/img_up/${img}" class="img-fluid rounded-1">
				</a>
				</div>`;
		}
	},
	imgbackuserpy27: (img) => {
		if(!img) {
			return '';
		} else {
			return `
			<div class="col-12 col-sm-6 mb-1 dni-img">
				<label class="form-label" for="">Image Back DNI</label>
				<a href="/assets/img_up/${img}" target="_blank">
					<img src="/assets/img_up/${img}" class="img-fluid rounded-1">
				</a>
			</div>`;
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
	clasesGruposPY672: (nombre) => {
		if(nombre === "Desde cero") {
			return 'desde0';
		} else {
			return 'intensivo';
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


	// --------PY4
	video_img: (fotos) => {

		var formato = fotos.split(".");
		 var out = "";
				console.log(formato)
				if (formato[1] == "mp4" || formato[1] == "ogg" || formato[1] == "webm") {
					out+=	`<video src="../../../dataPY4/img_upload/${fotos}" controls width="320" height="240">
					Tu navegador no admite el elemento <code>video</code>.
				  </video> `
				}else{
				   out+=	`	
				   <img src="../../../dataPY4/img_upload/${fotos}"/ class="img-fluid"
				   style="height: 17rem;width:100%">` 
				}
		// console.log(aux[0])
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