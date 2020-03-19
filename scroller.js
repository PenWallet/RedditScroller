var intervalID;

chrome.runtime.onMessage.addListener(
    function(seconds)
    {
        if(seconds > 0)
        {
            intervalID = setInterval(scroller, seconds*1000);

            function scroller()
            {
                console.log("K vien funsiona ninio");
            }
        }
        else if(seconds == 0)   
        {
            clearInterval(intervalID);
            console.log("Intervalo parao shiquillo")
        }     
    }
)