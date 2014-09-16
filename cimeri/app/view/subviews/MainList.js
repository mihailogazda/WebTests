Ext.define("Cimeri.view.subviews.MainList", {
    id: "mainList",
    extend: "Ext.List",
    alias: "widget.mainList",
    config: {
        title: CLang.MAIN_TITLE,
        scrollable: true,        
        itemTpl: "<div class='pretragaItem'><img src='{image}'></img><div class='pretragaTitle'>{title}</div><div class='pretragaDescription'>{description}</div></div>",
        store: "Ads",
        sorted: true,
        padding: 0,
        margin: 0        
    }
});