const formLogin = document.getElementById('form-login');
const errorMsg = document.getElementById('error-msg');

// Datos del administrador simulados
const admin = {
    email: 'admin@hikari.cl',
    password: 'admin123'
};

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if(email === admin.email && password === admin.password){
        // Guardar sesión
        localStorage.setItem('adminLogueado', 'true');
        // Redirigir al panel administrativo (index.html)
        window.location.href = 'index.html';
    } else {
        errorMsg.textContent = 'Correo o contraseña incorrectos';
    }
});
