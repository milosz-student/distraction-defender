// TODO refactor this code
import { analyzeFavicon } from './utils.js';


chrome.tabs.query({active: true, lastFocusedWindow: true}, ([currentTab]) => {
    try {
        const url = new URL(currentTab.url);
        let domain = url.hostname;

        let faviconUrl = currentTab.favIconUrl;
        if (faviconUrl) {
            // faviconImg.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(siteUrl.hostname)}`;

            // this is a hacky way to get
            document.getElementById('siteIcon').src = faviconUrl;

            analyzeFavicon(faviconUrl, (mostCommonColor) => {
                document.body.style.backgroundColor = mostCommonColor;
            });
        }

        document.getElementById('siteName').textContent = domain;
    } catch (error) {
        console.error('Error:', error);
    }
    
});

const blockButton = document.getElementById('blockButton');
const viewListButton = document.getElementById('viewListButton');

blockButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([currentTab]) => {
        const blockedSite = {
            url: currentTab.url,
            domain: new URL(currentTab.url).hostname,
        };
        chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
            const updatedBlockedSites = blockedSites ? [...blockedSites, blockedSite] : [blockedSite];
            chrome.storage.local.set({ blockedSites: updatedBlockedSites }, () => {
                console.log('Site blocked:', blockedSite);
            });
        });
    });
});

viewListButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'index.html' });
});