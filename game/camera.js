/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//  kamera
Crafty.c("Camera",{
    defaultY: 0,
    lastMove: 0,
    init: function() {
    },
    camera: function(obj) {
        this.set(obj);
        var that = this;
        
        obj.bind("Change", function(location){
            that.set(obj);
        });
    },
    set: function(obj) {
        
        //  claim player dead when falls below certain point
        if (obj.y >= 300)
            Crafty.scene("playerDied");
        
        //  show 30% left of player
        Crafty.viewport.x = -(obj.x) + (Crafty.viewport.width * 0.3);        
        //  show 35% bottom of player
        Crafty.viewport.y = -obj.y + (Crafty.viewport.height - (Crafty.viewport.height * 0.35));
    }
    
});     