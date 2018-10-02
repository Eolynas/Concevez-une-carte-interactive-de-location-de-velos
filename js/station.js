var apiKey = "7d174c9b18a2f1544500dc33d12ff86387a89953";
var contrat = "marseille";
var urlRequest = 'https://api.jcdecaux.com/vls/v1/stations?contract='+ contrat +'&apiKey=' + apiKey;

function Station () {

    this.stations = [];
    
    this.getAllStations = function () {

        var bookedStation = sessionStorage.getItem('bookedStation')
        
        ajax.get(urlRequest, function (reponse) {
            // Transforme la réponse en tableau d'objets JavaScript
            this.stations = JSON.parse(reponse);

            //On recuperer les stations
            this.stations.forEach(function(station){

                

                if (bookedStation != null) {
                    bookedStation = JSON.parse(sessionStorage.getItem('bookedStation'))
                }
                else {
                    bookedStation = null
                }

                //Verifie qu'il y a une reservation, que l'on est sur la meme station et que le nombre de velos disponibles est inferieur a celui retourné depuis l'API
                if (bookedStation != null && bookedStation.number == station.number && bookedStation.available_bikes < station.available_bikes) {
                    station.available_bikes = bookedStation.available_bikes;
                }

                //On place un marker sur chaque station avec la fonction createMarker dans googlemap.js
                googleMap.createMarker(station)

            })


        }.bind(this));

    }
}


