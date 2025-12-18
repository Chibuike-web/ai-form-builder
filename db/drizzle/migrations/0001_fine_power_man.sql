ALTER TABLE "user" RENAME TO "form";--> statement-breakpoint
ALTER TABLE "form" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "prompt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "json_schema" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "zod_schema" text NOT NULL;--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "ui_schema" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN "email_verified";--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN "image";