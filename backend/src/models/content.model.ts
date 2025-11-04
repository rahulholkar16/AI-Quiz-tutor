import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

export interface I_Content extends mongoose.Document {
    "_id": Types.ObjectId,
    "title": string,
    "url"?: string,
    "tags"?: Types.ObjectId[],
    "userId": Types.ObjectId,
    "isPublic"?: boolean
};

const content = new Schema<I_Content>({
    title: { type: String, required: true },
    url: { type: String },
    tags: [ { type: mongoose.Types.ObjectId, ref: "Tag" } ],
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    isPublic: { type: Boolean, default: false }
}, {timestamps: true});

content.pre("deleteOne", async function (this: I_Content, next) {
    const userId = this.userId;
    await mongoose.model("User").updateOne(
        { _id: userId },
        { $pull: { content: this._id } }
    );
    next();
});

export const ContentModel = (mongoose.models?.Content as mongoose.Model<I_Content>) || (mongoose.model<I_Content>("Content", content));