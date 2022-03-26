const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textarea = document.getElementById('textarea');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	asunto: /^[a-zA-ZÀ0-9-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
	mensaje: /^.{1,300}$/ // 1 a 300 digitos.
}

const campos = {
	nombre: false,
	correo: false,
	asunto: false,
    mensaje: false
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre,e.target,'nombre');
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target,'correo');
        break;
        case "asunto":
            validarCampo(expresiones.asunto,e.target,'asunto');
        break;
        case "textarea":
            validarCampoMensaje(e.target,);
        break;
    }
}

const validarCampo = (expresion, input, campo) =>{
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
        if (campos.nombre && campos.correo && campos.asunto && campos.mensaje){
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }
    }else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarCampoMensaje = (textarea) =>{
    if (expresiones.mensaje.test(textarea.value)){
        document.getElementById('grupo__textarea').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__textarea').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo__textarea .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos.mensaje = true;
        if (campos.nombre && campos.correo && campos.asunto && campos.mensaje){
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }
    }else{
        document.getElementById('grupo__textarea').classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo__textarea').classList.remove('formulario__grupo-correcto');
        document.querySelector('#grupo__textarea .formulario__input-error').classList.add('formulario__input-error-activo');
        campos.mensaje = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup',validarFormulario);
    input.addEventListener('blur',validarFormulario);
});

textarea.addEventListener('keyup',validarFormulario);
textarea.addEventListener('blur',validarFormulario);

formulario.addEventListener('submit',(e) =>{
    e.preventDefault();


    if (campos.nombre && campos.correo && campos.asunto && campos.mensaje){
        formulario.reset();
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto')
        });
        campos.nombre = false;
        campos.correo = false;
        campos.asunto = false;
        campos.mensaje = false;
    }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

        let nombreVacio = document.getElementById('grupo__nombre');
        let correoVacio = document.getElementById('grupo__correo');
        let asuntoVacio = document.getElementById('grupo__asunto');
        let mensajeVacio = document.getElementById('grupo__textarea');

        if (!campos.nombre){
            nombreVacio.value = '';
            validarCampo(expresiones.nombre,nombreVacio,'nombre');
        }
        if (!campos.correo){
            correoVacio.value = '';
            validarCampo(expresiones.correo,correoVacio,'correo');
        }
        if (!campos.asunto){
            asuntoVacio.value = '';
            validarCampo(expresiones.asunto,asuntoVacio,'asunto');
        }
        if (!campos.mensaje){
            mensajeVacio.value = '';
            validarCampoMensaje(mensajeVacio);
        }
    }
});

/* video tutorial de FalconMasters https://youtu.be/s3pC93LgP18*/