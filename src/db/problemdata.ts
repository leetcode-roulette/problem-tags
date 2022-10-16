import { IProblemData, ProblemData } from "../models/problemdata";
export async function getProblemdatas(): Promise<IProblemData[]> {
	let problemdatas = await ProblemData.find({}).exec();
	return problemdatas;
}
