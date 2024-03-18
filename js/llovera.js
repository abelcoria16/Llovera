'use strict';

function ubicacion() {   
        let longitud
        let latitud

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( posicion => {
                longitud = posicion.coords.longitude
                latitud = posicion.coords.latitude

                const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=rain`
                console.log(url);
            })
        }
}

ubicacion();