'use strict';

const formularioEntradasCine = document.getElementById("miFormulario");
formularioEntradasCine.addEventListener('submit', event => {
    event.preventDefault();
    const datoFormulario = new FormData(formularioEntradasCine);
    // console.log(datoFormulario);

    //Obtener los valores de los campos del form
    const nombre = datoFormulario.get('name'); // <-- accedemos desde el name del html
    const email = datoFormulario.get('email');// con get recuperamos el valor que se guaardo en el campo


    // Realizamos alguna accion con los datos obtenidos
    console.log(`Nombre: ${nombre}`);
    console.log(`Email: ${email}`);

    // formularioEntradasCine.reset();

    // Ocultar toda la seccion entera y ostrarun mensaje de envio exitoso
    document.querySelector('section').style.display = "none";

    const mensajeExitoso = document.createElement('p')
    mensajeExitoso.textContent="🔔Tus datos se enviaron con exito!!!🔔";
    // Le añadimos la clase guardada en el CSS al elemento que contiene el texto final mediante classList
    mensajeExitoso.classList.add("exitoMensaje");

    document.body.appendChild(mensajeExitoso);
})