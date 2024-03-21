"use strict";

import { recogerDatosLocalStorage } from "./latitudYLongitud.js";


inicioBoton();

function inicioBoton() {
  const btnLluviaHoras = document.getElementById("botonTiempo");
  btnLluviaHoras.addEventListener("click", (event) => {
    event.preventDefault();

    const tituloYBoton = document.getElementById("containerInicio");
    tituloYBoton.style.display = "none";

    recogerDatosLocalStorage();
    
  });
}