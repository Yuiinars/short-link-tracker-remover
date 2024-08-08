// ./libs/cleaners/weixinCleaner.ts
import { baseCleaner } from "./baseCleaner";

interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export function weixinCleaner(url: URL): CleanerResult {
    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);
    url = baseCleanedUrl;

    const searchParams = url.searchParams;
    const paramMapping = {
        mid: "appmsgid",
        idx: "itemidx",
        sn: "sign"
    };
    const allowedParams = ["__biz", "mid", "idx", "sn"];
    const newSearchParams = new URLSearchParams();
    const keptParams: string[] = [];

    allowedParams.forEach((param) => {
        if (searchParams.has(param)) {
            const newParam = paramMapping[param as keyof typeof paramMapping] || param;
            newSearchParams.set(newParam, searchParams.get(param)!);
            keptParams.push(newParam);
        }
    });

    url.search = newSearchParams.toString();

    if (keptParams.length > 0) {
        debugInfo.push(`[Weixin Rules] Kept parameters: ${keptParams.join(", ")}`);
    }

    return { url, debugInfo };
}