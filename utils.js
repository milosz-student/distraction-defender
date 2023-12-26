function calculateColor(pixels, i) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (!isNearWhite(r, g, b) && !isNearBlack(r, g, b)) {
        return `rgb(${r}, ${g}, ${b})`;
    }

    return null;
}

export function analyzeFavicon(faviconUrl, callback) {
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
            const color = calculateColor(pixels, i);
            if (color) {
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
