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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,rain,cloud_cover&daily=sunrise,sunset&forecast_days=2`;

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
  poblacionElement.textContent = `Estás en: ${poblacion}`;
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

    
    // const willRain = arrayLluvia[i] > 0 ? 'Sí' : 'No';
    // <p>Lloverá: ${willRain}</p>
    const precipitation = arrayLluvia[i] + " mm";

    weatherCard.innerHTML = `
            <img src="./img/${iconoTiempo}" alt="imagen tiempo" class="imgTiempo">
            <p>${hora}h</p>
            <p>Precipitación: ${precipitation}</p>
        `;
    weatherContainer.appendChild(weatherCard);
  }

  container.appendChild(weatherContainer);
}

function seleccionarIconoTiempo(nubes, lluvia, amanecer, atardecer, hora) {
  let imagen = "";
    // nubes = 69;
    // hora = 20;
  console.log("Nubes: "+nubes+" Hora: "+hora+" Lluvia: "+lluvia+ " amanecer: "+amanecer+ " atardecer: "+atardecer);
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

inicioBoton();
