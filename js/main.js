// Captura del boton de enviar
let botonenviar = document.getElementById("enviar");
botonenviar.addEventListener("click", enviarFormulario);

// Captura del checkbox de condiciones
let checkboxcondiciones = document.getElementById("condiciones");
checkboxcondiciones.addEventListener("click", activarBotonEnviar);

// Captura de las pulsaciones del campo de contraseña
let teclacontrasena = document.getElementById("contrasena");
teclacontrasena.addEventListener("input", teclaPulsada);

// Captura de las pulsaciones del campo de verificar contraseña
let teclaverificar = document.getElementById("verificar");
teclaverificar.addEventListener("input", teclaPulsada);

// Contador de requisitos
let requisitos;

// Primera comprobación inicial de los requisitos
comprobarrequisitos();


// Función para comprobar los campos y mostrar el resultado
function enviarFormulario(){
    let problemas = [
        "- La contraseña debe tener entre 6 y 15 caracteres.<br>",
        "- La verificacion de contraseña debe tener entre 6 y 15 caracteres.<br>",
        "- No se aceptan letras mayúsculas.<br>",
        "- Las contraseñas deben coincidir.<br>",
        "- Debe aceptar las condiciones."
    ]

    document.getElementById("informacion").innerHTML = "";
    let informacion = document.createElement("div");

    let contador = 0;
    for(let i = 0; i < requisitos.length; i++){
        if(requisitos[i] == 1){
            contador++;
        }
        else{
            informacion.innerHTML += problemas[i];
        }
    }

    if(contador == 5){
        informacion.innerHTML = "TODO CORRECTO. CONTRASEÑA GENERADA";
    }

    document.getElementById("informacion").appendChild(informacion);
}


// Función que comprueba si el checkbox esta checkeado
// En caso de estarlo activa el boton de enviar
// en caso de no estarlo, apaga el boton de enviar
function activarBotonEnviar(){
    checkboxcondiciones.checked ? botonenviar.disabled = false : botonenviar.disabled = true;
    comprobarrequisitos();
}


// Función que comprueba si la tecla pulsada es una letra mayuscula
// En caso de serlo la borra
// En caso de no serlo deja que se escriba
function teclaPulsada(event){
    let campo = event.target.id;
    let comprobar = event.target.value;
    let letra = comprobar.charAt(comprobar.length - 1);

    if(letra >= 'A' && letra <= 'Z'){
        document.getElementById(campo).value = comprobar.substring(0, comprobar.length - 1);
    }

    comprobarrequisitos();
}


// Función que comprueba si se cumplen los requisitos del formulario.
// Tiene un contador con el número de requisitos que se deben cumplir y si
// se cumplen, envia el formulario
function comprobarrequisitos(){
    requisitos = [0, 0, 0, 0, 0];
    let contrasena = document.getElementById("contrasena").value;
    let verificar = document.getElementById("verificar").value;

    // Comprobamos el número de caracteres de contraseña
    (contrasena.length >= 6 && contrasena.length <= 15) ? requisitos[0] = 1 : null;

    // Se comprueba el número de caracteres de verificar contraseña
    (verificar.length >= 6 && verificar.length <= 15) ? requisitos[1] = 1 : null;

    // La mayusculas se controlan automáticamente por lo que lo aceptamos
    requisitos[2] = 1;

    // Se comprueba la coincidencia de las contraseñas
    (contrasena.length >= 6 && verificar.length >=6)
        ? (contrasena == verificar) ? requisitos[3] = 1 : null
        : null;    

    // Se comprueba que este checkeado los terminos y condiciones
    (checkboxcondiciones.checked) ? requisitos[4] = 1 : null;

    // Se llama a la función que colorea el texto según las validaciones
    coloreartexto();
}


// Función que colorea de rojo o verde los requisitos
function coloreartexto(){
    let verificacion = ["verificarcontrasena", "verificarrepetir", "verificarmayusculas", "verificarcoincidencia", "verificarcondiciones"]

    for(let i = 0; i < 5; i++){
        if(requisitos[i] == 1){
            document.getElementById(verificacion[i]).style.color = "#008000";
        }
        else{
            document.getElementById(verificacion[i]).style.color = "#ff0000";
        }
    }
}