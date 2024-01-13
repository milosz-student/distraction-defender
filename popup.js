import { analyzeFavicon } from './utils.js';


chrome.storage.local.get('backgrounds', function (data) {
    const storedBackgrounds = data.backgrounds;

    if (!storedBackgrounds) {
        const initialBackgrounds = ['background-1.png', 'background-2.png', 'background-3.png', 'background-4.png', 'background-5.png', 'background-6.png'];

        chrome.storage.local.set({ 'backgrounds': initialBackgrounds }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError);
            } else {
                console.log('Initial backgrounds set successfully.');
            }
        });
    } else {
        console.log('Backgrounds already initialized:', storedBackgrounds);
    }
});


chrome.tabs.query({active: true, lastFocusedWindow: true}, ([currentTab]) => {
    try {
        const url = new URL(currentTab.url);
        let domain = url.hostname;

        let faviconUrl = currentTab.favIconUrl;
        if (faviconUrl) {
            // faviconImg.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(siteUrl.hostname)}`;
            document.getElementById('siteIcon').src = faviconUrl;

            analyzeFavicon(faviconUrl, (mostCommonColor) => {
                document.getElementById('siteIconBackground').style.backgroundColor = mostCommonColor;
            });
        }

        document.getElementById('siteName').textContent = domain;
    } catch (error) {
        console.error('Error:', error);
    }
    
});

const blockButton = document.getElementById('blockButton');
const viewListButton = document.getElementById('viewListButton');
const blockedInfo = document.getElementById('blockedInfo');
const buttonsContainer = document.getElementById('buttons');

blockButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([currentTab]) => {
        const blockedSite = {
            url: currentTab.url,
            domain: new URL(currentTab.url).hostname,
        };
        chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
            const updatedBlockedSites = blockedSites ? [...blockedSites, blockedSite] : [blockedSite];
            chrome.storage.local.set({ blockedSites: updatedBlockedSites }, () => {
                
                blockButton.style.display = 'none';
                viewListButton.style.display = 'none';

                blockedInfo.style.display = 'block';
                refreshPageButton.style.display = 'block';

                refreshPageButton.addEventListener('click', () => {
                    chrome.tabs.reload(currentTab.id);
                    window.close();
                });
            });
        });
    });
});

viewListButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'index.html' });
});