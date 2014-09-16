/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//
//  STAGE START
//    


Crafty.scene("main", function(){

    Crafty.audio.stop();
    //Crafty.audio.play("theme", -1, 0.8);    

    switch (gameLevel){
       case 1:   
           loadMap(mapIntro);
           break;
       case 2:
           loadMap(map2);
           break;
       case 3: 
           loadMap(map3);
           break;
       case 4: 
           loadMap(map4);
           break;
       case 5:
           Crafty.scene("end");
           return;
    }
    
    
    addPoints();
    addCollision();
    
});


