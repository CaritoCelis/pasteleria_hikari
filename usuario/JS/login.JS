document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const mensajeDiv = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {
    e.preventDefault();
    mensajeDiv.innerHTML = "";
    mensajeDiv.className = "mensaje";

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuario) {
        mensajeDiv.classList.add("exito");
        mensajeDiv.innerHTML = `<p>✅ Bienvenido, ${usuario.nombre} ${usuario.apellido}</p>`;

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        setTimeout(() => {
        window.location.href = "/index.html";
        }, 1500);

    } else {
        mensajeDiv.classList.add("error");
        mensajeDiv.innerHTML = `<p>❌ Correo o contraseña incorrectos.</p>`;
    }
    });
});
