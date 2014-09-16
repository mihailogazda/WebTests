/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Crafty.scene("playerDied", function(){
    
    Crafty.background(assetBlankBackground);
    Crafty.audio.stop();
    Crafty.audio.play("rockShit", -1, 0.7);
    
    
    var w = 400;
    var h = 30;
    var s = 15;
    
    //alert(Crafty.viewport.width);
    var topX =(Crafty.viewport.width - w) / 2;
    var topY = (Crafty.viewport.height - h) / 2;                   
    
    //black background with some loading text
    var died = Crafty.e("2D, DOM, Text, Title").attr({
        x: topX,
        y: topY,
        w: w, 
        h: h
    }).text("Hm, looks like you died...").textFont(assetFontBigerBold);    
    //died.addComponent("Color").color("white");      
    Crafty.viewport.centerOn(died, 1);
    
    topY += h + s;
    this.retry = Crafty.e("2D, DOM, Text, Mouse").attr ({
        x: topX,
        y: topY,
        w: w,
        h: h
    }).text("Retry").css({        
        "color":"orange"
    }).bind("Click", function(){
        exit(0)
        });
    
    topY += h + 3;
    this.cancel = Crafty.e("2D, DOM, Text, Mouse").attr ({
        x: topX,
        y: topY,
        w: w,
        h: h
    }).text("Back to main menu").bind("Click", function(){
        exit(1)
        });
    
    
    
    iselect = 0;    
    function exit(iselect){
        Crafty.unbind("KeyDown", bindKey);
        if (iselect == 0){
            console.log("Switching to main");
            Crafty.scene("main");
        }
        else{                
            console.log("Switching to mainMenu");
            Crafty.scene("menu");
        }        
    }
    
    //  Bind keys
    console.log("BIND DIED");
    var bindKey = function(e) {
        if (e.key == KEY_DOWN)
        {
            iselect = 1;
            this.retry.css({
                "color":"white"
            });
            this.cancel.css({
                "color":"orange"
            });
        }
        else if (e.key == KEY_UP)
        {
            iselect = 0;
            this.retry.css({
                "color":"orange"
            });
            this.cancel.css({
                "color":"white"
            });
        }
        else if (e.key == KEY_ENTER){
            exit(iselect);
        }
    }
    
    this.bind("KeyDown", bindKey);
    
});
