
var LEMenu = {

    init: function(){
        $("#copyMenu").menu();        

        $("#delete").click(function(){
            console.log("delete");
            
            var i = 0;
            $("#viewport .ui-selected").each(function(){
                LEUtils.removeItem(this);
                i++;
            });

            $("#copyMenu").fadeOut();
        });
        
        $("#copy").click(LEMenu.copyItem);
        $("#incZorder").click(LEMenu.incZorder);
        $("#decZorder").click(LEMenu.decZorder);
        $("#sendToBack").click(LEMenu.sendToBack);
        $("#sendToFront").click(LEMenu.sendToFront);
        
    },
    
    zOrderStart: function(){
        return $("#viewport .ui-selected");
    },
    zOrderEnd: function(){
       $("#copyMenu").fadeOut();
    },
    incZorder: function(){
        console.log("Z order +");
        var el = LEMenu.zOrderStart();  
        var i = LEUtils.itemZIndex++;
        el.each(function(){
           $(this).css("z-index", i);
        });
        LEMenu.zOrderEnd();
    },
    
    decZorder: function(){
        console.log("Z order -");
        var el = LEMenu.zOrderStart();                                
        el.each(function(){
           var i = $(this).css("z-index");
           $(this).css("z-index", Math.max(i - 1, 0));
        });
        LEMenu.zOrderEnd();
    },
    
    sendToFront: function(){
        console.log("Send items to front");
        var el = LEMenu.zOrderStart();    
        var i = LEUtils.itemZIndex++;
        el.each(function(){
           $(this).css("z-index", i);
        });
        LEMenu.zOrderEnd();
    },
    
    sendToBack: function(){
        console.log("Send items to back");
        var el = LEMenu.zOrderStart();    
        el.each(function(){
           $(this).css("z-index", 0);
        });        
        LEMenu.zOrderEnd();        
    },

    copyItem: function(){
        
        var first = true;
        $("#viewport .ui-selected").each(function(){
            var ch = $(this).clone();
            var cho = $(this).position();

            if (first){
                //console.log("FIRST");
                LEUtils.selectInViewport();
                LEUtils.selectDisableOthers = false;
                first = false;
            }

            //console.log(cho);
            var pos = {
                left: cho.left, 
                top: cho.top
            };
            LEUtils.spawnItem(ch, pos, false, true);
            LEUtils.selectInViewport(ch);
        });

        LEUtils.selectDisableOthers = true;
        $("#viewport .ui-selected").addClass("ui-multidraggable");
        $("#copyMenu").fadeOut();
    },

    eventClick: function(){
        LEMenu.rightClickItemPressed++;
    },

    click: function(item) {
        
        if (item == false)
            $("#copyMenu").fadeOut();
        else
        {
            LEMenu.eventClick();

            if (LEMenu.rightClickItem != item || LEMenu.rightClickItemPressed > 1) {
                $("#copyMenu").fadeOut();
                LEMenu.rightClickItemPressed = 0;
            }        
        }
    },

    rightClickItem: null,
    rightClickItemPressed: 0,
    rightClick: function (item, event) {
    
        console.log(event);
        if (event.ctrlKey) return;

        LEMenu.eventClick();
        LEMenu.rightClickItem = event.target;
                
        
        var c = $("#copyMenu");
        if (!c.is(":visible")) {
            c.fadeIn();
        }
        
        var pos = $(item).offset();
        pos.left += $(item).width();
        c.offset(pos);
        
        
        return;
    }

};