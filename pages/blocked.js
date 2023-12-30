document.addEventListener('DOMContentLoaded', function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const blockedSite = urlParams.get('site');
        console.log('blockedSite:', blockedSite);
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