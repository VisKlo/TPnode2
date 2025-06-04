import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
});