/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Crafty.c("Player", {
    mode: "undefined",
    init: function(){
        //  manage components
        this.addComponent("NewControls, 2D, Canvas, Image, Collision, Gravity");
        //this.addComponent("WiredHitBox");//for debuging
        
        this.w = 66;
        this.h = 92;        
        
        //  state
        this.mode = "front";
        this.z = 8000;
        this.collision();
        this.gravity("Floor");        
        this.addCustomCollision();
        
        //  draw first mode        
        this.drawMode();                
    },
    setMode: function(mode){
        this.mode = mode;
    },
    drawMode : function(){        
        var mode = this.mode;
        if (mode == this.lastMode)
            return;
        this.lastMode = mode;
        console.log("Switchig player to: " + mode);
        
        if (mode == "jump")
            this.image(Crafty.asset(assetCharacterJump).src);
        else if (mode == "side")
            this.image(Crafty.asset(assetCharacterSide).src);     
        else if (mode == "left")
            this.image(Crafty.asset(assetCharacterSideLeft).src);
        else if (mode == "crouch")
            this.image(Crafty.asset(assetCharacterCrouch).src);
        else                
            this.image(Crafty.asset(assetCharacterFront).src);
    },
    addCustomCollision: function(){
        
        this.onHit("Block", function(hit) {
            for (var i = 0; i < hit.length; i++) {
                if (hit[i].normal.y !== 0) { // we hit the top or bottom of it                    
                    this._up = false;
                    this._down = false;
                }
                if (hit[i].normal.y === -1)//above
                {
                    this._falling = false;
                    this.y = hit[i].obj.y - this.h;
                }                

                if (hit[i].normal.x === 1) { // we hit the right side of it
                    this.x = hit[i].obj.x + hit[i].obj.w;
                }

                if (hit[i].normal.x === -1) { // we hit the left side of it
                    this.x = hit[i].obj.x - this.w;
                }
            }
        });
        
        this.onHit("Platform", function(hit) {            
            for (var i = 0; i < hit.length; i++) {                
                if (hit[i].normal.y !== 0) { // we hit the top of it
                    //console.log("HIT");
                    this._falling = false;
                    this._up = false;
                    this.y = hit[i].obj.y - this.h;
                }
            }
        });
        
    }
});