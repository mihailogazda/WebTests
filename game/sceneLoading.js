/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//the loading screen that will display while our assets load
Crafty.scene("loading", function () {
    
    //  clear background
    Crafty.background(assetBlankBackground);

    //  Load assets
    function loadAssets(){
    
        Crafty.load([
            assetWorld,
            assetWater,
            assetFloor,
            assetCloud,
            assetCloud2,
            assetCloud3,
            assetGround,
            assetPlayer,                                            
            assetBlock,
            assetCharacterSide,
            assetCharacterFront,
            assetCharacterJump,
            assetCharacterSideLeft,
            assetCharacterCrouch,
            assetCoin,
            assetFence,
            assetFenceBroken,
            assetCrate,
            assetGrass,
            assetShroom,
            assetBush,
            assetExit,
            assetStart
            ], 
        
            function () {                                

                //  sounds
                Crafty.audio.add("rockShit", "platformer/sound/rockshit.ogg");
                Crafty.audio.add("theme", "platformer/sound/POL-stable-boy-short.wav");
                Crafty.audio.add("baby", "platformer/sound/oh_baby.mp3");
                Crafty.audio.add("coin", "platformer/sound/coin.mp3");
                Crafty.audio.add("jump", "platformer/sound/phaseJump1.mp3");
                //Crafty.audio.play("theme", -1);
                //Crafty.audio.play("rockShit", -1);
                
                                            
                window.setTimeout(function(){
                    //clear loading
                    window.clearInterval(window._loadticker);
                    
                    //Crafty.scene("main"); //when everything is loaded, run the main scene
                    //Crafty.scene("playerDied"); //when everything is loaded, run the main scene                    
                    
                    //Crafty.scene("nextRetry");                    
                    Crafty.scene("menu");
                    //Crafty.scene("end");
                }, 1000);

            });
    }
    
    function tick(){        
        ++window._loadi;        
        var txt = "Loading";
        for (var i = 0; i < window._loadi; i++)
            txt += ".";
        window._loadt.text(txt);
        
        if (window._loadi >= 3)
            window._loadi = 0;
    }

    var w = 80;
    var h = 20;

    //black background with some loading text
    var loading = Crafty.e("2D, DOM, Text, LoadingText").attr({
        w: w, 
        h: h, 
        x: (Crafty.viewport.width - w) / 2,
        y: (Crafty.viewport.height - h) / 2
    })
    .text("Loading...").textFont(assetFontBiger);
    
    window._loadi = 0;
    window._loadt = loading;   
    window._loadticker = window.setInterval(tick, 300);
        
    loadAssets();
});

//automatically play the loading scene
//Crafty.scene("loading");