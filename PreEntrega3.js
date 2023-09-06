
let carrito = JSON.parse(localStorage.getItem ("carrito")) || [];

const productos = [
    {id: 1, nombre: "Pantalón",categoria: "Moda", stock: 10, precio: 12000, cantidad: 1, img: "https://www.stockcenter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw4164a91c/products/LONIFW230481/LONIFW230481-1.JPG"},
    {id: 2, nombre: "Aceite de coco",categoria: "Salud",stock: 15,precio: 700,cantidad: 1, img:"https://www.jabonariumshop.com/media/catalog/product/a/c/aceite-de-coco-refinado_1.jpg"},
    {id: 3, nombre: "Cafetera",categoria: "Electrodomésticos",stock: 20,precio: 15000, cantidad: 1, img:"https://www.rioshopdeco.com.ar/9932-thickbox_default/cafetera-cofix-18lts-art-aac960-c-timer-color-negro.jpg"},
    {id: 4, nombre: "Chaqueta", categoria: "Moda",stock: 15,precio: 20000, cantidad: 1, img:"https://static.pullandbear.net/2/static2/img/filters/SRA/1030204609.jpg?imwidth=774.375&20230903015706"},
    {id: 5, nombre: "Televisor",categoria: "Electrodomésticos",stock: 10,precio: 200000, cantidad: 1, img:"https://www.megatone.net/images/Articulos/zoom2x/253/MKT0343ETC.jpg"},
    {id: 6, nombre: "Aspiradora",categoria: "Electrodomésticos",stock: 15,precio: 70000, cantidad: 1, img:"https://nogalpark.com/archivos/recortes/aspiradora-karcher-nt90-2-nogalpark.jpg"},
    {id: 7, nombre: "Licuadora",categoria: "Electrodomésticos",stock: 15,precio: 80000, cantidad: 1, img:"https://images.fravega.com/f1000/8596734c456b71cf0caf656d39a30f0b.jpg"},
    {id: 8, nombre: "Air Fryer",categoria: "Electrodomésticos",stock: 15,precio: 30000, cantidad: 1,   img:"https://www.liliana.com.ar/wp-content/uploads/2020/11/AF915_web_04.jpg"}]
    
    const shopContent = document.getElementById("shopContent");
    const verCarrito = document.getElementById("verCarrito")
    const modalContainer = document.getElementById("modal-container")
    const cantidadCarrito = document.getElementById("cantidadCarrito");

    const inputBuscador = document.getElementById("buscador")
    let botonBuscar = document.getElementById("buscar")
    botonBuscar.addEventListener("click", () => filtrar(productos, inputBuscador))

    
    renderizarTarjetas(productos)

    function filtrar(productos, input){
        let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(input.value))
        renderizarTarjetas(productosFiltrados)
    }
function renderizarTarjetas(productos){
    let contenedor = document.getElementById("shopContent")
    contenedor.innerHTML = ""
productos.forEach((product)=>{
    let content = document.createElement("div");
    content.className= "card";
    content.innerHTML = `  
     <img src= "${product.img}" >
     <h3> ${product.nombre}</h3>
     <p class = "price">${product.precio} $ </p>
     `;

     contenedor.append(content);

     let comprar = document.createElement("button");
     comprar.innerText= "comprar";
     comprar.className = "comprar";

     content.append(comprar);

     comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatProduct) =>repeatProduct.id === product.id);

        if (repeat){
            carrito.map((prod) => {
                if(prod.id === product.id){
                   prod.cantidad++;
                }

            });
        } else{
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
              }
        console.log(carrito);
        carritoCounter();
        saveLocal();
     });
});
}


 const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex";
     const modalHeader = document.createElement("div");
     modalHeader.className = "modal-header"
     modalHeader.innerHTML = `
        <h1 class="modal-header-title"> Carrito.</h1>
     `;
     modalContainer.append(modalHeader);

     const modalbutton = document.createElement("h1");
     modalbutton.innerText = "x";
     modalbutton.className = "modal-header-button";
     
     modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
     })

     modalHeader.append(modalbutton);


     carrito.forEach((product) => {
     let carritoContent = document.createElement("div");
     carrito.className = "modal-content";
     carritoContent.innerHTML = `
        <img src= "${product.img}">
        <h3> ${product.nombre}</h3>
        <p>${product.precio} $ </p>
        <span class = "restar"> - </span>
        <p>Cantidad: ${product.cantidad}</p>
        <span class = "sumar"> + </span>
        <p> Total : ${product.cantidad * product.precio}</p>
        <span class = "delete-product"> ❌</span>
     `;

     modalContainer.append(carritoContent);

     let restar = carritoContent.querySelector(".restar")
     let sumar = carritoContent.querySelector(".sumar")
     
     restar.addEventListener("click", () => {
        if(product.cantidad !== 1){
            product.cantidad--;
        }
        saveLocal()
        pintarCarrito();
     });
     
     sumar.addEventListener("click", () => {
       product.cantidad++;
       saveLocal()
       pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () =>{
        eliminarProducto(product.id);

    })
    
    //  let eliminar = document.createElement("span");

    //  eliminar.innerText = "❌";
    //  eliminar.className = "delete-product";
    //  carritoContent.append(eliminar);

    //  eliminar.addEventListener("click", eliminarProducto);
     });



     const total = carrito.reduce ((acc, el)=> acc + el.precio * el.cantidad,0);

     const totalBuying = document.createElement("div")
     totalBuying.className = "total-content";
     totalBuying.innerHTML = `TOTAL A PAGAR: ${total} $`
     const botonFinalizarCompra = document.createElement("button");
     botonFinalizarCompra.id = "finalizarCompra";
     botonFinalizarCompra.textContent = "Finalizar compra"; 
     totalBuying.appendChild(botonFinalizarCompra);
     modalContainer.append(totalBuying) 

    };
     verCarrito.addEventListener("click", pintarCarrito);

     const eliminarProducto = (id) => {
        const foundId = carrito.find((element) => element.id === id);

        carrito = carrito.filter((productoId)=>{
           return productoId !== foundId;

        });
        carritoCounter();
        saveLocal()
        pintarCarrito();
     };

     const carritoCounter = () => {
        cantidadCarrito.style.display = "block";

        const carritoLength =carrito.length;

        localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
        cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
     };
     carritoCounter();

     //set item
    const saveLocal = () => {
     localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    //get item 

    JSON.parse(localStorage.getItem ("carrito"));

    let finalizarTodo = document.getElementById("finalizarCompra")

    finalizarTodo.addEventListener("click", () => {
        carrito = []; 
        localStorage.removeItem("carritoLength"); 
        carritoCounter();
        pintarCarrito(); 
     });

   
     