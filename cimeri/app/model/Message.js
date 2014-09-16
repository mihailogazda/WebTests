Ext.define("Cimeri.model.Message", {
   extend: "Ext.data.Model",
   config: {
       fields: ["id", "sender", "title", "description", "timestamp"],
       hasMany: { model: "Cimeri.model.Message", name: "items"}
   }
});

Ext.define("Cimeri.model.Message", {
   extend: "Ext.data.Model",
   config: {
       fields: ["id", "sender", "title", "description", "timestamp", "items"]      
   }
});