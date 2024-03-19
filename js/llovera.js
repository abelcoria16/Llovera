"use strict";

//Función que obtiene la longitud y latitud para pasarselo a las funciones de obtenerTiempo y obtenerNombrePoblacion
function obtenerLatitudLongitud() {
  let longitud;
  let latitud;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      longitud = posicion.coords.longitude;
      latitud = posicion.coords.latitude;
      obtenerTiempoMeteorologico(latitud, longitud);
      obtenerNombrePoblacion(latitud, longitud);
    });
  }
}

function obtenerTiempoMeteorologico(latitud, longitud) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=rain&forecast_days=2`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const arrayHoras = data.hourly.time;
      const arrayLuvia = data.hourly.rain;
      const arrayLlovera8Horas = [];
      const array8Horas = [];
      const hora = horaActual();
      const hora8=hora+8;

      //For que recorre el array que contiene la predicción de lluvia y guarda únicamente de las próximas 8 horas en otro array 
      for (let i = hora; i < hora8; i++) {
        // console.log(arrayHoras[i]); 
        arrayLlovera8Horas.push(arrayLuvia[i]);
        array8Horas.push(arrayHoras[i]);
      }
      comprobarSiLlovera(arrayLlovera8Horas);
      mostrarTiempo(arrayLlovera8Horas, array8Horas);
     
    })
    .catch((error) => {
      console.error("Error al obtener el tiempo: ", error);
    });
}

//Función que recorre el array de las precipitaciones de las próximas 8 horas y dice si llueve
function comprobarSiLlovera(arrayLluvia8Horas) {
  // arrayLluvia8Horas[3]=0.10; //simular lluvia
  // console.log(arrayLluvia8Horas);
  let llovera = false;

  for (const lluvia of arrayLluvia8Horas) {
    if(lluvia>0){
      llovera = true;
      break;
    }
  }

  console.log("Llovera? ",llovera);

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


function incioBoton() {
    const btnLluviaHoras = document.getElementById("botonTiempo");
    btnLluviaHoras.addEventListener('click', event => {
        event.preventDefault();
        obtenerLatitudLongitud();
    })


}

function mostrarTiempo(arrayLluvia, arrayHoras) {

  document.querySelector('section').style.display = "none";

  const seccionTiempo = document.getElementById('cuadrosTiempo');

  console.log(arrayHoras);

  for(let i=0;i<arrayLluvia.length;i++){
    const hora = arrayHoras[i].split("T")[1];
    const mensajeLlovera = document.createElement('p');
     mensajeLlovera.textContent = hora+"h Lluvia: "+arrayLluvia[i]+" mm";
     seccionTiempo.appendChild(mensajeLlovera);
  }
  
}


//Función que recoge la hora actual (solo hora, no minutos)
function horaActual() {
  const hora = new Date().getHours();
  return hora;
}


incioBoton();