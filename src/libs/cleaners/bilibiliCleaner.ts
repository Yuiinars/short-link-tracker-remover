// ./libs/cleaners/bilibiliCleaner.ts
import { baseCleaner } from "./baseCleaner";

interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export function bilibiliCleaner(url: URL): CleanerResult {
    let debugInfo: string[] = [];

    if (url.hostname === "b23.tv") {
        // b23.tv direct link
        debugInfo.push("Processing b23.tv link");
        const pathMatch = url.pathname.match(/^\/(av\d+|BV[\w]+)/);
        if (pathMatch) {
            url = new URL(`https://www.bilibili.com/video/${pathMatch[1]}`);
            debugInfo.push(`[Bilibili Rules] Converted b23.tv link to ${pathMatch[1]}`);
        } else {
            url.search = "";
            debugInfo.push("[Bilibili Rules] b23.tv Processed.");
        }
        return { url, debugInfo };
    }

    const { url: baseCleanedUrl, debugInfo: baseDebugInfo } = baseCleaner(url);
    url = baseCleanedUrl;
    debugInfo = [...debugInfo, ...baseDebugInfo];

    // start progress
    const startProgress = url.searchParams.get("start_progress");
    if (startProgress) {
        const timeInSeconds = parseFloat(startProgress) / 1000;
        url.searchParams.set("t", timeInSeconds.toFixed(3));
        debugInfo.push(
            `[Bilibili Rules] Converted ?start_progress to ?t parameter: ${timeInSeconds.toFixed(3)}`
        );
    }

    // comment
    const commentOn = url.searchParams.get("comment_on");
    const commentRootId = url.searchParams.get("comment_root_id");
    const commentSecondaryId = url.searchParams.get("comment_secondary_id");

    if (commentOn === "1") {
        if (commentSecondaryId) {
            url.hash = `reply${commentSecondaryId}`;
            debugInfo.push(`[Bilibili Rules] Set hash for secondary comment: #reply${commentSecondaryId}`);
        } else if (commentRootId) {
            url.hash = `reply${commentRootId}`;
            debugInfo.push(`[Bilibili Rules] Set hash for root comment: #reply${commentRootId}`);
        }
    }

    const tParam = url.searchParams.get("t");
    url.search = tParam ? `?t=${tParam}` : "";

    return { url, debugInfo };
}