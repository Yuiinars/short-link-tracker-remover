// ./libs/cleaners/tbcnCleaner.ts
import { resolveTbcnUrl } from "../utils/urlResolver";

interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export async function tbcnCleaner(url: URL): Promise<CleanerResult> {
    let debugInfo: string[] = [];
    let cleanedUrl: URL;

    try {
        cleanedUrl = new URL(url.origin + url.pathname);
        debugInfo.push("[Tbcn Rules] Removed search params and hash");

        cleanedUrl = await resolveTbcnUrl(cleanedUrl.toString());
        debugInfo.push("[Tbcn Rules] Resolved tb.cn URL");

        // Goofish specific rules
        if (cleanedUrl.hostname.endsWith('goofish.com')) {
            debugInfo.push("[Goofish Rules] Detected goofish.com domain");
            const params = new URLSearchParams(url.search);

            if (params.has('userid') && params.has('bft') && params.has('bfp')) {
                cleanedUrl.search = `?bft=${params.get('bft')}&bfp=${params.get('bfp')}`;
                debugInfo.push("[Goofish Rules] Detected share pages, kept only 'bft' and 'bfp' parameters");
            } else {
                cleanUrlWithIdParam(cleanedUrl, debugInfo);
            }
        } else {
            cleanUrlWithIdParam(cleanedUrl, debugInfo);
        }
    } catch (error) {
        console.error(`Error in tbcnCleaner: ${error instanceof Error ? error.message : 'Unknown error'}`);
        debugInfo.push(`[Error] Failed to process URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
        url.search = ''
        cleanedUrl = url;
    }

    return { url: cleanedUrl, debugInfo };
}

function cleanUrlWithIdParam(url: URL, debugInfo: string[]) {
    try {
        const id = new URLSearchParams(url.search).get("id");
        if (id) {
            url.search = `?id=${id}`;
            debugInfo.push(`[Tbcn Rules] Extracted id: ${id} and standardized URL`);
        } else {
            url.search = '';
            debugInfo.push("[Tbcn Rules] No 'id' parameter found, removed all parameters");
        }
    } catch (error) {
        console.error(`Error in cleanUrlWithIdParam: ${error instanceof Error ? error.message : 'Unknown error'}`);
        debugInfo.push(`[Error] Failed to clean URL with id param: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
