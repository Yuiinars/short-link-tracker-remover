// ./libs/utils/urlCleaner.ts
import { getCleanerForDomain } from "../cleanerFactory";

interface CleanUrlResult {
  cleanedUrl: URL;
  debugInfo: string[];
}

export async function cleanUrl(url: URL): Promise<CleanUrlResult> {
  try {
    const { cleaner, debugInfo: cleanerInfo } = getCleanerForDomain(url.hostname);
    const cleanerResult = await Promise.resolve(cleaner(url));

    if (!cleanerResult || typeof cleanerResult !== 'object') {
      throw new Error('Cleaner did not return a valid result');
    }

    const { url: cleanedUrl, debugInfo: cleanerDebugInfo } = cleanerResult;

    if (!cleanedUrl) {
      throw new Error('Cleaner did not return a valid URL');
    }

    const debugInfo: string[] = [
      ...(Array.isArray(cleanerInfo) ? cleanerInfo : [cleanerInfo]),
      ...(Array.isArray(cleanerDebugInfo) ? cleanerDebugInfo : [cleanerDebugInfo])
    ].filter((info): info is string => typeof info === 'string');

    let finalUrl: URL;
    if (cleanedUrl instanceof URL) {
      finalUrl = cleanedUrl;
    } else if (typeof cleanedUrl === 'string') {
      finalUrl = new URL(cleanedUrl);
    } else {
      throw new Error('Cleaner returned an invalid URL type');
    }

    return {
      cleanedUrl: finalUrl,
      debugInfo,
    };
  } catch (error) {
    console.error("Error in cleanUrl:", error);
    return {
      cleanedUrl: url,
      debugInfo: [`Error occurred: ${error instanceof Error ? error.message : 'Unknown error'}, returned original URL`],
    };
  }
}