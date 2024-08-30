import { loginVerifyService } from "../services/login.services.js";
import { Router } from "express";

const loginRouter = Router()

loginRouter.post("", loginVerifyService)

export default loginRouter;