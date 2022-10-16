import { FilterQuery } from "mongoose";
import { IProblemtag, Problemtag } from "../models/problemtag";
import { logger } from "../logger";

export default class ProblemtagDB {
	public static async insert(problemtagData: IProblemtag) {
		const filter: FilterQuery<IProblemtag> = { ...problemtagData };

		const problemtagCheck = await Problemtag.findOne(filter).exec();
		if (problemtagCheck) {
			const { problemID, tagSlug } = problemtagData;
			logger.warn(`ProblemTag: { problemID: ${problemID}, tagSlug: '${tagSlug}' } already exists in collection.`);
			return;
		}

		const problemtag = await Problemtag.create(problemtagData);
		await problemtag.save();
	}
}
