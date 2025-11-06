import type { I_UserDocument } from "../models/user.model.ts";
import type * as z from "zod";
import type { UserSchema } from "../middlewares/validation.middlewares.ts";


declare global {
    namespace Express {
        interface Request {
            user?: I_UserDocument;
            validateData?: z.infer<typeof UserSchema>;
            organization?: any
        }
    }
}