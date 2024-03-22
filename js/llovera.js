"use strict";

import { obtenerTiempo8Horas } from "./tiempo8Horas.js";
import { obtenerTiempoDiario } from "./tiempoDiario.js";
import { obtenerNombrePoblacion } from "./poblacion.js";
import { generarLinkRecargar } from "./recargarUbicacion.js";
import { obtenerLatitudLongitud } from "./latitudYLongitud.js";

recogerDatosLocalStorage();

function recogerDatosLocalStorage() {
  const latitud = localStorage.getItem("latitud");
  const longitud = localStorage.getItem("longitud");

  if (latitud != null && longitud != null) {
    const tituloYBoton = document.getElementById("containerInicio");
    tituloYBoton.style.display = "none";
    obtenerTiempo8Horas(latitud, longitud);
    obtenerNombrePoblacion(latitud, longitud);
    obtenerTiempoDiario(latitud, longitud);
    generarLinkRecargar();
  } else {
    inicioBoton();
  }
}


function inicioBoton() {
  const btnLluviaHoras = document.getElementById("botonTiempo");
  btnLluviaHoras.addEventListener("click", (event) => {
    event.preventDefault();

    const tituloYBoton = document.getElementById("containerInicio");
    tituloYBoton.style.display = "none";

    obtenerLatitudLongitud();
    
  });
}

export {recogerDatosLocalStorage};
