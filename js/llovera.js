"use strict";

function inicioBoton() {
  const btnLluviaHoras = document.getElementById("botonTiempo");
  btnLluviaHoras.addEventListener("click", (event) => {
      event.preventDefault();
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
            const hora8 = hora + 8;

            for (let i = hora; i < hora8; i++) {
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

function comprobarSiLlovera(arrayLluvia8Horas) {
    let llovera = false;

    arrayLluvia8Horas[3]=0.10;
    // arrayLluvia8Horas[7]=0.10;

    for (const lluvia of arrayLluvia8Horas) {
        if (lluvia > 0) {
            llovera = true;
            break;
        }
    }

    mostrarSiLlovera(llovera);
}

function mostrarPoblacion(poblacion) {
  const poblacionElement = document.getElementById('poblacion');
  poblacionElement.textContent = `Estás en: ${poblacion}`;
}

function mostrarSiLlovera(llovera){
  const parrafoLloveraSN = document.getElementById('lloveraSN');
  let lluvia;
  if (llovera===true) {
    lluvia = "Sí"
  }else{
    lluvia = "No"
  }
  parrafoLloveraSN.innerHTML = `${lluvia} llovera`
}


function mostrarTiempo(arrayLluvia, arrayHoras) {
    const container = document.getElementById('cuadrosTiempo');
    container.style.display = "block";
    container.innerHTML = ''; 

    const weatherContainer = document.createElement('div');
    weatherContainer.classList.add('contenedorTiempo');

    for (let i = 0; i < arrayLluvia.length; i++) {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('tiempoCuadro');
        const hora = arrayHoras[i].split("T")[1];
        // const willRain = arrayLluvia[i] > 0 ? 'Sí' : 'No';
        // <p>Lloverá: ${willRain}</p>
        const precipitation = arrayLluvia[i] + ' mm';

        weatherCard.innerHTML = `
            <p>${hora}h</p>
            <p>Precipitación: ${precipitation}</p>
        `;
        weatherContainer.appendChild(weatherCard);
    }

    container.appendChild(weatherContainer);
}

function horaActual() {
    return new Date().getHours();
}

inicioBoton();
