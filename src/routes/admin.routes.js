import { Router } from "express";
import { deleteNutri, getNutri, getNutriByID, insertNutri, updateNutri } from "../services/admin.services.js";
import { validateToken } from "../middleware/validate.middleware.js";

const adminRouter = Router()

adminRouter.get("/nutris", validateToken, getNutri);
adminRouter.post("/cadastrar",validateToken, insertNutri);
adminRouter.get("/editar/:id", validateToken, getNutriByID);
adminRouter.patch("/editar/:id", validateToken, updateNutri);
adminRouter.delete("/delete/:id", validateToken, deleteNutri);

export default adminRouter;