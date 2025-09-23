document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuNavegacion = document.querySelector('.menu-navegacion');
    
    if (menuToggle && menuNavegacion) {
        menuToggle.addEventListener('click', function() {
            menuNavegacion.classList.toggle('active');
        });
    }
});

