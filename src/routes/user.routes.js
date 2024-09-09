import { Router } from "express";
import { getRecipes, getRecipe , insertRecipe, getInfo, updateInfo } from "../services/users.services.js";

const userRouter = Router()

userRouter.post("/:userID/criar-receita", insertRecipe);
userRouter.get("/:userID/receitas", getRecipes);
userRouter.get("/:recipeID/visualizar-receita", getRecipe);
userRouter.get("/:userID/getInfo", getInfo);
userRouter.patch("/:userID/updateInfo", updateInfo);

export default userRouter;