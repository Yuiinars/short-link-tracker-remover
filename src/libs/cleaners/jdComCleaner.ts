// ./libs/cleaners/jdcomCleaner.ts
import { baseCleaner, CleanerResult } from "./baseCleaner";

export function jdComCleaner(url: URL): CleanerResult {
    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);

    const shopId = baseCleanedUrl.searchParams.get("shopId");

    if (shopId) {
        const cleanedUrl = new URL(`https://mall.jd.com/index-${shopId}.html`);
        debugInfo.push(`[JD Rules] Extracted shopId: ${shopId} and standardized URL`);
        return { url: cleanedUrl, debugInfo };
    } else {
        baseCleanedUrl.search = '';
        debugInfo.push("[JD Rules] No 'shopId' parameter found, removed all parameters");
        return { url: baseCleanedUrl, debugInfo };
    }
}