import { loginVerifyService } from "../services/login.services";

const loginRouter = Router()

loginRouter.post("", loginVerifyService)