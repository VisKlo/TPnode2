import { db } from "../config/pool";
import { logger } from "../utils/logger";
import { comments } from "../schemas";
import { NewComment } from "../entities/Comment";
import { eq } from "drizzle-orm";

export const commentsModel = {
  getAll: () => {
    try {
      return db.query.comments.findMany({
        with: {
          user: true,
          movie: true
        },
      });
    } catch (err: any) {
      logger.error(`Erreur lors de la récupération des commentaires: ${err.message}`);
      throw new Error("Impossible de récupérer les commentaires");
    }
  },

  get: (id: string) => {
    try {
      return db.query.comments.findFirst({
        where: eq(comments.id, id),
        with: {
          user: true,
          movie: true,
        },
      });
    } catch (err: any) {
      logger.error(`Erreur lors de la récupération du commentaire: ${err.message}`);
      throw new Error("Impossible de récupérer le commentaire");
    }
  },

  create: (comment: NewComment) => {
    try {
      return db.insert(comments)
        .values(comment)
        .returning({ id: comments.id })
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la création du commentaire: ${err.message}`);
      throw new Error("Impossible de créer le commentaire");
    }
  },

  update: (id: string, comment: Partial<NewComment>) => {
    try {
      return db.update(comments)
        .set(comment)
        .where(eq(comments.id, id))
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la mise à jour du commentaire: ${err.message}`);
      throw new Error("Impossible de mettre à jour le commentaire");
    }
  },

  delete: (id: string) => {
    try {
      return db.delete(comments)
        .where(eq(comments.id, id))
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la suppression du commentaire: ${err.message}`);
      throw new Error("Impossible de supprimer le commentaire");
    }
  },
};
