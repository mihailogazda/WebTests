/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var PLAYER_MOVE = 8;
var PLAYER_JUMP = 10;

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

Crafty.c("NewControls", {
    init: function() {
        this.requires('Twoway');
        this.enableControl();
        this.addCustomStates();
        this.twoway(PLAYER_MOVE, PLAYER_JUMP);
    },
    list: null,
    addCustomStates: function(){
        
        this.list = new Array();
        
        //  listen to keys
        this.bind("KeyDown",function(e) {
            
            var key = e.key;
            console.log("Key down: " + key);
            
            //  parse event                       
            this.list.push(e.key);
            
            switch (key){
                case KEY_UP:
                    window.player.setMode("jump");
                    Crafty.audio.play("jump", 1);
                    break;
                case KEY_DOWN:
                    window.player.setMode("crouch");
                    break;
                case KEY_LEFT:
                    window.player.setMode("left");
                    break;
                case KEY_RIGHT:
                    window.player.setMode("side");
                    break;
                default:
                    return;//skip redraw
            }
            
            window.player.drawMode();
        });
        
        this.bind("KeyUp", function(e){
            console.log("Key up: " + e.key + " Length: " + this.list.length);
            this.list.splice(this.list.indexOf(e.key), 1);
            
            var mode = 'undefined';
            for (var key in this.list){                
                var up = this.list[key];
                if (up == KEY_LEFT){
                    mode = "left";
                    break;
                }
                else if (up == KEY_RIGHT){
                    mode = "side";
                    break;
                }
                else if (up == KEY_UP){
                    mode = "jump";
                    break;
                }
            }
            
            window.player.setMode(mode);
            window.player.drawMode();
        });
    }
});