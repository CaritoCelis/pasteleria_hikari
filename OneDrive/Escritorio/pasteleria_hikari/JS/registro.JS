document.getElementById("form-registro").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const codigo = document.getElementById("codigo").value.trim();
    const password = document.getElementById("password").value.trim();

    // Calcular edad
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    const usuario = { nombre, email, fechaNacimiento, edad, codigo, password };

    // Obtener usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si correo ya registrado
    if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        alert("❌ Este correo ya está registrado.");
        return;
    }

    // Guardar usuario
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso 🎉 Bienvenido/a " + nombre);

    // Redirigir a login
    window.location.href = "login.html";
});
