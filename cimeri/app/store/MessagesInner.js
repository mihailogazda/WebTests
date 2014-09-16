Ext.define("Cimeri.store.MessagesInner", {
    extend: "Ext.data.Store",
    config: {
        model: "Cimeri.model.Message",
        autoLoad: false
    }
});