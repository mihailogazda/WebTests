
var assetDir = "./images/";
var globalPointsCounter = "0 cm";

function getAsset(name)
{    
    return "url(" + assetDir + name + ")";
}


function keepAtCenter() {
return;
    
    //  attach centerMe funct to jQuery
    $.fn.centerMe = function () {
                this.css("top", Math.max(0, ((jQuery(window).height() - this.outerHeight()) / 2) + jQuery(window).scrollTop()) + "px");
                this.css("left", Math.max(0, ((jQuery(window).width() - this.outerWidth()) / 2) + jQuery(window).scrollLeft()) + "px");
                return this;
    };   
    
    //  center and keep scene centered    
    $(window).resize(function(){      
        $("#cr-outer").centerMe();
    });
    
    $("#cr-outer").centerMe();    
    
}

var width = 480;
var height = 320;

$(window).load(function(){
   
   //   init crafty
   //alert(Crafty);
   Crafty.init(width, height);
   Crafty.canvas.init();
   
   keepAtCenter();
   
   Crafty.scene("menu");
   //Crafty.scene("complete");
   
});