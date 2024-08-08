// ./middleware/cors.ts
import cors from "@fastify/cors";
import { corsConfig } from "../config.ts";
import type { FastifyInstance } from 'fastify';

export default async function corsMiddleware(fastify: FastifyInstance): Promise<void> {
  const allowedOrigins = corsConfig.allowedOrigins || [];

  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
    maxAge: 86400, // 24 hours
  });

  fastify.log.info("CORS middleware registered");
}