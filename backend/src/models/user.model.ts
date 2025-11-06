import mongoose, { type UpdateQuery, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import crypto from "crypto";

const Schema = mongoose.Schema;

export interface I_UserDocument extends mongoose.Document {
    "_id": Types.ObjectId,
    "name": string,
    "email": string,
    "password": string,
    "avatar"?: string,
    "isVerified": boolean,
    "verificationToken"?: string | undefined,
    "verificationTokenExpire"?: Date | undefined,
    "resetPasswordToken"?: string,
    "resetPasswordTokenExpire"?: Date | undefined,
    "refreshToken"?: string,
    "role": string,
    "organizationId": Types.ObjectId,
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string; // note: typo in your schema
    generateTempToken(): {
        unHashedToken: string;
        hasedToken: string;
        tokenExpiry: Date;
    };
};

const user = new Schema<I_UserDocument>({
    "name": { type: String, required: true },
    "email": { type: String, unique: true, required: true },
    "password": { type: String, required: true },
    "organizationId": { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    "role": { type: String, enum: ["owner", "admin", "member"], default: "member" },
    "avatar": { type: String },
    "isVerified": { type: Boolean, default: false },
    "verificationToken": { type: String },
    "verificationTokenExpire": { type: Date },
    "resetPasswordToken": { type: String },
    "resetPasswordTokenExpire": { type: Date },
    "refreshToken": { type: String },

}, {timestamps: true});

user.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

user.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as UpdateQuery<any>;
    if(update && update.password) {
        this.setUpdate({ ...update, password: await bcrypt.hash(update.password, 10) } )
    }
    next();
});

user.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

user.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id as string,
            email: this.email,
            OrgId: this.organizationId
        },
        process.env.ACCESS_JWT_SECRET!,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! } as SignOptions
    );
};

user.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            OrgId: this.organizationId
        },
        process.env.REFRESH_JWT_SECRET!,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } as SignOptions
    );
};

user.methods.generateTempToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hasedToken = crypto
            .createHash("sha256")
            .update(unHashedToken)
            .digest("hex");
    const tokenExpiry = Date.now() + (10*60*1000);
    return { unHashedToken, hasedToken, tokenExpiry };
}

export const UserModel = (mongoose.models?.User as mongoose.Model<I_UserDocument>) || mongoose.model<I_UserDocument>("User", user);