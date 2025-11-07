import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import type { User } from "./authApi"; // or wherever your User interface is


// Utility function to safely extract message
function extractErrorMessage(error: unknown): string {
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response?.data?.message === "string"
    ) {
        return (error as any).response.data.message;
    }
    return "An unexpected error occurred.";
}

/* -------------------------------------------------------------------------- */
/*                               REGISTER USER                                */
/* -------------------------------------------------------------------------- */
export const registerUser = createAsyncThunk<
    User, // ✅ return type (resolved)
    { name: string; email: string; password: string; organizationName: string }, // ✅ input
    { rejectValue: string } // ✅ rejected value type
>("auth/registerUser", async (payload, { rejectWithValue }) => {
    try {
        const res = await authApi.register(payload);
        // backend returns { statusCode, data: { user }, message }
        return res.data?.user as User;
    } catch (error: unknown) {
        return rejectWithValue(extractErrorMessage(error));
    }
});

/* -------------------------------------------------------------------------- */
/*                                 LOGIN USER                                 */
/* -------------------------------------------------------------------------- */
export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
    
    try {
        const res = await authApi.login(payload);
        console.log(res);
        return res?.data?.user as User;

    } catch (error: unknown) {
        return rejectWithValue(extractErrorMessage(error));
    }
});

/* -------------------------------------------------------------------------- */
/*                              FORGOT PASSWORD                               */
/* -------------------------------------------------------------------------- */
export const forgotPassword = createAsyncThunk<
    string, // ✅ return string message
    { email: string },
    { rejectValue: string }
>("auth/forgotPassword", async (payload, { rejectWithValue }) => {
    try {
        const res = await authApi.forgotPassword(payload);
        return res.message || "Reset link sent successfully";
    } catch (error: unknown) {
        return rejectWithValue(extractErrorMessage(error));
    }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await authApi.logout(); // ✅ backend clears cookies
        } catch (error: unknown) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);
