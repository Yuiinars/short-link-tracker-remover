// ./libs/cleaners/weixinCleaner.ts
import { baseCleaner, CleanerResult } from "./baseCleaner";

export function weixinCleaner(url: URL): CleanerResult {
    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);

    const paramMapping: Record<string, string> = {
        mid: "appmsgid",
        idx: "itemidx",
        sn: "sign"
    };
    const allowedParams = ["__biz", "mid", "idx", "sn"];
    const newSearchParams = new URLSearchParams();
    const keptParams: string[] = [];

    for (const param of allowedParams) {
        const value = baseCleanedUrl.searchParams.get(param);
        if (value) {
            const newParam = paramMapping[param] || param;
            newSearchParams.set(newParam, value);
            keptParams.push(newParam);
        }
    }

    baseCleanedUrl.search = newSearchParams.toString();

    if (keptParams.length > 0) {
        debugInfo.push(`[Weixin Rules] Kept parameters: ${keptParams.join(", ")}`);
    }

    return { url: baseCleanedUrl, debugInfo };
}
