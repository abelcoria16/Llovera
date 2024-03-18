'use strict';

function obtenerNombrePoblacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            
    
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`;

           
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    
                    const poblacion = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.locality || data.address.county || data.address.state || data.address.country;
                    
                   
                    console.log("Estás en:", poblacion);
                })
                .catch(error => {
                    console.error('Error al obtener el nombre de la población:', error);
                });
        });
    } else {
        console.error('Geolocalización no es soportada en este navegador.');
    }
}

obtenerNombrePoblacion();