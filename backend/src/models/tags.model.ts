import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

interface I_tags extends mongoose.Document {
    tag: string,
    userId: Types.ObjectId;
}