"use strict";

import { obtenerTiempo8Horas } from "./tiempo8Horas.js";
import { obtenerTiempoDiario } from "./tiempoDiario.js";
import { obtenerNombrePoblacion } from "./poblacion.js";

inicioBoton();

function inicioBoton() {
  const btnLluviaHoras = document.getElementById("botonTiempo");
  btnLluviaHoras.addEventListener("click", (event) => {
    event.preventDefault();

    const tituloYBoton = document.getElementById("containerInicio");
    tituloYBoton.style.display = "none";

    console.clear();
    obtenerLatitudLongitud();
  });
}

function obtenerLatitudLongitud() {
  let longitud;
  let latitud;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      longitud = posicion.coords.longitude;
      latitud = posicion.coords.latitude;
      obtenerTiempo8Horas(latitud, longitud);
      obtenerNombrePoblacion(latitud, longitud);
      obtenerTiempoDiario(latitud, longitud);
    });
  }
}