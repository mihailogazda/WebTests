/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Crafty.scene("about", function(){
    Crafty.viewport.x = 0;
    
    var w = 300;
    var h = 30;
    var s = 15;
    
    /*
    //  Crafty Logo
    Crafty.e("2D, Canvas, Image, Mouse").attr({
        x: Crafty.viewport.width - 147 - 30,
        y: 20,
        w: 147,
        h: 90
    }).image("http://craftyengine.com/images/logo.png").bind("Click", function(){
        window.open("http://craftyengine.com/", "_blank");
    });
    */
    
    var topX =(Crafty.viewport.width - w) / 2;
    var topY = (Crafty.viewport.height - h*6) / 2;
    
    
    var txt = "<b>Code & design:</b> Bojan Cup" +
        "<br/><b>Graphics: </b>Creative Attribution 3.0" +
        "<br/><b>Frameworks: </b>Crafty.JS, jQuery";
    
    Crafty.e("2D, DOM, Text, Mouse, Title").attr({
        x: topX,
        y: topY,
        w: 400,
        h: 30
    }).text("About Screen");
    
    topY += h + s ;    
    Crafty.e("2D, DOM, Text, Mouse, Description").attr({
        x: topX,
        y: topY,
        w: 500,
        h: 30
    }).text(txt);
    
    //      
    topY += h + h + h + h + s + s;
    var back = Crafty.e("2D, DOM, Text, Mouse").attr({
        x: topX,
        y: topY,
        w: 300,
        h: 30
    })
    .text("Back to main menu")
    .css({        
        "color" : "orange"
    }).bind("Click", function(){
        Crafty.scene("menu")
        });

    
    var downer = function(e){
        if (e.key == KEY_ENTER)        
            exit();        
    };
    this.bind("KeyDown", downer);
            
    var exit = function(){
        Crafty.unbind("KeyDown", downer);
        Crafty.scene("menu");
    }
});