// ./libs/cleanerFactory.ts
import { baseCleaner } from "./cleaners/baseCleaner";
import { youtubeCleaner } from "./cleaners/youtubeCleaner";
import { bilibiliCleaner } from "./cleaners/bilibiliCleaner";
import { weixinCleaner } from "./cleaners/weixinCleaner";
import { wyyCleaner } from "./cleaners/wyyCleaner";
import { tbcnCleaner } from "./cleaners/tbcnCleaner";
import { spotifyCleaner } from "./cleaners/spotifyCleaner";
import { jdComCleaner } from "./cleaners/jdComCleaner";
import { xhsCleaner } from "./cleaners/xhsCleaner";

type SyncCleaner = (url: URL) => { url: URL; debugInfo: string[] };
type AsyncCleaner = (url: URL) => Promise<{ url: URL; debugInfo: string[] }>;
type Cleaner = SyncCleaner | AsyncCleaner;

interface CleanerResult {
    cleaner: Cleaner;
    debugInfo: string[];
}

interface CleanerRule {
    domains: string[];
    cleaner: Cleaner;
}

const cleanerRules: CleanerRule[] = [
    { domains: ["youtube.com", "youtu.be"], cleaner: youtubeCleaner },
    { domains: ["bilibili.com", "b23.tv"], cleaner: bilibiliCleaner },
    { domains: ["weixin.qq.com"], cleaner: weixinCleaner },
    { domains: ["163cn.tv", "music.163.com"], cleaner: wyyCleaner },
    { domains: ["tb.cn"], cleaner: tbcnCleaner },
    { domains: ["spotify.app.link", "spotify.com"], cleaner: spotifyCleaner },
    { domains: ["jd.com", "3.cn"], cleaner: jdComCleaner },
    { domains: ["xiaohongshu.com", "xhslink.com"], cleaner: xhsCleaner },
];

function generateDebugInfo(domain: string): string {
    const firstSegment = domain.split('.')[0];
    return `[${firstSegment} cleaner] Processed.`;
}

export function getCleanerForDomain(hostname: string): CleanerResult {
    for (const rule of cleanerRules) {
        if (rule.domains.some(domain => hostname.endsWith(domain))) {
            const debugInfo = generateDebugInfo(rule.domains[0]);
            return { cleaner: rule.cleaner, debugInfo: [debugInfo] };
        }
    }
    return { cleaner: baseCleaner, debugInfo: ['[Base Rules] Processed.'] };
}