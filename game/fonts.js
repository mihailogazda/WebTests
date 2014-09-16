/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var assetFontFamily = "Lobster";
var assetDigitalFontFamily = "VT323";

function getFont(type, size, weight){
    return {
        family: type,        
        size: size,
        weight: typeof(weight) != "undefined" ? weight: "normal"
    };
}

var fontSizeNormal = "18px";
var assetFontNormal = getFont(assetFontFamily, fontSizeNormal);
var assetFontNormalBold = getFont(assetFontFamily, fontSizeNormal, "bold");

var assetDigitalFontNormal = getFont(assetDigitalFontFamily, fontSizeNormal);
var assetDigitalFontNormalBold = getFont(assetDigitalFontFamily, fontSizeNormal, "bold");

var fontSizeBig = "22px";
var assetFontBig = getFont(assetFontFamily, fontSizeBig);
var assetFontBigBold = getFont(assetFontFamily, fontSizeBig, "bold");

var assetDigitalFontBig = getFont(assetDigitalFontFamily, fontSizeBig);
var assetDigitalFontBigBold = getFont(assetDigitalFontFamily, fontSizeBig, "bold");

var fontSizeBiger = "30px";
var assetFontBiger = getFont(assetFontFamily, fontSizeBiger);
var assetFontBigerBold = getFont(assetFontFamily, fontSizeBiger, "bold");

var assetDigitalFontBiger = getFont(assetDigitalFontFamily, fontSizeBiger);
var assetDigitalFontBigerBold = getFont(assetDigitalFontFamily, fontSizeBiger, "bold");
