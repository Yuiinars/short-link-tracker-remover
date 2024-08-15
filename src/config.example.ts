// ./config.ts
// Rename this file to config.ts before running.
import packageJson from "../package.json";

export interface ServerConfig {
    version: string;
    host: string;
    port: number;
    validToken: string;
    maxLinks: number;
    rateLimit: {
        max: number;
        timeWindow: string;
    };
    enableLogging: boolean;
    trustProxy: boolean;
    realIpHeaders: string[];
}

export interface CorsConfig {
    allowedOrigins: string[];
    allowedMethods: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    credentials: boolean;
    corsTTL: number;
}

export const serverConfig: ServerConfig = {
    version: packageJson.version,
    host: "localhost",      // API Listening IP, see: https://fastify.dev/docs/latest/Reference/Server/#listen
    port: 3882,             // API Listening Port
    validToken: "22334455", // API Token, Please change it to your own token
    maxLinks: 10,           // Maximum number of links that can be processed in a single /clearLink request
    rateLimit: {
        max: 120,           // 120 requests
        timeWindow: '1h'    // per hour, see https://github.com/vercel/ms#examples
    },
    enableLogging: true,    // Possibly disable logging in production
    trustProxy: false,       // Enable if your server is behind a reverse proxy (e.g. Nginx, Cloudflare)
    // Common header for real IP, alternatives: 'X-Forwarded-For', 'CF-Connecting-IP' (Cloudflare)
    realIpHeaders: ['X-Real-IP', 'X-Forwarded-For']
};

export const corsConfig: CorsConfig = {
    // API CORS allowed origins, see https://developer.mozilla.org/docs/Web/HTTP/Headers/Origin
    allowedOrigins: ["http://localhost:3000", "https://example.com"], // Replace with your own domain
    allowedMethods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
    credentials: true,
    corsTTL: 86400, // 24 hours
};