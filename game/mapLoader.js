/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function loadMap(m){
        
    var map = m.map();
    var vsep = 100;
    var hsep = 100;
    var blockWidth = 70;
    var totalWidth = 0;
    var totalHeight = 0;//Crafty.viewport.height;    
        
    gamePointsWanted = m.pointsWanted;
    
    for (var i = map.length - 1; i >= 0; i--){
        var hstart = 0;
        var vstart = totalHeight - vsep;
        totalHeight = vstart;
        var line = map[i];
        if (line.length * 70 > totalWidth)
            totalWidth = line.length * 70;
        
        for (var j = 0; j < line.length; j++){
            
            var draw = null;
            var sel = line[j];                            
            var item = mapIntro.get(sel);
            //if (sel == "?")
            //    alert(item);
            hstart += blockWidth;
            
            //  spaces
            if (typeof(item) == 'undefined'){                    
                continue;
            }
            else if (
                sel == "#" || sel == "~" || sel == "-" || sel == "*" 
                || sel == "@" || sel == "f" || sel == "F" || sel == "c" || sel == "g" || sel == "s" || sel == "b" || sel == "?" || sel == "!"
                ){
                console.log("Spawn '" + sel + "'" + item.src + " to: (x:" + hstart + ", y:" + vstart + "); w:" + item.width + " h: " + item.height);
                
                if (sel == "@"){
                    var r = randomFromInterval(0, item.length - 1);
                    item = item[r];
                }
                
                //  fix for fence                
                var w = item.width, h = item.height;
                var x = hstart, y = vstart;                
                
                if (sel != "#" && sel != "-" && sel != "@" && sel != "*"){
                    var diff = vsep - item.height;
                    console.log("DIF: " + diff);
                    y += diff;                    
                }
                
                if (sel == "*"){
                    diff = blockWidth / 2 - item.width / 2;
                    var vdiff = vsep / 2 - item.height / 2;
                    x += diff;
                    y += vdiff;
                }
                
                draw = Crafty.e("2D, Canvas, Image").attr({
                    x: x,
                    y: y,
                    w: w,
                    h: h
                }).image(item.src);
                
                if (sel == "#" || sel == "-")
                    draw.addComponent("Block, Collision");
                else if (sel == "f" || sel == "F" || sel == "c"){
                    draw.addComponent("Block, Collision");
                }
                else if (sel == "*")
                    draw.addComponent("Coin, Tween");
                else if (sel == "?"){
                    draw.addComponent("Start, Collision");                    
                }
                else if (sel == "!"){
                    draw.addComponent("Exit, Collision");
                }
            }
            else if (sel == "P"){
                draw = Crafty.e("Player").attr({
                    x: hstart,
                    y: vstart
                });
                
                draw.z = 10000;
                //draw.addCollision();
                //addCollision();
                window.player = draw;
                window.camera = Crafty.e("Camera").camera(draw);
                //Crafty.viewport.follow(draw, 0, 0);
            }
            
            //  
            //  console.log(typeof(item));
            
            
            
        }        
    }
    
//alert(totalWidth);
/*
    Crafty.e("2D, Canvas, Color, Collision, FloorDie").attr({
        x: - 2000,
        y: 1000,
        w: totalWidth + 4000,
        h: 1
    }).color("#cdf3f6").collision();
    */
    
// unzoom
//Crafty.viewport.zoom(0.5, 100, 100, 2);
//Crafty.viewport.mouselook(true);
}