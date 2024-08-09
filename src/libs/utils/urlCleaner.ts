// ./libs/utils/urlCleaner.ts
import { getCleanerForDomain } from "../cleanerFactory";

interface CleanUrlResult {
  cleanedUrl: URL;
  debugInfo: string[];
}

export function cleanUrl(url: URL): CleanUrlResult {
  try {
    const { cleaner, debugInfo: cleanerInfo } = getCleanerForDomain(url.hostname);
    const { url: cleanedUrl, debugInfo: cleanerDebugInfo } = cleaner(url);

    const debugInfo: string[] = [
      ...(Array.isArray(cleanerInfo) ? cleanerInfo : [cleanerInfo]),
      ...(Array.isArray(cleanerDebugInfo) ? cleanerDebugInfo : [cleanerDebugInfo])
    ].filter((info): info is string => typeof info === 'string');

    return {
      cleanedUrl: cleanedUrl instanceof URL ? cleanedUrl : new URL(cleanedUrl),
      debugInfo,
    };
  } catch (error) {
    console.error("Error in cleanUrl:", error);
    return {
      cleanedUrl: url,
      debugInfo: ["Error occurred, returned original URL"],
    };
  }
}