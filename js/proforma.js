let proformas = []; // Array para almacenar los proformas
let proformaActualId = null; // ID del proforma que se está editando

let aDetalleProforma = [];  //array para guardar el detalle de productos de una proforma
let aConsultaDetalleProforma = [];  //array para guardar el detalle de productos de la proforma que se está consultando
let articuloActualId = null;

//obtener campos del formulario donde se está agregando/editando un producto
let formulario = document.querySelector('form')  

//obtiene campos de la sección consulta de la página
let consultaProforma = document.getElementsByClassName('consulta') 

//obtener seccion de ordenamiento del detalle de proforma
let selectOrdenarPor = document.getElementsByName('ordenarPor')
let selectOrdenarAscDesc = document.getElementsByName('ordenarAscDesc')

//mostrar nombre del usuario logeado 
let usuario = JSON.parse(localStorage.getItem('logeado')) //recuperar dato del usuario logeado
let tipoCambio = JSON.parse(localStorage.getItem('tipoCambio'))  //recuperar dato del tipo de cambio, uso informativo

document.getElementsByClassName('usuario')[0].childNodes[1].textContent = usuario.nombre
document.getElementsByClassName('tipoCambio')[0].childNodes[3].textContent = tipoCambio[0].nombre +': '+ tipoCambio[0].venta


//captura fecha hoy en formato que js permite mostrar
let fechaHoy = new Date().toISOString().substring(0, 10);
formulario[2].value = fechaHoy


//evento submit para cuando se de clic en formulario de llenado de proforma
formulario.addEventListener('submit', function (e) {
    e.preventDefault()


    let articulo = formulario[4].value;
    let cantidad = formulario[5].value;
    let precio = formulario[6].value;


    if (cantidad <= 0) {
        Swal.fire("Ingrese cantidad válida");        
        return
    }

    if (precio < 0) {   //que permita CERO en caso se trate de una bonificación/regalo
        Swal.fire("Ingrese precio válido");  
        return
    }

    //si articulo ya existe se entiende que se desea modificar cantidades y/o precio
    //si no existe agrega nuevo articulo al array
    let articulo_encontrado = aDetalleProforma.find((dp) => dp.articulo === articulo);

    if (articulo_encontrado) {
        articulo_encontrado.cantidad = cantidad
        articulo_encontrado.precio = precio
        articulo_encontrado.total = cantidad * precio

        //alert("Se actualizó su cantidad y/o precio")
        Swal.fire("Se actualizó cantidad y/o precio");  

    }
    else {
        //agrega nuevo producto al detalle de la proforma
        const nuevoArticulo = {
            id: Date.now(),
            articulo: articulo,
            cantidad: cantidad,
            precio: precio,
            total: cantidad * precio

        };
        aDetalleProforma.push(nuevoArticulo)

    }

    //unavez agregado limpia el formulario y actualiza tabla del detalle de la proforma
    limpiarFormularioArticulo();
    mostrarArticulos();
})


//agrega evento para ordenear detalle de la proforma consultada por opcion seleccionada en lista
selectOrdenarPor[0].addEventListener('change', () => {

    if (selectOrdenarPor[0].value!="" && selectOrdenarAscDesc[0].value!="" && aConsultaDetalleProforma.length>0) {
        if(selectOrdenarPor[0].value == "articulo" && selectOrdenarAscDesc[0].value == "ascendente") {
            //console.log('se seleccionó ordenar por artículo ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (artic1.articulo < artic2.articulo) return -1
                if (artic1.articulo > artic2.articulo) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "articulo" && selectOrdenarAscDesc[0].value == "descendente") {
            //console.log('se seleccionó ordenar por artículo descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (artic1.articulo > artic2.articulo) return -1
                if (artic1.articulo < artic2.articulo) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "cantidad" && selectOrdenarAscDesc[0].value == "ascendente") {
            //console.log('se seleccionó ordenar por cantidad ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.cantidad) < Number(artic2.cantidad)) return -1
                if (Number(artic1.cantidad) > Number(artic2.cantidad)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "cantidad" && selectOrdenarAscDesc[0].value == "descendente") {
            //console.log('se seleccionó ordenar por cantidad descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.cantidad) > Number(artic2.cantidad)) return -1
                if (Number(artic1.cantidad) < Number(artic2.cantidad)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "precio" && selectOrdenarAscDesc[0].value == "ascendente") {
            //console.log('se seleccionó ordenar por precio ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.precio) < Number(artic2.precio)) return -1
                if (Number(artic1.precio) > Number(artic2.precio)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "precio" && selectOrdenarAscDesc[0].value == "descendente") {
            //console.log('se seleccionó ordenar por precio descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.precio) > Number(artic2.precio)) return -1
                if (Number(artic1.precio) < Number(artic2.precio)) return 1
            })

        }
        else if(selectOrdenarPor[0].value == "total" && selectOrdenarAscDesc[0].value == "ascendente") {
           //console.log('se seleccionó ordenar por total ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.total) < Number(artic2.total)) return -1
                if (Number(artic1.total) > Number(artic2.total)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "total" && selectOrdenarAscDesc[0].value == "descendente") {
            //console.log('se seleccionó ordenar por total descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.total) > Number(artic2.total)) return -1
                if (Number(artic1.total) < Number(artic2.total)) return 1
            })
        }

        consultarArticulos()
    }
})

