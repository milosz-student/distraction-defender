chrome.storage.local.get('blockedSites', function(data) {
    const blockedSites = data.blockedSites || [];
    const currentDomain = new URL(window.location.href).hostname;

    const isBlocked = blockedSites.some(blockedSite => currentDomain.includes(blockedSite.domain));

    if (isBlocked) {
        const redirectUrl = `pages/blocked.html?site=${currentDomain}`;
        chrome.runtime.sendMessage({ redirect: redirectUrl });
    }
});
