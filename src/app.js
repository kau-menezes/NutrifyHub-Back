import "express-async-errors";
import express from "express";
import cors from "cors";

import loginRouter from "./routes/login.routes.js"
import adminRouter from "./routes/admin.routes.js"
import { validateToken } from "./middleware/validate.middleware.js";

const app = express();


app.use(cors())
app.use(express.json());

// aqui vão as rotas que não precisam de autenticação
app.use("/login", loginRouter);

// aqui vão as rotas que vão passar pelo middleware
// todas elas terão o res.locals com o userID e o type
app.use(validateToken)
app.use("/admin", adminRouter);

export default app; 