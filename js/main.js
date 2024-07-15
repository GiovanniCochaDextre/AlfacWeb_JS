class Usuario {
    constructor(nombre, pass, id) {
        this.nombre = nombre
        this.pass = pass
        this.id = id
    }
}

//usuarios que tienen acceso al sistema
let usuarios_activos = [
    new Usuario('Giovanni','clave123',1 ),
    new Usuario('Pepe','pepe123',2),
    new Usuario('admin','super1234',3)
]

localStorage.clear()


// puede que solo funcione desde Ip de Peru
// guardamos tipo de cambio obtenido del api para usarlo en otras pantallas del sitio
fetch('https://deperu.com/api/rest/cotizaciondolar.json')
    .then((response)=>response.json())
    .then((datos)=>localStorage.setItem('tipoCambio', JSON.stringify(datos)))
    .catch((error)=>Swal.fire({
        title: "Error al obtener tipo de cambio",
        text : error,
        icon : "info"
    }))


let formulario = document.querySelector('form')

//agregamos evento al boton login para validar usuario y entrar al sistema
formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    let nombre = formulario[0].value
    let pass = formulario[1].value
    
    let usuario_encontrado = usuarios_activos.find((usuario)=> usuario.nombre==nombre && usuario.pass==pass)
    if (usuario_encontrado) {
        //guardamos datos del usuarios logeado
        localStorage.setItem('logeado', JSON.stringify(usuario_encontrado))

        Swal.fire({
            title: "Login de Alfac",
            text: "Bienvenido "+nombre,
            icon: "info"
          }).then(()=>{
            window.location.href ="pages/proforma.html"
          });
    }
    else{
        Swal.fire({
            title: "Login de Alfac",
            text: "Usuario y/o contraseña no existen",
            icon: "error"
          });
    }

})
