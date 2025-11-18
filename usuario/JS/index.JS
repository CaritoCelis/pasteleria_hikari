document.addEventListener("DOMContentLoaded", () => {

    // ================================================
    //     MOSTRAR USUARIO ACTIVO EN EL INICIO
    // ================================================
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");
    const perfilUsuario = document.getElementById("perfilUsuario");
    const nombreUsuarioSpan = document.getElementById("nombreUsuario");
    const btnLogout = document.getElementById("btnLogout");

    if (usuarioActivo) {
        // SI HAY USUARIO LOGUEADO
        perfilUsuario.style.display = "flex";
        nombreUsuarioSpan.textContent = usuarioActivo.nombre;

        btnLogin.style.display = "none";
        btnRegistro.style.display = "none";
    } else {
        // SI NO HAY USUARIO LOGUEADO
        perfilUsuario.style.display = "none";
        btnLogin.style.display = "inline-block";
        btnRegistro.style.display = "inline-block";
    }

    // Cerrar sesión
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.reload();
    });



    // ================================================
    //     PRODUCTOS Y AGREGAR AL CARRITO
    // ================================================
    const productosData = {
        chocolate: { nombre: "Torta Cuadrada de Chocolate", precio: 45000 },
        vainilla: { nombre: "Torta Circular de Vainilla", precio: 40000 },
        cumpleaños: { nombre: "Torta Especial de Cumpleaños", precio: 55000 },
        naranja: { nombre: "Torta de Naranja sin Azúcar", precio: 48000 },
        manjar: { nombre: "Torta Circular de Manjar", precio: 48000 },
        vegana: { nombre: "Torta Vegana de Chocolate", precio: 50000 },
        galletas: { nombre: "Galletas Veganas de Avena", precio: 4500 }
    };

    document.querySelectorAll(".grid-productos .producto").forEach(productoEl => {
        const btn = productoEl.querySelector("button");
        const detalleLink = productoEl.querySelector("a.detalle").getAttribute("href");

        const params = new URLSearchParams(detalleLink.split("?")[1]);
        const productoKey = params.get("producto");

        btn.addEventListener("click", () => {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const index = carrito.findIndex(
                p => p.nombre === productosData[productoKey].nombre
            );

            if (index >= 0) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push({
                    nombre: productosData[productoKey].nombre,
                    precio: productosData[productoKey].precio,
                    cantidad: 1
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert("Producto agregado al carrito ✅");
        });
    });

});
