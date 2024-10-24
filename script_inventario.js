// Inicializar el inventario si no existe en localStorage
if (!window.inventario) {
    window.inventario = JSON.parse(localStorage.getItem('inventario')) || [];
}
console.log('Inventario cargado desde localStorage:', inventario);

// Función para agregar un nuevo producto al inventario
function agregarProducto() {
    const nombre = document.getElementById('nombre-producto').value;
    const cantidad = parseFloat(document.getElementById('cantidad-producto').value);
    const medida = document.getElementById('medida-producto').value;

    if (!nombre || isNaN(cantidad) || !medida) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    // Verificar si el producto ya existe en el inventario
    let productoExistente = inventario.find(producto => producto.nombre === nombre);
    
    if (productoExistente) {
        alert('El producto ya existe. Utilice la opción de modificar si desea actualizar la cantidad.');
        return;
    }

    // Agregar el nuevo producto
    inventario.push({ nombre: nombre, cantidad: cantidad, medida: medida });
    localStorage.setItem('inventario', JSON.stringify(inventario));

    console.log('Producto agregado:', nombre, cantidad, medida);
    alert('Producto agregado al inventario.');
    mostrarInventario();
}

// Función para eliminar un producto del inventario
function eliminarProducto(nombre) {
    inventario = inventario.filter(producto => producto.nombre !== nombre);
    localStorage.setItem('inventario', JSON.stringify(inventario));

    console.log('Producto eliminado:', nombre);
    alert('Producto eliminado del inventario.');
    mostrarInventario();
}

// Función para modificar un producto existente en el inventario
function modificarProducto() {
    const nombre = document.getElementById('nombre-producto').value;
    const cantidad = parseFloat(document.getElementById('cantidad-producto').value);
    const medida = document.getElementById('medida-producto').value;

    if (!nombre || isNaN(cantidad) || !medida) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    // Verificar si el producto existe en el inventario
    let productoExistente = inventario.find(producto => producto.nombre === nombre);
    
    if (!productoExistente) {
        alert('El producto no existe en el inventario. Utilice la opción de agregar si desea añadirlo.');
        return;
    }

    // Modificar el producto
    productoExistente.cantidad = cantidad;
    productoExistente.medida = medida;
    localStorage.setItem('inventario', JSON.stringify(inventario));

    console.log('Producto modificado:', nombre, cantidad, medida);
    alert('Producto modificado en el inventario.');
    mostrarInventario();
}

// Función para mostrar el inventario en la página
function mostrarInventario() {
    const inventarioDetalles = document.getElementById('inventario-detalles');
    inventarioDetalles.innerHTML = '';

    inventario.forEach(producto => {
        inventarioDetalles.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.medida}</td>
                <td>
                    <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
                    <button onclick="cargarProductoParaModificar('${producto.nombre}')">Modificar</button>
                </td>
            </tr>
        `;
    });
}

// Función para cargar un producto en el formulario para modificarlo
function cargarProductoParaModificar(nombre) {
    const producto = inventario.find(producto => producto.nombre === nombre);
    if (producto) {
        document.getElementById('nombre-producto').value = producto.nombre;
        document.getElementById('cantidad-producto').value = producto.cantidad;
        document.getElementById('medida-producto').value = producto.medida;
    }
}

// Llamar a la función para mostrar el inventario al cargar la página
window.onload = mostrarInventario;
