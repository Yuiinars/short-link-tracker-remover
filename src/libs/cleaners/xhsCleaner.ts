// ./libs/cleaners/xhsCleaner.ts
import { baseCleaner, CleanerResult } from "./baseCleaner";

export function xhsCleaner(url: URL): CleanerResult {
    let { url: cleanedUrl, debugInfo } = baseCleaner(url);

    const allowedParams = ["xsec_token"];
    const newSearchParams = new URLSearchParams();
    const keptParams: string[] = [];

    for (const param of allowedParams) {
        const value = cleanedUrl.searchParams.get(param);
        if (value) {
            newSearchParams.set(param, value);
            keptParams.push(param);
        }
    }

    cleanedUrl.search = newSearchParams.toString();

    if (keptParams.length > 0) {
        debugInfo.push(`[Xiaohongshu Rules] Kept parameters: ${keptParams.join(", ")}`);
    }

    cleanedUrl.hash = "";
    cleanedUrl = new URL(decodeURIComponent(cleanedUrl.toString()));

    return { url: cleanedUrl, debugInfo };
}