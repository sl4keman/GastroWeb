// Verificar e inicializar la variable platosSeleccionados si no existe
if (!window.platosSeleccionados) {
    window.platosSeleccionados = JSON.parse(localStorage.getItem('platosSeleccionados')) || [];
}
console.log('Platos seleccionados cargados desde localStorage:', platosSeleccionados);

// Validación de correo electrónico
function esCorreoValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Expresión regular para verificar si el email contiene "@"
}

function login() {
    const email = document.getElementById('correo').value;
    const password = document.getElementById('contrasena').value;

    if (!email || !password) {
        alert("Por favor, ingrese tanto el correo como la contraseña.");
        return;
    }

    if (!esCorreoValido(email)) {
        alert("Por favor, ingrese un correo válido.");
        return;
    }

    // Obtener usuarios registrados del localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuario = usuariosRegistrados.find(user => user.email === email && user.password === password);

    if (!usuario) {
        alert("El usuario no está registrado o la contraseña es incorrecta.");
        return;
    }

    console.log(`Iniciando sesión con email: ${email}`);
    window.location.href = 'menu-principal.html';
}

document.getElementById('loginButton')?.addEventListener('click', (e) => {
    e.preventDefault();
    login();
});

function register() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value;
    const password = document.getElementById('contrasena').value;
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;

    if (!nombre || !email || !password || !fechaNacimiento) {
        alert("Por favor, complete todos los campos antes de registrar.");
        return; // Detener el registro si hay campos vacíos
    }

    if (!esCorreoValido(email)) {
        alert("Por favor, ingrese un correo válido.");
        return;
    }

    // Obtener usuarios registrados y agregar el nuevo
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuarioExistente = usuariosRegistrados.find(user => user.email === email);

    if (usuarioExistente) {
        alert("Este correo ya está registrado. Por favor, use otro.");
        return;
    }

    usuariosRegistrados.push({ nombre, email, password, fechaNacimiento });
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));

    console.log(`Registrando usuario: ${nombre}, email: ${email}`);
    alert("Registro exitoso. Ahora puede iniciar sesión.");
    window.location.href = 'login.html'; // Redirigir al login después de registrar
}

document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío predeterminado del formulario
    register(); // Llamar a la función de registro
});

document.querySelector('.register-form button')?.addEventListener('click', (e) => {
    e.preventDefault();
    register();
});

// Función para seleccionar una mesa y redirigir al menú de platos
function seleccionarMesa(mesa) {
    // Guardar la mesa seleccionada en el localStorage
    localStorage.setItem('mesaSeleccionada', mesa);
    console.log(`Mesa seleccionada: ${mesa}`); // Verifica si se guarda la mesa

    // Redirigir al menú de platos
    window.location.href = 'menu-platos.html'; 
}

// Función para mostrar platos según la categoría seleccionada
function mostrarCategoria(categoria) {
    const listaPlatos = document.getElementById('lista-platos');
    let platos = [];

    if (categoria === 'sopas') {
        platos = [
            { nombre: 'Sopa de Pollo', precio: 12000 },
            { nombre: 'Sopa de Costilla', precio: 13000 },
            { nombre: 'Sancocho de Pescado', precio: 13000 }
        ];
    } else if (categoria === 'parrilla') {
        platos = [
            { nombre: 'Churrasco', precio: 35000 },
            { nombre: 'Costillas a la Parrilla', precio: 30000 },
            { nombre: 'Pollo a la Parrilla', precio: 30000 }
        ];
    } else if (categoria === 'tipicos') {
        platos = [
            { nombre: 'Carne a la Llanera', precio: 25000 },
            { nombre: 'Carne Mixta', precio: 28000 },
            { nombre: 'Corte de Falda', precio: 27000 },
            { nombre: 'Palo de costilla', precio: 50000 }
        ];
    } else if (categoria === 'desayunos') {
        platos = [
            { nombre: 'Calentado', precio: 10000 },
            { nombre: 'Huevos Rancheros', precio: 12000 },
            { nombre: 'Arepa con Queso', precio: 8000 }
        ];
    } else if (categoria === 'pescados') {
        platos = [
            { nombre: 'Pescado Frito', precio: 20000 },
            { nombre: 'Filete de Pescado', precio: 18000 },
            { nombre: 'Ceviche de Camarones', precio: 22000 }
        ];
    } else if (categoria === 'bebidas') {
        platos = [
            { nombre: 'Limonada', precio: 5000 },
            { nombre: 'Jugo de Naranja', precio: 6000 },
            { nombre: 'Cerveza', precio: 8000 }
        ];
    }

    listaPlatos.innerHTML = platos.map(plato => 
        `<li><button onclick="agregarAFactura('${plato.nombre}', ${plato.precio})">${plato.nombre} - ${plato.precio} COP</button></li>`
    ).join('');
}

// Función para agregar un plato a la factura de la mesa seleccionada
function agregarAFactura(plato, precio) {
    const mesa = localStorage.getItem('mesaSeleccionada');
    if (!mesa) {
        alert('Por favor, selecciona una mesa.');
        return;
    }

    let facturaMesa = JSON.parse(localStorage.getItem(`facturaMesa_${mesa}`)) || [];

    const platoExistente = facturaMesa.find(p => p.nombre === plato);

    if (platoExistente) {
        platoExistente.cantidad += 1;
    } else {
        facturaMesa.push({ nombre: plato, cantidad: 1, precio: precio });
    }

    localStorage.setItem(`facturaMesa_${mesa}`, JSON.stringify(facturaMesa));
    alert(`${plato} agregado a la factura de la mesa ${mesa}.`);
}

// Función para limpiar la factura de la mesa seleccionada
function limpiarFactura() {
    const mesa = localStorage.getItem('mesaSeleccionada');
    if (!mesa) {
        alert('No hay una mesa seleccionada.');
        return;
    }

    localStorage.removeItem(`facturaMesa_${mesa}`);
    document.getElementById('factura-detalles').innerHTML = '';
    document.getElementById('total').innerText = '0';
    alert(`La factura de la mesa ${mesa} ha sido limpiada.`);
}

// Cargar la factura al entrar en la página de facturas
function cargarFactura() {
    const mesa = localStorage.getItem('mesaSeleccionada');
    if (!mesa) {
        alert('No hay una mesa seleccionada.');
        return;
    }

    const facturaMesa = JSON.parse(localStorage.getItem(`facturaMesa_${mesa}`)) || [];
    const facturaDetalles = document.getElementById('factura-detalles');
    let totalFactura = 0;

    facturaDetalles.innerHTML = '';

    facturaMesa.forEach(plato => {
        const totalPlato = plato.cantidad * plato.precio;
        totalFactura += totalPlato;

        facturaDetalles.innerHTML += `
            <tr>
                <td>${plato.nombre}</td>
                <td>${plato.cantidad}</td>
                <td>${plato.precio}</td>
                <td>${totalPlato}</td>
            </tr>
        `;
    });

    document.getElementById('total').innerText = totalFactura;
}

// Redirigir al menú principal
function irAlMenuPrincipal() {
    window.location.href = 'menu-principal.html';
}
