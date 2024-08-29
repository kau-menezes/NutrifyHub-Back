import User from "./models/user.model.js";
import Recipe from "./models/recipe.model.js";
import RecipeIngredient from "./models/recipeIngredient.model.js";
import RecipeStep from "./models/recipeStep.model.js"; // Assuming you have this model
import Diet from "./models/diet.model.js";
import Nutricionist from "./models/nutricionist.model.js";
import BaseRecipe from "./models/baseRecipe.model.js";
import Pacient from "./models/pacient.model.js";


User.hasMany(Recipe, {
    foreignKey: 'userID',
    as: 'recipes'
});


Recipe.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user'
});


Recipe.hasMany(RecipeIngredient, {
    foreignKey: 'recipeID',
    as: 'ingredients'
});


Recipe.hasMany(RecipeStep, {
    foreignKey: 'recipeID',
    as: 'steps'
});


RecipeIngredient.belongsTo(Recipe, {
    foreignKey: 'recipeID',
    as: 'recipe'
});


RecipeStep.belongsTo(Recipe, {
    foreignKey: 'recipeID',
    as: 'recipe'
});


Diet.hasMany(BaseRecipe, {
    foreignKey: 'dietID',
    as: 'baseRecipes'
});


BaseRecipe.belongsTo(Diet, {
    foreignKey: 'dietID',
    as: 'diet'
});


Nutricionist.hasMany(BaseRecipe, {
    foreignKey: 'nutricionistID',
    as: 'baseRecipes'
});


BaseRecipe.belongsTo(Nutricionist, {
    foreignKey: 'nutricionistID',
    as: 'nutricionist'
});


Recipe.hasMany(BaseRecipe, {
    foreignKey: 'recipeID',
    as: 'baseRecipes'
});



Pacient.hasMany(Diet, {
    foreignKey: 'pacientID',
    as: 'diets'
});


Diet.belongsTo(Pacient, {
    foreignKey: 'pacientID',
    as: 'pacient'
});


Nutricionist.hasMany(Pacient, {
    foreignKey: 'nutricionistID',
    as: 'pacients'
});


Pacient.belongsTo(Nutricionist, {
    foreignKey: 'nutricionistID',
    as: 'nutricionist'
});

export default {
    User,
    Recipe,
    RecipeIngredient,
    RecipeStep,
    Diet,
    Nutricionist,
    BaseRecipe,
    Pacient
};
