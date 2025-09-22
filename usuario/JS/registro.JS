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

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!regexCorreo.test(correo)) {
        errores.push("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
    }

    if (password.length < 4 || password.length > 10) {
        errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }

    let edad = null;
    if (fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
        }
    }

    if (edad !== null && edad >= 50) {
        beneficios.push("🎉 50% de descuento en todos los productos por ser mayor de 50 años.");
    }

    // ✅ Código promocional
    if (codigoPromo.toUpperCase() === "FELICES50") {
        beneficios.push("🎉 10% de descuento de por vida por usar el código FELICES50.");
    }

    // ✅ Correo institucional Duoc
    if (correo.endsWith("@duoc.cl")) {
        beneficios.push("🎂 Recibirás una torta gratis en tu cumpleaños (correo Duoc).");
    }

    // ✅ Mostrar errores si hay
    if (errores.length > 0) {
        mensajeDiv.classList.add("error");
        mensajeDiv.innerHTML = `<p>${errores.join("<br>")}</p>`;
        return;
    }

    // ✅ Guardar usuario en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe el correo
    if (usuarios.some(u => u.correo === correo)) {
        mensajeDiv.classList.add("error");
        mensajeDiv.innerHTML = `<p>❌ Este correo ya está registrado.</p>`;
        return;
    }

    // Agregar nuevo usuario
    usuarios.push({ nombre, apellido, correo, password, fechaNacimiento, beneficios });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensajeDiv.classList.add("exito");
    mensajeDiv.innerHTML = `
        <p>✅ Registro exitoso</p>
        <ul>
        ${beneficios.map(b => `<li>${b}</li>`).join("")}
        </ul>
        <p>Puedes <a href="login.html">iniciar sesión aquí</a>.</p>
    `;
    form.reset();
    });
});
