Ext.define("Cimeri.view.Main", {    
    extend: 'Ext.tab.Panel',
    alias: "widget.main",
    requires: [
    'Ext.TitleBar',
    'Ext.Video',
    "Ext.List",
    "Ext.navigation.View"
    ],
    config: {
        id: "mainForm",
        tabBarPosition: 'bottom',
        styleHtmlContent: false,

        items: [
        {
            id: "pretragaNavigationView",
            title: CLang.MAIN_TITLE,
            iconCls: 'find',
            flex: true,
            
            xtype: "navigationview",
            navigationBar: {
                items: [
                {
                    //text: 'home',
                    align: 'right', 
                    iconCls: 'search',                    	                       
                    iconMask: true
                },
                {
                    align: "left",
                    iconCls: "refresh",
                    iconMask: true
                }
                ]
            }, 
            styleHtmlContent: true,
            scrollable: false,

            items: [
            {
                xtype: "mainList"
            }
            ]
        },
        {
            id: "inboxNavigationView",
            title: CLang.INBOX_TITLE,
            iconCls: "chat",
            
            xtype: "navigationview",
            styleHtmlContent: true,
            navigationBar: {
                items: [
                {
                    id: "inboxActionButton",
                    align: 'right',
                    iconCls: "action",
                    iconMask: true,
                    hidden: true
                }
                ]
            },
            items: [
            {
                xtype: "messageList"
            }
            ]
        },
        {
            title: CLang.MY_ADS_TITLE,
            iconCls: "nodes2",
            items: [
            {
                docked: "top",
                xtype: "titlebar",
                title: CLang.MY_ADS_TITLE                 
            }                
            ]
        },
        {
            title: CLang.SETTINGS_TITLE,
            iconCls: "settings7",            
            cls: "settingsTab",            
            scrollable: true,            
            items: [
            {
                docked: "top",
                xtype: "titlebar",
                title: CLang.SETTINGS_TITLE
            },
            {
                margin: 10,
                xtype: "button",
                text: "Restart",
                action: "restart"
            },
            {
                margin: 10,
                xtype: "button",
                text: "Log out",
                action: "logout",
                ui: "decline"
            }
            ]
        }
        ]
    }
});
