/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var LEUtils = {
    
    defTileSize: 32,
    setupViewport: function (width, height, tileSize) {
        
        if (!tileSize) tileSize = this.defTileSize;

        //  viewport size init
        $(".viewport").css("width", width * tileSize);
        $(".viewport").css("height", height * tileSize);
                
        //  Add buttons to dynamically generated resizer classes        
        function intAddLayers() {
            $("<p class='collapsed_text'> Layers - collapsed <button id='layers_pin2' class='ui-icon-pin-s'></button></p>").prependTo($(".resizer2-north-closed"));
            l2.bindButton("#layers_pin2", "pin", "north");
        }
        
        function intAddSettings() {
            $("<p class='collapsed_text'> Settings - collapsed <button id='settings_pin2' class='ui-icon-pin-s'></button></p>").prependTo($(".resizer2-south-closed"));  
            l2.bindButton("#settings_pin2", "pin", "south");          
        }

        function intAddToolbar() {
            $("<p class='collapsed_text'> Toolbar - collapsed <button id='toolbar_pin' class='ui-icon-pin-s'></button></p>").prependTo($(".ui-layout-resizer-north-closed"));
            l.bindButton("#toolbar_pin", "pin", "north");
        }
    
        function intAddSidebar() {
            $("<button id='sidebar_pin' class='ui-icon-pin-s'> </button> <p class='collapsed_text'>  Sidebar - collapsed </p>").prependTo($(".ui-layout-resizer-east"));
            l.bindButton("#sidebar_pin", "pin", "east");
        }    

        //  setup layout
        var l = $("body").layout({            
            livePaneResizing: true,
            showErrorMessages:  false,
            stateManagement__enabled: true,  //autosave / load UI state 
            spacing_closed: 24,
            north__resizable: false,            
            south__resizable: false,
            south__closable: false,            
            east__initClosed: false,            
            stateManagement__cookie__name: "main.view",
            north__onclose_end: function(){             
                if (!$(".ui-layout-resizer-north-closed .collapsed_text").length)
                    intAddToolbar();
            },
            east__onclose_end: function(){             
                if (!$(".ui-layout-resizer-east-closed .collapsed_text").length)
                    intAddSidebar();
            },
            east__onopen_end: function(){
                //alert("END");
                setTimeout(function(){
                    if (l2.state.north.isClosed)
                        intAddLayers();
                    if (l2.state.south.isClosed)
                        intAddSettings();
                }, 500);
            }
        });
        l.bindButton("#east_pin", "pin", "east");
        l.bindButton("#north_pin", "pin", "north");
        
        if (l.state.north.isClosed)
            intAddToolbar();
        if (l.state.east.isClosed)
            intAddSidebar();
        
        var l2 = $("#right").layout({
            livePaneResizing: true,
            stateManagement__enabled: true,  //autosave / load UI state 
            resizerClass: "resizer2",
            center__resizable: true,
            center__closable: true,
            south__resizable: true,
            spacing_closed: 30,
            contentSelector: ".body",
            north__resizable: true,
            stateManagement__cookie__name: "side.bar",
            north__onclose_end: function(){             
                if (!$(".resizer2-north-closed .collapsed_text").length)
                    intAddLayers();
            },
            south__onclose_end: function(){             
                if (!$(".resizer2-south-closed .collapsed_text").length)
                    intAddSettings()();
            }
        });
        
        l2.bindButton("#layers_pin", "pin", "north");
        l2.bindButton("#settings_pin", "pin", "south");
        
        var layersClosed = l2.state.north.isClosed;
        var settingsClosed = l2.state.south.isClosed;
        
        if (layersClosed)
            intAddLayers();                    
        
        if (settingsClosed)
            intAddSettings();                          

        //  disables tooltip on items copied from resources
        $("document [class !='viewport']").tooltip();
        
        LEUtils.setupKeyboard();

    },

    tiltItem: function(value){
        $("#viewport .ui-selected").each(function(){
            var o = $(this).offset();
            o.left += value.left;
            o.top += value.top;
            $(this).offset(o);
        });
    },

    setupKeyboard: function(){

        //  capture copy and delete
        $("html").keyup(function(event){
            if((event.keyCode == 8 || event.keyCode == 46)) {
                LEUtils.removeItem($("#viewport .ui-selected"));
                console.log("keyup delete");
            }
            else if ((event.keyCode == 67 /*c*/)){
                console.log("Copy");
                LEMenu.copyItem();
            }            
        });

        $("html").off("keydown");
        $("html").keydown(function(event){

            if (event.keyCode > 36 && event.keyCode < 41){
                event.preventDefault();                                

                if (event.keyCode == 39)   //  right            
                    LEUtils.tiltItem({left: 1, top: 0});
                if (event.keyCode == 40)   //  downs            
                    LEUtils.tiltItem({left: 0, top: 1});        
                if (event.keyCode == 38)   //  up
                    LEUtils.tiltItem({left: 0, top: -1});
                if (event.keyCode == 37)   //  left
                    LEUtils.tiltItem({left: -1, top: 0});                
            }        
        });
    },

    selectionSetup: false,
    setupSelection: function (val) {
        if (!LEUtils.selectionSetup) {            
            LEUtils.selectionSetup = true;
            
            $("#viewport")
            .selectable({
                distance: 1,
                cancel: {                    
                },
                selected: function (e, ui) {                    
                    console.log(ui);
                    $(ui.selected).addClass("ui-multidraggable");
                },
                unselected: function (e, ui) {
                    console.log("UNSELECTED");
                    $(ui.unselected).removeClass("ui-multidraggable");
                }
            });
            
            //  MOUSE CLICK
            $("#viewport").click(LEUtils.viewportClick);
        }
    },
    
    viewportClick: function(event, ui){
        /*has resource selected and ctrl click or viewport in insert*/
        if (LEUtils.viewportInsertMode) {                                    
            
            var val;
            val = $("#resources .ui-selected");
            
            var leftScroll = $("#left").scrollLeft();            
            
            val.each(function(){
                var pos = {
                    //left: event.offsetX,
                    //top: event.offsetY
                    left: event.pageX + leftScroll,
                    top: event.pageY - $("#viewport").offset().top//event.clientY - ($(".header").height() + $(".footer").height())
                };
                                
                
                //console.log(this);
                
                var item = $(this).children(":first").clone();               
               
                var w = $(item).width();
                var h = $(item).height();                
                
                pos.left -= w / 2;
                pos.top  -= h / 2;                            
                
                //  calculate scroll
                
                
                console.log("Spawn @ " + pos.left + "x" + pos.top);
                
                LEUtils.spawnItem(item, pos);
            });
            
            return;
        }
        
        if ($(event.target).attr("id") == "viewport") {
            console.log("Clear");
            LEUtils.selectInViewport();
            LEMenu.click(false);
        }
        return;
    },
    
    setupRightColumn: function () {
        
        var acc = $("#accordion").accordion({                
            fillSpace: true,             
            multiple: true
        });
        
        //  timeout the resize so page height will be set correctly
        $(window).resize(function(){
            console.log("RESIZE accordion");
            setTimeout(function(){
                acc.accordion( "resize" );
            }, 200);
        });
        
        $("#accordion")
        .bind("contextmenu", function () {
            return false;
        });
        
        //  now load tileset
        LEUtils.loadTileset();
                
    },
    
    loadTileset: function(){
        //  load elements from tileset
        console.log("Loading tileset");
        var tileset = $(tilesetJSON.frames);
        tileset.each(function () {
            //console.log(this);
            var filename = this.filename;
            var rect = this.frame;
            var h = this.spriteSourceSize.h;
            var w = this.spriteSourceSize.w;
            
            //  Skip retina (should be optional)
            if (filename.indexOf("@2x") != -1) return;
            
            //console.log("h : " + h + " W: " + w);
            var li = document.createElement("li");
            var img = document.createElement("div");
            
            var id = filename.split(" ").join("");
            $(li)
                .html("" /*filename*/ )
                .css("margin", 5)
                .attr("elID", id)
                .appendTo("#resources");
            
            $(img)
                .attr("title", filename)
                .css("background-image", "url(./res/tileset.png)")
                .css("background-position-x", -rect.x)
                .css("background-position-y", -rect.y)
                .attr("id", id)
                .width(w)
                .height(h)
                .appendTo(li);
        });
        
        $("#resources").selectable({
            filter: "li"
        });
    },
    
    setupRightClick: function () {

        $(".left")
        .bind("contextmenu", function (e) {
            return false;
        });            
        $("#viewport")
        .bind("contextmenu", function (e) {
            return false;
        });
    },
    
    scaleViewport: function (value) {
        /*
       $("#viewport").css({ 
            //'-webkit-transform': 'scale(' + value + ')',
            //'-moz-transform': 'scale(' + value + ')'
            "zoom" : value
        });       
        */
       $("#viewport").transform({
           scale: value
       });
    },
    
    viewportScale: 1,
    viewportStep: 0.3,
    viewportInsertMode: false,
    
    setupInsertMode: function(){
        console.log("Insert mode active");
        LEUtils.viewportInsertMode = true;

        $("#viewport *").each(function(){
            $(this).addClass("insertMode");
            $(this).removeClass("ui-selected");
        });
    },
    setupSelectMode: function(){
        console.log("Selection active");
        LEUtils.viewportInsertMode = false;

        $("#viewport *").each(function(){
            $(this).removeClass("insertMode");                
        });
    },
    
    setupToolbarItems: function () {
        var that = this;
        
        $("#header #group1").buttonset();
        
        $("#header #select").click(function (event) {
            LEUtils.setupSelectMode();
        });
        
        $("#header #insert").click(function (event) {
            LEUtils.setupInsertMode();
        });
        
        $("#scaleSlider").slider({
            min: 0.3,
            max: 2,
            value: 1,
            step: 0.1,
            change: function (event, ui) {
                console.log(ui.value);
                LEUtils.scaleViewport(ui.value);
            }
        });
        
        $("#resetScale")
            .button()
            .click(function () {
                console.log("ResetScale click");
                LEUtils.scaleViewport(1);
            });

        $("#saveButton")
            .button()
            .click(function(){
                console.log("Save click");
                LEFileSystem.save();
            });

        $("#loadButton")
            .button()
            .click(function(){
                console.log("Load click");
                LEFileSystem.load();
            });            
    },
    
    selectDisableOthers: true,
    selectInViewport: function (item) {
        
        //  skip selection if in insert mode
        if (LEUtils.viewportInsertMode)
            return;

        //  click item
        LEMenu.click(item);

        //  disable all
        if (LEUtils.selectDisableOthers) {
            $(".viewport .ui-selected")
            .removeClass("ui-selected");
            $(".viewport .ui-multidraggable")
            .removeClass("ui-multidraggable");
        }

        //
        if (item) {
            $(item).addClass("ui-selected");
        }
    },

    elementList: null,
    addElement: function (element) {
        
        //console.log("ad l");
        if (!LEUtils.elementList) {
            LEUtils.elementList = new Array();
            $("#layers")
            .selectable({
                stop: function () {
                    //console.log();
                    var layers = $("#layers .ui-selected");
                    if (layers.length > 1) LEUtils.selectDisableOthers = false;
                    layers.each(function () {
                        //console.log("layer " + this);
                        LEUtils.selectInViewport($("#" + $(this).attr("leID")));
                    });
                    LEUtils.selectDisableOthers = true;
                },
                unselected: function (e, ui) {}
            });
        }
        
        //  set unique ID
        var value = $(element).attr("leType");
        var itemID = value + LEUtils.elementList.length;                       
        $(element).attr("leID", itemID);

        //  add to list
        LEUtils.elementList.push(itemID);
        
       //  update list
       this.refreshLayers();
    },
    
    refreshLayers: function(){
        
        $("#layers *").remove();
        for (var i = 0; i < this.elementList.length; i++){            
            var text = this.elementList[i];
            
            var e = document.createElement("li");
            $(e).html(text).bind("contextmenu", function(){}).appendTo($("#layers")); 
        }
        
    },
    
    removeItem: function(item){
        var id = $(item).attr("leID");
        var i = this.elementList.indexOf(id);
        console.log(id + "  " + i);
        
        this.elementList.splice(i, 1);
        $(item).remove();
        
        this.refreshLayers();
    },
    
    itemZIndex: 0,
    spawnItem: function (e, pos, z, skipZ) {        

        $(e)
            .attr("leType", "Sprite")            
            .css("position", "absolute")
            .css("display", "block")        
            .multidraggable({
                grid: [this.defTileSize, this.defTileSize]
            })
            .click(function (event) {
                var m = $("#viewport .ui-selected");
                if (m.length > 1) {
                    //  fix for draggable 
                    m.each(function () {
                        $(this)
                        .addClass("ui-multidraggable");
                    });
                    return;
                }
                LEUtils.selectInViewport(e);                            
            })
            .bind("contextmenu", function (event) {
                LEMenu.rightClick(e, event);
            });
        
        //  z correction
        if (!skipZ) {
            $(e).css("z-index", z ? z : LEUtils.itemZIndex++);
            if (z)
                LEUtils.itemZIndex = Math.max(LEUtils.itemZIndex, z);
        }        
        
        //  add to side bar layers
        LEUtils.addElement(e);

        if (pos) {
            //$(e).position(pos); - position setter does not exist
            $(e).css("left", pos.left).css("top", pos.top);
        }
        
        $(e).appendTo(viewport);
    },
    
    spawnSprite: function (name) {        
        var e = document.createElement("img");
        $(e).attr("src", name);
        LEUtils.spawnItem(e);
    }
};