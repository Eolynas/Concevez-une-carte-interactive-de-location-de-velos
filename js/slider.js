function Slider(id, images) { 
    this.i = 0;
    this.images = images;	// Images Array
    this.time = 3000;	// Time Between Switch
    this.elt = document.getElementById(id);
    //Balise IMG
    this.imagesTag = [];
    this.sliderInterval  
    this.timer = 5000;
    

    //Chargement de toutes les images
    for(var i=0; i<this.images.length; i++){
        var div = document.createElement("div");
        div.className= "slider";
        var img = document.createElement("img");
        img.className= "images";
        img.src = this.images[i].image;
        //if(i>0) img.style.display="none";
        var text = document.createElement("p");
        text.className= "textSlide";
        text.innerText= this.images[i].text;
        div.appendChild(img);
        div.appendChild(text);
        if(i>0) div.style.display="none";
        this.imagesTag.push(div);
        this.elt.appendChild(div);
    }
    
    // Change Image
    this.changeImg = function (){
          
      
    }


    //Avance le slider
    this.nextSlide = function () {
        if((this.i < this.imagesTag.length-1)){
            //On enleve l'image précédente
            this.imagesTag[this.i].style.display="none"; 
            this.i++;
            //On affiche l'image
            this.imagesTag[this.i].style.display="block";
            
        }else {
            //On enleve l'image précédente
            this.imagesTag[this.i].style.display="none";
            this.i=0
            //On affiche l'image
            this.imagesTag[this.i].style.display="block";
        }    
    }

    //Reculer le slider
    this.previousSlide = function () {
        if(this.i==0){
            this.imagesTag[this.imagesTag.length-1].style.display="block";
            //On enleve l'image précédente
            this.imagesTag[0].style.display="none"; 
            this.i=this.imagesTag.length-1;
            
        }else if(this.i < this.imagesTag.length){
            //On enleve l'image précédente
            this.imagesTag[this.i].style.display="none"; 
            this.i--;
            //On affiche l'image
            this.imagesTag[this.i].style.display="block";
            
                
        }        
    }

   this.autoSlider = function () {
    this.sliderInterval = setInterval(this.nextSlide.bind(this),this.timer)
    };
    this.autoSlider();

    //////////////// Commande slider ////////////////

    //Bouton Suivant
    $("#nextSlide").click(function(){
        slider.nextSlide();

    })

    //Bouton précédent
    $("#previousSlide").click(function(){
        slider.previousSlide();

    })

    //Pause Slider
    $("#pause").click(function(){
        clearInterval(slider.sliderInterval);
        $("#play").css("display", "block");
        $("#pause").css("display", "none");

    })

    //Play Slider
    $("#play").click(function(){
        slider.autoSlider();
        $("#play").css("display", "none");
        $("#pause").css("display", "block");

    })

    // touche claver
    $("body").keydown(function() {
        if(event.keyCode === 37){
            slider.previousSlide();
        } else if (event.keyCode === 39){
            slider.nextSlide();
        }
    });
    

};
