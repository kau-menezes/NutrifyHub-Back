import "express-async-errors";
import express from "express";
import cors from "cors";

import loginRouter from "./routes/logins.route.js"

const app = express();


app.use(cors())
app.use(express.json());

app.use("/login", loginRouter);

export default app; 