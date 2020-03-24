var intervalID;
var divs;
var headerHeight;
var i;

chrome.runtime.onMessage.addListener(
    function(seconds)
    {
        if(seconds > 0)
        {
            divs = document.getElementsByClassName('rpBJOHq2PR60pnwJlUyP0')[0].childNodes;

            //We're going to start the iteration of divs
            setIndex();
            
            //Needed to scroll up the header height, so it doesn't overlap the post
            headerHeight = document.getElementsByClassName('_1tvdSTbdxaK-BnUbzUIqIY _2GyPfdsi-MbQFyHRECo9GO cx1ohrUAq6ARaXTX2u8YN   ')[0].offsetHeight * -1;

            //Start interval
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

//Thanks to @Tokimon in StackOverflow
function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function setIndex()
{
    var found = false;

    for(j = 0; j < divs.length; j++)
    {
        if(checkVisible(divs[j]))
        {
            found = true;
            break;
        }
    }

    if(found)
        i = j;
    else
        i = 0;
}