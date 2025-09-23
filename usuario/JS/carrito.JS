
const cuerpoCarrito = document.getElementById("cuerpo-carrito");
const totalCarritoEl = document.getElementById("total-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const tablaCarrito = document.getElementById("tabla-carrito");
const carritoIcon = document.querySelector(".acciones a[href='carrito.html']");
const descuentoInfo = document.getElementById("descuento-aplicado");


function obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuario")) || null;
}


function calcularDescuento(total) {
    const usuario = obtenerUsuario();
    let descuento = 0;
    let mensaje = "";

    if (!usuario) return { totalFinal: total, mensaje };

    const hoy = new Date();
    const cumple = new Date(usuario.fechaNacimiento);

    if (usuario.email && usuario.email.includes("@duoc.cl") &&
        hoy.getDate() === cumple.getDate() &&
        hoy.getMonth() === cumple.getMonth()) {
        descuento = total;
        mensaje = "¡Feliz cumpleaños! 🎂 Tu torta es gratis.";
    }
    else if (usuario.edad >= 50) {
        descuento = total * 0.5;
        mensaje = "Descuento 50% aplicado por ser mayor de 50 años.";
    }
    else if (usuario.codigo === "FELICES50") {
        descuento = total * 0.1;
        mensaje = "Descuento 10% aplicado con código FELICES50.";
    }

    return { totalFinal: total - descuento, mensaje };
}

function actualizarIconoCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if(carritoIcon) carritoIcon.textContent = `🛒 (${totalCantidad})`;
}

function formatoMoneda(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

function agregarAlCarrito(nombre, precio, cantidad = 1) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.nombre === nombre);

    if (index >= 0) carrito[index].cantidad += cantidad;
    else carrito.push({ nombre, precio, cantidad });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarIconoCarrito();
    alert("Producto agregado al carrito ✅");
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cuerpoCarrito.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacio.style.display = "block";
        tablaCarrito.style.display = "none";
        totalCarritoEl.textContent = "$0";
        descuentoInfo.textContent = "";
        actualizarIconoCarrito();
        return;
    }

    carritoVacio.style.display = "none";
    tablaCarrito.style.display = "table";

    let total = 0;
    carrito.forEach((item, index) => {
        const tr = document.createElement("tr");
        const totalItem = item.precio * item.cantidad;
        total += totalItem;

        tr.innerHTML = `
            <td data-label="Producto">${item.nombre}</td>
            <td data-label="Precio Unitario">${formatoMoneda(item.precio)}</td>
            <td data-label="Cantidad">
                <input type="number" min="1" value="${item.cantidad}" class="cantidad-carrito" data-index="${index}">
            </td>
            <td data-label="Total">${formatoMoneda(totalItem)}</td>
            <td data-label="Eliminar"><button class="eliminar" data-index="${index}">❌</button></td>
        `;
        cuerpoCarrito.appendChild(tr);
    });

    const { totalFinal, mensaje } = calcularDescuento(total);
    totalCarritoEl.textContent = formatoMoneda(totalFinal);
    descuentoInfo.textContent = mensaje;

    document.querySelectorAll(".cantidad-carrito").forEach(input => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            let valor = parseInt(e.target.value);
            if (valor < 1) valor = 1;
            carrito[index].cantidad = valor;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        });
    });

    document.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        });
    });

    actualizarIconoCarrito();
}

const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        if (confirm("¿Deseas vaciar todo el carrito?")) {
            localStorage.removeItem("carrito");
            actualizarCarrito();
        }
    });
}

const btnPagar = document.getElementById("pagar");
if (btnPagar) {
    btnPagar.addEventListener("click", () => {
        if (confirm("¡Gracias por tu compra! ✅ Tu pedido está en preparación.")) {
            localStorage.removeItem("carrito");
            actualizarCarrito();
        }
    });
}

actualizarCarrito();

document.querySelectorAll(".producto button").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const padre = e.target.closest(".producto");
        const detalleLink = padre.querySelector("a.detalle").getAttribute("href");
        const urlParams = new URL(detalleLink, window.location.href).searchParams;
        const productoClave = urlParams.get("producto");
        const producto = productosData[productoClave];
        if(producto) agregarAlCarrito(producto.nombre, producto.precio, 1);
    });
});

const params = new URLSearchParams(window.location.search);
const productoParam = params.get("producto");
if(productoParam && productosData[productoParam]){
    const data = productosData[productoParam];
    document.getElementById("img-producto").src = data.imagen;
    document.getElementById("nombre-producto").textContent = data.nombre;
    document.getElementById("precio-producto").textContent = "$" + data.precio.toLocaleString("es-CL");
    document.getElementById("descripcion-producto").textContent = data.descripcion;

    document.getElementById("añadir-carrito").addEventListener("click", ()=>{
        let cantidad = parseInt(document.getElementById("cantidad").value);
        if(isNaN(cantidad) || cantidad < 1) cantidad = 1;
        agregarAlCarrito(data.nombre, data.precio, cantidad);
    });
}
