document.getElementById("form-contacto").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
    alert("Por favor, completa todos los campos.");
    return;
    }

    const nuevoMensaje = { nombre, email, mensaje, fecha: new Date().toLocaleString() };

    let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
    mensajes.push(nuevoMensaje);
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

    alert("¡Gracias por contactarnos, " + nombre + "! 🍰 Te responderemos pronto.");
    document.getElementById("form-contacto").reset();
});
