var googleMap = new GoogleMap(
    {
        lat: 43.295334,
        lng: 5.374407

    },

    
    "map",

);
var googleMapLyon = new GoogleMap(
    {
        lat: 43.295334,
        lng: 5.374407

    },
    
    "map",

);

var initMap = function (){
    googleMap.initMap();
    googleMap2.initMap();
} 

var ajax = new Ajax();
var reservation = new Reservation();
var station = new Station();
var canvas = new Canvas('#canvas');
var slider = new Slider("imgSlide",
[
    {
        image:"img/slider1.jpg", 
        text:"BLABLA TEST"
    },
    {
        image:"img/slider2.jpg", 
        text:"BLABLA 2"
    },
    {
        image:"img/slider3.jpg", 
        text:"BLABLA 3"
    }
]);


// injection de dépendance

station.getAllStations();

var bookedStation = reservation.getBookedStation()







