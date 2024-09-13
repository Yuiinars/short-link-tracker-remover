// ./libs/cleaners/xhsCleaner.ts
import { baseCleaner, CleanerResult } from "./baseCleaner";

export function xhsCleaner(url: URL): CleanerResult {
    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);

    const allowedParams = ["xsec_token"];
    const newSearchParams = new URLSearchParams();
    const keptParams: string[] = [];

    for (const param of allowedParams) {
        const value = baseCleanedUrl.searchParams.get(param);
        if (value) {
            newSearchParams.set(param, value);
            keptParams.push(param);
        }
    }

    baseCleanedUrl.search = newSearchParams.toString();

    if (keptParams.length > 0) {
        debugInfo.push(`[Xiaohongshu Rules] Kept parameters: ${keptParams.join(", ")}`);
    }

    return { url: baseCleanedUrl, debugInfo };
}