//agrega evento para ordenear ascendete o descendetement detalle de la proforma consultada por criterio seleccionado
selectOrdenarAscDesc[0].addEventListener('change', () => {

    if (selectOrdenarPor[0].value!="" && selectOrdenarAscDesc[0].value!="" && aConsultaDetalleProforma.length>0)  {
        if(selectOrdenarPor[0].value == "articulo" && selectOrdenarAscDesc[0].value == "ascendente") {
            //console.log('se seleccionó ordenar por artículo ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (artic1.articulo < artic2.articulo) return -1
                if (artic1.articulo > artic2.articulo) return 1
            })

        }
        else if(selectOrdenarPor[0].value == "articulo" && selectOrdenarAscDesc[0].value == "descendente") {
           // console.log('se seleccionó ordenar por artículo descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (artic1.articulo > artic2.articulo) return -1
                if (artic1.articulo < artic2.articulo) return 1
            })

        }
        else if(selectOrdenarPor[0].value == "cantidad" && selectOrdenarAscDesc[0].value == "ascendente") {
            //console.log('se seleccionó ordenar por cantidad ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.cantidad) < Number(artic2.cantidad)) return -1
                if (Number(artic1.cantidad) > Number(artic2.cantidad)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "cantidad" && selectOrdenarAscDesc[0].value == "descendente") {
            //console.log('se seleccionó ordenar por cantidad descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.cantidad) > Number(artic2.cantidad)) return -1
                if (Number(artic1.cantidad) < Number(artic2.cantidad)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "precio" && selectOrdenarAscDesc[0].value == "ascendente") {
            //console.log('se seleccionó ordenar por precio ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.precio) < Number(artic2.precio)) return -1
                if (Number(artic1.precio) > Number(artic2.precio)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "precio" && selectOrdenarAscDesc[0].value == "descendente") {
            //console.log('se seleccionó ordenar por precio descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.precio) > Number(artic2.precio)) return -1
                if (Number(artic1.precio) < Number(artic2.precio)) return 1
            })

        }
        else if(selectOrdenarPor[0].value == "total" && selectOrdenarAscDesc[0].value == "ascendente") {
            //console.log('se seleccionó ordenar por total ascedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.total) < Number(artic2.total)) return -1
                if (Number(artic1.total) > Number(artic2.total)) return 1
            })
        }
        else if(selectOrdenarPor[0].value == "total" && selectOrdenarAscDesc[0].value == "descendente") {
            //console.log('se seleccionó ordenar por total descedente')

            aConsultaDetalleProforma.sort((artic1, artic2) => {
                if (Number(artic1.total) > Number(artic2.total)) return -1
                if (Number(artic1.total) < Number(artic2.total)) return 1
            })
        }

        consultarArticulos()

    }
})

//formulario donde se ingresan datos del producto que se quiere agregar/editar en la proforma
function limpiarFormularioArticulo() {
    formulario[3].value = "";
    formulario[4].value = "";
    formulario[5].value = "";
    formulario[6].value = "";
}

