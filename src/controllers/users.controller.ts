import { Request, Response } from "express"
import { userModel } from "../models"
import { APIResponse } from "../utils/response"
import { logger } from "../utils/logger"

const usersController = {
    getAll: async (req: Request, res: Response) => {
        try {
            logger.info("[GET] Tous les utilisateurs")
            const users = await userModel.getAll()
            APIResponse(res, users, "OK")
        } catch (error: any) {
            logger.error(error.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    get: async (req: Request, res: Response) => {
        try {
            logger.info("[GET] Un utilisateur")
            const user = await userModel.get(req.params.id)
            APIResponse(res, user, "OK")
        } catch (error: any) {
            logger.error(error.message)
            APIResponse(res, null, "Erreur", 500)
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            logger.info("[POST] Créer un utilisateur")
            const newUser = await userModel.create(req.body)
            APIResponse(res, newUser, "Créé", 201)
        } catch (error: any) {
            logger.error(error.message)
            APIResponse(res, null, "Erreur", 500)
        }
    }
}
export default usersController