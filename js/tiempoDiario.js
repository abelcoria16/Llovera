"use strict";

import { seleccionarIconoTiempo, horaActual } from "./utilidades.js";

function obtenerTiempoDiario(latitud, longitud) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=cloud_cover&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max&timezone=Europe%2FBerlin`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperaturasMax = data.daily.temperature_2m_max;
      const arrayTempMax = [];
      const temperaturasMin = data.daily.temperature_2m_min;
      const arrayTempMin = [];
      const amanecerDiaActual = data.daily.sunrise[0].split("T")[1];
      const atardecerDiaActual = data.daily.sunset[0].split("T")[1];
      const sumaLluviasDia = data.daily.rain_sum;
      const arraySumaLluviasDia = [];
      const amanecerAtardecer = comprobarAmanecerAtardecer(
        amanecerDiaActual,
        atardecerDiaActual
      );
      const velocidadViento = data.daily.wind_speed_10m_max;
      const arrayVelocidadViento = [];

      for (let i = 0; i < 7; i++) {
        arrayTempMax.push(temperaturasMax[i] + data.daily.temperature_2m_max);
        arrayTempMin.push(temperaturasMin[i] + data.daily.temperature_2m_max);
        arraySumaLluviasDia.push(sumaLluviasDia[i]);
        arrayVelocidadViento.push(
          velocidadViento[i] + data.daily_units.wind_speed_10m_max
        );
      }
      let temperaturaMaximaDiaActual = temperaturasMax[0] + "ºC";
      let temperaturaMinimaDiaActual = temperaturasMin[0] + "ºC";
      let sumaLLuviaDiaActual = sumaLluviasDia[0] + data.daily_units.rain_sum;
      let velocidadVientoDiaActual =
        velocidadViento[0] + data.daily_units.wind_speed_10m_max;
      const nubes = comprobarNubes(data.hourly.cloud_cover);
      const iconoTiempo = seleccionarIconoTiempo(nubes, arraySumaLluviasDia[0]);

      mostrarTiempoDiario(
        temperaturaMaximaDiaActual,
        temperaturaMinimaDiaActual,
        amanecerAtardecer,
        sumaLLuviaDiaActual,
        velocidadVientoDiaActual,
        iconoTiempo
      );
    })

    .catch((error) => {
      console.error("Error al obtener el tiempo Diario", error);
    });
}

function mostrarTiempoDiario(
  tempMax,
  tempMin,
  amanecerAtardecer,
  sumaLluvia,
  velocidadViento,
  iconoTiempo
) {
  const containerTiempoDiario = document.getElementById("tiempoDelDia");
  containerTiempoDiario.style.display = "block";
  const tiempoDiario = document.createElement("div");
  const fecha = establecerFecha();
  tiempoDiario.innerHTML = `
  <p>${fecha}</p>
    <img src="./img/${iconoTiempo}" alt="imagen tiempo" id="imgTiempoDia">
  <div id="infoTiempoDiario">
    <p><img src="./img/temp_max.png" class="temp">  ${tempMax}</p>
    <p><img src="./img/temp_min.png" class="temp">  ${tempMin}</p>
    <p>${
      iconoAmanecerAtardecer(amanecerAtardecer.estado) +
      " " +
      amanecerAtardecer.hora
    }</p>
    <p><img src="./img/icono_lluvia.png" class="temp">${sumaLluvia}</p>
    <p> <img src="./img/vel_viento.png" class="temp">  Vel. Viento: ${velocidadViento}</p>
  </div>
    `;

  containerTiempoDiario.appendChild(tiempoDiario);
}

function iconoAmanecerAtardecer(estado) {
  const parte1 = '<img src="./img/';
  const parte2 = estado;
  const parte3 = '.png" class="temp">';
  return `${parte1}${parte2}${parte3}`;
} 

function comprobarAmanecerAtardecer(horaAmanecer, horaAtardecer) {
  const amanecer = horaAmanecer.split(":")[0];
  const atardecer = horaAtardecer.split(":")[0];
  let amanecerAtardecerDiaActual = {
    estado: "",
    hora: "",
  };
  if (horaActual() >= amanecer) {
    amanecerAtardecerDiaActual.estado = "atardecer";
    amanecerAtardecerDiaActual.hora = horaAtardecer;
  } else {
    amanecerAtardecerDiaActual.estado = "amanecer";
    amanecerAtardecerDiaActual.hora = horaAmanecer;
  }
  return amanecerAtardecerDiaActual;
}

function comprobarNubes(arrayNubes) {
  let totalNubes = 0;
  let cieloCubierto = 0;

  for (let i = 0; i < 24; i++) {
    totalNubes += arrayNubes[i];
  }

  if (totalNubes < 480) {
    cieloCubierto = 0; //cantidad de nubes minima
  } else if (totalNubes < 1680) {
    cieloCubierto = 50; //sol y nubes
  } else {
    cieloCubierto = 100; //cielo cubierto
  }

  return cieloCubierto;
} 

function establecerFecha() {
  const arrayFecha = new Date().toString().split(" ");
  let dia = arrayFecha[0];
  let mes = arrayFecha[1];
  const numDia = arrayFecha[2];

  switch (dia) {
    case "Mon":
      dia = "Lunes";
      break;
    case "Tue":
      dia = "Martes";
      break;
    case "Wed":
      dia = "Miercoles";
      break;
    case "Thu":
      dia = "Jueves";
      break;
    case "Fri":
      dia = "Viernes";
      break;
    case "Sat":
      dia = "Sabado";
      break;
    case "Sun":
      dia = "Domingo";
      break;
    default:
      dia = "Dia";
      break;
  }

  switch (mes) {
    case "Jan":
      mes = "Enero";
      break;
    case "Feb":
      mes = "Febrero";
      break;
    case "Mar":
      mes = "Marzo";
      break;
    case "Apr":
      mes = "Abril";
      break;
    case "May":
      mes = "Mayo";
      break;
    case "Jun":
      mes = "Junio";
      break;
    case "Jul":
      mes = "Julio";
      break;
    case "Aug":
      mes = "Agosto";
      break;
    case "Sep":
      mes = "Septiembre";
      break;
    case "Oct":
      mes = "Octubre";
      break;
    case "Nov":
      mes = "Noviembre";
      break;
    case "Dec":
      mes = "Diciembre";
      break;

    default:
      break;
  }

  const fecha = `${dia} ${numDia} de ${mes}`;

  return fecha;
}

export { obtenerTiempoDiario };
