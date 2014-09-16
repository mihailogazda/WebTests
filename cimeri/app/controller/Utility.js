Ext.define("Cimeri.controller.Utility", {
    extend: "Ext.app.Controller",
    
    _intNotification: null,
    doShowWaitingBox: function(message){
        this.doHideWaitingBox();// hide previous instance if there is one
        var txt = message ? message : CLang.WAIT_MESSAGE;                
        this._intNotification = new Ext.LoadMask(Ext.getBody(), {
            msg:txt            
        });
        this._intNotification.show();
        return this._intNotification;
    },
    doHideWaitingBox: function(){
        if (this._intNotification){
            this._intNotification.hide();
            this._intNotification = null;
        }
    }
    
});