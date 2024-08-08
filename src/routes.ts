import type { RouteOptions, RouteHandlerMethod } from 'fastify';
import { version } from './config';
import { resolveUrl } from "./libs/utils/urlResolver";
import { cleanUrl } from "./libs/utils/urlCleaner";

interface Link {
  original: string;
  cleaned: string;
  debugInfo: string[];
}

interface ApiResponse {
  status: string;
  message: string;
  time: string;
}

const createApiResponse = (message: string): ApiResponse => ({
  status: "success",
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
  handler: async () => ({
    ...createApiResponse("Welcome to the Link Cleaner API"),
    version
  })
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

    try {
      const cleanedLinks = await Promise.all(links.map(processLink(request)));

      return {
        ...createApiResponse("Links processed successfully"),
        cleanedLinks,
      };
    } catch (error) {
      request.log.error("Error processing links:", error);
      reply.code(500).send({ error: "Internal server error" });
      throw error;
    }
  }) as RouteHandlerMethod
};

const processLink = (request: any) => async (link: string): Promise<Link> => {
  try {
    const resolvedUrl = await resolveUrl(link);
    const { cleanedUrl, debugInfo } = cleanUrl(resolvedUrl);
    return {
      original: link,
      cleaned: cleanedUrl.toString(),
      debugInfo: debugInfo.map(String),
    };
  } catch (error) {
    request.log.error(`Error processing link ${link}:`, error);
    return {
      original: link,
      cleaned: link,
      debugInfo: ["Error occurred during cleaning"],
    };
  }
};

const routes: RouteOptions[] = [versionRoute, clearLinkRoute];

export default routes;