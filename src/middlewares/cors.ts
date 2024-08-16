// ./middleware/cors.ts
import cors from "@fastify/cors";
import { corsConfig } from "../config.ts";
import type { FastifyInstance } from 'fastify';
export default async function corsMiddleware(fastify: FastifyInstance): Promise<void> {
  const {
    allowedOrigins = [],
    allowedMethods = [],
    allowedHeaders = [],
    exposedHeaders = [],
    corsTTL = 86400,
    credentials = false
  } = corsConfig;

  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        cb(null, true);
      } else {
        cb(new Error("Request not allowed (CORS)"), false);
      }
    },
    credentials,
    methods: allowedMethods,
    allowedHeaders,
    exposedHeaders,
    maxAge: corsTTL,
  });

  fastify.log.info("CORS middleware registered");
}