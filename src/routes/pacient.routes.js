import { Router } from "express";
import { getDiet, insertPlanning } from "../services/pacient.services.js";

const pacientRouter = Router();

pacientRouter.get("/:pacientID/dieta", getDiet)
pacientRouter.get("/:pacientID/planejamento", insertPlanning )

export default pacientRouter;