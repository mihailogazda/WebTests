/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Crafty.c("HUD", {
    _offset: {
        x: 10, 
        y: 10
    },
    init: function () {
        
        //  move to desired spot
        if (this.x >= 0)
        {
            this._offset.x = this.x;
        }
        if (this.y >= 0)
            this._offset.y = this.y;
        
        console.log(this._offset.x + " y: " + this._offset.y);
        
        this._offset = this._offset;
        this.z = 8000;
        this.bind("EnterFrame", function () {
            
            var x = this._offset.x + 40;
            var y = this._offset.y + 3;
            
            if (this.isPointCoin)
            {
                x -= 40;
                y -= 3;
            }
            
            this.attr({
                x: -Crafty.viewport.x + x, 
                y: -Crafty.viewport.y + y
            });
        });
    },
    offset: function (x, y) {
        this._offset = {
            x: x, 
            y: y
        };
        return this;
    }
}); 


Crafty.c("MSG", {
    _offset: {
        x: 10, 
        y: 10
    },
    init: function () {
        
        //  move to desired spot
        if (this.x >= 0)
        {
            this._offset.x = this.x;
        }
        if (this.y >= 0)
            this._offset.y = this.y;
        
        console.log(this._offset.x + " y: " + this._offset.y);
        
        this._offset = this._offset;
        this.z = 8000;
        this.bind("EnterFrame", function () {
            
            var x = this._offset.x ;
            var y = this._offset.y;
            
            this.attr({
                x: -Crafty.viewport.x + x, 
                y: -Crafty.viewport.y + y
            });
        });
    },
    offset: function (x, y) {
        this._offset = {
            x: x, 
            y: y
        };
        return this;
    }
}); 


function addPoints()
{        
    var pointCoin = Crafty.e("DOM, 2D, Image").attr({
        x: 10,
        y: 10            
    }).image(Crafty.asset(assetCoin).src);
    pointCoin.isPointCoin = true;
    pointCoin.addComponent("HUD");

    var points = Crafty.e("LeftPoints, DOM, 2D, Text").attr({
        x: 15,
        y: 10, 
        w: 100, 
        h: 20                
    })
    .text("0").textFont(assetFontBig);//.textColor("#000000", 1); 
    points.addComponent("HUD");
    
    gamePoints = 0;
        
    window.points = points;
}   