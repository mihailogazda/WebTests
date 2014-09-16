/**
 * Settings class used for localStorage
 */
function CSettings(){
    
    this.language = "language";
    this.loggedIn = "loggedIn";
    this.username = "username";
    this.password = "password_hash";
    
    /**	METHODS */
    this.getItem = function(name){
        if (localStorage.getItem(name) === null)
            return false;
        return localStorage.getItem(name);
    }
    this.setItem = function(name, value){
        return localStorage.setItem(name, value);
    }
    
    /** GETTERS / SETTERS */
    this.getLoggedIn = function(){
        return this.getItem(this.loggedIn) == "true";
    }
    this.setLoggedIn = function(value){
        return this.setItem(this.loggedIn, value);
    }
    
    this.getLanguage = function(){
        return this.getItem(this.language);
    }
    this.setLanguage = function(value){
        return this.setItem(this.language, value);
    }
    
};