// ./libs/cleaners/wyyCleaner.ts
import { baseCleaner } from "./baseCleaner";

interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export function wyyCleaner(url: URL): CleanerResult {
    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);
    url = baseCleanedUrl;

    const searchParams = url.searchParams;
    let id = searchParams.get("id");

    if (id) {
        url = new URL(`https://music.163.com/#/song?id=${id}`);
        debugInfo.push(`[Wyy Rules] Extracted id: ${id} and standardized URL`);
    } else {
        debugInfo.push("[Wyy Rules] No 'id' parameter found, URL unchanged");
    }

    return { url, debugInfo };
}