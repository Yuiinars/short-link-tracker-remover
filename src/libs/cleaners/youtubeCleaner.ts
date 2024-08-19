// ./libs/cleaners/youtubeCleaner.ts
import { baseCleaner } from './baseCleaner';

interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export function youtubeCleaner(url: URL): CleanerResult {
    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);
    url = baseCleanedUrl;

    const searchParams = url.searchParams;
    const youtubeParamsToRemove = [
        "feature",
        "ab_channel",
    ];

    youtubeParamsToRemove.forEach(param => {
        if (searchParams.has(param)) {
            searchParams.delete(param);
            debugInfo.push(`[YouTube Rules] Removed parameter: ${param}`);
        }
    });

    return { url, debugInfo };
}