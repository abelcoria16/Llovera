"use strict";

import { seleccionarIconoTiempo } from "./utilidades.js";
import {
  mostrarTiempoDiaActual,
  comprobarAmanecerAtardecer,
  comprobarNubes,
} from "./tiempoDiaActual.js";

import { mostrarTiempoSemana } from "./tiempoSemanal.js";

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

      mostrarTiempoDiaActual(
        temperaturaMaximaDiaActual,
        temperaturaMinimaDiaActual,
        amanecerAtardecer,
        sumaLLuviaDiaActual,
        velocidadVientoDiaActual,
        iconoTiempo
      );

      mostrarTiempoSemana(arrayTempMax,arrayTempMin,arraySumaLluviasDia);
    })

    .catch((error) => {
      console.error("Error al obtener el tiempo Diario", error);
    });
}

export { obtenerTiempoDiario };
