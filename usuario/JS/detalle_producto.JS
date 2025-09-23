
const params = new URLSearchParams(window.location.search);
const producto = params.get("producto");

const productosData = {
    chocolate: {nombre:"Torta Cuadrada de Chocolate", precio:45000, descripcion:"Torta cuadrada de chocolate premium con ganache.", imagen:"/img/cuadrada_chocolate_1.jpeg"},
    vainilla: {nombre:"Torta Circular de Vainilla", precio:40000, descripcion:"Torta circular de vainilla con crema y decoraciones.", imagen:"/img/circular_vainilla_2.jpeg"},
    cumpleaños: {nombre:"Torta Especial de Cumpleaños", precio:55000, descripcion:"Torta temática personalizada para cumpleaños.", imagen:"/img/cumple_2.jpg"},
    naranja: {nombre:"Torta de Naranja sin Azúcar", precio:48000, descripcion:"Torta saludable de naranja, sin azúcar añadida.", imagen:"/img/torta_naranja_1.jpeg"},
    manjar: {nombre:"Torta Circular de Manjar", precio:48000, descripcion:"Torta circular rellena de manjar casero.", imagen:"/img/circular_manjar_1.jpeg"},
    vegana: {nombre:"Torta Vegana de Chocolate", precio:50000, descripcion:"Torta vegana sin productos animales, con chocolate orgánico.", imagen:"/img/vegana_chocolate_2.jpeg"},
    galletas: {nombre:"Galletas Veganas de Avena", precio:4500, descripcion:"Galletas veganas de avena, ideales como snack saludable.", imagen:"/img/galletas_vegana_avena_2.jpeg"},


};

if(producto && productosData[producto]){
    const data = productosData[producto];
    document.getElementById("img-producto").src = data.imagen;
    document.getElementById("nombre-producto").textContent = data.nombre;
    document.getElementById("precio-producto").textContent = "$" + data.precio.toLocaleString("es-CL");
    document.getElementById("descripcion-producto").textContent = data.descripcion;
}

const carritoIcon = document.querySelector(".acciones a[href='/usuario/paginas/carrito.html']");
function actualizarIconoCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCantidad = carrito.reduce((sum, item)=> sum + item.cantidad, 0);
    carritoIcon.textContent = `🛒 (${totalCantidad})`;
}
actualizarIconoCarrito();

document.getElementById("añadir-carrito").addEventListener("click", ()=>{
    let cantidad = parseInt(document.getElementById("cantidad").value);
    if(isNaN(cantidad) || cantidad < 1) cantidad = 1;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(p => p.nombre === productosData[producto].nombre);
    if(index >= 0){
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({nombre: productosData[producto].nombre, precio: productosData[producto].precio, cantidad: cantidad});
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarIconoCarrito();
    alert("Producto agregado al carrito ✅");
});
