import { relations } from "drizzle-orm";
import { users, comments, movies, categories } from "./";

export const userRelations = relations(users, ({ many }) => ({
    comments: many(comments)
}));

export const commentRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        fields: [comments.authorId],
        references: [users.id]
    }),

    post: one(movies, {
        fields: [comments.movieId],
        references: [movies.id]
    })
}));

export const movieRelation = relations(movies, ({ one, many }) => ({
    comments: many(comments),
    categories: many(categories)
}))

export const categoryRelation = relations(categories, ({ many }) => ({
    movies: many(movies)
}))