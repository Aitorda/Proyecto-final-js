/* let confirmar = document.getElementById ("boton");
let nombre = document.getElementById ("nombre");
let apellido = document.getElementById ("apellido");
let correo = document.getElementById ("correo");
let usuario = document.getElementById ("usuario");
let clave = document.getElementById ("clave");
let telefono = document.getElementById ("telefono");
 
 */


function validar(e) {
    e.preventDefault(e);
    let hasError = false
    let errorMessage = ""

    let nombre, apellido, correo, usuario, clave, telefono, expresion;
    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("apellido").value;
    correo = document.getElementById("correo").value;
    usuario = document.getElementById("usuario").value;
    clave = document.getElementById("clave").value;
    telefono = document.getElementById("telefono").value;

    if (nombre === "" || apellido === "" || correo === "" || usuario === "" || clave === "" || telefono === "") {
        hasError = true
        errorMessage = "Debe rrellenar todos los campos"
    } else if (nombre.length > 10) {
        hasError = true
        errorMessage = "El nombre ingresado es muy largo"
    } else if (clave.length !== 8) {
        hasError = true
        errorMessage = "La clave debe tener 8 digitos"
    } else if (isNaN(telefono)) {
        hasError = true
        errorMessage = "El telefono ingresado debe ser un numero"
    }
    
    if(hasError) {
        Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "=)",
            timer: 5000,
        })
    } else {
        Swal.fire({
            position : "center",
            icon : "success", 
            title : "Registro exitoso",
            showConfirmButton : false,
            timer : 3000,
        }).then(() => window.location.href = '/index.html')
    }
}
formulario.addEventListener("submit", validar);





/* const confirmacion = () => {

    if (nombre, apellido, correo, usuario, clave, telefono) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario registrado",
            showConfirmButton: false,
            timer: 3000,
        })
    } else {
        Swal.fire({
            title: "Error!",
            text: "Debe rrellenar todos los campos",
            icon: "error",
            confirmButtonText: "=)",
            timer: 3000,
        })
    }

}  */