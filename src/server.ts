// ./server.ts
import Fastify from 'fastify';
import { serverConfig } from './config';
import routes from './routes';
import corsMiddleware from './middlewares/cors';
import { verifyToken } from './middlewares/auth';
import { rateLimitMiddleware } from './middlewares/rateLimit';
import { verifyTurnstile } from './middlewares/turnstile';

const { port, host, enableLogging, trustProxy } = serverConfig;

const ctx = Fastify({
  logger: enableLogging,
  trustProxy: trustProxy
});

async function start(): Promise<void> {
  await rateLimitMiddleware(ctx);

  await corsMiddleware(ctx);

  ctx.addHook('preHandler', verifyToken);
  ctx.addHook('preValidation', verifyTurnstile);

  ctx.register((instance, opts, done) => {
    routes.forEach(route => instance.route(route));
    done();
  });

  try {
    await ctx.listen({ port, host });
    ctx.log.info(`Server is running on http://${host}:${port}`);
  } catch (err) {
    ctx.log.error(err);
    process.exit(1);
  }
}

start();