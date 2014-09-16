Ext.define("Cimeri.store.Ads", {
	extend: "Ext.data.Store",
	config: {
		model: "Cimeri.model.Ad",
		sorters: "title",
		data: [
			{title: "A Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
			{title: "C Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
			{title: "B Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
			{title: "D Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
                        {title: "D Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
                        {title: "E Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
                        {title: "F Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
                        {title: "G Trazim cimera u Boriku", description: "Bla bla bla", image: ""},
                        {title: "H Trazim cimera u Boriku", description: "Bla bla bla", image: ""}
		]
	}
});