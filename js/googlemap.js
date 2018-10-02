function GoogleMap(city, id) {

    /*
    ARGUMENT DE LA CLASS GoogleMap
    @param1 city, coordonnées lat/lng de la ville choisis
    @param2 id, id où on place la map
    */  
    
    
    this.icon = 'img/green.png';
    this.element = document.getElementById(id);
    //this.element = $("#"+id)[0];
 
    // Initialisation de la Map 
    this.initMap = function() {
       this.map = new google.maps.Map(this.element, {
            center: city,
            zoom: 16
        });
    },
    
    //On créer la méthode pour placer les marker sur chaque station 
    this.createMarker = function(station) {
        marker = new google.maps.Marker({
            position: station.position,
            map: this.map,
            title: station.name,
            icon: this.icon,
            status: station.status,
            veloDispo: station.available_bikes, 
             
        });
        
        // Modification de l'icone en fonction du status
        if(marker.veloDispo < 10){
            marker.icon = 'img/orange.png'
        }
        if(marker.veloDispo <= 0){
            marker.icon = 'img/red.png'
        }
        if(marker.status === 'CLOSED'){
            marker.icon = 'img/red.png';
        }
        // Ajout de l'event click sur les markers
        marker.addListener('click', function() {
            //Permet le centrage sur le marker
            this.map.panTo(station.position);
            //On stock la valeur du velo dispo
            this.selectedStation = station;
            // On affiche les données dans la tableau prévu
            if(station.status === "OPEN"){
                $("#status").text("Station ouverte");
            } else {
                $("#status").text("Station fermée");
            }
            $("#form").css("display", "none")
            $("#canvas").css("display", "none")
            $("#buttonReserv").css("display", "block")
            $("#nom").text(station.name);
            $("#adresse").text(station.address);
            $("#capacite").text(station.available_bike_stands);
            //Condition si il y a une reservation en cours lors du refresh
            if(reservation.getBookedStation() != undefined && (reservation.getBookedStation().address == station.address)){
                $("#dispo").text(reservation.getBookedStation().available_bikes - 1);
            }else {
                $("#dispo").text(station.available_bikes);
            }
            $("#buttonReserv").css(
                "display", "block");
 
        }.bind(this));
    }
}



