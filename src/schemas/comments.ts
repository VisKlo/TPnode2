import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { users, movies } from "./";

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    movieId: uuid("movie_id").references(() => movies.id, { onDelete: "cascade" }).notNull(),
    authorId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp('created_at').defaultNow()
});