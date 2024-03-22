"use strict";

import { horaActual } from "./utilidades.js";

function mostrarTiempoDiaActual(
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

export { mostrarTiempoDiaActual, comprobarAmanecerAtardecer, comprobarNubes };
