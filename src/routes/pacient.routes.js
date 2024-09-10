import { Router } from "express";
import { getDiet, getPlanning, insertPlanning, updatePlanning } from "../services/pacient.services.js";

const pacientRouter = Router();

pacientRouter.get("/:pacientID/dieta", getDiet)
pacientRouter.post("/:pacientID/planejamento", insertPlanning )
pacientRouter.post("/:pacientID/editar-planejamento", updatePlanning )
pacientRouter.get("/:pacientID/ver-planejamento/:week/:year", getPlanning )

export default pacientRouter;