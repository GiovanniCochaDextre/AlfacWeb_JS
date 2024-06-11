let pideArticulo=true
let respuesta


const arrayArticulos = []

const validaCadena = (qItem, mensajePrompt, mensajeError) => {
    let lError = true
    let cadena
    while (lError) {
        cadena = prompt(qItem+mensajePrompt)
        if (!isNaN(cadena) || cadena=="")  {
            alert(mensajeError)
        }
        else
            lError = false
    }
    return cadena
}


const validaNumero = (qItem, mensajePrompt, mensajeError) => {
    let lError = true
    let nNumero
    while (lError) {
        nNumero = Number(prompt(qItem+mensajePrompt))
        if (isNaN(nNumero) || Number(nNumero)<=0)  {
            alert(mensajeError)
        }
        else
            lError = false
    }
    return nNumero
}

const validaSiNo = (mensaje) => {
    let lError = true
    let respuestaSiNo=""
    while (lError) {
        respuestaSiNo =  prompt(mensaje).toUpperCase()
        if (respuestaSiNo=="N" || respuestaSiNo=="S") {
             lError = false
        }
    }
    return respuestaSiNo
}

const validaOpcion = (mensaje) => {
    let lError = true
    let respuesta=""
    while (lError) {
        respuesta =  prompt(mensaje).toUpperCase()
        if (respuesta>=1 && respuesta<=7) {
        // if (respuesta=="1" || respuesta=="2" || respuesta=="3" || respuesta=="4") {
             lError = false
        }
    }
    return respuesta
}



//***** INICIO DEL PROCESO DE COMPRAS */

while (pideArticulo) {

    respuesta=validaOpcion("CARRO DE COMPRAS: \n [1]Agregar [2]Modificar [3]Eliminar [4]Listar \n [5]Consultar [6]Ordenar por total [7]Terminar \n==> Ingrese su opción:")
    if (respuesta=="1") {
        agregarArticulo()
    }
    else if (respuesta=="2" && arrayArticulos.length>0) {
        modificarArticulo()
    }
    else if (respuesta=="3" && arrayArticulos.length>0) {
        eliminarArticulo()
    }
    else if (respuesta=="4") {
        listarArticulos()
    }
    else if (respuesta=="5") {
        consultarArticulo()
    }
    else if (respuesta=="6") {
        ordenarTotal()
        listarArticulos()
    }
    else if (respuesta=="7") {
        pideArticulo = false
        break;
    }
}

listarArticulos();    

//********************************************************************************** */


function agregarArticulo() {
    let nombreProducto 
    let cantidadArticulo
    let precioUnitario
    let qItem = arrayArticulos.length + 1 

    nombreProducto = validaCadena("Item: "+qItem,"==> Ingreso producto a comprar: ","Debe ingresar nombre de producto válido") //prompt("Item: "+qItem+"==> Ingreso producto a comprar: ")

    let resultado = arrayArticulos.filter(obj => {
        return obj.nombreProducto==nombreProducto
    })

    if (resultado!=false) {
        alert("El producto "+nombreProducto+" ya se ha comprado, cantidad: "+resultado[0].cantidad+", precio: "+resultado[0].precio+", total: "+resultado[0].total)
        alert("no se puede agregar dos veces el mismo producto")
    }
    else {
        cantidadArticulo = validaNumero("Item: "+qItem, "==> Cantidad a comprar: ", "Debe ingresar cantidad correcta")
        precioUnitario = validaNumero("Item: "+qItem, "==> Precio a pagar: ", "Debe ingresar precio correcto")

        addArticulo(nombreProducto,cantidadArticulo,precioUnitario,Math.round(cantidadArticulo * precioUnitario * 100)/100)
    }
}

function addArticulo(nombreProducto, cantidad, precio, total) {
    const newArticulo = {
        nombreProducto: nombreProducto,
        cantidad: cantidad,
        precio: precio,
        total: total
    }

    arrayArticulos.push(newArticulo)
}



function modificarArticulo() {
    let mensaje = ""
    let lError = true
    let rptaItem = 0
    let cantidadArticulo
    listarArticulos()

    while (lError) {
        rptaItem=validaNumero("","Ingrese #item a modificar cantidad", "Debe ingresar cantidad correcta")
        if (rptaItem>0 && rptaItem<=arrayArticulos.length) {
            lError = false
        }
        else
            alert("Debe ingresar un valor válido para #item, debe estar entre 1 y "+arrayArticulos.length)
    }


    cantidadArticulo = validaNumero("","Item: "+rptaItem+", ==> Ingrese nueva cantidad a comprar: ", "Debe ingresar cantidad correcta")

    rptaItem --

    mensaje = arrayArticulos[rptaItem].nombreProducto + " cantidad anterior: " + arrayArticulos[rptaItem].cantidad + " ahora es: "+ cantidadArticulo


    arrayArticulos[rptaItem].cantidad = cantidadArticulo
    arrayArticulos[rptaItem].total = Math.round(arrayArticulos[rptaItem].cantidad * arrayArticulos[rptaItem].precio * 100)/100

    alert("Se modificó cantidad de "+mensaje)
}


