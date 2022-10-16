import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProblemtag {
	problemID: number;
	tagSlug: string;
}

const ProblemtagSchema: Schema<IProblemtag> = new Schema({
	problemID: { type: "number", required: true },
	tagSlug: { type: "string", required: true },
});

export const Problemtag: Model<IProblemtag> = mongoose.model("problemtag", ProblemtagSchema);
