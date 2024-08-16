// ./libs/utils/getClientIP.ts
import { FastifyRequest } from 'fastify';
import { serverConfig } from '../../config';

export function getClientIP(request: FastifyRequest): string | undefined {
    if (serverConfig.trustProxy) {
        for (const header of serverConfig.realIpHeaders) {
            const ip = request.headers[header.toLowerCase()] as string | undefined;
            if (ip) return Array.isArray(ip) ? ip[0] : ip;
        }
    }
    return request.ip;
}