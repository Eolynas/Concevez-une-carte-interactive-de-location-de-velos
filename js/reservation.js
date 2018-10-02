function Reservation() {

    this.dateDepart = sessionStorage.getItem('date') // date au moment du lancement du compteur
    this.dateNow = '';
    this.dateDiff = '';
    this.minute = '';
    this.seconde = '';
    this.nom = $("#formNom");
    this.prenom = $("#formPrenom");
    this.timer;


    //On afficher le formulaire
    $("#buttonReserv").click(function(){
        $("#form").css("display", "block")
        $("#canvas").css("display", "block")
        $("#buttonReserv").css("display", "none")

        //On verifie la présence de localStorage pour le nom et le prenom
        if (localStorage.getItem("localNom") != null){
            this.nom.val(localStorage.getItem("localNom"));
            this.prenom.val(localStorage.getItem("localPrenom"));
        }
    }.bind(this));

    // On stock les infos de la station dans un seesionStorage
    this.stationStorage = function (station) {
        //station.available_bikes = station.available_bikes - 1;
        sessionStorage.setItem('bookedStation', JSON.stringify(station));
        // On stock en milliseconde le moment de la reservation de la reservation
        sessionStorage.setItem('date', new Date().getTime());
        this.dateDepart = sessionStorage.getItem('date');
        $("#boutonAnnuler").css("display", "block")
        
    };

    //Méthode velos disponible
    this.createBookingReservation = function (station) {
        // On verifie si des velos sont disponible

        if (this.getBookedStation() != undefined) {
            if(this.getBookedStation().address == station.address){
                alert("Vous avez une reservaiton en cours sur cette station!!")
            } else if (window.confirm("vous avez déja une reservation à " + this.getBookedStation().address + ". Voulez vous l'annuler est réserver un vélo à l'adresse " + station.address + " ?")){
                sessionStorage.clear();
                this.stationStorage(station);
                return true;
            }
            

        }else if ((canvas.sign == false) || (this.nom.val() == "") || (this.prenom.val() == "")){
            $(".conditions").text("Veuillez completer le formulaire afin de reserver.")

        } else if (station.available_bikes > 0) {
            this.stationStorage(station)
            return true
            
        } else {
            alert("Désolé il n'y a plus de vélo disponible");
        }
    };

    // reservation
    //var reserv = $("#validCanvas").click(function(e){
    $("#validCanvas").click(function(e){    
        
        //On recupere le champ du form

        var infoReservation = reservation.createBookingReservation(googleMap.selectedStation)
        if(infoReservation == true){
            //On cache le form
            $("#form").css("display", "none")
            $("#canvas").css("display", "none")
            $("#buttonReserv").css("display", "block")
            $(".conditions").text("");
            $("#infoReservation").text("Vous avez une reservation à l'adreese " + this.getBookedStation().address);

            //On affiche le storage dans le form
            $("#dispo").text(this.getBookedStation().available_bikes - 1);
            
            //On stock la valeur de nom et prenom en localStorage
            localStorage.setItem("localNom", this.nom.val());
            localStorage.setItem("localPrenom", this.prenom.val());

            clearInterval(this.timer);
            this.timer = setInterval(function (){
                this.compteur();
                $("#infoTime").text("Il vous reste " + this.minute + 'mn '  + this.seconde + "s de reservation");   
                //if (reservation.seconde === 55) {
                if (this.seconde === 50) {    
                    clearInterval(this.timer);
                    $("#dispo").text(googleMap.selectedStation.available_bikes);
                    this.annulationReservation();
                    $("#infoReservation").text('Votre réservation à expiré');
                } 
            }.bind(this), 1000);
        } 
    canvas.clearCanvas();
    e.preventDefault();
    }.bind(this));

    

    // Lire le sesssion storage
    this.getBookedStation = function () {
        var getBookedStation = sessionStorage.getItem('bookedStation')
        if (getBookedStation != undefined) {
            return JSON.parse(getBookedStation);
        }
    };


    // Annulation
    this.annulationReservation = function () {
        sessionStorage.clear();
        $("#infoReservation").text("Vous n'avez pas de reservation actuellement.");
        $("#infoTime").text('');
        //Condition si aucune station n'est sélectionné
        if($("#dispo").text() != ""){
            $("#dispo").text(googleMap.selectedStation.available_bikes);
            
        }
        $("#boutonAnnuler").css("display", "none");
        // on annulle le compteur
        clearInterval(this.timer);
        reservation.minute = 19;
        reservation.seconde = 59;
    };



    $("#boutonAnnuler").click(function(){

        reservation.annulationReservation();
        
    })



    var that = this;
    // Compteur
    this.compteur = function () {
        
        // On recupere la date au momement M
        this.dateNow = new Date().getTime();
        // On fait la différence des deux date
        this.dateDiff = this.dateNow - that.dateDepart;
        this.minute = Math.floor(20 - (this.dateDiff % (1000 * 60 * 60)) / (1000 * 60));
        this.seconde = Math.floor(60 - (this.dateDiff % (1000 * 60)) / 1000);
        
       
    }

    var bookedStation = this.getBookedStation()
    // Mettre les infos à jours lors du refresh de la page
    if (bookedStation != undefined){
        //reservation.timeReservation();
        googleMap.selectedStation = bookedStation;
        $("#infoReservation").text("Vous avez une reservation à l'adreese " + bookedStation.address);
        $("#boutonAnnuler").css("display", "block");
        clearInterval(this.timer);
        this.timer = setInterval(function (){
            this.compteur();
            $("#infoTime").text("Il vous reste " + this.minute + 'mn '  + this.seconde + "s de reservation");
            if (this.seconde === 50) {
                clearInterval(this.timer);
                $("#infoTime").text('Votre réservation à expiré');
                this.annulationReservation();
            }
            

        }.bind(this), 1000);
    } else {
        sessionStorage.clear
    }
  
};

