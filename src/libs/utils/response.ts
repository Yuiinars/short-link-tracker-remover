// ./libs/utils/response.ts
export interface ApiResponse {
    status: "success" | "error";
    message: string;
    time: string;
}

export const API_R = (message: string, status: "success" | "error" = "success"): ApiResponse => ({
    status,
    message,
    time: new Date().toISOString()
});