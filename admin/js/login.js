const formLogin = document.getElementById('form-login');
const errorMsg = document.getElementById('error-msg');

const admin = {
    email: 'admin@hikari.cl',
    password: 'admin123'
};

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if(email === admin.email && password === admin.password){
        localStorage.setItem('adminLogueado', 'true');
        window.location.href = 'index.html';
    } else {
        errorMsg.textContent = 'Correo o contraseña incorrectos';
    }
});
