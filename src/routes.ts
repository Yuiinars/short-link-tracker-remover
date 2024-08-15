import type { RouteOptions, RouteHandlerMethod } from 'fastify';
import { serverConfig } from './config.ts';
import { resolveUrl, previewURL } from "./libs/utils/urlResolver";
import { cleanUrl } from "./libs/utils/urlCleaner";
import { URL } from 'url';

interface Link {
  original: string;
  cleaned: URL;
  debugInfo: string[];
}

interface ApiResponse {
  status: "success" | "error";
  message: string;
  time: string;
}

const createApiResponse = (message: string, status: "success" | "error" = "success"): ApiResponse => ({
  status,
  message,
  time: new Date().toISOString()
});

const versionRoute: RouteOptions = {
  method: 'GET',
  url: '/',
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
          message: { type: "string" },
          time: { type: "string" },
          version: { type: "string" }
        }
      },
    },
  },
  handler: async (request, reply) => {
    try {
      return {
        ...createApiResponse("Welcome to the Link Cleaner API!"),
        version: serverConfig.validToken
      };
    } catch (error) {
      request.log.error("Error in version route:", error);
      reply.code(500).send(createApiResponse("Internal server error", "error"));
    }
  }
};

const clearLinkRoute: RouteOptions = {
  method: "POST",
  url: "/clearLink",
  schema: {
    body: {
      type: "object",
      required: ["links"],
      properties: {
        links: {
          type: "array",
          items: { type: "string" },
          maxItems: serverConfig.maxLinks,
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
          message: { type: "string" },
          time: { type: "string" },
          cleanedLinks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                original: { type: "string" },
                cleaned: { type: "string" },
                debugInfo: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["original", "cleaned", "debugInfo"],
            },
          },
        },
      },
    },
  },
  handler: (async (request, reply) => {
    const { links } = request.body as { links: string[] };

    if (!Array.isArray(links) || links.length === 0) {
      reply.code(400).send(createApiResponse("Invalid or empty links array", "error"));
      return;
    }

    if (links.length > serverConfig.maxLinks) {
      reply.code(400).send(createApiResponse(`Exceeded maximum number of links (${serverConfig.maxLinks})`, "error"));
      return;
    }

    try {
      const cleanedLinks = await Promise.all(links.map(processLink(request)));

      return {
        ...createApiResponse("Links processed successfully"),
        cleanedLinks,
      };
    } catch (error) {
      request.log.error("Error processing links:", error);
      reply.code(500).send(createApiResponse("Error processing links", "error"));
    }
  }) as RouteHandlerMethod
};


const processLink = (request: any) => async (link: string): Promise<Link> => {
  try {
    const resolvedUrl = await resolveUrl(link);
    const { cleanedUrl, debugInfo } = cleanUrl(resolvedUrl);
    return {
      original: link,
      cleaned: cleanedUrl,
      debugInfo: debugInfo.map(String),
    };
  } catch (error) {
    request.log.error(`Error processing link ${link}:`, error);
    return {
      original: link,
      cleaned: new URL(link),
      debugInfo: ["Error occurred during cleaning: " + (error instanceof Error ? error.message : String(error))],
    };
  }
};


const getPreviewRoute: RouteOptions = {
  method: "POST",
  url: "/getPreview",
  schema: {
    body: {
      type: "object",
      required: ["url"],
      properties: {
        url: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
          message: { type: "string" },
          time: { type: "string" },
          preview: {
            type: "object",
            properties: {
              url: { type: "string" },
              title: { type: "string" },
              description: { type: "string" },
              image: { type: "string" },
              favicon: { type: "string" },
              keywords: {
                type: "array",
                items: { type: "string" },
              },
              ogMetadata: {
                type: "object",
                additionalProperties: { type: "string" }
              },
              twitterMetadata: {
                type: "object",
                additionalProperties: { type: "string" }
              },
            },
          },
        },
      },
    },
  },
  handler: (async (request, reply) => {
    const { url } = request.body as { url: string };

    if (!url || typeof url !== 'string') {
      reply.code(400).send(createApiResponse("Invalid URL", "error"));
      return;
    }

    try {
      const preview = await previewURL(url);

      return {
        ...createApiResponse("URL preview generated successfully"),
        preview,
      };
    } catch (error) {
      request.log.error("Error generating URL preview:", error);
      reply.code(500).send(createApiResponse("Error generating URL preview", "error"));
    }
  }) as RouteHandlerMethod
};

const routes: RouteOptions[] = [versionRoute, clearLinkRoute, getPreviewRoute];

export default routes;