// ./libs/cleaners/bilibiliCleaner.ts
import { baseCleaner, CleanerResult } from "./baseCleaner";

export function bilibiliCleaner(url: URL): CleanerResult {
    if (url.hostname === "b23.tv") {
        return processB23tvLink(url);
    }

    const { url: baseCleanedUrl, debugInfo } = baseCleaner(url);

    processStartProgress(baseCleanedUrl, debugInfo);
    processComment(baseCleanedUrl, debugInfo);
    preserveDanmuParams(baseCleanedUrl, debugInfo);

    return { url: baseCleanedUrl, debugInfo };
}

function processB23tvLink(url: URL): CleanerResult {
    const debugInfo: string[] = ["[Bilibili Rules] Processing b23.tv link"];
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

function processStartProgress(url: URL, debugInfo: string[]): void {
    const startProgress = url.searchParams.get("start_progress");
    if (startProgress) {
        const timeInSeconds = parseFloat(startProgress) / 1000;
        url.searchParams.set("t", timeInSeconds.toFixed(3));
        debugInfo.push(`[Bilibili Rules] Converted ?start_progress to ?t parameter: ${timeInSeconds.toFixed(3)}`);
    }
}

function processComment(url: URL, debugInfo: string[]): void {
    const commentOn = url.searchParams.get("comment_on");
    const commentRootId = url.searchParams.get("comment_root_id");
    const commentSecondaryId = url.searchParams.get("comment_secondary_id");

    if (commentOn === "1") {
        const commentId = commentSecondaryId || commentRootId;
        if (commentId) {
            url.hash = `reply${commentId}`;
            debugInfo.push(`[Bilibili Rules] Set hash for comment: #reply${commentId}`);
        }
    }
}

function preserveDanmuParams(url: URL, debugInfo: string[]): void {
    const danmuProgress = url.searchParams.get("dm_progress");
    const danmuId = url.searchParams.get("dmid");

    const newSearchParams = new URLSearchParams(url.searchParams);

    // Keep only dm_progress, dmid, t parameters
    for (const [key] of newSearchParams) {
        if (key !== "dm_progress" && key !== "dmid" && key !== "t") {
            newSearchParams.delete(key);
        }
    }

    // Set the new search string
    url.search = newSearchParams.toString();

    if (danmuProgress || danmuId) {
        debugInfo.push("[Bilibili Rules] Preserved dm_progress and dmid parameters");
    }
}