"use strict";

inicioBoton();

function inicioBoton() {
  const btnLluviaHoras = document.getElementById("botonTiempo");
  btnLluviaHoras.addEventListener("click", (event) => {
    event.preventDefault();

    const tituloYBoton = document.getElementById('containerInicio');
        tituloYBoton.style.display = "none";

    console.clear();
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
      obtenerTiempoDiario(latitud, longitud)
    });
  }
}

function obtenerTiempoMeteorologico(latitud, longitud) {
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

function horaActual() {
  return new Date().getHours();
}

// Mostrar tiempo diario

function obtenerTiempoDiario(latitud, longitud) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max&timezone=Europe%2FBerlin`;

  fetch(url)
      .then((response) => response.json())
      .then((data) => {
          const temperaturasMax = data.daily.temperature_2m_max;
          const arrayTempMax = [];
          const temperaturasMin = data.daily.temperature_2m_min;
          const arrayTempMin = [];
          const amanecerDiaActual = data.daily.sunrise[0].split("T")[1];
          const atardecerDiaActual = data.daily.sunset[0].split("T")[1];
          const sumaLluviasDia= data.daily.rain_sum;
          const arraySumaLluviasDia = [];
          const amanecerAtardecer = comprobarAmanecerAtardecer(amanecerDiaActual, atardecerDiaActual);
          const velocidadViento = data.daily.wind_speed_10m_max;
          const arrayVelocidadViento = [];
          
          for (let i = 0; i < 7; i++ ){
              arrayTempMax.push(temperaturasMax[i] + data.daily.temperature_2m_max);
              arrayTempMin.push(temperaturasMin[i] + data.daily.temperature_2m_max);
              arraySumaLluviasDia.push(sumaLluviasDia[i]);
              arrayVelocidadViento.push(velocidadViento[i] + data.daily_units.wind_speed_10m_max)
             
          }
         let temperaturaMaximaDiaActual = temperaturasMax[0] + "ºC";
         let temperaturaMinimaDiaActual = temperaturasMin[0] + "ºC";
         let sumaLLuviaDiaActual = sumaLluviasDia[0] + data.daily_units.rain_sum;
         let velocidadVientoDiaActual = velocidadViento[0] + data.daily_units.wind_speed_10m_max;
          console.log(temperaturaMaximaDiaActual);
          console.log(temperaturaMinimaDiaActual);
          console.log(sumaLLuviaDiaActual);
          console.log(amanecerAtardecer);
          console.log(velocidadVientoDiaActual);
          mostrarTiempoDiario(temperaturaMaximaDiaActual, temperaturaMinimaDiaActual, amanecerAtardecer, sumaLLuviaDiaActual, velocidadVientoDiaActual);
      })

      .catch((error) => {
          console.error("Error al obtener el tiempo Diario", error);
      });

}

function mostrarTiempoDiario(tempMax,tempMin, amanecerAtardecer, sumaLluvia, velocidadViento) {
  const containerTiempoDiario = document.getElementById("tiempoDelDia");
  const tiempoDiario = document.createElement("div");
  tiempoDiario.innerHTML = `
    <p><img src="../img/temp_max.png" class="temp">  ${tempMax}</p>
    <p><img src="../img/temp_min.png" class="temp">  ${tempMin}</p>
    <p>${amanecerAtardecer.estado + " " + amanecerAtardecer.hora}</p>
    <p>${sumaLluvia}</p>
    <p> <img src="../img/vel_viento.png" class="temp">  Velocidad del viento: ${velocidadViento}</p>
  `;

  containerTiempoDiario.appendChild(tiempoDiario);
  
}

function comprobarAmanecerAtardecer(horaAmanecer, horaAtardecer) {
  const amanecer = horaAmanecer.split(":")[0];
  const atardecer= horaAtardecer.split(":")[0];
  let amanecerAtardecerDiaActual = {
    estado: "",
    hora: ""
  };
  if (horaActual()>=amanecer) {
    amanecerAtardecerDiaActual.estado = "Atardecer";
    amanecerAtardecerDiaActual.hora = horaAtardecer;
  }
  else{
    amanecerAtardecerDiaActual.estado = "Amanecer";
    amanecerAtardecerDiaActual.hora = horaAmanecer;
  }
  return amanecerAtardecerDiaActual;
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

function mostrarPoblacion(poblacion) {
  const poblacionElement = document.getElementById("poblacion");
  poblacionElement.textContent = `Clima en: ${poblacion}`;
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
  weatherContainer.classList.add("contenedorTiempo");

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
    const grados = arrayTemperaturas[i].toString().split(".")[0]+"°C";

    weatherCard.innerHTML = `
            <h2>${hora}</h2>
            <img src="./img/${iconoTiempo}" alt="imagen tiempo" class="imgTiempo">
            <h3>${grados}</h3>
            <p>Precipitación: ${precipitation}</p>
        `;
    weatherContainer.appendChild(weatherCard);
  }

  container.appendChild(weatherContainer);
}

function seleccionarIconoTiempo(nubes, lluvia, amanecer, atardecer, hora) {
  let imagen = "";
  if (lluvia > 0) {
    imagen = "lluvia.png";
  } else if (nubes >= 70) {
    imagen = "nubes.png";
  } else if (nubes >= 20 && nubes<70 && (hora < amanecer || hora >= atardecer)) {
    imagen = "nocheNubes.png";
  }else if (nubes >= 20 && nubes<70) {
    imagen = "solNubes.png";
  } else if (hora < amanecer || hora > atardecer) {
    imagen = "noche.png";
  } else {
    imagen = "soleado.png";
  }

  return imagen;
}


