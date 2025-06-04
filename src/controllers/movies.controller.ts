import { Request, Response } from "express";
import { moviesModel } from "../models/";
import { APIResponse } from "../utils/response";
import { logger } from "../utils/logger";

const moviesController = {
    getAll: (req: Request, res: Response) => {
        try {
            logger.info("[GET] Tous les films");
            const movies = moviesModel.getAll();
            APIResponse(res, movies, "OK");
        } catch (err: any) {
            logger.error(err.message);
            APIResponse(res, null, "Erreur", 500);
        }
    },

    get: (req: Request, res: Response) => {
        try {
            logger.info("[GET] Un film");
            const movie = moviesModel.get(req.params.id);
            APIResponse(res, movie, "OK");
        } catch (err: any) {
            logger.error(err.message);
            APIResponse(res, null, "Erreur", 500);
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            logger.info("[POST] Créer un film");
            const { categoryId, ...movieData } = req.body;

            if (!categoryId) {
                return APIResponse(res, null, "La catégorie est obligatoire", 400);
            }

            const movie = await moviesModel.create({ ...movieData, categoryId });

            APIResponse(res, movie, "Créé", 201);
        } catch (err: any) {
            logger.error(err.message);
            APIResponse(res, null, "Erreur", 500);
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            logger.info("[PUT] Modifier un film");

            const { categoryId, ...movieData } = req.body;

            if (!categoryId) {
                return APIResponse(res, null, "La catégorie est obligatoire", 400);
            }

            await moviesModel.update(req.params.id, { ...movieData, categoryId });

            APIResponse(res, null, "Modifié", 200);
        } catch (err: any) {
            logger.error(err.message);
            APIResponse(res, null, "Erreur", 500);
        }
    },

    delete: (req: Request, res: Response) => {
        try {
            logger.info("[DELETE] Supprimer un film");
            moviesModel.delete(req.params.id);
            APIResponse(res, null, "Supprimé", 200);
        } catch (err: any) {
            logger.error(err.message);
            APIResponse(res, null, "Erreur", 500);
        }
    },
};

export default moviesController;
