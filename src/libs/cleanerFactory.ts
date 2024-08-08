// ./libs/cleanerFactory.ts
import { baseCleaner } from "./cleaners/baseCleaner";
import { youtubeCleaner } from "./cleaners/youtubeCleaner";
import { bilibiliCleaner } from "./cleaners/bilibiliCleaner";
import { weixinCleaner } from "./cleaners/weixinCleaner";
import { wyyCleaner } from "./cleaners/wyyCleaner";

type Cleaner = (url: URL) => { url: URL; debugInfo: string[] };

interface CleanerResult {
    cleaner: Cleaner;
    debugInfo: string[];
}

const cleaners: Record<string, Cleaner> = {
    "youtube.com": youtubeCleaner,
    "youtu.be": youtubeCleaner,
    "bilibili.com": bilibiliCleaner,
    "b23.tv": bilibiliCleaner,
    "weixin.qq.com": weixinCleaner,
    "163cn.tv": wyyCleaner,
    "music.163.com": wyyCleaner,
};

export function getCleanerForDomain(hostname: string): CleanerResult {
    for (const [domain, cleaner] of Object.entries(cleaners)) {
        if (hostname.endsWith(domain)) {
            return { cleaner, debugInfo: [`[${domain} cleaner] Processed.`] };
        }
    }
    return { cleaner: baseCleaner, debugInfo: ['[Base Rules] Processed.'] };
}