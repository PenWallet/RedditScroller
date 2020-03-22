var intervalID;
var divs;
var headerHeight;
var i;

chrome.runtime.onMessage.addListener(
    function(seconds)
    {
        if(seconds > 0)
        {
            //We're going to start the iteration of divs
            i = 0;
            divs = document.getElementsByClassName('rpBJOHq2PR60pnwJlUyP0')[0].childNodes;
            headerHeight = document.getElementsByClassName('_1tvdSTbdxaK-BnUbzUIqIY _2GyPfdsi-MbQFyHRECo9GO cx1ohrUAq6ARaXTX2u8YN   ')[0].offsetHeight * -1;

            intervalID = setInterval(scroller, seconds*1000);
            
            //Scroll as soon as it's clicked for the first time
            scrollPost();

            function scroller()
            {
                scrollPost();
            }
        }
        else if(seconds == 0)   
        {
            clearInterval(intervalID);
            divs = null;
            i = null;
            headerHeight = null;
        }     
    }
)

function scrollPost()
{
    divs[i].scrollIntoView();
    window.scrollBy(0, headerHeight);
    i++;
    
    //For used to skip posts with height 0 (may be AdBlock?)
    for(; i < divs.length; i++)
    {
        if(divs[i].offsetHeight != 0)
            break;
    }
}