function analyzeFavicon(faviconUrl, callback) {
    const tempImage = new Image();
    tempImage.crossOrigin = 'Anonymous';
    tempImage.src = faviconUrl;

    tempImage.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = tempImage.width;
        canvas.height = tempImage.height;

        const context = canvas.getContext('2d');
        context.drawImage(tempImage, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const colorCounts = {};

        for (let i = 0; i < pixels.length; i += 4) {
            const color = `rgb(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]})`;
            colorCounts[color] = (colorCounts[color] || 0) + 1;
        }

        const mostCommonColor = Object.keys(colorCounts).reduce((a, b) => colorCounts[a] > colorCounts[b] ? a : b);

        callback(mostCommonColor);
    };
}


chrome.tabs.query({active: true, lastFocusedWindow: true}, ([currentTab]) => {
    try {
        const url = new URL(currentTab.url);
        let domain = url.hostname;

        let faviconUrl = currentTab.favIconUrl;
        if (faviconUrl) {
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

