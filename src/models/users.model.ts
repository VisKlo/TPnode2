import { db } from "../config/pool"
import { logger } from "../utils/logger"
import { users, comments } from "../schemas"
import { NewUser } from "../entities/User"
import { eq } from "drizzle-orm"

export const userModel = {
    getAll: () => {
        try {
            return db.select({
                id: users.id,
                username: users.username,
                email: users.email,
            }).from(users)
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`)
            throw new Error("Impossible de récupérer les utilisateurs")
        }
    },
    get: (id: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns: {
                    id: true,
                    username: true,
                    email: true
                },
                with: {
                    comments: {
                        columns: {
                            id: true,
                            content: true,
                            movieId: true,
                            createdAt: true
                        }
                    }
                }
            })
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération de l'utilisateur: ${err.message}`)
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    },
    findByCredentials: (email: string) => {
        try {
            return db.select({
                id: users.id,
                password: users.password,
                username: users.username,
                email: users.email
            }).from(users)
                .where(eq(users.email, email))
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération de l'utilisateur: ${err.message}`)
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    },
    create: (user: NewUser) => {
        try {
            return db.insert(users).values(user).returning({ id: users.id })
        } catch (err: any) {
            logger.error(`Erreur lors de la création de l'utilisateur: ${err.message}`)
            throw new Error("Impossible de créer l'utilisateur")
        }
    }
}