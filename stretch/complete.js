/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function getRandomArbitary(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


Crafty.scene("complete", function () {
    
    //Crafty.background(getAsset("menu.png"));
    Crafty.viewport.x = 0;
    setBackground();
    
    var w = 80; var h = 40;
    var xs = width / 2 - w / 2;
    var ys = 200;
    
    var po = Crafty.e("2D, DOM, Text").attr({
       x: 50,
       y: ys,
       w: width - 100       
    }).css({
        "color" : "white",
        "textAlign" : "center",
        "fontSize" : "16px",
        "fontWeight" : "bold"
    });
    
    globalPointsCounter = "<p class='gpoints'>" + globalPointsCounter + "</p>";
    
    var pocastiMe = new Array();
    pocastiMe[0] = "You won " + globalPointsCounter + " .. up your ass!";
    pocastiMe[1] = "Wow... " + globalPointsCounter;
    pocastiMe[2] = globalPointsCounter + "? PSY is not impressed!";
    pocastiMe[3] = globalPointsCounter + "... If we shower it will it grow?";
    pocastiMe[4] = globalPointsCounter + "... lol. just lol.";
    pocastiMe[5] = "Score of " + globalPointsCounter + " is not gonna take you to Korea.";
    pocastiMe[6] = "PSY's mother has more than your's " + globalPointsCounter;
    pocastiMe[7] = globalPointsCounter + "? Thats like ... how log PSY's sister is.";
    pocastiMe[8] = globalPointsCounter + "? I guess that IS the standard for Korean male.";
    
    
    var i = getRandomArbitary(0, pocastiMe.length - 1);
    console.log("Printing " + pocastiMe[i] + " " + i);
    
    po.text(pocastiMe[i]);
    
    ys = 250;
    var play = Crafty.e("2D, DOM, Text, Mouse").attr({
        x: xs,
        y: ys,
        w: w,
        h: h
    }).text("Try again").css({
        "color": "white",
        "fontSize": "18px",
        "fontWeight" : "bold",
        "cursor" : "pointer"
    });
    
    play.bind("Click", function(){
        console.log("Click");
        Crafty.scene("play");
    });
    
    ys = height - 20;
    w = 250;
    xs = width / 2 - w / 2;
    
    var credits = Crafty.e("2D, DOM, Text, Mouse").attr({
        x: xs,
        y: ys,
        w: w,
        h: h
    }).css({
        "color": "white",
        "fontSize": "12px",        
        "cursor" : "default"
    }).text("Developed and designed by Mihailo Gazda 2012");
    
    /// psy
    Crafty.e("2D, DOM, Image").attr({
        x: 10,
        y: 200
    }).image(assetDir + "psy_horse.png");
    
    
    var toggle = false;
    window.setInterval(function(){
        if (!toggle)
            play.css({"color" : "orange"});
        else
            play.css({"color" : "white"});
        toggle = !toggle;
    }, 1000);
    


});