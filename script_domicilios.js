// Inicializar el domicilio para evitar conflictos con otros scripts
let domicilioSeleccionado = JSON.parse(localStorage.getItem('domicilioIndependienteData')) || [];
console.log('Domicilio cargado desde localStorage:', domicilioSeleccionado);

// Función para agregar un nuevo plato al domicilio
function agregarAlDomicilio(nombre, precio) {
    const platoExistente = domicilioSeleccionado.find(plato => plato.nombre === nombre);

    if (platoExistente) {
        platoExistente.cantidad += 1;
    } else {
        domicilioSeleccionado.push({ nombre: nombre, cantidad: 1, precio: precio });
    }

    localStorage.setItem('domicilioIndependienteData', JSON.stringify(domicilioSeleccionado));
    mostrarDomicilio();
}



// Función para mostrar el domicilio en la página
function mostrarDomicilio() {
    const domicilioDetalles = document.getElementById('domicilio-detalles');
    if (!domicilioDetalles) {
        console.warn('No se encontró el elemento de detalles de domicilio.');
        return;
    }
    let domicilioSeleccionado = JSON.parse(localStorage.getItem('domicilioIndependienteData')) || [];
    let totalFactura = 0;
    domicilioDetalles.innerHTML = '';

    domicilioSeleccionado.forEach(plato => {
        const totalPlato = plato.cantidad * plato.precio;
        totalFactura += totalPlato;

        domicilioDetalles.innerHTML += `
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

// Función para pagar el domicilio
function pagarDomicilio() {
    registrarVentasDiariasDeDomicilio(); // Registrar las ventas diarias
    alert('Domicilio pagado con éxito.');
    limpiarDomicilio();
}

// Nueva función para registrar las ventas diarias de los platos en el domicilio
function registrarVentasDiariasDeDomicilio() {
    domicilioSeleccionado.forEach(plato => {
        registrarVentaEnVentasDiarias(plato.nombre, plato.cantidad, plato.precio);
    });
}

// Función para registrar ventas diarias
function registrarVentaEnVentasDiarias(plato, cantidad, precio) {
    let ventasDiarias = JSON.parse(localStorage.getItem('ventasDiarias')) || [];

    // Buscar si el plato ya está en las ventas diarias
    const ventaExistente = ventasDiarias.find(venta => venta.nombre === plato);

    if (ventaExistente) {
        ventaExistente.cantidad += cantidad; // Si ya existe, sumamos la cantidad
    } else {
        ventasDiarias.push({ nombre: plato, cantidad: cantidad, precio: precio }); // Si no existe, lo agregamos
    }

    // Guardar las ventas diarias actualizadas en localStorage
    localStorage.setItem('ventasDiarias', JSON.stringify(ventasDiarias));
}


// Función para limpiar el domicilio
function limpiarDomicilio() {
    domicilioSeleccionado = [];
    localStorage.removeItem('domicilioIndependienteData');
    document.getElementById('domicilio-detalles').innerHTML = '';
    document.getElementById('total').innerText = '0';
    alert('El domicilio ha sido limpiado.');
}

// Llamar a la función para mostrar el domicilio al cargar la página
window.onload = function() {
    mostrarDomicilio();
};

// Función para manejar la selección de platos desde platos_domicilios.html específicamente para domicilio
function seleccionarPlatoParaDomicilio(nombre, precio) {
    agregarAlDomicilio(nombre, precio);
    alert(`${nombre} agregado al domicilio.`);
}

// Nueva función para redirigir a platos_domicilios.html desde domicilios.html
function irASeleccionarPlatos() {
    window.location.href = 'platos_domicilios.html';
}
// Función para mostrar platos según la categoría seleccionada
function mostrarCategoria(categoria) {
    const platosListaDiv = document.getElementById('platos-lista');
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
            { nombre: 'Corte de Falda', precio: 27000 }
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

    // Mostrar los platos en la página
    platosListaDiv.innerHTML = platos.map(plato => `
        <div class="plato-item">
            <p>${plato.nombre} - $${plato.precio} COP</p>
            <button onclick="seleccionarPlatoParaDomicilio('${plato.nombre}', ${plato.precio})">Agregar al Domicilio</button>
        </div>
    `).join('');
}
