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

        const blockedTextElement = document.getElementById('blockedText');
        const blockedTexts = [
            "Halt! This realm is temporarily closed. Embark on a quest for productivity elsewhere.",
            "You shall not pass! Unless you're being productive.",
            "Attention, noble visitor! This passage is currently restricted. Seek your online adventures beyond these gates.",
            "Hold thy steed, brave soul! The path ahead is blocked. Find another road to your digital conquests.",
            "By royal decree, this virtual realm is off-limits. Redirect your quest to a different online domain.",
            "Attention, fellow traveler! This sanctuary is temporarily sealed. Seek refuge in another corner of the digital realm.",
            "Beware, wayfarer! The bridge to this site is under construction. Journey to a different online kingdom for now.",
            "Hold your horses, noble user! This online fortress is inaccessible. Set forth to explore other digital territories.",
            "Attention, digital wanderer! The drawbridge to this cyber-castle is raised. Venture forth to unexplored lands online.",
            "This page is on lockdown, dear visitor. Embark on a digital crusade elsewhere until the gates reopen."
        ];
        
        const randomIndex = Math.floor(Math.random() * blockedTexts.length);
        const selectedText = blockedTexts[randomIndex];

        if (blockedTextElement) {
            blockedTextElement.textContent = selectedText;
        } else {
            console.error('Element with id "blockedText" not found.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
