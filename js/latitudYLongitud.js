"use strict";

import { obtenerTiempo8Horas } from "./tiempo8Horas.js";
import { obtenerTiempoDiario } from "./tiempoDiario.js";
import { obtenerNombrePoblacion } from "./poblacion.js";
import { generarLinkRecargar } from "./recargarUbicacion.js";

function obtenerLatitudLongitud() {
  let longitud;
  let latitud;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      longitud = posicion.coords.longitude;
      latitud = posicion.coords.latitude;
      localStorage.setItem("latitud", latitud);
      localStorage.setItem("longitud", longitud);
      recogerDatosLocalStorage();
    });
  }
}

function recogerDatosLocalStorage() {
  const latitud = localStorage.getItem("latitud");
  const longitud = localStorage.getItem("longitud");

  if (latitud != null && longitud != null) {
    obtenerTiempo8Horas(latitud, longitud);
    obtenerNombrePoblacion(latitud, longitud);
    obtenerTiempoDiario(latitud, longitud);
    generarLinkRecargar();
  } else {
    obtenerLatitudLongitud();
  }
}

export{recogerDatosLocalStorage};