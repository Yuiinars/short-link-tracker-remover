import { OptionsOfTextResponseBody, Response as GotResponse } from 'got';
import { gotSsrf } from 'got-ssrf'
import * as cheerio from 'cheerio';

const previewHeaders: Record<string, string> = {
  "User-Agent": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; tracker-remover/1.0.0; +https://github.com/Yuiinars/short-link-tracker-remover/blob/main/whoami.md) Chrome/127.0.0.0 Safari/537.36",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Cache-Control": "no-cache",
  "upgrade-insecure-requests": "1",
};

const defaultOptions: Partial<OptionsOfTextResponseBody> = {
  method: 'GET',
  followRedirect: true,
  maxRedirects: 5,
  throwHttpErrors: false,
  responseType: 'text',
  https: { rejectUnauthorized: true },
  timeout: { request: 5000 },
};

async function fetchUrl(url: string, options: Partial<OptionsOfTextResponseBody> = {}): Promise<GotResponse<string>> {
  try {
    return await gotSsrf(url, { ...defaultOptions, ...options });
  } catch (error) {
    console.error(`Error fetching URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
}

export async function resolveUrl(url: string): Promise<URL> {
  try {
    const response = await fetchUrl(url);
    return new URL(response.url);
  } catch (error) {
    console.error(`Error resolving URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw new Error(`Failed to resolve URL: ${url}`);
  }
}

export async function resolveTbcnUrl(url: string): Promise<URL> {
  try {
    const response = await fetchUrl(url);
    const match = response.body.match(/var\s+url\s*=\s*['"](.+?)['"]/);
    if (match && match[1]) {
      return new URL(match[1]);
    } else {
      throw new Error('Failed to extract URL from tb.cn response');
    }
  } catch (error) {
    console.error(`Error resolving tb.cn URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw new Error(`Failed to resolve tb.cn URL: ${url}`);
  }
}

interface URLPreview {
  url: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
  keywords: string[];
  ogMetadata: Record<string, string>;
  twitterMetadata: Record<string, string>;
}

export async function previewURL(url: string): Promise<URLPreview> {
  try {
    const response = await fetchUrl(url, { headers: previewHeaders });
    const $ = cheerio.load(response.body);

    const metadata: Record<string, Record<string, string>> = { og: {}, twitter: {} };
    let keywords: string[] = [];

    $('meta').each((_, element) => {
      const property = $(element).attr('property') || $(element).attr('name');
      const content = $(element).attr('content');
      if (property && content) {
        if (property.startsWith('og:')) {
          metadata.og[property.substring(3)] = content;
        } else if (property.startsWith('twitter:')) {
          metadata.twitter[property.substring(8)] = content;
        } else if (property.toLowerCase() === 'keywords') {
          keywords = content.split(',').map(keyword => keyword.trim()).filter(Boolean);
        }
      }
    });

    if (keywords.length === 0) {
      $('meta[property="article:tag"]').each((_, element) => {
        const content = $(element).attr('content');
        if (content) {
          keywords.push(content.trim());
        }
      });
    }

    const hostname = new URL(response.url).hostname;
    const favicon = `https://icon.horse/icon/${hostname}`;

    return {
      url: response.url,
      title: $('title').first().text() || metadata.og['title'] || metadata.twitter['title'] || '',
      description: metadata.og['description'] || metadata.twitter['description'] || $('meta[name="description"]').attr('content') || '',
      image: metadata.og['image'] || metadata.twitter['image'] || '',
      favicon,
      keywords,
      ogMetadata: metadata.og,
      twitterMetadata: metadata.twitter,
    };
  } catch (error) {
    console.error(`Error previewing URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw new Error(`Failed to preview URL: ${url}`);
  }
}