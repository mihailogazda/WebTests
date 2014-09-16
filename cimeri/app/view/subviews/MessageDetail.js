Ext.define("Cimeri.view.subviews.MessageDetail", {   
   id: "messageDetail",
   extend: "Ext.Panel",
   alias: "widget.messageDetail",
   cls: "messageDetailPanel",   
   config: {
       //styleHtmlContent: true,
       scrollable: true,
       items: [
       		{
	       		xtype: "container",
	       		cls: "messageDetailTop",
	       		items: [{
	               id: "messageDetailSender",
	               cls: "messageDetailSender",
	               xtype: "container",
	               html: ""
	           },{
	               id: "messageDetailTimestamp",
	               cls: "messageDetailTimestamp",
	               xtype: "container",
	               html: ""
	           }	       		
	       		]	
       		},
           {
               id: "messageDetailTitle",
               cls: "messageDetailTitle",
               xtype: "container",
               html: ""
           },           
           {
               id: "messageDetailDescription",
               cls: "messageDetailDescription",
               xtype: "container",
               html: ""
           }
       ]
   }
});