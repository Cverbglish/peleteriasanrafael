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
