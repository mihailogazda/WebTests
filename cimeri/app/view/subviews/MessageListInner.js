Ext.define("Cimeri.view.subviews.MessageListInner",{
    id: "mainMessageListInner",
    extend: "Cimeri.view.subviews.MessageListBase",
    alias: "widget.messageListInner",
    config: {
        store: "MessagesInner"
    }
});