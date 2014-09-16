/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var counter = 3;

Crafty.scene("play", function () {
    
    counter = 3;
    //Crafty.background(getAsset("menu.png"));
    setBackground();
    
    var howToPlay = Crafty.e("2D, DOM, Text, Tween").attr(
    {
        x: 50,
        y: 200,
        w: width - 100,
        h: 80        
    }).css({
        "color" : "white",
        "text-align" : "center",
        "cursor" : "default"
    });
    
    howToPlay.text("Tap Left (<-) and Right (->) keyboard keys as quickly as you can to get the longest dick possible.");
    
    /*
    var note = Crafty.e("2D, DOM, Text, Tween").attr({
        x: width / 2 - 200 / 2,
        y: height - 40,
        w: 200,
        h: 30
    }).css({
        "color" : "white",
        "cursor" : "default"
    });
    */
        
    //note.text("Starting game in " + counter + " seconds");
    
    var int1 = setInterval(function(){
        //note.text("Starting game in " + --counter + " seconds");
        console.log("Counter : " + counter);
        --counter;
        if (counter == 0)
        {
            window.clearInterval(int1);
            howToPlay.tween({
                alpha : 0
            }, 10).bind("TweenEnd", play);
        }
    }, 1000);



    function walkPSY(callback)
    {
        console.log("PSY!!");
        
        var t1;
        var psy = Crafty.e("2D, DOM, Image, Tween, PSY").attr({
            x: width - 30,
            y: 220
        }).image(assetDir + "psy_slide.png").css({
            //"zoom" : "0.8"
        });
        
        psy.tween({
            x: 220
        }, 30).bind("TweenEnd", function(){
            
            t1 = Crafty.e("2D, DOM, Text, Tween").attr({
                x: 225,
                y: 180,
                w: 100,
                h: 20
            }).css({
                "color" : "white", 
                "fontWeight" : "bold",
                "text-align" : "center"
            });
            
            t1.text("Oppa !!!");            
            
            setTimeout(function(){                
                //t1.destroy();
                //t1.text("!!!");
                t1.css({
                    "display" : "none"
                });
                psy.image(assetDir + "psy_scream.png");
                
                var total = 100;
                
                function shake(){
                    if (--total == 0)                    
                    {
                        Crafty.unbind("EnterFrame", shake);                    
                        countdown();
                    }
                    
                    var o = getRandomArbitary(0, 1);
                    if (o == 0)
                        o = -1;                                        
                
                    psy.x = psy.x + getRandomArbitary(0, 3) * o;
                    psy.y = psy.y + getRandomArbitary(0, 3) * o;
                    
                    t1.x = t1.x + getRandomArbitary(0, 3) * o;
                    t1.y = t1.y + getRandomArbitary(0, 3) * o;
                }               
                
                Crafty.bind("EnterFrame", shake);
                
            }, 1000);                        
        });
        
        function countdown()
        {
            psy.x = 220; // reset psy position
            psy.y = 220;
            
            psy.image(assetDir + "psy_count.png");
            t1.css({
                "display" : "block"
            });
            
            t1.x += 10;
            t1.y -= 10;
            
            counter = 4;
            t1.text("Ready!");
            var i1 = setInterval(function(){
                t1.text(--counter);
                if (counter == 0)
                {
                    t1.text("GO!");
                    clearInterval(i1);
                    
                    setTimeout(function(){
                        t1.destroy();
                        psy.image(assetDir + "psy_scream.png");
                        psy.y += 5;
                        callback();
                    }, 500);
                    
                                      
                }
            }, 1000);
        }
    
    }

    
    //  main play
    function play()
    {
        console.log("PLAY!");
        counter = 3;
        
        //  draw the ruler
        var total = width * 10;       
        var xs = 170;
        for (var i = 0; i < total; i += 10)
        {
            Crafty.e("2D, DOM, Color").attr({
                x: i + xs,
                y: height - 10,
                w: 1,
                h: i % 100 == 0 ? 10 : 5
            }).color("#ffffff");
            
            if (i % 100 == 0)
            {
                var psy = Crafty.e("2D, DOM, Text").attr({
                    x: i + xs,
                    y: height,
                    w: 20,
                    h: 20
                }).text(i / 10).css({
                    "color":"white",
                    "fontSize": "8px",
                    "cursor" : "default"
                });                               
            }                    
        }    
        
        //  draw dickaaa
        var middlew = 80;
        var middle = Crafty.e("2D, DOM, Image").attr({
            x: 60,
            y: 230,
            w: middlew,
            h: 48
        }).image(assetDir + "middle.png", "repeat");
       
        var tail = Crafty.e("2D, DOM, Image").attr({
            x: 10,
            y: 200            
        }).image(assetDir + "tail.png");        
        
        var headx = 110;
        var head = Crafty.e("2D, DOM, Image, Tween").attr({
            x: headx,
            y: 218
        }).image(assetDir + "head.png");                
        
        //  WALK PSY then continue game
        walkPSY(function(){
                                                
            var psy = Crafty("PSY");
            var psyx = psy.x;
            
            //Crafty.viewport.follow(head);

            //  points
            var lengthCounter = 0;
            var lengthCounterItem = Crafty.e("2D, DOM, Text").attr({
                x: width - 50,
                y: 30,
                w: 50
            }).text("0 cm").css({ 
                "fontWeight" : "bold", 
                "color" : "white",                       
                "cursor" : "default"
            });

            var globalWidth = 0;
            var increment = 1;
            var lastTimePressed = null;
            var lastCode = 0;
            var canceledDone = true;        

            var timeToPressSomething = 150;

            var timer = setInterval(function(){            
                //console.log("int");
                if (!canceledDone && globalWidth != 0)
                {
                    clearInterval(timer);
                    Crafty.scene("complete");
                }
                canceledDone = false;
            }, timeToPressSomething);

            //  handler
            $("body").keyup(function(key, event){            

                if (key.keyCode == 37 || key.keyCode == 39)
                {
                    if (lastCode == key.keyCode)
                        return;

                    lastCode = key.keyCode;

                    globalWidth += increment;
                    canceledDone = true;
                }

                head.x = headx + globalWidth;                                                
                middle.w = middlew + globalWidth;                                
                psy.x = psyx + globalWidth;

                var l = parseFloat(0.1 * globalWidth).toFixed(2) + " cm";
                lengthCounterItem.text(l);
                globalPointsCounter = l;
            });
            
            function processCameraAndHUD()
            {
                lengthCounterItem.x = width - 50 +  Math.abs(Crafty.viewport.x);
                
                //if (globalWidth > 10)
                    Crafty.viewport.x = -globalWidth;                                                            
            }

            //  float counter item
            Crafty.bind("EnterFrame", processCameraAndHUD);
            
            //  unbind when done
            Crafty.bind("SceneChange", function(data){
                console.log("Changing scene to : " + data.newScene);               
               if (data.newScene != "play")
                   Crafty.unbind("EnterFrame", processCameraAndHUD);
            });
            
        });                
        
      
        
    }



});