// ./middlewares/rate-limit.ts
import { FastifyInstance } from 'fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import { serverConfig } from '../config';

const { rateLimit, realIpHeaders } = serverConfig;

export async function rateLimitMiddleware(ctx: FastifyInstance): Promise<void> {
    await ctx.register(fastifyRateLimit, {
        max: rateLimit.max,
        timeWindow: rateLimit.timeWindow,
        keyGenerator: (request) => {
            for (const header of realIpHeaders) {
                const ip = request.headers[header.toLowerCase()];
                if (ip) return Array.isArray(ip) ? ip[0] : ip;
            }
            return request.ip;
        }
    });
}