let nombreProducto 
let nCantidad
let nPrecio
let nTotal = 0
let nItem = 1
let lPideProducto=true
let cRpta


while (lPideProducto) {
    nombreProducto = validaCadena(nItem,"==> Ingreso producto a comprar: ","Debe ingresar nombre de producto válido") //prompt("Item: "+nItem+"==> Ingreso producto a comprar: ")
    nCantidad = validaNumero(nItem, "==> Cantidad a comprar: ", "Debe ingresar cantidad correcta")
    nPrecio = validaNumero(nItem, "==> Precio a pagar: ", "Debe ingresar precio correcto")


    console.log(nItem +": "+nombreProducto+" Cantidad: "+nCantidad+" Precio: "+nPrecio+" Total: "+Math.round(nCantidad*nPrecio*100) /100)

    nTotal = nTotal + Math.round(nCantidad * nPrecio * 100)/100


    cRpta=validaSiNo("Desea ingresar otro producto? S/N")
    if (cRpta=="N") {
        lPideProducto = false
        break;
    }

    nItem ++
}

if (nItem==1)  {
    console.log("Se compró "+ nItem+" item, el total a pagar es: "+nTotal)
    alert("Se compró "+ nItem+" item, el total a pagar es: "+nTotal)
}
else {
    console.log("Se compraron "+ nItem+" items, el total a pagar es: "+nTotal)
    alert("Se compraron "+ nItem+" items, el total a pagar es: "+nTotal)
}
    



function validaCadena(nItem, mensajePrompt, mensajeError) {
    let lError = true
    let cCadena
    while (lError) {
        cCadena = prompt("Item: "+nItem+mensajePrompt)
        if (!isNaN(cCadena) || cCadena=="")  {
            alert(mensajeError)
        }
        else
            lError = false
    }
    return cCadena
}
    


function validaNumero(nItem, mensajePrompt, mensajeError) {
    let lError = true
    let nNumero
    while (lError) {
        nNumero = Number(prompt("Item: "+nItem+mensajePrompt))
        if (isNaN(nNumero) || Number(nNumero)<=0)  {
            alert(mensajeError)
        }
        else
            lError = false
    }
    return nNumero
}

function validaSiNo(mensaje) {
    let lError = true
    let cRpta=""
    while (lError) {
        cRpta =  prompt(mensaje).toUpperCase()
        if (cRpta=="N" || cRpta=="S") {
             lError = false
        }
    }
    return cRpta;
}


