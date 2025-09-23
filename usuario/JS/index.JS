const productosData = {
    chocolate: {nombre:"Torta Cuadrada de Chocolate", precio:45000},
    vainilla: {nombre:"Torta Circular de Vainilla", precio:40000},
    cumpleaños: {nombre:"Torta Especial de Cumpleaños", precio:55000},
    naranja: {nombre:"Torta de Naranja sin Azúcar", precio:48000},
    manjar: {nombre:"Torta Circular de Manjar", precio:48000},
    vegana: {nombre:"Torta Vegana de Chocolate", precio:50000},
    galletas: {nombre:"Galletas Veganas de Avena", precio:4500}
};

document.querySelectorAll(".grid-productos .producto").forEach(productoEl => {
    const btn = productoEl.querySelector("button");
    const detalleLink = productoEl.querySelector("a.detalle").getAttribute("href");
    const params = new URLSearchParams(detalleLink.split("?")[1]);
    const productoKey = params.get("producto");

    btn.addEventListener("click", () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const index = carrito.findIndex(p => p.nombre === productosData[productoKey].nombre);
        if (index >= 0) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push({nombre: productosData[productoKey].nombre, precio: productosData[productoKey].precio, cantidad: 1});
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Producto agregado al carrito ✅");
    });
});