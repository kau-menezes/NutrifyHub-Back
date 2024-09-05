import { Router } from "express";
import { downloadPhoto, uploadPhoto } from "../services/file.services.js";

const fileRouter = Router()

fileRouter.post("", uploadPhoto);
fileRouter.get("/:filename", downloadPhoto);

export default fileRouter;