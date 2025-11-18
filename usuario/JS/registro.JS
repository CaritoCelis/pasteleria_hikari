document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const mensajeDiv = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        mensajeDiv.innerHTML = "";
        mensajeDiv.className = "mensaje";

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const codigoPromo = document.getElementById("codigoPromo").value.trim();
        const password = document.getElementById("password").value.trim();

        let errores = [];
        let beneficios = [];

        if (!nombre || !apellido || !correo || !fechaNacimiento || !password) {
            errores.push("Todos los campos obligatorios deben estar completos.");
        }

        const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        if (!regexCorreo.test(correo)) {
            errores.push("El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com");
        }

        if (password.length < 4 || password.length > 10) {
            errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
        }

        // Calcular edad
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        if (edad >= 50) beneficios.push("🎉 50% de descuento para mayores de 50.");
        if (codigoPromo.toUpperCase() === "FELICES50") beneficios.push("🎉 10% de descuento de por vida.");
        if (correo.endsWith("@duoc.cl")) beneficios.push("🎂 Torta gratis en tu cumpleaños.");

        if (errores.length > 0) {
            mensajeDiv.classList.add("error");
            mensajeDiv.innerHTML = errores.join("<br>");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Evitar correos repetidos
        if (usuarios.some(u => u.correo === correo)) {
            mensajeDiv.classList.add("error");
            mensajeDiv.innerHTML = "❌ Este correo ya está registrado.";
            return;
        }

        usuarios.push({ nombre, apellido, correo, password, beneficios });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mensajeDiv.classList.add("exito");
        mensajeDiv.innerHTML = `
            <p>✅ Registro exitoso</p>
            <ul>${beneficios.map(b => `<li>${b}</li>`).join("")}</ul>
            <p>Puedes <a href="login.html">iniciar sesión aquí</a>.</p>
        `;

        form.reset();
    });
});
