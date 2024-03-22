"use strict";

function mostrarTiempoSemana(arrayTempMax, arrayTempMin, arraySumaLluviasDia) {
  const containerSemana = document.getElementById("cuadrosTiempoSemana");
  containerSemana.style.display = "block";
  containerSemana.innerHTML = "";
  const weatherContainerSemana = document.createElement("div");
  weatherContainerSemana.classList.add("contenedorCuadrados");

  const parrafoSemana = document.createElement("p");
  parrafoSemana.innerHTML = `Tiempo de los proximos 7 días:`;
  weatherContainerSemana.appendChild(parrafoSemana);

  const contenedorCuadradosSemana = document.createElement("div");
  weatherContainerSemana.appendChild(contenedorCuadradosSemana);
  contenedorCuadradosSemana.classList.add("contenedorTiempo");

  for (let i = 0; i < arraySumaLluviasDia.length; i++) {
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("tiempoCuadro");

    //   const iconoTiempo = seleccionarIconoTiempo(
    //     arrayClima[i],
    //     arrayLluvia[i],
    //     amanecer,
    //     atardecer,
    //     hora.split(":")[0]
    //   );

    const precipitation = arraySumaLluviasDia[i] + " mm";
    console.log(arrayTempMax);
    weatherCard.innerHTML = 
        // <p>temMax: ${arrayTempMax[i]}</p>
        // <p>temMin: ${arrayTempMin[i]}</p>
        `
        <p>Precipitación: ${precipitation}</p>
          `;
    contenedorCuadradosSemana.appendChild(weatherCard);
  }

  containerSemana.appendChild(weatherContainerSemana);
}

export { mostrarTiempoSemana };
