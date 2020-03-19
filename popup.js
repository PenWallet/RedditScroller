function isNumber(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
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