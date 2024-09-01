import { Router } from "express";
import { getDiet } from "../services/pacient.services.js";

const pacientRouter = Router();

pacientRouter.get("/:pacientID/dieta", getDiet)

export default pacientRouter;