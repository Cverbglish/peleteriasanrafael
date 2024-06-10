//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    const   wa = document.querySelector("#pagar");

    wa.addEventListener("click", () =>{

        const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Datos de la empresa
            const empresaNombre = "PELETERIA SAN RAFAEL";
            const empresaDireccion = "Lago de Encinillas 129, Lomas de la Trinidad,\n37300 León de los Aldama, Gto.";
            const empresaTelefono = "\nTeléfono: 477-910-8309";
            const empresaEmail = "\nEmail: peleteriasanrafael3@gmail.com";
            const empresaLogo = "https://cverbglish.github.io/peleteria/img/SanRafaAc.png"; // URL de la imagen del logo de la empresa

            // Añadir datos de la empresa al PDF
            const img = new Image();
            img.src = empresaLogo;
            img.onload = function () {
                doc.addImage(img, 'PNG', 10, 10, 50, 50);
                doc.setFontSize(12);
                doc.text(empresaNombre, 70, 20);
                doc.text(empresaDireccion, 70, 30);
                doc.text(empresaTelefono, 70, 40);
                doc.text(empresaEmail, 70, 50);

                // Obtener los datos del carrito
                const cartItems = document.querySelectorAll('#carrito .carrito-items .carrito-item');
                const tableRows = Array.from(cartItems).map(item => {
                    const precioText = item.querySelector('.carrito-item-precio').textContent.replace('$', '');
                    const cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
                    const precio = parseFloat(precioText);
                    return [
                        item.querySelector('.carrito-item-titulo').textContent,
                        cantidad,
                        `$${precio.toFixed(2)}`,
                        `$${(precio * cantidad).toFixed(2)}`
                    ];
                });

                // Calcular el total
                
                const total = tableRows.reduce((sum, row) => sum + parseFloat(row[3].replace('$', '')), 0);

                // Añadir tabla de productos al PDF
                doc.autoTable({
                    head: [['Producto', 'Cantidad', 'Precio Unitario', 'Subtotal']],
                    body: tableRows,
                    startY: 60,
                });

                // Añadir total al PDF
                doc.setFontSize(14);
                
                //doc.text(`Total: $${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
                doc.text(`Total: $${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

                // Guardar PDF en Blob
                const pdfBlob = doc.output('blob');

                // Crear un enlace para descargar el PDF
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const fileName = 'PedidoWeb.pdf';

                // Descargar el PDF
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Generar el enlace de WhatsApp
                const message = `Hola, te envío mi pedido:\n\n${tableRows.map(row => `Producto: ${row[0]}, Cantidad: ${row[1]}, Precio: ${row[2]}, Subtotal: ${row[3]}`).join('\n')}\n\nTotal: $${total.toFixed(2)}`;
                const whatsappUrl = `https://wa.me/524779108309?text=${encodeURIComponent(message)}`;

                window.open(whatsappUrl, '_blank');
            };
        
    })
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            agregarToast({ tipo: 'error', titulo: 'Error', descripcion: 'El producto ya se encuentra en el carrito', autoCierre: true });
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
    agregarToast({ tipo: 'exito', titulo: 'Producto Agregado!', descripcion: 'El producto se agrego exitosamente.', autoCierre: true });
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace(',',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("MX") + "";

}

/*Barra buscadora*/

document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
  
        if (e.key ==="Escape")e.target.value = ""
  
        document.querySelectorAll(".item").forEach(fruta =>{
  
            fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?fruta.classList.remove("filtro")
              :fruta.classList.add("filtro")
        })
    }
  })

  document.addEventListener("keyup", e=>{

    if (e.target.matches("#bus")){
  
        if (e.key ==="Escape")e.target.value = ""
  
        document.querySelectorAll(".item").forEach(fruta =>{
  
            fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?fruta.classList.remove("filtro")
              :fruta.classList.add("filtro")
        })
    }
  })

/**=== NOTIFY ===*/

const contenedorBotones = document.getElementById('contenedor-items');
const contenedorToast = document.getElementById('contenedor-toast');

// Event listener para detectar click en los botones
contenedorBotones.addEventListener('click', (e) => {
	e.preventDefault();

	const tipo = e.target.dataset.tipo;

	if (tipo === 'exito') {
		agregarToast({ tipo: 'exito', titulo: 'Exito!', descripcion: 'El producto se agrego correctamente.', autoCierre: true });
	}
	if (tipo === 'error') {
		agregarToast({ tipo: 'error', titulo: 'Error', descripcion: 'El producto ya se encuentra en el carrito', autoCierre: true });
	}
	if (tipo === 'info') {
		agregarToast({ tipo: 'info', titulo: 'Info', descripcion: 'Esta es una notificación de información.' });
	}
	if (tipo === 'warning') {
		agregarToast({ tipo: 'warning', titulo: 'Warning', descripcion: 'Ten cuidado' });
	}
});

// Event listener para detectar click en los toasts
contenedorToast.addEventListener('click', (e) => {
	const toastId = e.target.closest('div.toast').id;

	if (e.target.closest('button.btn-cerrar')) {
		cerrarToast(toastId);
	}
});

// Función para cerrar el toast
const cerrarToast = (id) => {
	document.getElementById(id)?.classList.add('cerrando');
};

// Función para agregar la clase de cerrando al toast.
const agregarToast = ({ tipo, titulo, descripcion, autoCierre }) => {
	// Crear el nuevo toast
	const nuevoToast = document.createElement('div');

	// Agregar clases correspondientes
	nuevoToast.classList.add('toast');
	nuevoToast.classList.add(tipo);
	if (autoCierre) nuevoToast.classList.add('autoCierre');

	// Agregar id del toast
	const numeroAlAzar = Math.floor(Math.random() * 100);
	const fecha = Date.now();
	const toastId = fecha + numeroAlAzar;
	nuevoToast.id = toastId;

	// Iconos
	const iconos = {
		exito: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
					<path
						d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"
					/>
				</svg>`,
		error: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
								<path
									d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
								/>
							</svg>`,
		info: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
								<path
									d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
								/>
							</svg>`,
		warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
								<path
									d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
								/>
							</svg>`,
	};

	// Plantilla del toast
	const toast = `
		<div class="contenido">
			<div class="icono">
				${iconos[tipo]}
			</div>
			<div class="texto">
				<p class="titulo">${titulo}</p>
				<p class="descripcion">${descripcion}</p>
			</div>
		</div>
		<button class="btn-cerrar">
			<div class="icono">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
					<path
						d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</div>
		</button>
	`;

	// Agregar la plantilla al nuevo toast
	nuevoToast.innerHTML = toast;

	// Agregamos el nuevo toast al contenedor
	contenedorToast.appendChild(nuevoToast);

	// Función para menajera el cierre del toast
	const handleAnimacionCierre = (e) => {
		if (e.animationName === 'cierre') {
			nuevoToast.removeEventListener('animationend', handleAnimacionCierre);
			nuevoToast.remove();
		}
	};

	if (autoCierre) {
		setTimeout(() => cerrarToast(toastId), 1500);
	}

	// Agregamos event listener para detectar cuando termine la animación
	nuevoToast.addEventListener('animationend', handleAnimacionCierre);
};

/** GENERAR PDF */