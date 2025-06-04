import { Router } from "express"
import moviesRouter from "./movies.routes"
import seriesRouter from "./series.routes"
import commentsRouter from "./comments.routes"
import categoriesRouter from "./categories.routes"
import authRouter from "./auth.routes"

const router = Router()

router.use('/movies', moviesRouter)
router.use('/series', seriesRouter)
router.use('/comments', commentsRouter)
router.use('/categories', categoriesRouter)
router.use('/auth', authRouter)

export default router