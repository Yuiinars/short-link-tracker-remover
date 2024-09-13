// ./libs/cleaners/baseCleaner.ts

export interface CleanerResult {
    url: URL;
    debugInfo: string[];
}

export function baseCleaner(url: URL): CleanerResult {
    const debugInfo: string[] = [];

    const paramsToRemove = [
        // UTM parameters
        "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_ref",
        "utm_psn",
        "itm_source", "itm_medium", "itm_campaign", "itm_term", "itm_content", "itm_ref",
        // Referrer parameters
        "ref_src", "ref_url", "ref_name", "ref_type", "ref_id", "ref_page", "ref_page_id",
        "ref_page_name", "ref_page_type", "ref", "ref_", "_ref", "referrer", "_from", "from",
        // Tracking parameters
        "fbclid", "gclid", "msclkid", "dclid", "zanpid", "igshid", "affiliate", "aff", "aff_id",
        "trackId", "pvid", "spm", "scm", "app_platform", "app_version", "app_time", "appuid", "click_id",
        "click_time", "enterid", "exportkey", "wx_header", "xtrack", "pass_ticket", "sentry_key",
        "sentry_version", "sourceid", "_openstat", "cmpid", "_ga", "_gl", "tracking_source",
        "unique_k", "unique", "apptime",
        "__hsfp", "__hstc", "__hssc", "fb_action_ids", "tracking", "tt_medium", "tt_content", "trkid", "si",
        // Share parameters
        "share_relation", "share_medium", "sharesource", "share_source", "shareuid", "share_plat",
        "share_from", "share_from_user_hidden", "xhsshare", "author_share", "xsec_source", "share_plat",
        "share_type", "share_id", "share_tag",
        // Device parameters
        "device", "device_id", "device_type", "device_model", "device_brand", "device_os", "devicetype",
        "nettype", "client_type", "device_platform", "client_version",
    ];

    paramsToRemove.forEach((param) => {
        if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
            debugInfo.push(`[Base Rules] Removed parameter: ${param}`);
        }
    });

    return { url, debugInfo };
}