import { FilterQuery, UpdateQuery } from "mongoose";
import { Tag, ITag } from "../models/tag";
export default class TagDB {
	public static async insert(tagData: ITag) {
		const filter: FilterQuery<ITag> = { tagSlug: tagData.tagSlug };
		const update: UpdateQuery<ITag> = {
			...tagData,
		};

		const tag = await Tag.findOneAndUpdate(filter, update, {
			new: true,
			upsert: true,
		});

		await tag.save();
	}
}
