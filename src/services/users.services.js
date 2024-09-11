import AppError from "../AppError.js";
import RecipeIngredient from "../models/ingredient.model.js";
import Recipe from "../models/recipe.model.js";
import RecipeSteps from "../models/steps.model.js";
import User from "../models/user.model.js";
import crypt from "bcryptjs"

export async function insertRecipe(req, res) {

    const user = await User.findByPk(req.params.userID)

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const recipe = await Recipe.create({
        name: req.body.name,
        userID: user.userID,
        picture: req.body.picture,
        description: req.body.description

    });

    console.log("\n\n\n\n\n", req.body.picture, "\n\n\n\n\n");

    await Promise.all(req.body.ingredients.map(async (ingredient) => {
        await RecipeIngredient.create({
            name: ingredient.name,
            quantity: ingredient.quantity,
            measureSystem: ingredient.measure,
            recipeID: recipe.recipeID
        });
    }));

    await Promise.all(req.body.steps.map(async (step, index) => {
        await RecipeSteps
        .create({
            description: step.description,
            stepNumber: (index + 1),
            recipeID: recipe.recipeID
        });
    }));

    console.log("\n\n\n\n\n", recipe);
    
    if (recipe) return res.status(200).json(recipe);
}

export async function getRecipes(req, res) {
       
    const recipes = await Recipe.findAll({
        include: [
            {
                model: RecipeSteps,
                attributes: ['stepNumber', 'description']
            },
            {
                model: RecipeIngredient,
                attributes: ['quantity', 'name']
            }

        ],
        attributes: ['name', 'recipeID','picture'],
        where: { userID: req.params.userID }

    }); 

    res.json(recipes);

}

export async function getRecipe(req, res) {
       
    const recipes = await Recipe.findOne({
        include: [
            {
                model: RecipeSteps,
                attributes: ['stepNumber', 'description']
            },
            {
                model: RecipeIngredient,
                attributes: ['quantity', 'name', 'measureSystem']
            }

        ],
        
        attributes: ['name', 'recipeID', 'picture', 'description'],
        where: { recipeID: req.params.recipeID }

    }); 

    res.json(recipes);

}

export async function getInfo(req, res) {
       
    const user = await User.findOne({
        where: { userID: req.params.userID }

    });
    
    user.password = undefined;

    res.json(user);

}

export async function updateInfo (req, res) {

    console.log("OIOIOIO");

    console.log(req.body);
    const user = await User.findByPk(req.params.userID);

    console.log(user.password);

    if (!crypt.compareSync(req.body.oldPassword, user.password)) {
        throw new AppError("Senha antiga incompatível", 403)
    }

    if (req.body.newPassword) {
        req.body.newPassword = crypt.hashSync(req.body.newPassword)
    }
    
    
    user.update(req.body);

    res.status(200).json({ ...user.toJSON(), password: undefined });
}