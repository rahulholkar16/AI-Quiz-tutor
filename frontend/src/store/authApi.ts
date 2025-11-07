// common API response shape
export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

// individual user type (already defined)
export interface User {
    _id: string;
    name: string;
    email: string;
    organizationId?: string;
    isVerified?: boolean;
}

// --- Generic fetch helper ---
async function fetchRequest<T>(
    path: string,
    method: string = "GET",
    body?: unknown
): Promise<ApiResponse<T>> {
    const base = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
    
    
    const res = await fetch(`${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: method === "GET" ? undefined : JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

    if (!res.ok) {
        const message =
            typeof payload === "object" && payload !== null && "message" in payload
                ? (payload as { message: string }).message
                : String(payload ?? `HTTP ${res.status}`);

        const error = new Error(message) as Error & { status?: number; payload?: unknown };
        error.status = res.status;
        error.payload = payload;
        throw error;
    }

    return payload as ApiResponse<T>;
}

// --- Auth API endpoints ---
export const authApi = {
    register: (payload: { name: string; email: string; password: string; organizationName: string }) =>
        fetchRequest<{ user: User }>("/register", "POST", payload),

    login: (payload: { email: string; password: string }) => fetchRequest<{ user: User }>("/login", "POST", payload),

    logout: () => fetchRequest<Record<string, never>>("/logout", "POST", {}),

    getCurrentUser: () => fetchRequest<User>("/me", "GET"),

    refreshToken: () => fetchRequest<Record<string, never>>("/refresh-token", "POST", {}),

    forgotPassword: (payload: { email: string }) => fetchRequest("/forgot-password", "POST", payload),
};
