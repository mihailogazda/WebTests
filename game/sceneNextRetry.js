/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Crafty.scene("nextRetry", function(){
    
   Crafty.background(assetBlankBackground);          
    
    //  first remove player controls    
    Crafty.viewport.x = 0;
    
    var w = 150;
    var h = 30;
    var s = 15;
    
    var topX =(Crafty.viewport.width - w) / 2;
    var topY = (Crafty.viewport.height - h*6) / 2;
    
    //      
    topY += h + s;
    var died = Crafty.e("2D, DOM, Text, Title").attr({
        x: topX,
        y: topY,
        w: w * 2, 
        h: h
    }).text("Level " + gameLevel + " complete!!!").textFont(assetFontBigerBold);    
    //died.addComponent("Color").color("white");      
    Crafty.viewport.centerOn(died, 1);    
    
    
    topY += h + s;
    var newGame = Crafty.e("2D, DOM, Text, Mouse").attr({
        x: topX,
        y: topY,
        w: 200,
        h: 30
    })
    .text("Continue")
    .css({        
        "color": "orange"
    })
    .bind("Click", function(e){doSwitchScene(0);});
    
    newGame.textFont(assetFontBigerBold);
    
    topY += h + 3;
    var help = Crafty.e("2D, DOM, Text, Mouse").attr ({
        x: topX,
        y: topY,
        w: 60,
        h: 30
    }).text("Retry").bind("Click", function(){doSwitchScene(1);});
    Crafty.viewport.centerOn(help, 1);
    
    topY += h + 3;    
    var about = Crafty.e("2D, DOM, Text, Mouse").attr ({
        x: topX,
        y: topY,
        w: 300,
        h: 30
    }).text("Back to main menu").bind("Click", function(){doSwitchScene(2);});
    
    
    iselected = 0;
    
    //  Bind keys
    console.log("MAIN BIND");    
    
    //  change active scene
    function doSwitchScene(iselected) {                    
        //  important - unbind 
        that.unbind("KeyDown", bindCallback);
            
        if (iselected == 2)                
            Crafty.scene("menu");
        else 
        {
            if (iselected == 0){
                ++gameLevel;                
            }
            
            Crafty.scene("main");
        }
        
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
