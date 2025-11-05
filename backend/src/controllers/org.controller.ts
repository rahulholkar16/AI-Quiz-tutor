import type { Request, Response } from "express";
import { OrgModel } from "../models/organization.model.js";
import { PlanModel } from "../models/plan.model.js";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import slugify from "slugify";
import { ApiResponse } from "../utils/apiResponse.js";

export async function createOrg(req: Request, res: Response) {
    // @ts-ignore
    const createSlug = (text: string) => slugify.default ? slugify.default(text, { lower: true, strict: true }) : slugify(text, { lower: true, strict: true });
    const { name, ownerName, ownerEmail, ownerPassword, planSku } = req.body;
    if (!name || !ownerName || !ownerEmail || !ownerPassword) throw new ApiError(400, "Missing field!");
    const slug = createSlug(name);
    const existing = await OrgModel.findOne({ slug });
    if (existing) throw new ApiError(400, "Organization slug already exists");

        const plan = planSku ? await PlanModel.findOne({ sku: planSku }) : await PlanModel.findOne({ sku: "free" });

        const org = await OrgModel.create({
            name,
            slug,
            planSku: plan?.sku || "free",
            seats: 1
        });

        const hash = await bcrypt.hash(ownerPassword, 10);
        const user = await UserModel.create({
            organizationId: org._id,
            name: ownerName,
            email: ownerEmail,
            passwordHash: hash,
            role: "owner"
        });

        res.status(201).json( 
            new ApiResponse(200, { organization: org, owner: { id: user._id, email: user.email } }, "Organization create successfully")
        )
};

export async function getOrg(req: Request, res: Response) {
    const org = await OrgModel.findById(req.params.id).lean();
    if (!org) throw new ApiError(400, "Organization not found!");
    res.status(200).json(
        new ApiResponse(200, org)
    );
}
