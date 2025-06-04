import { Request, Response } from "express"
import { commentsModel } from "../models/"
import { APIResponse } from "../utils/response"
import { logger } from "../utils/logger"

const commentsController = {
    getAll: (req: Request, res: Response) => {
        try {
            logger.info("[GET] Tous les commentaires")
            const comments = commentsModel.getAll()
            APIResponse(res, comments, "OK")
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    get: (req: Request, res: Response) => {
        try {
            logger.info("[GET] Un commentaire")
            const comment = commentsModel.get(req.params.id)
            APIResponse(res, comment, "OK")
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    create: (req: Request, res: Response) => {
        try {
            logger.info("[POST] Créer un commentaire")
            const authorId = res.locals.user.id
            const newComment = {
                ...req.body,
                authorId,
            }
            const comment = commentsModel.create(newComment)
            APIResponse(res, comment, "Créé", 201)
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
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

    delete: (req: Request, res: Response) => {
        try {
            logger.info("[DELETE] Supprimer un commentaire")
            commentsModel.delete(req.params.id)
            APIResponse(res, null, "Supprimé", 200)
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },
}

export default commentsController
