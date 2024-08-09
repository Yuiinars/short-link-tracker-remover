// ./config.ts

import packageJson from "../package.json";

export const version: string = packageJson.version;
export const port: number = 3882;             // API Listening Port
export const validToken: string = "22334455"; // API Token

export interface CorsConfig {
    allowedOrigins: string[];
}

export const corsConfig: CorsConfig = {
    // API CORS allowed origins, see https://developer.mozilla.org/docs/Web/HTTP/Headers/Origin
    allowedOrigins: ["http://localhost:3000", "https://example.com"]
};