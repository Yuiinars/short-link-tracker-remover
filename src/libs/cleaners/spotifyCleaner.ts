// ./libs/cleaners/spotifyCleaner.ts
import { resolveUrl } from '../utils/urlResolver';
interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export async function spotifyCleaner(url: URL): Promise<CleanerResult> {
    const debugInfo: string[] = [];

    url.search = '';
    debugInfo.push(`[Spotify Rules] Parameters cleared`);

    url = await resolveUrl(url.toString(), 'curl');
    url.search = '';
    debugInfo.push(`[Spotify Rules] Resolved URL.`);

    return { url, debugInfo };
}