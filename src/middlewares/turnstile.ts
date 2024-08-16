// ./middleware/turnstile.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import got from 'got';
import { serverConfig } from "../config.ts";
import { getClientIP } from '../libs/utils/getClientIP';
import { API_R } from '../libs/utils/response';

interface TurnstileResponse {
    success: boolean;
    "error-codes": string[];
    challenge_ts: string;
    hostname: string;
}

async function verifyTurnstileToken(token: string, remoteip: string): Promise<boolean> {
    try {
        const response = await got.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            json: {
                secret: serverConfig.cfPrivateKey,
                response: token,
                remoteip: remoteip
            },
            responseType: 'json'
        });

        const body = response.body as TurnstileResponse;

        if (typeof body === 'object' && body !== null && 'success' in body) {
            return body.success === true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function verifyTurnstile(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const turnstileToken = request.headers['turnstile-response'] as string;

    if (serverConfig.cfBypassToken && turnstileToken === serverConfig.cfBypassToken) return;

    if (!serverConfig.cfPrivateKey) {
        reply.code(500).send(API_R("Configuration Error: Turnstile private key is not set", "error"));
        return;
    }

    if (!turnstileToken) {
        reply.code(400).send(API_R("Missing Turnstile token", "error"))
        return;
    }

    const clientIP = getClientIP(request);

    if (!clientIP) {
        reply.code(500).send(API_R("Server Error: Failed to get client IP", "error"))
        return;
    }

    const isValid = await verifyTurnstileToken(turnstileToken, clientIP);

    if (!isValid) {
        reply.code(403).send(API_R("Invalid Turnstile token", "error"))
        return;
    }
}
