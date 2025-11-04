import type { NextFunction, Response, Request } from "express";
import * as z from "zod";

const UserSchema = z.object({
    name: z
        .string({ message: "Invalid name!" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters long!" })
        .max(15, { message: "Name must be at most 15 characters long!" })
        .optional(),

    email: z.preprocess(
        (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
        z.email({ message: "Invalid email address" })
    ).optional(),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(64, { message: "Password must be at most 64 characters long" })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, {
            message:
                "Password must contain at least one special character (@, $, !, %, *, ?, &, #)",
        })
        .optional(),
});

export const ValidationMiddleware = (req: Request<{}, {}, { name: string; email: string; password: string;  }>, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const result = UserSchema.safeParse({ name, email, password });
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    req.validateData = result.data;
    next();
};

export const passwordValidator = (req: Request<{}, {}, { password: string; }>, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const result = UserSchema.safeParse({ password });
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    next();
}