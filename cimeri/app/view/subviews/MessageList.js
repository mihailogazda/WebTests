Ext.define("Cimeri.view.subviews.MessageList",{
    id: "mainMessageList",
    extend: "Cimeri.view.subviews.MessageListBase",
    alias: "widget.messageList",
    config: {
        store: "Messages"
    }
});