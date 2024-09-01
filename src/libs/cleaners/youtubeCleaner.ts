// ./libs/cleaners/youtubeCleaner.ts
import { baseCleaner, CleanerResult } from "./baseCleaner";


export function youtubeCleaner(url: URL): CleanerResult {
    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);
    const youtubeParamsToRemove = ["feature", "ab_channel"];

    for (const param of youtubeParamsToRemove) {
        if (baseCleanedUrl.searchParams.has(param)) {
            baseCleanedUrl.searchParams.delete(param);
            debugInfo.push(`[YouTube Rules] Removed parameter: ${param}`);
        }
    }

    return { url: baseCleanedUrl, debugInfo };
}
