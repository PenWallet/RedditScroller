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
    var cbScroller = document.getElementById("cbScroller");
    var seconds = document.getElementById("seconds");

    //Recover the state of the checkbox
    chrome.storage.local.get({'checkedScroller':false}, function(data)
    {
        console.log("Checked scroller: "+data.checkedScroller);
        cbScroller.checked = data.checkedScroller;
    });

    //Recover the state of the seconds
    chrome.storage.local.get({'scrollerSeconds':0}, function(data)
    {
        console.log("scroller Seconds: "+data.scrollerSeconds);
        seconds.setAttribute('value', data.scrollerSeconds);
    });

    //Listeners
    cbScroller.addEventListener('click', cbScrollerClick, false);
    seconds.onkeypress = isNumber;
    seconds.oninput = maxLengthCheck;
    
    //Function for when the checkbox is clicked
    function cbScrollerClick()
    {
        //Save the state so it persists when the popup is reopened
        chrome.storage.local.set({'checkedScroller': cbScroller.checked});
        chrome.storage.local.set({'scrollerSeconds': seconds.value});

        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs)
            {
                if(cbScroller.checked)
                    chrome.tabs.sendMessage(tabs[0].id, seconds.value);
                else //If it's unchecked, send seconds as 0
                    chrome.tabs.sendMessage(tabs[0].id, 0);
            });
    }
}, false);