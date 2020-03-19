/*
Comprobar si lo que introducimos es un número 
 */

function isNumber(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode < 48 || charCode > 57 || charCode ==101))
        return false;
    return true;
}
/*
Comprobar que sólo sean 3 caracteres
*/
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }

document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById("btnScroller").addEventListener('click', onclick, false);
    
    function onclick()
    {
        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs)
            {
                var seconds = document.getElementById("segundos").value;
                chrome.tabs.sendMessage(tabs[0].id, seconds);
            });
    }
}, false);