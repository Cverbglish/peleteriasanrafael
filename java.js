/**Sentencias de si se cumple algún click en los elementos establecidos*/
const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");

        toggle.addEventListener("click", () =>{
            sidebar.classList.toggle("close"); /*Se cierra la barra*/
        })

        /**Cambio de tema e iconos del switch */
        modeSwitch.addEventListener("click", () =>{
            body.classList.toggle("dark");

            if(body.classList.contains("dark")){
                modeText.innerText = "Modo Claro"
            }else{
                modeText.innerText = "Modo oscuro"
            }
        })


/*Productos Query*/

$(document).ready(function(){

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.category_list .category_item[category="all"]').addClass('ct_item-active');

	// FILTRANDO PRODUCTOS  ============================================

	$('.category_item').click(function(){
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct(){
			$('.product-item').hide();
		} setTimeout(hideProduct,400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct(){
			$('.product-item[category="'+catProduct+'"]').show();
			$('.product-item[category="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,400);
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================

	$('.category_item[category="all"]').click(function(){
		function showAll(){
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		} setTimeout(showAll,400);
	});
});

/** BOTONES REDES */

const   RFP = document.querySelector("#faceP"),
        RXP = document.querySelector("#xP"),
        RIP = document.querySelector("#insP");
        RYP = document.querySelector("#youP");
        RWP = document.querySelector("#whaP");

RFP.addEventListener("click", () =>{
    location.href="https://www.facebook.com/share/nZ1qjZKiBRTUabD3/?mibextid=WC7FNe"
})
RXP.addEventListener("click", () =>{
    location.href="https://twitter.com/?lang=es"
})
RIP.addEventListener("click", () =>{
    location.href="https://www.instagram.com/rmoz._abraham?igsh=MTlrZmdkOW5zMnB3Ng%3D%3D&utm_source=qr"
})
RYP.addEventListener("click", () =>{
    location.href="https://www.youtube.com/"
})
RWP.addEventListener("click", () =>{
    location.href="https://wa.me/524779108309?"
})