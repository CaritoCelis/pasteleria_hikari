document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const mensajeDiv = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        mensajeDiv.innerHTML = "";
        mensajeDiv.className = "mensaje";

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        // -------------------------------------------
        // VALIDACIONES BÁSICAS
        // -------------------------------------------

        if (correo === "" || password === "") {
            mensajeDiv.classList.add("error");
            mensajeDiv.innerHTML = "⚠️ Todos los campos son obligatorios.";
            return;
        }

        if (!correo.includes("@") || !correo.includes(".")) {
            mensajeDiv.classList.add("error");
            mensajeDiv.innerHTML = "⚠️ Ingresa un correo válido.";
            return;
        }

        // -------------------------------------------
        // VERIFICAR USUARIO REGISTRADO
        // -------------------------------------------
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = usuarios.find(
            (u) => u.correo === correo && u.password === password
        );

        if (!usuario) {
            mensajeDiv.classList.add("error");
            mensajeDiv.innerHTML = "❌ Correo o contraseña incorrectos.";
            return;
        }

        // -------------------------------------------
        // LOGIN EXITOSO
        // -------------------------------------------
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        mensajeDiv.classList.add("exito");
        mensajeDiv.innerHTML = `✔ Bienvenido, ${usuario.nombre}`;

        // Redirige después de 1.5 segundos
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);
    });
});
