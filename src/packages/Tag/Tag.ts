import { getProblemdatas } from "../../db/problemdata";
import { IProblemData } from "../../models/problemdata";
import { ITag } from "../../models/tag";
import TagDB from "../../db/TagDB";
import { logger } from "../../logger";

export default class Tag {
	static problemdatas: IProblemData[] | undefined = undefined;

	static async getProblemdatas() {
		if (!this.problemdatas) {
			this.problemdatas = await getProblemdatas();
		}
		return this.problemdatas;
	}

	private static async handleProblemdata(problemdata: IProblemData) {
		const tags = problemdata.tags;
		tags.forEach(async (tagData) => {
			const tag: ITag = { tagSlug: tagData.slug, name: tagData.name };
			await TagDB.insert(tag);
		});
	}

	private static async createTagCollection() {
		const problemdatas = await this.getProblemdatas();
		problemdatas.forEach((problemdata) => {
			this.handleProblemdata(problemdata);
		});
	}

	static async start() {
		await this.createTagCollection();
		logger.info("Done with Tags");
	}
}
