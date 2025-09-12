document.getElementById("form-login").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar usuario
    const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!usuario) {
        alert("❌ Correo o contraseña incorrectos.");
        return;
    }

    // Guardar sesión activa
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    alert("✅ Bienvenido " + usuario.nombre + " 🍰");
    window.location.href = "index.html"; // Redirige al inicio
});
