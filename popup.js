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
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const alpha = pixels[i + 3];

            if (!isNearWhite(r, g, b) && !isNearBlack(r, g, b)) {
                const color = `rgb(${r}, ${g}, ${b})`;
                colorCounts[color] = (colorCounts[color] || 0) + 1;
            }
        }

        const mostCommonColor = Object.keys(colorCounts).reduce((a, b) => colorCounts[a] > colorCounts[b] ? a : b);

        callback(mostCommonColor);
    };
}


function isNearWhite(r, g, b) {
    const threshold = 30;
    return r > 255 - threshold && g > 255 - threshold && b > 255 - threshold;
}

function isNearBlack(r, g, b) {
    const threshold = 30;
    return r < threshold && g < threshold && b < threshold;
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

