import { Router } from "express";
import { getRecipes, getRecipe , insertRecipe } from "../services/users.services.js";

const userRouter = Router()

userRouter.post("/:userID/criar-receita", insertRecipe);
userRouter.get("/:userID/receitas", getRecipes);
userRouter.get("/:recipeID/visualizar-receita", getRecipe);

export default userRouter;