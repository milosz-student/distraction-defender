document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
        const blockedSitesList = document.getElementById('blockedSitesList');
        if (blockedSites && blockedSites.length > 0) {
            blockedSites.forEach(site => {
                const listItem = document.createElement('li');
                listItem.textContent = site.url;
                blockedSitesList.appendChild(listItem);
            });
        } else {
            const noBlockedSitesItem = document.createElement('li');
            noBlockedSitesItem.textContent = 'No sites blocked';
            blockedSitesList.appendChild(noBlockedSitesItem);
        }
    });
});