//seccion Gestionar Proforma, permite editar y/o eliminar un producto de la proforma
function mostrarArticulos() {
    const tbody = document.querySelector('#tablaDetalleProforma tbody');
    tbody.innerHTML = ''; // Limpiar la tabla

    //llena tabla con detalle de la proforma que se está editando
    //agrega botones para modificar datos o eliminar ese producto
    //en caso de editar se llena formulario con los datos del producto que se quiere modificar
    aDetalleProforma.forEach(detProforma => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${detProforma.articulo}</td>
            <td>${detProforma.cantidad}</td>
            <td>${detProforma.precio}</td>
            <td>${detProforma.total.toFixed(2)}</td>
            <td>
                <button class="editarArticulo" onclick="editarArticulo(${detProforma.id})">Editar</button>
                <button onclick="eliminarArticulo(${detProforma.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

//seccion Consultar Proforma: mostrar detalle de la proforma 
function consultarArticulos() {
    const tbody = document.querySelector('#tablaConsultaProforma tbody');
    tbody.innerHTML = ''; // Limpiar la tabla

    aConsultaDetalleProforma.forEach(detProforma => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${detProforma.articulo}</td>
            <td>${detProforma.cantidad}</td>
            <td>${detProforma.precio}</td>
            <td>${detProforma.total.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function editarArticulo(id) {
    const detProforma = aDetalleProforma.find(p => p.id === id);
    if (detProforma) {
        formulario[3].value = detProforma.id;
        formulario[4].value = detProforma.articulo;
        formulario[5].value = detProforma.cantidad;
        formulario[6].value = detProforma.precio;
    }
}

function eliminarArticulo(id) {
    aDetalleProforma = aDetalleProforma.filter(p => p.id !== id);
    mostrarArticulos();
}



// Función para agregar o modificar un proforma
//invocado desde HTML con onclick como opción alternativa a addEventListener
function agregarModificarProforma() {
    //agrega o modifica una proforma
    const nombreCliente = document.getElementById('nombreCliente').value;
    const fecha = document.getElementById('fecha').value;


    if (nombreCiente = "") {
        //alert("Debe ingresar nombre de cliente")
        Swal.fire("Debe ingresar nombre de cliente");  
        return
    }

    if (aDetalleProforma.length == 0) {
        //alert("Debe ingresar productos")
        Swal.fire("Debe ingresar productos");  
        return
    }


    let totalProforma = 0
    aDetalleProforma.forEach(detProforma => {
        totalProforma = totalProforma + detProforma.cantidad * detProforma.precio
    });


    if (proformaActualId !== null) {
        // Modificar proforma existente
        let proforma = proformas.find(p => p.id === proformaActualId);
        if (proforma) {
            proforma.nombreCliente = nombreCliente;
            proforma.fecha = fecha;
            proforma.total = totalProforma;
            proforma.articulos = aDetalleProforma;
        }
    } else {
        // Crear nuevo proforma
        const nuevaProforma = {
            id: Date.now(),
            nombreCliente: nombreCliente,
            fecha: fecha,
            articulos: aDetalleProforma, //[{ nombre: articulo, cantidad, precio, total }],
            total: totalProforma
        };
        proformas.push(nuevaProforma);
    }

    aDetalleProforma = [];

    limpiarFormularioArticulo();
    mostrarArticulos();

    limpiarFormulario();
    mostrarProformas();
}

// Función para limpiar el formulario por ID
function limpiarFormulario() {
    document.getElementById('proformaId').value = '';
    document.getElementById('nombreCliente').value = '';
    document.getElementById('fecha').value = fechaHoy;

    proformaActualId = null;
}

// Función para mostrar los proformas en la tabla
function mostrarProformas() {
    const tbody = document.querySelector('#tablaProformas tbody');
    tbody.innerHTML = ''; // Limpiar la tabla

    proformas.forEach(proforma => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${proforma.id}</td>
            <td>${proforma.fecha}</td>
            <td>${proforma.nombreCliente}</td>
            <td>${proforma.total.toFixed(2)}</td>
            <td>
                <button onclick="editarProforma(${proforma.id})">Editar</button>
                <button onclick="eliminarProforma(${proforma.id})">Eliminar</button>
                <button onclick="verDetalle(${proforma.id})">Ver Detalle</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para editar un proforma, en formulario de artículos
//muestra el detalle de la proforma con los botones de editar/elimnar articulos
//en el formulario de articulos se puede usar para agregar productos nuevos a la proforma
function editarProforma(id) {
    const proforma = proformas.find(p => p.id === id);
    if (proforma) {
        document.getElementById('proformaId').value = proforma.id;
        document.getElementById('nombreCliente').value = proforma.nombreCliente;
        document.getElementById('fecha').value = proforma.fecha;

        proformaActualId = proforma.id;

        aDetalleProforma = []

        proforma.articulos.forEach((articulo) => {

            const nuevoArticulo2 = {
                id: articulo.id,
                articulo: articulo.articulo,
                cantidad: articulo.cantidad,
                precio: articulo.precio,
                total: articulo.total

            };
            aDetalleProforma.push(nuevoArticulo2)
        })

        limpiarFormularioArticulo();
        mostrarArticulos();

    }
}

//eliminar una proforma y actualiza tabla de proformas
function eliminarProforma(id) {
    proformas = proformas.filter(p => p.id !== id);
    mostrarProformas();
}


// Función para ver detalle de una proforma, muestra el detalle en la seccion de 
//consulta. En esta seccion el detalle se puede ordenar por nombre del articulo
//cantidad, precio, total, de forma ascendente o descendente.
function verDetalle(id) {


    const proforma = proformas.find(p => p.id === id);
    if (proforma) {
        consultaProforma[0].childNodes[3].childNodes[1].childNodes[3].textContent = proforma.nombreCliente
        consultaProforma[0].childNodes[3].childNodes[3].childNodes[3].textContent = proforma.fecha
        consultaProforma[0].childNodes[3].childNodes[5].childNodes[3].textContent = proforma.total

        aConsultaDetalleProforma = []

        proforma.articulos.forEach((articulo) => {

            const nuevoArticulo2 = {
                id: articulo.id,
                articulo: articulo.articulo,
                cantidad: articulo.cantidad,
                precio: articulo.precio,
                total: articulo.total

            };
            aConsultaDetalleProforma.push(nuevoArticulo2)
        })

        consultarArticulos();

        window.location = "#consultaProforma";
    }
}






