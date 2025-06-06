import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { categories } from "./"

export const movies = pgTable("movies", {   
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    resume: text("resume").notNull(),
    categoryId: uuid("categoryId").references(() => categories.id, { onDelete: "cascade" }).notNull(),
})