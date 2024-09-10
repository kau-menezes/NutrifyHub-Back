import { Router } from "express";
import { validateToken } from "../middleware/validate.middleware.js";
import { deletePacient, getPacient, insertDiet, insertPacient, updateDiet } from "../services/nutri.services.js";

const nutriRouter = Router()

nutriRouter.get("/:nutriID/pacientes", validateToken, getPacient);
nutriRouter.post("/:nutriID/cadastrar-paciente", validateToken, insertPacient);
nutriRouter.post("/:nutriID/criar-dieta/:pacientID", validateToken, insertDiet);
nutriRouter.delete("/delete/:userID", validateToken, deletePacient);
nutriRouter.patch("/updateDiet/:pacientID", validateToken, updateDiet);

export default nutriRouter;