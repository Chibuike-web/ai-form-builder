CREATE TABLE "response" (
	"id" text PRIMARY KEY NOT NULL,
	"form_id" text NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
