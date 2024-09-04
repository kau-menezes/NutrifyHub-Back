import { Router } from "express";
import { validateToken } from "../middleware/validate.middleware.js";
import { deletePacient, getPacient, insertDiet, insertPacient, updateDiet } from "../services/nutri.services.js";

const nutriRouter = Router()

nutriRouter.get("/:nutriID/pacientes", validateToken, getPacient);
nutriRouter.post("/:nutriID/cadastrar-paciente", validateToken, insertPacient);
nutriRouter.post("/:nutriID/criar-dieta/:pacientID", insertDiet);
nutriRouter.delete("/delete/:userID", deletePacient);
// nutriRouter.delete("/delete/:userID", updateDiet);

export default nutriRouter;