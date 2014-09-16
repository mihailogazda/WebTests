Ext.define("Cimeri.view.Login", {    
    extend: 'Ext.tab.Panel',
    id: "loginForm",    
    alias: "widget.login",    
    config : {
        tabBarPosition: 'bottom',
        fullscreen: true,
        styleHtmlContent: true,
        items: [
        /**
         * Login view tab
         */            
        {
            title: CLang.LOGIN,  
            iconCls: "user",
            scrollable: true,        
            items: [
            {
                xtype: "component",                
                html: "<div style='text-align: center; margin: 10px;'><img src='resources/images/logo.png'></img></div>"
            },
            {
                margin: 10,
                xtype: 'fieldset',
                items: 
                [
                {                
                    id: 'username',
                    xtype: 'emailfield',
                    label: CLang.EMAIL + ":"
                },
                {
                    id: 'password',
                    xtype: 'textfield',
                    label: CLang.PASSWORD + ":"
                }
                ]
            },        
            {
                margin: 10,
                xtype: "button",
                text: CLang.LOGIN,
                action: "doLogin"                
            },
            {
                margin: 10,
                xtype: "button",
                html: CLang.FORGOT_PASSWORD + "?",
                action: "doForgotPassword"
            },            
            {
                margin: 10,
                xtype: "label",
                html: "<div style='text-align: center; margin-top: 30px;'>" + CLang.CHOOSE_LANGUAGE + ":</div>"                
            },
            {
                xtype: "container",
                scrollable: false,                
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack:  "middle"
                },
                defaults: {
                    margin: 5
                },
                items: [                             
                {
                    xtype: "image",
                    src: "resources/images/flag_en.png",
                    height: 64,
                    width: 64,
                    id: "selectEnglish"
                },
                {
                    xtype: "image",
                    src: "resources/images/flag_hr.png",
                    height: 64,
                    width: 64,
                    id: "selectCroatian"
                },
                {
                    xtype: "image",
                    src: "resources/images/flag_sr.png",
                    height: 64,
                    width: 64,
                    id: "selectSerbian"
                },
                {
                    xtype: "image",
                    src: "resources/images/flag_ba.png",
                    height: 64,
                    width: 64,
                    id: "selectBosnian"
                }]
            }            
            ]
        },
        /**
         * Registracija view tab
         */
        {
            title: CLang.SIGN_UP,
            iconCls: "user_add",
            scrollable: true,
            items: [
            {
                margin: 10,
                title: CLang.ACCOUNT_SETTINGS,
                xtype: "fieldset",
                items: [                        
                {
                    id: "emailText",
                    xtype: "emailfield",
                    label : CLang.EMAIL + ":"
                },
                {
                    id: "passwordText",
                    xtype: "passwordfield",
                    label: CLang.PASSWORD + ":"
                },
                {
                    id: "password2Text",
                    xtype: "passwordfield",
                    label: CLang.CONFIRM + ":"
                }                        
                ]
            },
            {
                margin: 10,
                title: CLang.BASIC_INFO,
                xtype: "fieldset",
                items: [
                {
                    id: "imeText",
                    xtype: "textfield",
                    label: CLang.NAME + ":"
                            
                },
                {
                    id: "prezimeText",
                    xtype: "textfield",
                    label: CLang.SURENAME + ":"
                },                        
                {
                    id: "datumRodjenja",
                    xtype: "datepickerfield",
                    label: CLang.BIRTHDATE + ":"
                }
                ]
            },
            {
                margin: 10,
                title: CLang.LOCATION,
                xtype: "fieldset",
                items: [
                {
                    id: "drzavaCombo",
                    xtype: "selectfield",
                    label: CLang.COUNTRY + ":"
                },
                {
                    id: "gradCombo",
                    xtype: "selectfield",
                    label: CLang.CITY + ":"
                }
                ]
            },
            {
                margin: 10,
                title: CLang.PREFERENCES,
                xtype: "fieldset",
                items: [
                {
                    id: "pusacCombo",
                    xtype: "togglefield",
                    label: CLang.SMOKER + ":",
                    cls : "rightAligned"
                },
                {
                    id: "ljubimacCombo",
                    xtype: "togglefield",
                    label: CLang.PETS + ":",
                    cls : "rightAligned"
                }
                ]
            },
            {
                margin: 10,
                xtype: "button",
                text: CLang.SIGN_UP,
                action: "doRegisterUser",
                ui: "confirm"
            }
            ]
        }
        ]
    }
});