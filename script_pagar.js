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

// Función para pagar la factura de la mesa seleccionada
function pagarFactura() {
    const mesa = localStorage.getItem('mesaSeleccionada');
    if (!mesa) {
        alert('No hay una mesa seleccionada.');
        return;
    }

    let facturaMesa = JSON.parse(localStorage.getItem(`facturaMesa_${mesa}`)) || [];

    if (facturaMesa.length === 0) {
        alert('La factura está vacía.');
        return;
    }

    // Registrar las ventas diarias de la factura actual
    facturaMesa.forEach(plato => {
        registrarVentaEnVentasDiarias(plato.nombre, plato.cantidad, plato.precio);
    });

    // Limpiar la factura después de pagar
    localStorage.removeItem(`facturaMesa_${mesa}`);
    document.getElementById('factura-detalles').innerHTML = '';
    document.getElementById('total').innerText = '0';

    alert(`Factura pagada para la mesa ${mesa}. Las ventas han sido registradas.`);
}

// Función para cargar las ventas diarias en ventas_diarias.html
function cargarVentasDiarias() {
    let ventasDiarias = JSON.parse(localStorage.getItem('ventasDiarias')) || [];
    const ventasDetalles = document.getElementById('ventas-diarias-detalles');
    let totalVentas = 0;

    ventasDetalles.innerHTML = '';

    ventasDiarias.forEach(venta => {
        const totalPlato = venta.cantidad * venta.precio;
        totalVentas += totalPlato;

        ventasDetalles.innerHTML += `
            <tr>
                <td>${venta.nombre}</td>
                <td>${venta.cantidad}</td>
                <td>${venta.precio}</td>
                <td>${totalPlato}</td>
            </tr>
        `;
    });

    // Mostrar el total de ventas al final de la tabla
    ventasDetalles.innerHTML += `
        <tr>
            <th colspan="3">Total de Ventas</th>
            <th>${totalVentas}</th>
        </tr>
    `;
}

// Función para limpiar las ventas del día
function limpiarVentasDiarias() {
    localStorage.removeItem('ventasDiarias');  // Eliminar las ventas diarias del localStorage
    document.getElementById('ventas-diarias-detalles').innerHTML = '';  // Limpiar la tabla en la interfaz
    alert('Las ventas del día han sido limpiadas.');
}

// Cargar las ventas diarias al abrir ventas_diarias.html
window.onload = function() {
    if (document.getElementById('ventas-diarias-detalles')) {
        cargarVentasDiarias();
    }
};
