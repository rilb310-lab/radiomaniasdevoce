import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const giveawaySignups = pgTable("giveaway_signups", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
