function Canvas(id) {

    this.paint = false;
    this.canvas  = document.querySelector(id);
    this.context = this.canvas.getContext('2d');
    this.started = false;
    this.cursorX;
    this.cursorY;
    this.sign = false;

    //Verification si la souris est enfoncé ou pas
    $("#canvas").mouseup(function (mouse){
        this.paint = false;
        this.started = false;
          
    }.bind(this));

    $("#canvas").mousedown(function (mouse){
        this.paint = true;
    }.bind(this));


    //Event sur le deplacement de la souris
    $("#canvas").mousemove(function (mouse){
        if(this.paint){
            //On dessine
            if(this.started == false){
                this.started = true;
            } else {
                this.context.beginPath();
                this.context.moveTo(this.cursorX , this.cursorY);
                this.context.lineTo(mouse.offsetX, mouse.offsetY); 
                this.context.strokeStyle = "rgb(23, 145, 167)";
                this.context.lineWidth = 4;
                this.context.closePath()
                this.context.stroke();
                this.sign = true;
            } 
            this.cursorX = mouse.offsetX;
            this.cursorY = mouse.offsetY;
        }
    }.bind(this)); 

    //Event sur le deplacement tactile
    
    $('#canvas').on('touchstart', function(e) {
        console.log("TOUCH START")
        this.paint = true;
        this.started = false;
    }.bind(this));
    // Relachement du doigt 
    $('#canvas').on('touchend', function() {
        console.log("TOUCH END")
        this.paint = false;
    }.bind(this));

    // deplacement du doigt 
    $('#canvas').on('touchmove', function(touch) {
        
        touch.preventDefault();
        console.log("TOUCH MOVE")
        if(this.paint){
            //On dessine
            if(this.started == false){
                this.started = true;
            } else {
                console.log(touch.touches[0].pageX - touch.touches[0].target.offsetLeft, touch.touches[0].pageY - touch.touches[0].target.offsetTop )
                this.newCursorX = touch.touches[0].pageX - touch.touches[0].target.offsetLeft;
                this.newCursorY = touch.touches[0].pageY - touch.touches[0].target.offsetTop
                this.context.beginPath();
                this.context.moveTo(this.cursorX , this.cursorY);
                //this.context.lineTo(touch.originalEvent.touches[0].pageX, touch.originalEvent.touches[0].pageY); 
                this.context.lineTo(this.newCursorX, this.newCursorY); 
                this.context.strokeStyle = "rgb(23, 145, 167)";
                this.context.lineWidth = 4;
                this.context.closePath()
                this.context.stroke();
                this.sign = true;
            } 
            this.cursorX = this.newCursorX;
            this.cursorY = this.newCursorY;
        }
        
    }.bind(this));
    
    


    // Clear du Canvas :
    this.clearCanvas = function () {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.sign = false;
    }.bind(this);
    
    $("#clearCanvas").click(function(e){
        canvas.clearCanvas();
    
    e.preventDefault();
    });
}


