// ./config.ts
// Rename this file to config.ts before running.
import packageJson from "../package.json";


export const serverConfig: ServerConfig = {
    version: packageJson.version,
    
    // Server Configuration, see https://fastify.dev/docs/latest/Reference/Server/#listen
    host: "localhost",      // API Listening IP (:: / 0.0.0.0 for all)
    port: 3882,             // API Listening Port
    
    // API Token, Please change it to your own token
    validToken: "please change me",
    
    // Maximum number of links that can be processed in a single /clearLink request
    maxLinks: 10,
    
    // Rate Limit, see https://github.com/fastify/fastify-rate-limit
    rateLimit: {
        max: 60,           // 60 requests
        timeWindow: '1h'   // per hour, see https://github.com/vercel/ms#examples
    },
    
    // Cloudflare Turnstile (like Google reCAPTCHA), A more private and secure alternative.
    // Go to https://dash.cloudflare.com/?to=/:account/turnstile/add to get your keys,
    // MUST NOT BE EMPTY, for security reasons
    cfPrivateKey: "",

    // Special Token to temporarily bypass Turnstile validation, 
    // for API debugging purposes.
    // Disable this feature if empty.
    cfBypassToken: "",
    
    // Possibly enable logging in development, useful for debugging
    enableLogging: false,

    // Enable if your server is behind a reverse proxy
    // (Nginx, Cloudflare, etc.)
    trustProxy: false,

    // Common header for real IP,
    // alternatives: 'X-Forwarded-For', 'CF-Connecting-IP' (Cloudflare), 'X-Real-IP' (Nginx)
    realIpHeaders: ['X-Real-IP', 'X-Forwarded-For']
};

export const corsConfig: CorsConfig = {
    // API CORS allowed origins,
    // see https://developer.mozilla.org/docs/Web/HTTP/Headers/Origin
    
    // Replace with your own domain
    allowedOrigins: ["http://localhost:3000", "https://example.com"],
    allowedMethods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Turnstile-Response"],
    exposedHeaders: ["Content-Disposition"],
    credentials: true,
    corsTTL: 86400, // seconds (1 day)
};

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
    cfPrivateKey: string;
    cfBypassToken: string;
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