// ./server.ts
import Fastify, { type FastifyInstance } from 'fastify';
import { port } from './config';
import routes from './routes';
import corsMiddleware from './middlewares/cors';
import { verifyToken } from './middlewares/auth';

const fastify: FastifyInstance = Fastify({ logger: true });

async function start(): Promise<void> {
  try {
    await corsMiddleware(fastify);

    fastify.addHook('preHandler', verifyToken);

    routes.forEach(route => fastify.route(route));

    await fastify.listen({ port });
    fastify.log.info(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();