/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Crafty.scene("help", function(){
    Crafty.viewport.x = 0;
    
    var w = 300;
    var h = 30;
    var s = 15;
    
    var topX =(Crafty.viewport.width - w) / 2;
    var topY = (Crafty.viewport.height - h*6) / 2;
    
    Crafty.e("2D, DOM, Text, Mouse, Title").attr({
        x: topX,
        y: topY,
        w: 400,
        h: 30
    }).text("Help Screen");
    
    
    topY += h + s;
    
    var txt = "Move player using following keys:" +
        "<br/><b>Up/W:</b> Jump" +
        "<br/><b>Left/A:</b> Run left" +
        "<br/><b>Right/D:</b> Run left" +
        "<br/><b>Down/S:</b> Crouch"
    ;
    
    var bc = Crafty.e("2D, DOM, Text, Mouse, Description").attr({
        x: topX,
        y: topY,
        w: 600,
        h: 200
    })
    .text(txt).css({
        "font-size": "12px"
    });
    //bc.textFont(fontSizeNormal);
    
    //      
    topY += 200 + s;
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