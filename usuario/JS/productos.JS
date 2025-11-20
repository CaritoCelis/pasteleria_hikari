// productos.js - versión robusta para mostrar usuario y carrito
(function () {
  // Evitar inicializar dos veces si el script se ha cargado duplicado
    if (window.__hikari_productos_init) return;
    window.__hikari_productos_init = true;

  // Claves posibles donde puede estar guardado el usuario
    const USUARIO_KEYS = ["usuarioActivo", "usuarioLogueado", "usuario"];

  // Intenta leer y normalizar el usuario desde localStorage
    function obtenerUsuario() {
    for (const key of USUARIO_KEYS) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        try {
        const parsed = JSON.parse(raw);
        // Si es objeto y tiene nombre
        if (parsed && typeof parsed === "object") {
            if (parsed.nombre) return { clave: key, nombre: String(parsed.nombre) };
            if (parsed.nombreUsuario) return { clave: key, nombre: String(parsed.nombreUsuario) };
          // si es objeto sin nombre claro, devuelve una representación
            return { clave: key, nombre: String(parsed.nombre ?? parsed.username ?? JSON.stringify(parsed)) };
        } else {
          // era un JSON primitivo (string/number)
            return { clave: key, nombre: String(parsed) };
        }
        } catch (e) {
        // no era JSON, usar el string directo
        return { clave: key, nombre: String(raw) };
        }
    }
    return null;
    }

  // Borra todas las claves relacionadas con usuario al hacer logout
    function eliminarUsuarioLocal() {
    for (const key of USUARIO_KEYS) localStorage.removeItem(key);
    }

  // Actualiza el icono del carrito (si existe)
    function actualizarIconoCarrito() {
    const carritoIcon = document.getElementById("carritoIcon");
    if (!carritoIcon) return;
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, it) => acc + (it.cantidad || 0), 0);
    carritoIcon.textContent = `🛒 (${total})`;
    }

  // Aplica el estado de sesión en la UI (ocultar/mostrar)
    function aplicarEstadoSesion() {
    const usuarioObj = obtenerUsuario();

    // Buscar elementos en DOM (pueden tener distintos nombres en tus HTML)
    const noLogueado = document.getElementById("noLogueado") || document.getElementById("btnLogin")?.parentElement;
    const perfilUsuario = document.getElementById("perfilUsuario");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const btnLogout = document.getElementById("btnLogout");

    if (usuarioObj && perfilUsuario && nombreUsuario) {
      // Mostrar perfil, ocultar bloques de "no logueado"
        nombreUsuario.textContent = usuarioObj.nombre;
        perfilUsuario.style.display = "flex";
        if (noLogueado) noLogueado.style.display = "none";
    } else {
      // No hay usuario: asegurarse que el UI refleja eso
        if (perfilUsuario) perfilUsuario.style.display = "none";
        if (noLogueado) noLogueado.style.display = "inline-block";
        if (nombreUsuario) nombreUsuario.textContent = "";
    }

    // (Re)asignar logout - primero quitamos listeners previos clonando el botón
    if (btnLogout) {
        const nuevo = btnLogout.cloneNode(true);
        btnLogout.parentNode.replaceChild(nuevo, btnLogout);
        nuevo.addEventListener("click", () => {
        eliminarUsuarioLocal();
        // refrescar estado visual y recargar página para coherencia
        aplicarEstadoSesion();
        actualizarIconoCarrito();
        window.location.reload();
        });
    }
    }

  // Lógica del carrito y productos (mantengo tu lógica original, mejorando robustez)
    const productosData = {
    chocolate: {nombre:"Torta Cuadrada de Chocolate", precio:45000, descripcion:"Torta cuadrada de chocolate premium con ganache.", imagen:"/img/cuadrada_chocolate_1.jpeg"},
    vainilla: {nombre:"Torta Circular de Vainilla", precio:40000, descripcion:"Torta circular de vainilla con crema y decoraciones.", imagen:"/img/circular_vainilla_2.jpeg"},
    cumpleaños: {nombre:"Torta Especial de Cumpleaños", precio:55000, descripcion:"Torta temática personalizada para cumpleaños.", imagen:"/img/cumple_2.jpg"},
    naranja: {nombre:"Torta de Naranja sin Azúcar", precio:48000, descripcion:"Torta saludable de naranja, sin azúcar añadida.", imagen:"/img/torta_naranja_1.jpeg"},
    manjar: {nombre:"Torta Circular de Manjar", precio:48000, descripcion:"Torta circular rellena de manjar casero.", imagen:"/img/circular_manjar_1.jpeg"},
    vegana: {nombre:"Torta Vegana de Chocolate", precio:50000, descripcion:"Torta vegana sin productos animales, con chocolate orgánico.", imagen:"/img/vegana_chocolate_2.jpeg"},
    galletas: {nombre:"Galletas Veganas de Avena", precio:4500, descripcion:"Galletas veganas de avena, ideales como snack saludable.", imagen:"/img/galletas_vegana_avena_2.jpeg"}
    };

    function agregarAlCarrito(clave, cantidad = 1){
    const producto = productosData[clave];
    if(!producto) return false;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.nombre === producto.nombre);
    if(index >= 0){
        carrito[index].cantidad = (carrito[index].cantidad || 0) + cantidad;
    } else {
        carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarIconoCarrito();
    return true;
    }

  // Añadir manejador para botones en la grid: detecta href con ?producto=clave o atributo data-producto
    function initBotonesAgregar() {
    // 1) botones con class .btn-agregar y data-producto (recomendado)
    document.querySelectorAll(".btn-agregar[data-producto]").forEach(btn => {
        btn.addEventListener("click", (e) => {
        const clave = btn.dataset.producto;
        if (clave && agregarAlCarrito(clave, 1)) alert("Producto agregado al carrito ✅");
        });
    });

    // 2) botones dentro de .producto que usan <a class="detalle" href="... ?producto=clave">
    document.querySelectorAll(".producto").forEach(prod => {
        const btn = prod.querySelector("button");
        const linkDetalle = prod.querySelector("a.detalle");
        if (!btn || !linkDetalle) return;
        let productoKey = null;
        try {
        const url = new URL(linkDetalle.href, window.location.href);
        productoKey = url.searchParams.get("producto");
        } catch (err) {
        const href = linkDetalle.getAttribute("href") || "";
        const parts = href.split("?");
        if (parts[1]) {
            const params = new URLSearchParams(parts[1]);
            productoKey = params.get("producto");
        }
        }
        if (!productoKey) return;
        btn.addEventListener("click", () => {
        if (agregarAlCarrito(productoKey, 1)) alert("Producto agregado al carrito ✅");
        });
    });
    }

  // Detalle: rellenar campos si estamos en detalle_producto.html
    function initDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const productoParam = params.get("producto");
    if (!productoParam) return;
    const data = productosData[productoParam];
    if (!data) return;

    const img = document.getElementById("img-producto");
    const nombre = document.getElementById("nombre-producto");
    const precio = document.getElementById("precio-producto");
    const descripcion = document.getElementById("descripcion-producto");
    if (img) img.src = data.imagen;
    if (nombre) nombre.textContent = data.nombre;
    if (precio) precio.textContent = "$" + data.precio.toLocaleString("es-CL");
    if (descripcion) descripcion.textContent = data.descripcion;

    const btnDetalle = document.getElementById("añadir-carrito");
    if (btnDetalle) {
        btnDetalle.addEventListener("click", () => {
        const cantidadInput = document.getElementById("cantidad");
        let cantidad = 1;
        if (cantidadInput) cantidad = parseInt(cantidadInput.value) || 1;
        if (agregarAlCarrito(productoParam, cantidad)) alert("Producto agregado al carrito ✅");
        });
    }
    }

  // Iniciar todo en DOMContentLoaded
    document.addEventListener("DOMContentLoaded", () => {
    aplicarEstadoSesion();
    actualizarIconoCarrito();
    initBotonesAgregar();
    initDetalleProducto();
    });

  // Export para debugging si es necesario
    window.__hikari = window.__hikari || {};
    window.__hikari.agregarAlCarrito = agregarAlCarrito;
    window.__hikari.obtenerUsuario = obtenerUsuario;

})();
