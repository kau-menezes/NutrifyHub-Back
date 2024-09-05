import { Router } from "express";
import { uploadPhoto } from "../services/file.services.js";
import upload from "../upload.js";
import e from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileRouter = Router()

fileRouter.post("", upload.single("photo"), uploadPhoto);
fileRouter.use("", e.static(path.join(__dirname, "../../uploads")))

export default fileRouter;