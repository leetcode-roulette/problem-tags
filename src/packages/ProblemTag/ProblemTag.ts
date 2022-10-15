import { getProblemdatas } from "../../db/problemdata";
import { IProblemData } from "../../models/problemdata";
import ProblemTagDB from "../../db/ProblemTagDB";
import { IProblemtag } from "../../models/problemtag";

export default class ProblemTag {
	static problemdatas: IProblemData[] | undefined = undefined;

	static async getProblemdatas() {
		if (!this.problemdatas) {
			this.problemdatas = await getProblemdatas();
		}
		return this.problemdatas;
	}

	static async handleProblemData(problemData: IProblemData) {
		problemData.tags.forEach((tag) => {
			const problemtag: IProblemtag = { problemID: problemData.problemID, tagSlug: tag.slug };
			ProblemTagDB.insert(problemtag);
		});
	}

	private static async createProblemtagCollection() {
		const problemdatas = await this.getProblemdatas();
		problemdatas.forEach((problemdata) => {
			this.handleProblemData(problemdata);
		});
	}

	public static async start() {
		await this.createProblemtagCollection();
	}
}
