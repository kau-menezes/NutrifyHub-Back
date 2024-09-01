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
    onDelete: 'cascade' 
});

User.hasOne(Nutricionist, {
    foreignKey: {
        name: 'userID',
        allowNull: true,
    },
    onDelete: 'cascade'
});

// Recipe.hasOne(User, {
//     foreignKey: {
//         name: 'userID', 
//         allowNull: false
//     }, 
//     onDelete: 'cascade'
// })

User.hasMany(Recipe, {
    foreignKey: {
        name: 'userID', 
        allowNull: false
    }, 
    onDelete: 'cascade'
})

Nutricionist.hasOne(Pacient, {
    foreignKey: {
        name: 'nutricionistID',
        allowNull: true,
    },
    onDelete: 'set null'
})

Diet.hasOne(Pacient, {
    foreignKey: {
        name: 'dietID',
        allowNull: true,
    },
    onDelete: 'cascade' 
});

Nutricionist.hasMany(Diet, {
    foreignKey: {
        name: 'nutricionistID',
        allowNull: false,
    },
    onDelete: 'cascade'
});

Recipe.hasMany(RecipeSteps, {
    foreignKey: {
        name: 'recipeID',
        allowNull: false,
    },
    onDelete: 'cascade'
});

Recipe.hasMany(RecipeIngredient, {
    foreignKey: {
        name: 'recipeID',
        allowNull: false,
    },
    onDelete: 'cascade'
});

Diet.hasMany(DietRecipe, {
    foreignKey: {
        name: 'dietID',
        allowNull: false,
    },
    onDelete: 'cascade'   
})

Recipe.hasMany(DietRecipe, {
    foreignKey: {
        name: 'recipeID',
        allowNull: false,
    },
    onDelete: 'cascade'   
})
