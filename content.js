chrome.storage.local.get('blockedSites', function(data) {
    var blockedSites = data.blockedSites || [];
    var currentUrl = new URL(window.location.href);
    var currentDomain = currentUrl.hostname;

    var isBlocked = blockedSites.some(function(blockedSite) {
        return currentDomain.includes(blockedSite.domain);
    });

    if (isBlocked) {
        window.location.href = 'https://example.com';
    }
});