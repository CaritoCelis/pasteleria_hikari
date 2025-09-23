
if(localStorage.getItem('adminLogueado') !== 'true'){
    window.location.href = 'login.html';
}

const menuTablero = document.getElementById('menu-tablero');
const menuProductos = document.getElementById('menu-productos');
const menuPedidos = document.getElementById('menu-pedidos');
const menuUsuarios = document.getElementById('menu-usuarios');

const tablero = document.getElementById('tablero');
const productos = document.getElementById('productos');
const pedidos = document.getElementById('pedidos');
const usuarios = document.getElementById('usuarios');

const secciones = [tablero, productos, pedidos, usuarios];

function mostrarSeccion(seccion) {
    secciones.forEach(sec => sec.classList.remove('active'));
    seccion.classList.add('active');
}

menuTablero.addEventListener('click', () => mostrarSeccion(tablero));
menuProductos.addEventListener('click', () => mostrarSeccion(productos));
menuPedidos.addEventListener('click', () => mostrarSeccion(pedidos));
menuUsuarios.addEventListener('click', () => mostrarSeccion(usuarios));

let productosData = [
    {id: 1, nombre: 'Tarta de Fresas', precio: 15000, categoria: 'Tartas'},
    {id: 2, nombre: 'Pan de Chocolate', precio: 2000, categoria: 'Panadería'},
];

let pedidosData = [
    {id: 101, cliente: 'Carolina', productos: 'Tarta de Fresas', total: 15000, estado: 'Pendiente'}
];

let usuariosData = [
    {id: 1, nombre: 'Admin', email: 'admin@hikari.cl', rol: 'Administrador'},
    {id: 2, nombre: 'Carolina', email: 'caro@gmail.com', rol: 'Usuario'}
];

function cargarProductos() {
    const tbody = document.querySelector('#tabla-productos tbody');
    tbody.innerHTML = '';
    productosData.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.categoria}</td>
            <td>
                <button onclick="editarProducto(${p.id})">Editar</button>
                <button onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
        </tr>`;
    });
    document.getElementById('total-productos').textContent = productosData.length;
}

function cargarPedidos() {
    const tbody = document.querySelector('#tabla-pedidos tbody');
    tbody.innerHTML = '';
    pedidosData.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>${p.id}</td>
            <td>${p.cliente}</td>
            <td>${p.productos}</td>
            <td>${p.total}</td>
            <td>${p.estado}</td>
            <td>
                <button onclick="actualizarEstadoPedido(${p.id})">Actualizar</button>
            </td>
        </tr>`;
    });
    document.getElementById('total-pedidos').textContent = pedidosData.length;
}

function cargarUsuarios() {
    const tbody = document.querySelector('#tabla-usuarios tbody');
    tbody.innerHTML = '';
    usuariosData.forEach(u => {
        tbody.innerHTML += `<tr>
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.email}</td>
            <td>${u.rol}</td>
            <td>
                <button onclick="editarUsuario(${u.id})">Editar</button>
                <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
            </td>
        </tr>`;
    });
    document.getElementById('total-usuarios').textContent = usuariosData.length;
}

function editarProducto(id) { alert(`Editar producto ${id}`); }
function eliminarProducto(id) {
    productosData = productosData.filter(p => p.id !== id);
    cargarProductos();
}

function actualizarEstadoPedido(id) { alert(`Actualizar estado del pedido ${id}`); }

function editarUsuario(id) { alert(`Editar usuario ${id}`); }
function eliminarUsuario(id) {
    usuariosData = usuariosData.filter(u => u.id !== id);
    cargarUsuarios();
}

document.getElementById('btn-agregar-usuario').addEventListener('click', () => {
    const nuevoId = usuariosData.length + 1;
    const nuevoUsuario = {id: nuevoId, nombre: 'Nuevo Usuario', email: 'nuevo@hikari.cl', rol: 'Usuario'};
    usuariosData.push(nuevoUsuario);
    cargarUsuarios();
});

document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('adminLogueado');
    window.location.href = 'login.html';
});

cargarProductos();
cargarPedidos();
cargarUsuarios();
