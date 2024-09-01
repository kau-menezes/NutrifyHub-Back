import { Router } from "express";
import { validateToken } from "../middleware/validate.middleware.js";
import { getPacient, insertDiet, insertPacient } from "../services/nutri.services.js";

const nutriRouter = Router()

nutriRouter.get("/:nutriID/pacientes", validateToken, getPacient);
nutriRouter.post("/:nutriID/cadastrar-paciente", validateToken, insertPacient);
nutriRouter.post("/:nutriID/criar-dieta/:pacientID", insertDiet);

export default nutriRouter;