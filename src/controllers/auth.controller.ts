import { Request, Response } from "express"
import { env } from "../config/env"
import jwt from "jsonwebtoken"
import { APIResponse, logger } from "../utils"
import { userModel } from "../models/users.model"
import { hashPassword, verifyPassword } from "../utils/password"
import { userRegisterValidation } from "../validations"
import { z } from "zod"

const { JWT_SECRET, NODE_ENV } = env

const authController = {
    login: async (request: Request, response: Response) => {
        try {
            const { email, password } = request.body
            const [user] = await userModel.findByCredentials(email)
            if (!user) {
                return APIResponse(response, null, "Identifiants incorrects", 400)
            }

            const validPassword = await verifyPassword(user.password, password)
            if (!validPassword) {
                return APIResponse(response, null, "Identifiants incorrects", 400)
            }

            const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })

            response.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: NODE_ENV === "production"
            })
            APIResponse(response, null, "Connexion réussi")
        } catch (err: any) {
            logger.error(`Erreur lors de la connexion de l'utilisteur: ${err.message}`)
            APIResponse(response, null, "Erreur serveur", 500)
        }
    },
    register: async (request: Request, response: Response) => {
        try {
            const { username, email, password } = userRegisterValidation.parse(request.body)
            const [emailAlreadyExists] = await userModel.findByCredentials(email)
            if (emailAlreadyExists) {
                return APIResponse(response, null, "Adresse email déjà utilisée", 400)
            }

            const hash = await hashPassword(password)
            if (!hash) {
                return APIResponse(response, null, "Problème lors du hash", 500)
            }

            const [newUser] = await userModel.create({ username, email, password: hash })
            if (!newUser)
                return APIResponse(response, null, "Un problème est survenu", 500)

            APIResponse(response, newUser.id, "Vous êtes inscrit", 200)
        } catch (err: any) {
            logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`)
            if (err instanceof z.ZodError) {
                return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
            }
            APIResponse(response, null, "Erreur serveur", 500)
        }
    },
    logout: async (request: Request, response: Response) => {
        response.clearCookie("accessToken")
        APIResponse(response, null, "Vous êtes déconnecté", 200)
    },
}

export default authController