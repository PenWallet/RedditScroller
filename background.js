//Thanks to @BeardFist on StackOverflow
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if (tab.url.indexOf("https://www.reddit.com/") > -1 && changeInfo.url === undefined){
        //chrome.tabs.executeScript(tabId, {file: "program.js"} );
        chrome.storage.local.set({'checkedScroller': false});
    }
});