
function global_restartApp(){
    window.location.reload();
}

function global_countObjects(obj){    
  var result = 0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop))
      result++;
  }
  return result;
}
