// ./libs/cleaners/spotifyCleaner.ts
interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export function spotifyCleaner(url: URL): CleanerResult {
    const debugInfo: string[] = [];

    url.search = '';

    debugInfo.push(`[Spotify Rules] Parameters cleared`);
    return { url, debugInfo };
}