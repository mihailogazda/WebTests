/**
 * Main controller class.
 */
Ext.define("Cimeri.controller.Main", {
    extend: "Ext.app.Controller",
    views: ["Main",  "subviews.MainList", "subviews.AdDetail", "subviews.MessageList", "subviews.MessageDetail", "subviews.MessageListBase", "subviews.MessageListInner"],
    models: ["Ad", "Message"],
    stores: ["Ads", "Messages", "MessagesInner"],
    isInboxInternalView: 0,
    inboxInternalRemoves: 0,
    _intActionSheet: null,
    init: function(){
        this.control({
            "button[action=logout]" : {
                tap: this.doLogOut
            },
            "button[action=restart]" :{
                tap: this.doRestart
            },
            "mainList" : {
                select: this.doDisclose
            },
            "messageList" : {
                select: this.doSelectMessage
            },
            "messageListInner" : {
                select: this.doSelectMessage //since messageListInner extends messageListBase the same event applies as messageList
            },
            "#pretragaNavigationView" : {
                back: this.doBackPretraga
            },
            "#inboxNavigationView" : {
                back: this.doBackInbox
            },
            "searchfield" : {
                keyup : this.doSearchUpdate,
                paste: this.doSearchUpdate,
                clearicontap: this.doSearchClear
            },
            "#inboxActionButton" : {
                tap: this.doInboxActionButton
            },
            "[action=doCancelSheet]": {
                tap: this.doHideLastSheet
            },
            "[action=doMessageReply]": {
                tap: this.doMessageReply
            },
            viewport : {
                orientationchange : this.doHandleOrientationChange
            }
        });
    },
    launch: function(){
        //  add handler for orientation changes
        //Ext.Viewport.on('orientationchange', 'doHandleOrientationChange', this, {buffer: 50 });
        
        //  add inbox table item swipe
        var msg = Ext.getCmp("mainMessageList");
        msg.on("itemswipe", this.doSetupRemoveButton);
    },
    doHandleOrientationChange: function(self, newOrientation, width, height){
        console.log("New dim: " + width + " x " + height + " " + newOrientation);
        if (newOrientation == "landscape"){
            
        }
    },
    doSetupRemoveButton: function(dataview, ix, target, record, event, options) {
        if (event.direction == "left") {
            
            var id = 'delItem' + ix;
            
            var del = Ext.create("Ext.Button", {
                id: id,
                ui: "decline",
                text: "Delete",
                cls: "deleteButtonItem",
                handler: function() {
                    record.stores[0].remove(record);                
                }
            });
            
            //  Remove button
            var removeDeleteButton = function() {
                Ext.Anim.run(Ext.getCmp(id), "fade", {
                    out: true,                    
                    autoClear: false,
                    after: function(el){
                        Ext.getCmp(id).destroy();                        
                    }
                });
            };
            
            del.renderTo(Ext.DomQuery.selectNode(".deleteplaceholder", target.dom));
            dataview.on({
                single: true,
                buffer: 250,
                itemtouchstart: removeDeleteButton
            });
            dataview.element.on({
                single: true,
                buffer: 250,
                touchstart: removeDeleteButton
            });
            
        //  setup post code
        }
    },
    doLogOut: function(){
        Ext.Msg.confirm(CLang.LOG_OUT, CLang.LOG_OUT_CONFIRM, function(e){
            if (e == "yes"){
                var set = new CSettings();
                set.setLoggedIn(false);
                global_restartApp();                
            }
        });
    },
    doDisclose: function(list, record){
        Ext.getCmp("pretragaNavigationView").push({
            xtype: "adDetail",
            data: record.data
        });
    },
    doSelectMessage: function(list, record){        
        console.log("doSelectMessage");
        
        var vals = record.get("items");
        console.log(vals);
        
        var store = null;
                
        if (vals instanceof Array){
            console.log("has childs");

            //  Load store
            store = this.getMessagesInnerStore();
            store.setData(vals);
            store.load();                        
            
            //  Create view and push it to the navigationView
            var view = Ext.create("Cimeri.view.subviews.MessageListInner", {
                title: store.data.length + " " + CLang.MESSAGES
            });
            Ext.getCmp("mainMessageListInner").on("itemswipe", this.doSetupRemoveButton);
            Ext.getCmp("inboxNavigationView").push(view);
        }
        else
        {
            var cmp = Ext.create("Cimeri.view.subviews.MessageDetail");            
            
            if (this.isInboxInternalView)
                store = this.getMessagesInnerStore();
            else
                store = this.getMessagesStore();
            
            var idx = parseInt(store.find("id", record.data.id) + 1);
            cmp.config.title = idx + " " + CLang.OF.toLowerCase() + " " + store.data.length;                                    
            
            Ext.get("messageDetailTitle").setHtml(record.get("title"));
            Ext.get("messageDetailSender").setHtml(CLang.FROM + ": <span>" + record.get("sender") + "</span>");
            Ext.get("messageDetailTimestamp").setHtml(CLang.DATE + ": <span>" + record.get("timestamp") + "</span>");
            Ext.get("messageDetailDescription").setHtml(record.get("description"));        
            
            Ext.getCmp("inboxNavigationView").push(cmp);            
            Ext.getCmp("inboxActionButton").show();
        }
        
        //  increment list
        this.isInboxInternalView++;
    },
    doBackPretraga: function(self, options){
        setTimeout(function(){
            Ext.getCmp("mainList").deselectAll(true);
        }, 500);
    },
    doBackInbox: function(self, options){
        var cont = Cimeri.app.getController("Main");
        Ext.getCmp("inboxActionButton").hide();//
        
        setTimeout(function(){
            try {
                if (cont.isInboxInternalView > 1)
                    Ext.getCmp("mainMessageListInner").deselectAll(true);
                else
                    Ext.getCmp("mainMessageList").deselectAll(true);
                cont.isInboxInternalView--;                
            } catch (e){}
        }, 500);
    },
    doRestart: function(){
        console.log("doRestart");
        global_restartApp();
    },
    doSearchUpdate: function(newData){
        console.log("doSearchUpdate: ");
        
        var itemID = newData.getParent().id;
        var store = itemID == "mainMessageListInner" ? this.getMessagesInnerStore() : this.getMessagesStore();
        var empty = itemID ==  "mainMessageListInner" ? true : false;
        
        var val = newData.getValue();        
        console.log("New search : " + val);
        
        store.clearFilter(); //reset last search
        
        if (val){
            store.filterBy(function(rec){
                var toplevel = rec.data.leaf == empty;
                var foundTitle = rec.data.title.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1;
                var foundDesc = rec.data.description.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1;
                if ((foundTitle || foundDesc) && toplevel)
                    return rec;
                return null;
            });
        } else {
            store.filterBy(function(rec){
                return rec.data.leaf == empty;
            });
        }        
    },
    doSearchClear: function(oldData){
        console.log("doSearchClear");
        oldData.getValue = function(){
            return "";
        }//  rewrite object to fix error when calling getValue()
        this.doSearchUpdate(oldData);
    },
    doItemSwipe: function(dataview, ix, target, record, event, options) {
        if (event.direction == "left") {
            var del = Ext.create("Ext.Button", {
                ui: "decline",
                text: CLang.DELETE,
                handler: function() {
                    record.stores[0].remove(record);
                    record.stores[0].sync();
                }
            });
            
            var removeDeleteButton = function() {                
                del.destroy();
            };
            del.renderTo(Ext.DomQuery.selectNode(".deleteplaceholder", target.dom));
            dataview.on({
                single: true,
                buffer: 250,
                itemtouchstart: removeDeleteButton
            });
            dataview.element.on({
                single: true,
                buffer: 250,
                touchstart: removeDeleteButton
            });
        }
    },
    doShowInboxSheet : function(){        
        this.doHideLastSheet();
        this._intActionSheet = Ext.create("Ext.ActionSheet", {
            items: [
            {
                text: CLang.REPLY_MESSAGE,
                action: "doMessageReply",
                iconCls: "reply",
                iconMask: true
            },
            {
                text: CLang.DELETE_MESSAGE,
                iconCls: "delete",
                iconMask: true
            },
            {
                text: CLang.CANCEL,
                action: 'doCancelSheet'
            }            
            ]
        });
        Ext.Viewport.add(this._intActionSheet);
        this._intActionSheet.show();
    },
    doHideLastSheet: function(){
        if (this._intActionSheet){
            this._intActionSheet.hide();
            Ext.Viewport.remove(this._intActionSheet);
        }
    },
    doInboxActionButton : function(){
        this.doShowInboxSheet();
    },
    doMessageReply: function(){
        alert("reply");
    }
});