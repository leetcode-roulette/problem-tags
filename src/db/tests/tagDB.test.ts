import { config } from "dotenv";
import mongoose from "mongoose";
import { ITag, Tag } from "../../models/tag";
import TagDB from "../TagDB";
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

describe("Tag Database", () => {
	test("Insert Tag into collection", async () => {
		const tag: ITag = { tagSlug: "example-tag-slug", name: "Example Tag Slug" };
		await TagDB.insert(tag);
		const document = await Tag.findOne({ ...tag }).exec();
		expect(document?.tagSlug).toEqual(tag.tagSlug);
		expect(document?.name).toEqual(tag.name);
	});
});
