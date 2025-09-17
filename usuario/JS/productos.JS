// Datos de productos
const productosData = {
    chocolate: {nombre:"Torta Cuadrada de Chocolate", precio:45000, descripcion:"Torta cuadrada de chocolate premium con ganache.", imagen:"/img/cuadrada_chocolate_1.jpeg"},
    vainilla: {nombre:"Torta Circular de Vainilla", precio:40000, descripcion:"Torta circular de vainilla con crema y decoraciones.", imagen:"/img/circular_vainilla_2.jpeg"},
    cumpleaños: {nombre:"Torta Especial de Cumpleaños", precio:55000, descripcion:"Torta temática personalizada para cumpleaños.", imagen:"/img/cumple_2.jpg"},
    naranja: {nombre:"Torta de Naranja sin Azúcar", precio:48000, descripcion:"Torta saludable de naranja, sin azúcar añadida.", imagen:"/img/torta_naranja_1.jpeg"},
    manjar: {nombre:"Torta Circular de Manjar", precio:48000, descripcion:"Torta circular rellena de manjar casero.", imagen:"/img/circular_manjar_1.jpeg"},
    vegana: {nombre:"Torta Vegana de Chocolate", precio:50000, descripcion:"Torta vegana sin productos animales, con chocolate orgánico.", imagen:"/img/vegana_chocolate_2.jpeg"},
    galletas: {nombre:"Galletas Veganas de Avena", precio:4500, descripcion:"Galletas veganas de avena, ideales como snack saludable.", imagen:"/img/galletas_vegana_avena_2.jpeg"}
};

// Función para agregar producto al carrito
function agregarAlCarrito(clave, cantidad = 1){
    const producto = productosData[clave];
    if(!producto) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.nombre === producto.nombre);
    if(index >= 0){
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({nombre: producto.nombre, precio: producto.precio, cantidad: cantidad});
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarIconoCarrito();
    alert("Producto agregado al carrito ✅");
}

// Actualizar ícono del carrito
const carritoIcon = document.querySelector(".acciones a[href='carrito.html']");
function actualizarIconoCarrito(){
    if(!carritoIcon) return;
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((sum,item)=>sum+item.cantidad,0);
    carritoIcon.textContent = `🛒 (${total})`;
}
actualizarIconoCarrito();

// --- BOTONES DE TODOS LOS PRODUCTOS ---
document.querySelectorAll(".producto button").forEach(btn=>{
    btn.addEventListener("click", e=>{
        const padre = e.target.closest(".producto");
        const linkDetalle = padre.querySelector("a.detalle");
        if(!linkDetalle) return;

        const url = new URL(linkDetalle.href, window.location.href);
        const clave = url.searchParams.get("producto");
        if(clave) agregarAlCarrito(clave, 1);
    });
});

// --- DETALLE PRODUCTO ---
const params = new URLSearchParams(window.location.search);
const productoParam = params.get("producto");
if(productoParam && productosData[productoParam]){
    const data = productosData[productoParam];
    const img = document.getElementById("img-producto");
    const nombre = document.getElementById("nombre-producto");
    const precio = document.getElementById("precio-producto");
    const descripcion = document.getElementById("descripcion-producto");

    if(img) img.src = data.imagen;
    if(nombre) nombre.textContent = data.nombre;
    if(precio) precio.textContent = "$" + data.precio.toLocaleString("es-CL");
    if(descripcion) descripcion.textContent = data.descripcion;

    const btnDetalle = document.getElementById("añadir-carrito");
    if(btnDetalle){
        btnDetalle.addEventListener("click", ()=>{
            let cantidad = parseInt(document.getElementById("cantidad")?.value) || 1;
            agregarAlCarrito(productoParam, cantidad);
        });
    }
}
