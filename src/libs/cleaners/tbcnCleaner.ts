// ./libs/cleaners/tbcnCleaner.ts
import { baseCleaner } from "./baseCleaner";
import { resolveTbcnUrl } from "../utils/urlResolver";

interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export async function tbcnCleaner(url: URL): Promise<CleanerResult> {
    let debugInfo: string[] = [];

    const resolvedUrl = await resolveTbcnUrl(url.toString());
    debugInfo.push("[Tbcn Rules] Resolved tb.cn URL");

    const { url: cleanedUrl, debugInfo: baseDebugInfo } = baseCleaner(resolvedUrl);
    debugInfo = debugInfo.concat(baseDebugInfo);

    const id = cleanedUrl.searchParams.get("id");
    if (id) {
        cleanedUrl.search = `?id=${id}`;
        debugInfo.push(`[Tbcn Rules] Extracted id: ${id} and standardized URL`);
    } else {
        debugInfo.push("[Tbcn Rules] No 'id' parameter found, URL unchanged");
    }

    return { url: cleanedUrl, debugInfo };
}