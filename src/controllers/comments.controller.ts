import { Request, Response } from "express"
import { commentsModel } from "../models/"
import { APIResponse } from "../utils/response"
import { logger } from "../utils/logger"
import { createCommentValidation } from "../validations"
import { z } from "zod";

const commentsController = {
    getAll: async (req: Request, res: Response) => {
        try {
            logger.info("[GET] Tous les commentaires")
            const comments = await commentsModel.getAll()
            APIResponse(res, comments, "OK")
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    get: async (req: Request, res: Response) => {
        try {
            logger.info("[GET] Un commentaire")
            const comment = await commentsModel.get(req.params.id)
            APIResponse(res, comment, "OK")
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            logger.info("[POST] Créer un commentaire");

            const { content, movieId } = createCommentValidation.parse(req.body);
            const authorId = res.locals.user.id;

            const newComment = {
                content,
                movieId,
                authorId,
            };

            const comment = await commentsModel.create(newComment);
            APIResponse(res, comment, "Créé", 201);
        } catch (err: any) {
            logger.error(err.message);
            if (err instanceof z.ZodError) {
                return APIResponse(res, err.errors, "Le formulaire est invalide", 400)
            }
            APIResponse(res, null, "Erreur", 500);
        }
    },


    update: async (req: Request, res: Response) => {
        try {
            logger.info("[PUT] Modifier un commentaire");

            const { id } = req.params;
            const { content, movieId } = req.body;
            const authorId = res.locals.user.id;

            await commentsModel.update(id, {
                authorId: authorId,
                content,
                movieId
            });

            APIResponse(res, null, "Modifié", 200);
        } catch (err: any) {
            logger.error(err.message);
            APIResponse(res, null, "Erreur", 500);
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            logger.info("[DELETE] Supprimer un commentaire")
            await commentsModel.delete(req.params.id)
            APIResponse(res, null, "Supprimé", 200)
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },
}

export default commentsController
