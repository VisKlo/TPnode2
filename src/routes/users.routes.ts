import { Router } from "express";
import controller from "../controllers/users.controller"
import { isAuthenticated } from "../middlewares"

const router = Router()

router.get('/', controller.getAll)

router.get('/:id', controller.get)

router.post('/', isAuthenticated, controller.create)

export default router