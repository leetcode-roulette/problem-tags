import { config } from "dotenv";
import mongoose from "mongoose";
import Problemtag from "../ProblemTag/ProblemTag";
import { IProblemtag, Problemtag as Problemtagmodel } from "../../models/problemtag";
config();

beforeAll((done) => {
	if (!process.env.MONGO_CONNECTION_STRING_TEST) {
		throw "MONGO_CONNECTION_STRING_TEST can not be found or is not defined";
	}
	done();
});

beforeEach((done) => {
	mongoose.connect(process.env.MONGO_CONNECTION_STRING_TEST!, {}, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("Problemtag Package", () => {
	test("Create Problemtag collection with records", async () => {
		await Problemtag.start();
		const problemtags: IProblemtag[] = await Problemtagmodel.find({}).exec();
		expect(problemtags).toEqual([]);
	});
});
