/*
Comprobar si lo que introducimos es un número 
 */

function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode < 48 || charCode > 57 || charCode == 101))
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

function maxLengthCheck() {
    var seconds = document.getElementById("seconds");

    if (seconds.value.length > seconds.maxLength) 
        seconds.value = seconds.value.slice(0, seconds.maxLength) 
}

document.addEventListener('DOMContentLoaded', function()
{
    var btnScroller = document.getElementById("btnScroller");
    var seconds = document.getElementById("seconds");

    console.log("Probando");

    btnScroller.addEventListener('click', onclick, false);
    seconds.onkeypress = isNumber;
    seconds.oninput = maxLengthCheck;
    
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