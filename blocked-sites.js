document.addEventListener('DOMContentLoaded', setupBlockedSitesList);

function setupBlockedSitesList() {
    chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
        const blockedSitesList = document.getElementById('blockedSitesList');
        blockedSitesList.innerHTML = '';

        if (blockedSites && blockedSites.length > 0) {
            blockedSites.forEach(site => {
                const listItem = createBlockedSiteDiv(site);
                blockedSitesList.appendChild(listItem);
            });
        } else {
            const noBlockedSitesItem = document.createElement('div');
            noBlockedSitesItem.classList.add('blocked-site');
            noBlockedSitesItem.textContent = 'No sites blocked';
            blockedSitesList.appendChild(noBlockedSitesItem);
        }
    });
}


function createBlockedSiteDiv(site) {
    const siteUrl = new URL(site.url);



    const div = document.createElement('div');
    div.classList.add('blocked-site');
    // refactor l8r
    const faviconImg = document.createElement('img');
    faviconImg.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(siteUrl.hostname)}`;

    div.appendChild(faviconImg);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    textDiv.textContent = siteUrl.hostname;

    div.appendChild(textDiv);

    const buttonDiv = document.createElement('div');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeBlockedSite(site);
        div.remove(); 
    });

    buttonDiv.appendChild(removeButton);

    div.appendChild(buttonDiv);

    return div;
}

function removeBlockedSite(site) {
    chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
        const updatedBlockedSites = blockedSites.filter(item => item.url !== site.url);
        chrome.storage.local.set({ blockedSites: updatedBlockedSites }, () => {
            console.log('Site removed:', site);
        });
    });
}
