import { relations } from "drizzle-orm";
import { users, comments, movies, categories } from "./";

export const usersRelations = relations(users, ({ many }) => ({
    comments: many(comments)
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        fields: [comments.authorId],
        references: [users.id]
    }),

    movie: one(movies, {
        fields: [comments.movieId],
        references: [movies.id]
    })
}));

export const moviesRelation = relations(movies, ({ one, many }) => ({
    comments: many(comments),
    categories: one(categories, {
        fields: [movies.categoryId],
        references: [categories.id],
    }),
}))

export const categoriesRelation = relations(categories, ({ many }) => ({
    movies: many(movies)
}))