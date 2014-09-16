/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var gameLevel = 1;
var gamePoints = 0;
var gamePointsWanted = 10;

var craftyWidth = 1000;
var craftyHeight = 600;

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

window.onload = function () {
    //start Crafty
    Crafty.init(craftyWidth, craftyHeight);
    Crafty.canvas.init();
    
    //Crafty.init();
    //Crafty.canvas.init();

    //  attach centerMe funct to jQuery
    $.fn.centerMe = function () {
                this.css("top", Math.max(0, ((jQuery(window).height() - this.outerHeight()) / 2) + jQuery(window).scrollTop()) + "px");
                this.css("left", Math.max(0, ((jQuery(window).width() - this.outerWidth()) / 2) + jQuery(window).scrollLeft()) + "px");
                return this;
            };
    
    //  center and keep scene centered    
    $(window).resize(function(){
        $("#cr-stage").centerMe();
    });
    $("#cr-stage").centerMe();
    
    if (Crafty.mobile)
    {
        //Known issues on retina:
        //https://github.com/craftyjs/Crafty/issues/340
        //document.getElementById("viewport").setAttribute("content", "initial-scale=0.5; maximum-scale=0.5; user-scalable=0;");
        //viewport = document.querySelector("meta[name=viewport]");
        //viewport.setAttribute('content', 'width=device-width; initial-scale=0.5; maximum-scale=0.5; user-scalable=0;');
        //viewport.setAttribute('content', 'width=640');
    }
    
    //  Load game    
    Crafty.scene("loading");   
};
