Ext.define("Cimeri.controller.Login", {
    extend: "Ext.app.Controller",
    views: ["Login"],
    config : {
        refs: {
            username: "#username",
            password: "#password"
        }
    },
    init: function(){
        this.control({
            "button[action=doLogin]" : {                
                tap: this.doLogin
            },
            "button[action=doRegisterUser]": {
                tap: this.doRegisterUser
            }, 
            "button[action=doForgotPassword]": {
                tap: this.doForgotPassword
            }            
        });
    },
    launch: function(){
        try {
            Ext.get("selectEnglish").on("tap", this.doSelectEnglish);
            Ext.get("selectCroatian").on("tap", this.doSelectCroatian);
            Ext.get("selectSerbian").on("tap", this.doSelectSerbian);
            Ext.get("selectBosnian").on("tap", this.doSelectBosnian);
        } catch (e){
        }
    },
    doLogin: function(){
        console.log("doLogin");
        var username = this.getUsername().getValue();
        var password = this.getPassword().getValue();
        
        if (username != "" && password != "")
        {
            if (username == "Bokica")
            {                
                this.doShowMainForm();
            }
            else
            {
                Ext.Msg.alert(CLang.ERROR, CLang.INVALID_LOGIN);
            }
        }
        else
        {
            Ext.Msg.alert(CLang.ERROR, CLang.EMPTY_LOGIN);
        }
    },
    doShowMainForm: function(){
        var w = Ext.widget("main");
        Ext.getCmp("loginForm").destroy();
        Ext.Viewport.add(w); 
        
        var set = new CSettings();
        set.setLoggedIn(true);
    },
    doRegisterUser: function(){
        console.log("Do register user");
        //alert("registeer");
        this.doShowMainForm();
    },
    doForgotPassword: function(){
        console.log("doForgotPassword");
        Ext.Msg.prompt(CLang.FORGOT_PASSWORD + "?", CLang.FORGOT_PASSWORD_TEXT, function(button, value){
            if (button == "ok" && value != ""){
                Ext.Msg.alert(CLang.SUCCESS, CLang.PASSWORD_RESET_SENT_TEXT);
            }
        },        
        null,
        false,
        null,
        {
            xtype: "emailfield"
        }
        );
    },
    doSelectEnglish: function(){
        console.log("doSelectEnglish");
        global_changeLanguage("EN");
    },
    doSelectCroatian: function(){
        console.log("doSelectCroatian");
        global_changeLanguage("HR");
    },
    doSelectSerbian: function(){
        console.log("doSelectSerbian");
        global_changeLanguage("SR");
    },
    doSelectBosnian: function(){
        console.log("doSelectBosnian");
        global_changeLanguage("BA");
    }
    
});