// ./middlewares/rate-limit.ts
import { FastifyInstance } from 'fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import { serverConfig } from '../config';
import { getClientIP } from '../libs/utils/getClientIP';

const { rateLimit } = serverConfig;

export async function rateLimitMiddleware(ctx: FastifyInstance): Promise<void> {
    await ctx.register(fastifyRateLimit, {
        max: rateLimit.max,
        timeWindow: rateLimit.timeWindow,
        keyGenerator: (request) => {
            const clientIP = getClientIP(request);
            return clientIP || request.ip;
        },
        errorResponseBuilder: function (request, context) {
            return {
                status: 'error',
                message: 'Too Many Requests',
                time: new Date().toISOString(),
                expiresIn: (context.ttl / 1000), // seconds
                statusCode: 429
            }
        }
    });
    ctx.log.info("Rate-Limit middleware registered");
}