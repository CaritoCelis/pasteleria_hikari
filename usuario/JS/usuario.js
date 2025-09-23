// Obtener elementos del header
const carritoIcono = document.querySelector(".acciones a[aria-label='Carrito de compras']");

// Función para obtener carrito desde localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

// Función para guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// Actualizar contador del carrito en el header
function actualizarContador() {
    const carrito = obtenerCarrito();
    if (carritoIcono) {
        carritoIcono.textContent = `🛒 (${carrito.length})`;
    }
}

// Función para añadir producto al carrito
function añadirAlCarrito(producto) {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    alert(`✅ "${producto.nombre}" agregado al carrito`);
}

document.querySelectorAll(".acciones-producto button, #añadir-carrito").forEach(button => {
    button.addEventListener("click", function() {
        // Obtenemos datos del producto según donde esté el botón
        const productoDiv = button.closest(".producto, .detalle-producto");
        const nombre = productoDiv.querySelector("h3, #nombre-producto").textContent;
        const precioText = productoDiv.querySelector(".precio, #precio-producto").textContent;
        const precio = parseInt(precioText.replace(/\D/g, "")); // eliminar $ y puntos
        const cantidadInput = productoDiv.querySelector("#cantidad");
        const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;

        const producto = { nombre, precio, cantidad };
        añadirAlCarrito(producto);
    });
});

actualizarContador();
