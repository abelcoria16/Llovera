"use strict";

function seleccionarIconoTiempo(nubes, lluvia, amanecer, atardecer, hora) {
  if (lluvia > 0) {
    return "lluvia.png";
  }

  if (nubes >= 70) {
    return "nubes.png";
  }

  if (nubes >= 20 && nubes < 70 && (hora < amanecer || hora >= atardecer)) {
    return "nocheNubes.png";
  }

  if (nubes >= 20 && nubes < 70) {
    return "solNubes.png";
  }

  if (hora < amanecer || hora > atardecer) {
    return "noche.png";
  }

  return "soleado.png";
}

function horaActual() {
  return new Date().getHours();
}

export { seleccionarIconoTiempo, horaActual };
