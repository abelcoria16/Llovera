"use strict";

function obtenerLatitudLongitud() {
  let longitud;
  let latitud;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      longitud = posicion.coords.longitude;
      latitud = posicion.coords.latitude;
      obtenerTiempo(latitud, longitud);
      obtenerNombrePoblacion(latitud, longitud);
    });
  }
}

function obtenerTiempo(latitud, longitud) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=rain`;
  console.log(url);
}

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

      console.log("Tiempo en:", poblacion);
    })
    .catch((error) => {
      console.error("Error al obtener el nombre de la población:", error);
    });
}

function horaActual() {
  const hora = new Date().getHours();
  return hora;
}

obtenerLatitudLongitud();

console.log(horaActual());
