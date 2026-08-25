CREATE TABLE "giveaway_signups" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now()
);
