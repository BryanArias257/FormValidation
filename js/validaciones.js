export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },

    password: {
        valueMissing: "Este campo contrasena no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una mayuscula, un numero y no puede contener caracteres especiales."
    },

    nacimiento: {
        valueMissing: "Este campo de fecha no puede estar vacio",
        customError: "Debes tener al menos 18 anos de edad"
    },

    numero: {
        valueMissing: "Este campo de numero de telefono no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },

    direccion: {
        valueMissing: "Este campo direccion no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },

    ciudad: {
        valueMissing: "Este campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres"
    },

    estado: {
        valueMissing: "Este campo estado no puede estar vacio",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres"
    },


}

const validadores = {
    nacimiento: input => validarNacimiento(input),

};

function mostarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);
    let mensaje = ""
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 anos de edad"
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}