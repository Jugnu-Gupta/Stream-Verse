function getVideoQuality(width: number, height: number): string {
    let resolution = "";
    if (width >= 1280 && height >= 720) {
        resolution = "720p";
    } else if (width >= 854 && height >= 480) {
        resolution = "480p";
    } else if (width >= 640 && height >= 360) {
        resolution = "360p";
    } else {
        resolution = "240p";
    }

    return resolution;
}

export { getVideoQuality };
