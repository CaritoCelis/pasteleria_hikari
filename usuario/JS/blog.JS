document.addEventListener("DOMContentLoaded", () => {

    const accionesDiv = document.getElementById("acciones-usuario");

function obtenerUsuario() {
    const claves = ["usuarioNombre", "usuario", "usuarioActual", "usuarioActivo"];

    for (let c of claves) {
        const data = localStorage.getItem(c);

        if (data) {
            try {
                // Si es JSON, lo parseamos
                const obj = JSON.parse(data);
                if (obj.nombre) {
                    return { key: c, val: obj.nombre };
                }
            } catch {
                // Si NO es JSON, lo tomamos tal cual
                return { key: c, val: data };
            }
        }
    }
    return null;
}


    function obtenerCantidadCarrito() {
        try {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            return carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);
        } catch {
            return 0;
        }
    }

    function renderAcciones() {
        const user = obtenerUsuario();
        const cantidad = obtenerCantidadCarrito();

        if (user) {
            accionesDiv.innerHTML = `
                <span>Hola, <strong>${user.val}</strong></span>
                <button id="cerrarSesionBtn" class="boton-cerrar-sesion">Cerrar sesión</button>
                <a id="carritoIcon" href="/usuario/paginas/carrito.html">🛒 (${cantidad})</a>
            `;

            document.getElementById("cerrarSesionBtn").addEventListener("click", () => {
                localStorage.removeItem(user.key);
                window.location.reload();
            });

        } else {
            accionesDiv.innerHTML = `
                <a href="/usuario/paginas/login.html">Iniciar sesión</a> |
                <a href="/usuario/paginas/registro.html">Registro</a>
                <a id="carritoIcon" href="/usuario/paginas/carrito.html">🛒 (${cantidad})</a>
            `;
        }
    }

    renderAcciones();

    window.addEventListener("storage", () => renderAcciones());
});
