document.addEventListener('DOMContentLoaded', setupBlockedSitesList);

function setupBlockedSitesList() {
    chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
        const blockedSitesList = document.getElementById('blockedSitesList');
        blockedSitesList.innerHTML = '';

        if (blockedSites && blockedSites.length > 0) {
            blockedSites.forEach(site => {
                const listItem = createBlockedSiteListItem(site);
                blockedSitesList.appendChild(listItem);
            });
        } else {
            const noBlockedSitesItem = document.createElement('li');
            noBlockedSitesItem.textContent = 'No sites blocked';
            blockedSitesList.appendChild(noBlockedSitesItem);
        }
    });
}

function createBlockedSiteListItem(site) {
    const listItem = document.createElement('li');
    listItem.textContent = site.url;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeBlockedSite(site);
        listItem.remove();
    });

    listItem.appendChild(removeButton);
    return listItem;
}

function removeBlockedSite(site) {
    chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
        const updatedBlockedSites = blockedSites.filter(item => item.url !== site.url);
        chrome.storage.local.set({ blockedSites: updatedBlockedSites }, () => {
            console.log('Site removed:', site);
        });
    });
}
