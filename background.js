const defaultBackgrounds = ['background-1.png', 'background-2.png', 'background-3.png', 'background-4.png', 'background-5.png', 'background-6.png'];

chrome.storage.local.get({ backgrounds: defaultBackgrounds }, function (data) {});

chrome.storage.local.set({ backgrounds: defaultBackgrounds }, function () {
    if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
    } else {
        console.log('Initial backgrounds set successfully.');
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.redirect) {
            chrome.tabs.update(sender.tab.id, {url: chrome.runtime.getURL(request.redirect)});
        }
    }
);