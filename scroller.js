var intervalID;
var divs = [];
var headerHeight;
var i = 0;

chrome.runtime.onMessage.addListener(
    function(seconds, sender, sendResponse)
    {
        if(seconds > 0)
        {
            //Get all the different posts in the page
            divs = document.getElementsByClassName('rpBJOHq2PR60pnwJlUyP0')[0].childNodes;

            //Search for the first visible post, and set the index to that post
            setIndex();
            
            //Needed to scroll up the header height, so it doesn't overlap the post
            headerHeight = document.getElementsByClassName('_1tvdSTbdxaK-BnUbzUIqIY _2GyPfdsi-MbQFyHRECo9GO cx1ohrUAq6ARaXTX2u8YN   ')[0].offsetHeight * -1;

            //Start interval
            intervalID = setInterval(scrollerInterval, seconds*1000);

            //Scroll as soon as it's clicked for the first time
            scrollPost();
        }
        else if(seconds == 0) //If it's 0 seconds, it means we stop the interval
            stopScroller();
    }
)

//The function used in the timer interval
function scrollerInterval()
{
    if(i < divs.length)
        scrollPost();
    else
        stopScroller();
}

//Scrolls to the next post, uses global variables
function scrollPost()
{
    while(checkIsPostAd(divs[i]))
        i++;
    
    divs[i].scrollIntoView();
    window.scrollBy(0, headerHeight);
    i++;
}

//Sets the correct index, based on where the user is on the webpage
function setIndex()
{
    i = 0;

    for(j = 0; j < divs.length; j++)
    {
        if(checkVisible(divs[j]))
        {
            i = j;
            break;
        }
    }
}

//Stops the scrolling and sets some variables back to their default values
function stopScroller()
{
    clearInterval(intervalID);
    i = 0;
    intervalID = null;
    divs = [];
    headerHeight = null;
}

//Checks whether an element is visible on the screen
//Thanks to @Tokimon in StackOverflow
function checkVisible(elm) 
{
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

//Used to check whether a post is an ad or not
function checkIsPostAd(element)
{
    if(element.childNodes[0].childNodes[0].className.indexOf('promotedlink') > -1 || element.offsetHeight == 0)
        return true;
    else
        return false;
}