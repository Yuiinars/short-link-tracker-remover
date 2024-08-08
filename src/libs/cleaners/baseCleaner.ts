// ./libs/cleaners/baseCleaner.ts

interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export function baseCleaner(url: URL): CleanerResult {
    const debugInfo: string[] = [];

    const paramsToRemove = [
        // UTM parameters
        "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_ref",
        "itm_source", "itm_medium", "itm_campaign", "itm_term", "itm_content", "itm_ref",
        // Referrer parameters
        "ref_src", "ref_url", "ref_name", "ref_type", "ref_id", "ref_page", "ref_page_id",
        "ref_page_name", "ref_page_type", "ref", "ref_", "_ref", "referrer",
        // Tracking parameters
        "fbclid", "gclid", "msclkid", "dclid", "zanpid", "igshid", "affiliate", "aff", "aff_id",
        "trackId", "pvid", "spm", "scm", "app_version", "devicetype", "nettype", "click_id",
        "click_time", "enterid", "exportkey", "wx_header", "xtrack", "pass_ticket", "sentry_key",
        "sentry_version", "sourceid", "_openstat", "cmpid", "_ga", "_gl", "tracking_source",
        "__hsfp", "__hstc", "__hssc", "fb_action_ids", "tracking", "tt_medium", "tt_content",
        "_from", "from"
    ];

    paramsToRemove.forEach((param) => {
        if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
            debugInfo.push(`[Base Rules] Removed parameter: ${param}`);
        }
    });

    return { url, debugInfo };
}