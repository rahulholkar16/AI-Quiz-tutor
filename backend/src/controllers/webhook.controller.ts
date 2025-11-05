import type { Request, Response } from "express";
import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET!, { apiVersion: "2025-10-29.clover" });

export const handleStripeWebhook = asyncHandler((req: Request, res: Response) => {
    const event = req.body;
    console.log("Stripe event:", event.type);
    res.json({ received: true });
});
