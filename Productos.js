const contenedorTarjetas = document.getElementById("contenedor-items");

function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoProd = document.createElement("div");
    nuevoProd.classList = "item";
    nuevoProd.innerHTML = `
      <span class="titulo-item">${producto.Nombre}</span>
      <img src= "${producto.Imagen}" alt="" class="img-item">
      <span class="precio-item">$${producto.PrecioVenta}</span>
      <button class="boton-item"><i class="fa fa-basket-shopping"></i>  Agregar al Carrito</button>
      <span class="t"><b>En existencia: ${producto.Stock}</b></span>
    `
    contenedorTarjetas.appendChild(nuevoProd);
    nuevoProd.getElementsByClassName("boton-item")[0].addEventListener("click",()=> ready())
  });
}

getProds().then(prods => {
  crearTarjetasProductosInicio(prods);
})

const contenedorTarjetas2 = document.querySelectorAll("#mjp .container-products");

function crearTarjetasProductosInicio2(productos2){
  productos2.forEach(producto2 => {
    const nuevoProd2 = document.createElement("div");
    nuevoProd2.classList = "item";
    nuevoProd2.innerHTML = `
      <div class="product-item" category="peg">
					<div class="card-product">
						<div class="container-img">
							<img src="https://cverbglish.github.io/Imagenes/img_WPeleteria/haloGame.jpg" alt="Cafe Irish" />
							<div class="button-group">
								<span>
									<i class="fa-regular fa-eye"></i>
								</span>
								<span>
									<i class="fa-regular fa-heart"></i>
								</span>
								<span>
									<i class="fa-solid fa-code-compare"></i>
								</span>
							</div>
						</div>
						<div class="content-card-product">
							<div class="stars">
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
							</div>
							<h3>Halo Infinite</h3>
							<a href="https://www.amazon.com.mx/Halo-Infinite-Xbox-One/dp/B09CQQ7T2L/ref=asc_df_B09CQQ7T2L/?tag=gledskshopmx-20&linkCode=df0&hvadid=673144729086&hvpos=&hvnetw=g&hvrand=16906382580584906123&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1010058&hvtargid=pla-1590290376238&psc=1&mcid=29e7af2a9ae63ae5bf03c88213a44c7b">
							<button class="add-cart">
								<i class="fa-solid fa-basket-shopping"></i>
							</button>
							</a>
							<p class="price">$588.85</p>
						</div>
					</div>
				</div>
    `
    contenedorTarjetas2.appendChild(nuevoProd2);
    nuevoProd.getElementsByClassName("boton-item")[0].addEventListener("click",()=> ready())
  });
}

getProds2().then(prods2 => {
  crearTarjetasProductosInicio2(prods2);
})