import { db } from "../config/pool"
import { logger } from "../utils/logger"
import { movies, categories, comments } from "../schemas"
import { NewMovie } from "../entities/Movie"
import { eq } from "drizzle-orm"

export const moviesModel = {
  getAll: async () => {
    try {
      return await db.query.movies.findMany({
        with: {
          category: {
            columns: { id: true, content: true }
          }
        }
      });
    } catch (err: any) {
      logger.error(`Erreur lors de la récupération des films: ${err.message}`);
      throw new Error("Impossible de récupérer les films");
    }
  },

  get: async (id: string) => {
    try {
      return await db.query.movies.findFirst({
        where: eq(movies.id, id),
        with: {
          comments: {
            columns: {
              id: true,
              content: true,
              authorId: true,
              createdAt: true
            }
          },
          category: {
            columns: { id: true, content: true }
          }
        }
      });
    } catch (err: any) {
      logger.error(`Erreur lors de la récupération du film: ${err.message}`);
      throw new Error("Impossible de récupérer le film");
    }
  },

  create: async (movie: NewMovie) => {
    try {
      return await db.insert(movies).values(movie).returning({ id: movies.id });
    } catch (err: any) {
      logger.error(`Erreur lors de la création du film: ${err.message}`);
      throw new Error("Impossible de créer le film");
    }
  },

  update: async (id: string, movie: NewMovie) => {
    try {
      return await db.update(movies)
        .set(movie)
        .where(eq(movies.id, id))
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la mise à jour du film: ${err.message}`);
      throw new Error("Impossible de mettre à jour le film");
    }
  },

  delete: async (id: string) => {
    try {
      return await db.delete(movies).where(eq(movies.id, id));
    } catch (err: any) {
      logger.error(`Erreur lors de la suppression du film: ${err.message}`);
      throw new Error("Impossible de supprimer le film");
    }
  }
}