import Diet from "./diet.model.js";
import RecipeIngredient from "./ingredient.model.js";
import Nutricionist from "./nutricionist.model.js";
import Pacient from "./pacient.model.js";
import RecipeSteps from "./steps.model.js";
import User from "./user.model.js";
import Recipe from "./recipe.model.js";
import BaseRecipe from "./baseRecipe.model.js";

// User.hasOne(Pacient, {
//     foreignKey: {
//         name: "userID",
//         allowNull: true,
//     }
// })

// User.hasOne(Nutricionist, {
//     foreignKey: {
//         name: "userID",
//         allowNull: true,
//     }
// })

// Diet.hasOne(Pacient, {
//     foreignKey: {
//         name: "dietID", 
//         allowNull: true
//     }
// })


// Nutricionist.hasMany(Diet, {
//     foreignKey: {
//         name: "nutricionistID",
//         allowNull: false,
//     }
// })

// Recipe.hasMany(RecipeSteps, {
//     foreignKey: {
//         name: "recipeID", 
//         allowNull: false
//     }
// })

// Recipe.hasMany(RecipeIngredient, {
//     foreignKey: {
//         name: "recipeID", 
//         allowNull: false
//     }
// })

// Diet.belongsToMany(Recipe, {
//     through: BaseRecipe,
//     foreignKey: 'dietID',
//     otherKey: 'recipeID'
// });

// Recipe.belongsToMany(Diet, {
//     through: BaseRecipe,
//     foreignKey: 'recipeID',
//     otherKey: 'dietID'
// });

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

Diet.belongsToMany(BaseRecipe, {
    through: Recipe,
    foreignKey: 'dietID',
    otherKey: 'baseRecipeID',
    onDelete: 'CASCADE'
});

BaseRecipe.belongsToMany(Diet, {
    through: Recipe,
    foreignKey: 'baseRecipeID',
    otherKey: 'dietID',
    onDelete: 'CASCADE'
});
