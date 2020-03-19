function isNumber(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
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