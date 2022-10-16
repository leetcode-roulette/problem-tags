import { getProblemdatas } from "../../db/problemdata";
import { IProblemData } from "../../models/problemdata";
import ProblemtagDB from "../../db/ProblemtagDB";
import { IProblemtag } from "../../models/problemtag";

export default class Problemtag {
	static problemdatas: IProblemData[] | undefined = undefined;

	private static async getProblemdatas() {
		if (!this.problemdatas) {
			this.problemdatas = await getProblemdatas();
		}
		return this.problemdatas;
	}

	private static async handleProblemData(problemData: IProblemData) {
		problemData.tags.forEach(async (tag) => {
			const problemtag: IProblemtag = { problemID: problemData.problemID, tagSlug: tag.slug };
			await ProblemtagDB.insert(problemtag);
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
