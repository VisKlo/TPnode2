import { Router } from "express";
import controller from "../controllers/users.controller"

const router = Router()

router.get('/', controller.getAll)

router.get('/:id', controller.get)

export default router
