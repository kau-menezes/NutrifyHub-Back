import "express-async-errors";
import express from "express";
import cors from "cors";

import loginRouter from "./routes/login.routes.js";
import adminRouter from "./routes/admin.routes.js";
import nutriRouter from "./routes/nutri.routes.js";
import { validateToken } from "./middleware/validate.middleware.js";

const app = express();


app.use(cors())
app.use(express.json());

app.use("/login", loginRouter);
app.use("/admin", adminRouter);
app.use("/nutri", nutriRouter);

export default app; 