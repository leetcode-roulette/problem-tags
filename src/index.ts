import { config } from "dotenv";
import express, { Application } from "express";
import healthcheck from "./healthcheck";
import Database from "./db/db.config";

import ProblemTag from "./packages/ProblemTag/Problemtag";
config();

export const app = (async () => {
	await Database.connect();
	const app: Application = express();
	app.use("/", healthcheck);

	//await Tag.start();
	await ProblemTag.start();
	return app;
})();
