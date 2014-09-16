Ext.define("Cimeri.view.subviews.AdDetail",{
	extend: "Ext.Panel",
	alias: "widget.adDetail",        
	config: {            
		title: "AdDetail",
                styleHtmlContent: true,
		tpl: "{title} <br/>{description}"	
	}
});