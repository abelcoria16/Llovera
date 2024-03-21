"use strict";

import { seleccionarIconoTiempo, horaActual } from "./utilidades.js";

function obtenerTiempo8Horas(latitud, longitud) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,rain,cloud_cover&daily=sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=2`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const arrayHoras = data.hourly.time;
      const arrayLuvia = data.hourly.rain;
      const arrayTemperatura = data.hourly.temperature_2m;
      const arrayClima = data.hourly.cloud_cover;
      const amanecer = data.daily.sunrise[1].split("T")[1].split(":")[0];
      const atardecer = data.daily.sunset[1].split("T")[1].split(":")[0];

      const array8Horas = [];
      const arrayLlovera8Horas = [];
      const arrayTemperatura8Horas = [];
      const arrayClima8Horas = [];

      const hora = horaActual();
      const hora8 = hora + 8;

      for (let i = hora; i < hora8; i++) {
        array8Horas.push(arrayHoras[i]);
        arrayLlovera8Horas.push(arrayLuvia[i]);
        arrayTemperatura8Horas.push(arrayTemperatura[i]);
        arrayClima8Horas.push(arrayClima[i]);
      }
      comprobarSiLlovera(arrayLlovera8Horas);
      mostrarTiempo(
        array8Horas,
        arrayLlovera8Horas,
        arrayTemperatura8Horas,
        arrayClima8Horas,
        amanecer,
        atardecer
      );
    })
    .catch((error) => {
      console.error("Error al obtener el tiempo: ", error);
    });
}

function comprobarSiLlovera(arrayLluvia8Horas) {
  let llovera = false;

  arrayLluvia8Horas[3] = 0.1; //simular lluvia
  // arrayLluvia8Horas[7]=0.10;

  for (const lluvia of arrayLluvia8Horas) {
    if (lluvia > 0) {
      llovera = true;
      break;
    }
  }

  mostrarSiLlovera(llovera);
}

function mostrarSiLlovera(llovera) {
  const parrafoLloveraSN = document.getElementById("lloveraSN");
  let lluvia;
  if (llovera === true) {
    lluvia = "Sí";
  } else {
    lluvia = "No";
  }
  parrafoLloveraSN.innerHTML = `${lluvia} llovera en las proximas 8 horas`;
}

function mostrarTiempo(
  arrayHoras,
  arrayLluvia,
  arrayTemperaturas,
  arrayClima,
  amanecer,
  atardecer
) {
  const container = document.getElementById("cuadrosTiempo");
  container.style.display = "block";
  container.innerHTML = "";
  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("contenedorCuadrados");

  const parrafo8Horas = document.createElement('p');
  parrafo8Horas.innerHTML=`Tiempo de las proximas 8 horas:`;
  weatherContainer.appendChild(parrafo8Horas);

  const contenedorCuadrados = document.createElement("div");
  weatherContainer.appendChild(contenedorCuadrados);
  contenedorCuadrados.classList.add("contenedorTiempo");

  for (let i = 0; i < arrayLluvia.length; i++) {
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("tiempoCuadro");

    const hora = arrayHoras[i].split("T")[1];

    const iconoTiempo = seleccionarIconoTiempo(
      arrayClima[i],
      arrayLluvia[i],
      amanecer,
      atardecer,
      hora.split(":")[0]
    );
 

    const precipitation = arrayLluvia[i] + " mm";
    const grados = arrayTemperaturas[i].toString().split(".")[0] + "°C";

    weatherCard.innerHTML = `
            <h2 class="fondoBlanco">${hora}</h2>
            <img src="./img/${iconoTiempo}" alt="imagen tiempo" class="imgTiempo" class="fondoBlanco">
            <h3 class="fondoBlanco">${grados}</h3>
            <p class="fondoBlanco">Precipitación: ${precipitation}</p>
        `;
    contenedorCuadrados.appendChild(weatherCard);
  }

  container.appendChild(weatherContainer);
}

export{obtenerTiempo8Horas};
