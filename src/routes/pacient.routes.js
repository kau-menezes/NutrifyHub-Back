import { Router } from "express";
import { getDiet, getPlanning, insertPlanning } from "../services/pacient.services.js";

const pacientRouter = Router();

pacientRouter.get("/:pacientID/dieta", getDiet)
pacientRouter.get("/:pacientID/planejamento", insertPlanning )
pacientRouter.get("/:pacientID/ver-planejamento/:week/:year", getPlanning )

export default pacientRouter;