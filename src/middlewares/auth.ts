// ./middleware/auth.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { validToken } from "../config";

export function verifyToken(request: FastifyRequest, reply: FastifyReply, done: () => void): void {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        reply.code(401).send({ error: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];
    if (token !== validToken) {
        reply.code(401).send({ error: "Invalid token" });
        return;
    }

    done();
}