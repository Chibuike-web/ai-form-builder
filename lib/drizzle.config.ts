import { config } from "dotenv";

config({ path: ".env.local" });

export default {
	schema: "./db/schemas/**",
	out: "./db/drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
};
