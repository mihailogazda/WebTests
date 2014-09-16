

var LEFileSystem = {

    init: function(){
    //LEFileSystem.message("HElloo", "BITCH");
    },

    message: function(title, text){
        var el = $("#dialog-modal");                
        el.html(text);
        el.dialog({
            resizable: false,
            draggable: false,
            modal: true,
            buttons: {
                
            }            
        });
        $(".ui-dialog-title").html(title);
    },

    save: function(){
        var sprites = $("#viewport [leType='Sprite']");
        var map = new Array();
        
        sprites.each(function(){
            try {
                var ob = {
                    name: $(this).attr("title"),
                    x: $(this).position().left,
                    y: $(this).position().top,
                    z: $(this).css("z-index"),
                    scaled: false,
                    rotated: false
                };

                map.push(ob);
            } catch (e) { }
        });

        //
        var data = JSON.stringify(map);
        console.log(data);

        $.post("save.php", "data=" + data).success(function(e){
            console.log(e);
            LEFileSystem.message("Your save is ready sir!", "<a href='" + e + "' > Download </a><br/> (or right click - save)");
        });
		
    //LEFileSystem.message("Save data", data);

    },
    load: function(){		
        var el = $("#dialog-modal");        
        el.html("<input id='loadmap' type='file' accept='text/x-component'></input>");
        
        el.dialog({
            modal: true,
            resizable: false,
            draggable: false,            
            buttons: {
                Ok: function() {
                   // var item = $("#loadmap");
                    var item = document.getElementById("loadmap");
                    LEFileSystem.loadFile(item);
                    $( this ).dialog( "close" );
                }
            }
        });

        $(".ui-dialog-title").html("Ahh.. Continue we shall?");
    },
    loadFile: function(item){
        
        var val = item.files[0];
        if (!val){
            console.log("No file to load");
            return;
        }
        
        console.log(val);
        
        var fr = new FileReader();
        if (!fr) {
            LEFileSystem.message("Browser Support Missing", "Your browser has no support for FileReader object used for loading.");
            return;
        }
        
        fr.onloadend = function(e){
            LEFileSystem.generateMap(fr.result);
        };
        fr.readAsText(val);                              
    },
    generateMap: function(value){
                            
        try {
            //console.log(value);
            var v = JSON.parse(value);

            //	remove all
            $("#viewport *").remove();
            var errorCount = 0;

            $(v).each(function(){
                //console.log(this);
                try {		
                    var file = this.name.split(" ").join("");
                    var pos = {
                        left: this.x, 
                        top: this.y
                        };
                        
                    //  clone and spawn
                    var e = $("[elid='" + file + "']").children(":first").clone();                                                                                                    
                    LEUtils.spawnItem(e, pos, this.z);
                }
                catch (e){
                    errorCount ++;
                }
            });
        
            if (errorCount > 0)
                LEFileSystem.message("Some errors", "There were " + errorCount + " errors during the loading. Check error log.");
        }
        catch (e){
            
        }
    }

};