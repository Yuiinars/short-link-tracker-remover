// ./libs/cleanerFactory.ts
import { baseCleaner } from "./cleaners/baseCleaner";
import { youtubeCleaner } from "./cleaners/youtubeCleaner";
import { bilibiliCleaner } from "./cleaners/bilibiliCleaner";
import { weixinCleaner } from "./cleaners/weixinCleaner";
import { wyyCleaner } from "./cleaners/wyyCleaner";
import { tbcnCleaner } from "./cleaners/tbcnCleaner";
import { spotifyCleaner } from "./cleaners/spotifyCleaner";
import { jdComCleaner } from "./cleaners/jdComCleaner";

type SyncCleaner = (url: URL) => { url: URL; debugInfo: string[] };
type AsyncCleaner = (url: URL) => Promise<{ url: URL; debugInfo: string[] }>;
type Cleaner = SyncCleaner | AsyncCleaner;

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
    "tb.cn": tbcnCleaner,
    "spotify.app.link": spotifyCleaner,
    "spotify.com": spotifyCleaner,
    "jd.com": jdComCleaner,
    "3.cn": jdComCleaner
};

export function getCleanerForDomain(hostname: string): CleanerResult {
    for (const [domain, cleaner] of Object.entries(cleaners)) {
        if (hostname.endsWith(domain)) {
            return { cleaner, debugInfo: [`[${domain.split('.')[0]} cleaner] Processed.`] };
        }
    }
    return { cleaner: baseCleaner, debugInfo: ['[Base Rules] Processed.'] };
}