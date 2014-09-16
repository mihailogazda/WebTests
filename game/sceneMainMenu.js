/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Crafty.scene("menu", function(){
        
    Crafty.background(assetBlankBackground);          
    Crafty.audio.stop();
    
    //  first remove player controls    
    Crafty.viewport.x = 0;
    
    var w = 150;
    var h = 30;
    var s = 15;
    
    var topX =(Crafty.viewport.width - w) / 2;
    var topY = (Crafty.viewport.height - h*6) / 2;
    
    //      
    topY += h + s;
    var newGame = Crafty.e("2D, DOM, Text, Mouse").attr({
        x: topX,
        y: topY,
        w: 200,
        h: 30
    })
    .text("New game")
    .css({        
        "color":"orange"
    })
    .bind("Click", function(e){doSwitchScene(0);});
    
    newGame.textFont(assetFontBigerBold);
    
    topY += h + 3;
    var help = Crafty.e("2D, DOM, Text, Mouse").attr ({
        x: topX,
        y: topY,
        w: 60,
        h: 30
    }).text("Help").bind("Click", function(){doSwitchScene(1);});
    Crafty.viewport.centerOn(help, 1);
    
    topY += h + 3;
    var about = Crafty.e("2D, DOM, Text, Mouse").attr ({
        x: topX,
        y: topY,
        w: 75,
        h: 30
    }).text("About").bind("Click", function(){doSwitchScene(2);});
    
    
    iselected = 0;
    
    //  Bind keys
    console.log("MAIN BIND");    
    
    //Crafty.audio.play("rockShit", -1);
    //Crafty.audio.stop("theme");
    //Crafty.audio.play("theme", -1);
    
    //  change active scene
    function doSwitchScene(iselected) {                    
        //  important - unbind 
        that.unbind("KeyDown", bindCallback);
            
        if (iselected == 0)                
        {
            gameLevel = 1;
            Crafty.scene("main");            
        }
        else if (iselected == 1)
            Crafty.scene("help");  
        else if (iselected == 2)
            Crafty.scene("about");        
    }
    
    //  callback for keydown
    var that = this;    
    var bindCallback = function(e){        
        
        if (e.key == KEY_DOWN)
            ++iselected;
        else if (e.key == KEY_UP)
            --iselected;
        
        if (iselected < 0)
            iselected = 0;
        else if (iselected > 2)
            iselected = 2;
        
        console.log(e.key + "  sel: " + iselected);
        
        if (e.key == KEY_ENTER)
          doSwitchScene(iselected);
        
        //  reset
        newGame.css({            
            "color": "white"
        });
        help.css({            
            "color": "white"
        });
        about.css({           
            "color": "white"
        });
                
        switch (iselected){
            case 0:
                newGame.css({                    
                    "color":"orange"
                });
                break;
            case 1:
                help.css({
                    "color":"orange"
                });
                break;
            case 2:
                about.css({
                    "color":"orange"
                });
                break;
        }
    }
    
    //  bind 
    this.bind("KeyDown", bindCallback);
        
});
