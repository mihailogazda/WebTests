/**
 * INTERNATIONALIZATION ENGINE
 * VERY IMPORTANT - THIS DRIVES WHOLE INTERNATIONALIZATION ENGINE
 */
var CLang = null;

function checkCLang(){
    //alert(window.navigator.language);
    var set = new CSettings();
    var lang = set.getLanguage();    
    if (lang == false)
        CLang = CLangEN;
    else if (lang == "EN")
        CLang = CLangEN;
    else if (lang == "BA")
        CLang = CLangBA;
    else if (lang == "HR")
        CLang = CLangBA;
    else if (lang == "SR")
        CLang = CLangBA;
}
checkCLang();

function global_changeLanguage(newLang){    
    Ext.Msg.confirm(CLang.CHANGE_LANGUAGE_TITLE, CLang.CHANGE_LANGUAGE_TEXT, function(e){
        if (e == "yes"){
            var set = new CSettings();
            set.setLanguage(newLang);
            global_restartApp();
        }
    });        
}

/**
 * INTERNATIONALIZATION ENGINE END
 */
