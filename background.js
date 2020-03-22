var tabData = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    console.log('---- EMPIEZA OTRA VEZ ----')
    console.log('Stat: '+changeInfo.status);
    console.log('CURL: '+changeInfo.url);
    console.log('TURL: '+tab.url);

    if (changeInfo.status === 'loading')
    {
        chrome.tabs.sendMessage(tabId, 0);

        //If we're loading into reddit (whether newly, or reloading, doesn't matter)
        if(tab.url.indexOf("https://www.reddit.com/") > -1)
        {
            tabData['tab_' + tabId] = {
                checkedScroller: false,
                scrollerSeconds: 0
            };
        }
        else //if we're not loading into reddit, then we can delete the data from this tab
        {
            delete tabData['tab_' + tabId];
        }

        console.log('$$$$ ¡TENEMOS TABDATA! $$$$');
        console.log(tabData);
    }
});

chrome.tabs.onRemoved.addListener(function (tabId) {
    if(tabData['tab_' + tabId])
    {
        delete tabData['tab_' + tabId];
    }
});