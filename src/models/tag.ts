import mongoose, { Model, Schema } from "mongoose";

export interface ITag {
	tagSlug: string;
	name: string;
}

const TagSchema: Schema<ITag> = new Schema({
	tagSlug: { type: "string", unique: true, required: true },
	name: { type: "string", required: true },
});

export const Tag: Model<ITag> = mongoose.model("tags", TagSchema);
