import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const response = pgTable("response", {
	id: text("id").primaryKey(),
	formId: text("form_id").notNull(),
	data: jsonb("data").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
