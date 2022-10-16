import { config } from "dotenv";
import mongoose from "mongoose";
import { IProblemtag, Problemtag } from "../../models/problemtag";
import ProblemtagDB from "../ProblemtagDB";
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

describe("Problemtag Database", () => {
	test("Insert Problemtag into collection", async () => {
		const problemtag: IProblemtag = { problemID: 1, tagSlug: "example-tag-slug" };
		await ProblemtagDB.insert(problemtag);
		const document = await Problemtag.findOne({ ...problemtag });
		expect(document).not.toBeNull();
	});
});
