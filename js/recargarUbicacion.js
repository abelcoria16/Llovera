"use strict";

import { recogerDatosLocalStorage } from "./latitudYLongitud.js";

function generarLinkRecargar() {
  const seccion = document.getElementById("sectionRecargarUbicacion");
  seccion.innerHTML = `
        <a href="" id="linkRecargar">Recargar Ubicación</a>
    `;

  darFuncionalidadLinkRecargar();
}

function darFuncionalidadLinkRecargar() {
  const linkRecargar = document.getElementById("linkRecargar");

  linkRecargar.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    location.reload();
  });
}

export { generarLinkRecargar };
