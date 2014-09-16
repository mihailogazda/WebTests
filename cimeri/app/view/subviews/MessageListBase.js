var msgListTemplate = new Ext.XTemplate(    
    "<table class='inboxItem'",
        "<tr>",
            "<td class='inboxItemTop'>",
                "<span class='inboxSender'>" + CLang.FROM + ": <span>{sender}</span></span>",
                "<span class='inboxTimestamp'><span>{timestamp}</span></span>",
            "</td>",
            "<td rowspan=3 class='messageListIndicator'>",
                "<div class='deleteplaceholder' id='deleteplaceholder{id}'></div>",
                "<tpl if='items'>",
                    "<div class='messageCount' id='messagecount{id}'>{items.length}</div>",                    
                "</tpl>",                
            "</td>",
        "</tr>",
        "<tr>",
            "<td>",
                "<span class='inboxTitle'>{title}</span>",
            "</td>",
        "</tr>",
        "<tr>",
            "<td >",
                "<span class='inboxDescription'>{description}</span>",
            "</td>",
        "</tr>",
    "</table>" 
);

Ext.define("Cimeri.view.subviews.MessageListBase", {
    extend: "Ext.List",    
    requires: [
        "Ext.field.Search"
    ],
    config: {
        title: CLang.INBOX_TITLE,
        scrollable: true,
        cls: "messageList",
        itemTpl: msgListTemplate,
        sorted: true,
        padding: 0,
        margin: 0,
        items: [{
            xtype: "searchfield",
            cls: "messageSearch"
        }
        ]
    }    
});