"use strict";

function obtenerNombrePoblacion(latitud, longitud) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const poblacion =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet ||
        data.address.locality ||
        data.address.county ||
        data.address.state ||
        data.address.country;

      mostrarPoblacion(poblacion);
    })
    .catch((error) => {
      console.error("Error al obtener el nombre de la población:", error);
    });
}

function mostrarPoblacion(poblacion) {
  const poblacionElement = document.getElementById("poblacion");
  poblacionElement.textContent = `Clima en: ${poblacion}`;
}

export {obtenerNombrePoblacion};