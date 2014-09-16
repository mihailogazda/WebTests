var intmsgdata = {    
    items: [
    {
        id: 2, 
        sender: "Mihailo Gazda", 
        title: "B Oglas iz ", 
        description: "Pozdrav, ja bi ako nema problema lijepo sjeo i druzio se malo sa vama. Ja sam ipak ludjak kojeg nije tako lako sjebati - ono sta da ti kazem majka nije ni meni nesto lako ipak i ja se mucim sa ovim svim i ipak ucim nove stvari. ako je neko vec dovde stigo nek zna da je ovo za potrebe testiranja i da nisam sludio. skroz.", 
        timestamp: "10.01.2012", 
        items: [
        {
            id: 21, 
            sender: "Mihailo Gazda", 
            title: "B Oglas iz ", 
            description: "E buraz znas kako...", 
            timestamp: "10.01.2012",
            leaf: true
        },
        {
            id: 22, 
            sender: "Mihailo Gazda", 
            title: "B Oglas iz ", 
            description: "E mislim da mi je to skupo.", 
            timestamp: "10.01.2012",
            leaf: true
        }
        ]
    },

    {
        id: 1, 
        sender: "Obrenenovic Ognjen", 
        title: "C Oglas iz ", 
        description: "Pusi ga sisooooo!", 
        timestamp: "15.02.2012"        
    },

    {
        id: 3, 
        sender: "Zorka Lazic", 
        title: "D Oglas iz ", 
        description: "E majka ako si za mozemo", 
        timestamp: "02.05.2012"        
    },

    {
        id: 4, 
        sender: "Obrenenovic Milutinovic Krsh", 
        title: "R Oglas iz vase najdraze drzave i grada za iznajmljivanje.", 
        description: "Pozdrav, ja bi ako nema problema lijepo sjeo i druzio se malo sa vama. Ja sam ipak ludjak kojeg nije tako lako sjebati - ono sta da ti kazem majka nije ni meni nesto lako ipak i ja se mucim sa ovim svim i ipak ucim nove stvari. ako je neko vec dovde stigo nek zna da je ovo za potrebe testiranja i da nisam sludio. skroz.", 
        timestamp: "15.02.2012"        
    },
    {
        id: 5, 
        sender: "Obrenenovic Krsh Milutinovic Zozon", 
        title: "Pitanje za stan koji prodajete gore iznad pijace u BL", 
        description: "Pozdrav, ja bi ako nema problema lijepo sjeo i druzio se malo sa vama. Ja sam ipak ludjak kojeg nije tako lako sjebati - ono sta da ti kazem majka nije ni meni nesto lako ipak i ja se mucim sa ovim svim i ipak ucim nove stvari. ako je neko vec dovde stigo nek zna da je ovo za potrebe testiranja i da nisam sludio. skroz.", 
        timestamp: "14.02.2012",
        items: [
            
        {
            id: 51, 
            sender: "Obrenenovic Ognjen", 
            title: "C Oglas iz ", 
            description: "Pusi ga sisooooo!", 
            timestamp: "15.02.2012",
            leaf: true
        },

        {
            id: 52, 
            sender: "Zorka Lazic", 
            title: "D Oglas iz ", 
            description: "E majka ako si za mozemo", 
            timestamp: "02.05.2012",
            leaf: true
        },
        {
            id: 53, 
            sender: "Mihailo Gazda", 
            title: "B Oglas iz ", 
            description: "Pozdrav, ja bi ako nema problema lijepo sjeo i druzio se malo sa vama. Ja sam ipak ludjak kojeg nije tako lako sjebati - ono sta da ti kazem majka nije ni meni nesto lako ipak i ja se mucim sa ovim svim i ipak ucim nove stvari. ako je neko vec dovde stigo nek zna da je ovo za potrebe testiranja i da nisam sludio. skroz.", 
            timestamp: "10.01.2012",
            leaf: true
        }
        ]
        
    }
    ]
};

Ext.define("Cimeri.store.Messages", {
    extend: "Ext.data.TreeStore",
    config: {
        model: "Cimeri.model.Message",
        defaultRootProperty: "items",
        root: intmsgdata   
    }
});