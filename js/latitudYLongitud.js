"use strict";

import {recogerDatosLocalStorage} from "./llovera.js"

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

export {obtenerLatitudLongitud};



