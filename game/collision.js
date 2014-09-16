/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

    
// Collision Code for coins
function addCollision()
{        
    var player = window.player;            
    
    console.log("Adding collision to Coins");
    player.hitPoints = 0;    
    player.onHit("Coin", function(target){        
        var o = target[0].obj;
        if (!o.nohits){            
            o.nohits = true;            
            o.tween({
                alpha: 0,
                y: this.y - 15,
                rotate: 250
            }, 50);
            window.points.text(++gamePoints + "");
            Crafty.audio.play("coin", 1, 0.5);            
        }
    });     
    
            
    function sayHowMuchIsWanted(target){               
        var o = target[0].obj;
        if (!o.nohits){            
            o.nohits = true;
            
            //    
            var txt = 
                "<b>Level " + gameLevel + "</b><br />" + 
                "Collect <b>" + gamePointsWanted + "</b> coins in order to complete this level.";
            
            var elem = Crafty.e("DOM, 2D, Text").attr({
                x: craftyHeight / 2, 
                y: 130,
                w: 500,
                h: 60,
                alpha: 0
            }).text(txt).textFont(assetFontBig);
            elem.addComponent("MSG, Tween");
            
            elem.tween({
                alpha: 1
            }, 50);
            
            setTimeout(function(){
                o.nohits = false;
                elem.tween({
                    alpha: 0                    
                }, 50);
            }, 5000);                                            
        }
    }    
    
    player.onHit("Start", sayHowMuchIsWanted);
    
    
    player.onHit("Exit", function(target){        
        var o = target[0].obj;
        if (!o.nohits){                        
            
            console.log("Game points: " + gamePoints + " / " + gamePointsWanted);            
            if (gamePoints < gamePointsWanted)
            {
                //    Show error message
                o.nohits = false;
                sayHowMuchIsWanted(target);                                            
            }
            else
            {
                o.nohits = true;
                Crafty.scene("nextRetry");
            }            
        }
    });       
}   