function eliminarArticulo() {
    let lError = true
    let rptaItem = 0
    let mensaje = ""
    listarArticulos()

    while (lError) {
        rptaItem=validaNumero("","Ingrese #item a eliminar", "Debe ingresar cantidad correcta")
        if (rptaItem>0 && rptaItem<=arrayArticulos.length) {
            lError = false
        }
        else
            alert("Debe ingresar un valor válido para #item, debe estar entre 1 y "+arrayArticulos.length)
    }

    rptaItem --
    mensaje = arrayArticulos[rptaItem].nombreProducto
    arrayArticulos.splice(rptaItem,1)
    
    alert("Se eliminó "+mensaje)
}


function listarArticulos() {
    let qItem=1
    let totalPagar = 0
    let mensaje = ""


    // for (const articulo of arrayArticulos) {
    //     console.log("Item #: "+qItem +": Artículo: "+articulo.nombreProducto+", Cantidad: "+articulo.cantidad+", Precio: "+articulo.precio+", Total: "+articulo.total)

    //     mensaje = mensaje + "Item #: "+qItem +": Artículo: "+articulo.nombreProducto+", Cantidad: "+articulo.cantidad+", Precio: "+articulo.precio+", Total: "+articulo.total + "\n"

    
    //     totalPagar = totalPagar + Math.round(articulo.cantidad * articulo.precio * 100)/100

    //     qItem ++;
    // }
    
    arrayArticulos.forEach((articulo) => {
        console.log("Item #: "+qItem +": Artículo: "+articulo.nombreProducto+", Cantidad: "+articulo.cantidad+", Precio: "+articulo.precio+", Total: "+articulo.total)

        mensaje = mensaje + "Item #: "+qItem +": Artículo: "+articulo.nombreProducto+", Cantidad: "+articulo.cantidad+", Precio: "+articulo.precio+", Total: "+articulo.total + "\n"

    
        totalPagar = totalPagar + Math.round(articulo.cantidad * articulo.precio * 100)/100

        qItem ++;
    })


    if (arrayArticulos.length==1)  {
        console.log("Se compró "+ arrayArticulos.length+" item, el total a pagar es: "+Math.round(totalPagar*100)/100)
        mensaje = mensaje + "Se compró "+ arrayArticulos.length+" item, el total a pagar es: "+Math.round(totalPagar*100)/100
    }
    else {
        console.log("Se compraron "+ arrayArticulos.length+" items, el total a pagar es: "+Math.round(totalPagar*100)/100)
        mensaje = mensaje + "Se compraron "+ arrayArticulos.length+" items, el total a pagar es: "+Math.round(totalPagar*100)/100
    }

    alert(mensaje)

}


function consultarArticulo() {
    let nombreProducto 

    nombreProducto = validaCadena("","Ingrese nombre del producto a consultar: ","Debe ingresar nombre de producto válido") //prompt("Item: "+qItem+"==> Ingreso producto a comprar: ")

    let resultado = arrayArticulos.filter(obj => {
        return obj.nombreProducto==nombreProducto
    })

    if (resultado==false) {
        alert("El producto "+nombreProducto+" no se ha comprado")
    }
    else
        alert("El producto "+nombreProducto+" ya se ha comprado, cantidad: "+resultado[0].cantidad+", precio: "+resultado[0].precio+", total: "+resultado[0].total)
}       


function ordenarTotal() {
    let lError = true
    let rpta=""
    while (lError) {
        rpta = prompt("[A]scendente o [D]escendete").toUpperCase()    
        if (rpta=="A" || rpta=="D") {
            lError=false
        }
        else {
            alert("Digite 'A' para ordenerar ascendentemente o 'D' para descendentemente")
        }
    }
    
    if (rpta=="D") {
        arrayArticulos.sort((artic1, artic2) => {
            if (artic1.total > artic2.total) return -1
            if (artic1.total < artic2.total) return 1
        })
    }
    else {
         arrayArticulos.sort((artic1, artic2) => {
             if (artic1.total < artic2.total) return -1
             if (artic1.total > artic2.total) return 1
            })
    }
             
    return 0             
    
}