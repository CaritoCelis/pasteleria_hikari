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
    const carritoIcon = document.getElementById("carritoIcon");

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
    //   ACTUALIZAR CONTADOR DEL CARRITO EN EL HEADER
    // ================================================
    function actualizarCarritoHeader() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

        if (carritoIcon) {
            carritoIcon.textContent = `🛒 (${total})`;
        }
    }
    actualizarCarritoHeader();


    // ================================================
    //     PRODUCTOS Y AGREGAR AL CARRITO
    // ================================================
    const productosData = {
        chocolate: { nombre: "Torta Cuadrada de Chocolate", precio: 45000 },
        vainilla: { nombre: "Torta Circular de Vainilla", precio: 40000 },
        cumpleaños: { nombre: "Torta Especial de Cumpleaños", precio: 55000 },
        galletas: { nombre: "Galletas Veganas de Avena", precio: 4500 },
        cheesecake: { nombre: "Cheesecake sin Azúcar", precio: 47000 },
        cuadrada: { nombre: "Torta Cuadrada de Frutas", precio: 50000 },
        boda: { nombre: "Torta Especial de Boda", precio: 60000 },
        tiramisu: { nombre: "Tiramisú Clásico", precio: 5500 },
        "sin-gluten": { nombre: "Pan sin Gluten", precio: 3500 },
        brownie: { nombre: "Brownie sin Gluten", precio: 4000 },
        empanada: { nombre: "Empanada de Manzana", precio: 3000 }
    };

      // ================================================
    //     BOTONES "AÑADIR AL CARRITO"
    // ================================================
    document.querySelectorAll(".grid-productos .producto").forEach(productoEl => {
        const btn = productoEl.querySelector("button");
        const detalleLink = productoEl.querySelector("a.detalle");

        if (!btn || !detalleLink) return;

        const params = new URLSearchParams(detalleLink.href.split("?")[1]);
        const productoKey = params.get("producto");

        btn.addEventListener("click", () => {
            if (!productosData[productoKey]) {
                console.error("Producto no encontrado: ", productoKey);
                return;
            }

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const index = carrito.findIndex(p => p.nombre === productosData[productoKey].nombre);

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
            actualizarCarritoHeader();

            alert("Producto agregado al carrito ✅");
        });
    });

});