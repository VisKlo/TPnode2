import { Router } from "express"
import moviesRouter from "./movies.routes"
import usersRouter from "./users.routes"
import categoriesRouter from "./categories.routes"
import commentsRouter from "./comments.routes"
import authRouter from "./auth.routes"

const router = Router()

router.use('/movies', moviesRouter)
router.use('/comments', commentsRouter)
router.use('/users', usersRouter)
router.use('/categories', categoriesRouter)
router.use('/auth', authRouter)

export default router