import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const DEFAULT_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function useFetch<T = unknown>(
    url: string,
    options: RequestInit = {},
    immediate = true
) {
    const BASE_URL = DEFAULT_BASE.replace(/\/+$/, "");
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(immediate);

    const executeFetch = useCallback(
        async (bodyData?: Record<string, unknown>): Promise<T> => {
            setLoading(true);
            setError(null);

            try {
                // optional fallback token from cookie (not strictly required when backend uses httpOnly)
                const token = Cookies.get("accessToken");

                const res = await fetch(`${BASE_URL}/${url.replace(/^\/+/, "")}`, {
                    ...options,
                    method: options.method || (bodyData ? "POST" : "GET"),
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        ...(options.headers || {}),
                    },
                    body: bodyData ? JSON.stringify(bodyData) : options.body,
                    credentials: "include", // must send cookies
                });

                if (!res.ok) {
                    // try to read JSON message, otherwise text
                    const ct = res.headers.get("content-type") || "";
                    const text = ct.includes("application/json") ? await res.json() : await res.text();
                    const message = typeof text === "string" ? text : text?.message || JSON.stringify(text);
                    throw new Error(`HTTP ${res.status}: ${message}`);
                }

                const ct = res.headers.get("content-type") || "";
                const parsed = ct.includes("application/json") ? (await res.json()) : (await res.text());
                setData(parsed as T);
                return parsed as T;
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                setError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url, options]
    );

    useEffect(() => {
        if (immediate) {
            void executeFetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [executeFetch, immediate]);

    return { data, error, loading, executeFetch };
}