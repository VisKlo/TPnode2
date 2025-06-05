import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { users, movies } from "./";

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    movieId: uuid("movieId").references(() => movies.id, { onDelete: "cascade" }).notNull(),
    authorId: uuid("userId").references(() => users.id, { onDelete: "cascade" }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp('created_at').defaultNow()
});