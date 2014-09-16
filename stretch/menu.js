/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function setBackground()
{
    Crafty.viewport.x = 0;
    Crafty.viewport.y = -20;
    
    Crafty.background("#64767e");
    Crafty.e("2D, DOM, Image").attr({
        x: 0,
        y: 0,
        h: 320,
        w: 480 * 10
    }).image(assetDir + "menu.png", "repeat-x");    
}

Crafty.scene("menu", function () {
    
 Crafty.load([
            assetDir + "menu.png",
            assetDir + "middle.png",
            assetDir + "tail.png",
            assetDir + "head.png",
            assetDir + "tileset.png",
            assetDir + "tileset.json",
            assetDir + "psy_scream.png",
            assetDir + "psy_slide.png",
            assetDir + "psy_count.png",
            assetDir + "just_psy.png",
            assetDir + "psy_horse.png"
            ], function()  {
    
        setBackground();

        var w = 80; var h = 40;
        var xs = width / 2 - w / 2;
        var ys = 250;

        var play = Crafty.e("2D, DOM, Text, Mouse").attr({
            x: xs,
            y: ys,
            w: w,
            h: h
        }).text("Play now").css({
            "color": "white",
            "fontSize": "18px",
            "fontWeight" : "bold",
            "cursor" : "pointer"
        });

        play.bind("Click", function(){
            console.log("Click");
            
            Crafty.scene("play");            
        });

        ys = height - 20;
        w = 250;
        xs = width / 2 - w / 2;

        var credits = Crafty.e("2D, DOM, Text, Mouse").attr({
            x: xs,
            y: ys,
            w: w,
            h: h
        }).css({
            "color": "white",
            "fontSize": "12px",        
            "cursor" : "default"
        }).text("Developed and designed by Mihailo Gazda 2012");
        
        var psy = Crafty.e("2D, DOM, Image").attr({
            x: width / 2 - 86 / 2,
            y: 150
        }).image(assetDir + "just_psy.png");

        var toggle = false;
        window.setInterval(function(){
            if (!toggle)
                play.css({"color" : "orange"});
            else
                play.css({"color" : "white"});
            toggle = !toggle;
        }, 1000);
    
    
    
    //load-end
    });

});