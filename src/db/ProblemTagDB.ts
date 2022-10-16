import { FilterQuery, UpdateQuery } from "mongoose";
import { IProblemtag, Problemtag } from "../models/problemtag";
export default class ProblemtagDB {
	public static async insert(problemtagData: IProblemtag) {
		const filter: FilterQuery<IProblemtag> = { ...problemtagData };
		const update: UpdateQuery<IProblemtag> = { ...problemtagData };

		const problemtag = await Problemtag.findOneAndUpdate(filter, update, {
			new: true,
			upsert: true,
		});
		await problemtag.save();
	}
}
