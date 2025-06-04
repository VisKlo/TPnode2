import { Request, Response } from "express"
import { categoriesModel } from "../models"
import { APIResponse } from "../utils/response"
import { logger } from "../utils/logger"

const categoriesController = {
    getAll: async (req: Request, res: Response) => {
        try {
            logger.info("[GET] Toutes les catégories")
            const categories = await categoriesModel.getAll()
            APIResponse(res, categories, "OK")
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    get: async (req: Request, res: Response) => {
        try {
            logger.info("[GET] Une catégorie")
            const category = await categoriesModel.get(req.params.id)
            APIResponse(res, category, "OK")
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            logger.info("[POST] Créer une catégorie")
            const category = await categoriesModel.create(req.body)
            APIResponse(res, category, "Créé", 201)
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            logger.info("[PUT] Modifier une catégorie")
            await categoriesModel.update(req.params.id, req.body)
            APIResponse(res, null, "Modifié", 200)
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            logger.info("[DELETE] Supprimer une catégorie")
            await categoriesModel.delete(req.params.id)
            APIResponse(res, null, "Supprimé", 200)
        } catch (err: any) {
            logger.error(err.message)
            APIResponse(res, null, "Erreur", 500)
        }
    }
}
export default categoriesController