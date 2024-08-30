import { Router } from "express";
import { getNutri, insertNutri } from "../services/admin.services.js";
import { validateToken } from "../middleware/validate.middleware.js";

const adminRouter = Router()

adminRouter.get("/nutris",validateToken, getNutri)
adminRouter.post("/cadastrar", insertNutri)

export default adminRouter;