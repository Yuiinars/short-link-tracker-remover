// ./libs/utils/urlResolver.ts
import got, { HTTPError } from 'got';

const requestHeaders: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "upgrade-insecure-requests": "1",
};

export async function resolveUrl(url: string, maxRedirects: number = 5): Promise<URL> {
  let currentUrl = new URL(url);

  try {
    const response = await got(currentUrl.href, {
      method: 'GET',
      headers: requestHeaders,
      followRedirect: true,
      maxRedirects: maxRedirects,
      throwHttpErrors: false,
      https: {
        rejectUnauthorized: false,
        checkServerIdentity: (hostname, cert) => {
          if (cert && !cert.subject.CN) {
            console.warn(`Warning: Invalid certificate for ${hostname}`);
          }
          return undefined;
        },
      },
    });

    currentUrl = new URL(response.url);
  } catch (error) {
    if (error instanceof HTTPError) {
      console.error(`HTTP error resolving URL: ${error.message}`);
    } else {
      console.error(`Error resolving URL: ${(error as Error).message}`);
    }
  }

  return currentUrl;
}