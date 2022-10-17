import { config } from "dotenv";
import mongoose from "mongoose";
import Tag from "../Tag/Tag";
import { ITag, Tag as TagModel } from "../../models/tag";
import { iTags, ProblemData } from "../../models/problemdata";
import { ObjectId } from "mongodb";
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

describe("Tag Package", () => {
	test("Create tag collection with records.", async () => {
		await Tag.start();
		const tags: ITag[] = await TagModel.find({}).exec();
		expect(tags).toEqual([]);
	});
});
