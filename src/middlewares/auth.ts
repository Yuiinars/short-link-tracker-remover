// ./middleware/auth.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { serverConfig } from "../config.ts";
import { API_R } from '../libs/utils/response';

export function verifyToken(request: FastifyRequest, reply: FastifyReply, done: () => void): void {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        reply.code(401).send(API_R("Unauthorized", "error"));
        return;
    }

    const token = authHeader.split(" ")[1];
    if (token !== serverConfig.validToken) {
        reply.code(401).send(API_R("Invalid token", "error"));
        return;
    }

    done();
}