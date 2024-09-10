import { Router } from "express";
import { getDiet, getPlanning, insertPlanning, shoppingList, updatePlanning } from "../services/pacient.services.js";

const pacientRouter = Router();

pacientRouter.get("/:pacientID/dieta", getDiet)
pacientRouter.post("/:pacientID/planejamento", insertPlanning )
pacientRouter.post("/:pacientID/editar-planejamento", updatePlanning )
pacientRouter.get("/:pacientID/ver-planejamento/:week/:year", getPlanning )
pacientRouter.post("/:pacientID/lista-de-compras", shoppingList )

export default pacientRouter;