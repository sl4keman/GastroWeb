// ventas_estadisticas.js

// Función para cargar y preparar los datos de ventas diarias desde el localStorage
function obtenerDatosVentasDiarias() {
    let ventasDiarias = JSON.parse(localStorage.getItem('ventasDiarias')) || [];
    let nombresPlatos = ventasDiarias.map(venta => venta.nombre);
    let cantidadesPlatos = ventasDiarias.map(venta => venta.cantidad);
    return { nombresPlatos, cantidadesPlatos };
}

// Función para graficar las ventas diarias
function graficarVentasDiarias() {
    const { nombresPlatos, cantidadesPlatos } = obtenerDatosVentasDiarias();

    // Configurar el gráfico de barras
    const ctx = document.getElementById('ventasDiariasChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombresPlatos,
            datasets: [{
                label: 'Ventas Diarias (Cantidad)',
                data: cantidadesPlatos,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad Vendida'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Platos'
                    }
                }
            }
        }
    });
}

// Llamar a la función para graficar al cargar la página
window.onload = function() {
    graficarVentasDiarias();
};