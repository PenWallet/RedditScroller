var tabData = {};

//Thanks to @BeardFist on StackOverflow
/*chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if (tab.url.indexOf("https://www.reddit.com/") > -1 && changeInfo.url === undefined){
        //chrome.tabs.executeScript(tabId, {file: "program.js"} );
        chrome.storage.local.set({'checkedScroller': false});
    }
});*/

//Listeners for 
chrome.tabs.onCreated.addListener(function (tab) {
    tabData['tab_' + tab.id] = {
        checkedScroller: false,
        scrollerSeconds: 0
    };
});

chrome.tabs.onRemoved.addListener(function (tabId) {
    delete tabData['tab_' + tabId];
});