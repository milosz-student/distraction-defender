chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.redirect) {
            chrome.tabs.update(sender.tab.id, {url: chrome.runtime.getURL(request.redirect)});
        }
    }
);