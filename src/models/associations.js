import Diet from "./diet.model.js";
import RecipeIngredient from "./ingredient.model.js";
import Nutricionist from "./nutricionist.model.js";
import Pacient from "./pacient.model.js";
import RecipeSteps from "./steps.model.js";
import User from "./user.model.js";
import Recipe from "./recipe.model.js";
import DietRecipe from "./dietRecipe.model.js";


User.hasOne(Pacient, {
    foreignKey: {
        name: 'userID',
        allowNull: true,
    },
    onDelete: 'SET NULL' 
});

User.hasOne(Nutricionist, {
    foreignKey: {
        name: 'userID',
        allowNull: true,
    },
    onDelete: 'SET NULL'
});

Diet.hasOne(Pacient, {
    foreignKey: {
        name: 'dietID',
        allowNull: true,
    },
    onDelete: 'SET NULL' 
});

Nutricionist.hasMany(Diet, {
    foreignKey: {
        name: 'nutricionistID',
        allowNull: false,
    },
    onDelete: 'CASCADE'
});

Recipe.hasMany(RecipeSteps, {
    foreignKey: {
        name: 'recipeID',
        allowNull: false,
    },
    onDelete: 'CASCADE'
});

Recipe.hasMany(RecipeIngredient, {
    foreignKey: {
        name: 'recipeID',
        allowNull: false,
    },
    onDelete: 'CASCADE'
});

Diet.belongsToMany(Recipe, {
    through: DietRecipe,
    foreignKey: 'dietID',
    otherKey: 'recipeID',
    onDelete: 'CASCADE'
});

Recipe.belongsToMany(Diet, {
    through: DietRecipe,
    foreignKey: 'recipeID',
    otherKey: 'dietID',
    onDelete: 'CASCADE'
});
