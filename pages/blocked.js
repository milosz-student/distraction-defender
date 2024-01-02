document.addEventListener('DOMContentLoaded', function () {
    try {
        chrome.storage.local.get('backgrounds', function (data) {
            const backgroundFolder = '../images/background/';
            const backgroundImages = data.backgrounds || [];
        
            if (backgroundImages.length > 0) {
                const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
                document.body.style.backgroundImage = `url('${backgroundFolder}${randomImage}')`;
            } else {
                console.error('No background images found.');
            }
        });
        
        const urlParams = new URLSearchParams(window.location.search);
        const blockedSite = urlParams.get('site');
        
        if (blockedSite) {
            const blockedSiteUrlElement = document.getElementById('blockedSiteUrl');
            
            if (blockedSiteUrlElement) {
                blockedSiteUrlElement.textContent = decodeURIComponent(blockedSite);
            } else {
                console.error('Element with id "blockedSiteUrl" not found.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
