import Diet from "./diet.model.js";
import RecipeIngredient from "./ingredient.model.js";
import Nutricionist from "./nutricionist.model.js";
import Pacient from "./pacient.model.js";
import RecipeSteps from "./steps.model.js";
import User from "./user.model.js";
import Recipe from "./recipe.model.js";
import DietRecipe from "./dietRecipe.model.js";
import Calendar from "./calendar.model.js";


User.hasOne(Pacient, {
    foreignKey: {
        name: 'userID',
        allowNull: true,
    },
    onDelete: 'set null' 
});

User.hasOne(Nutricionist, {
    foreignKey: {
        name: 'userID',
        allowNull: true,
    },
    onDelete: 'set null'
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
        allowNull: true
    }, 
    onDelete: 'set null'
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
    onDelete: 'set null' 
});

Nutricionist.hasMany(Diet, {
    foreignKey: { 
        name: 'nutricionistID',
        allowNull: true,
    },
    onDelete: 'set null'
});

Recipe.hasMany(RecipeSteps, {
    foreignKey: {
        name: 'recipeID',
        allowNull: true,
    },
    onDelete: 'set null'
});

Recipe.hasMany(RecipeIngredient, {
    foreignKey: {
        name: 'recipeID',
        allowNull: true,
    },
    onDelete: 'set null'
});

Diet.hasMany(DietRecipe, {
    foreignKey: {
        name: 'dietID',
        allowNull: true,
    },
    onDelete: 'set null'   
})

Recipe.hasMany(DietRecipe, {
    foreignKey: {
        name: 'recipeID',
        allowNull: true,
    },
    onDelete: 'set null'   
})

Pacient.hasMany(Calendar, {
    foreignKey: {
      name: 'pacientID', // Ensure the foreign key name matches the one in the Calendar model
      allowNull: true, // Should be true to match the model's setting
    },
    onDelete: 'SET NULL', // This specifies what happens when the related patient is deleted
  });
  
Calendar.belongsTo(Pacient, {

    foreignKey: 'pacientID', // Ensure the foreign key name matches the one in the Calendar model
});

Recipe.hasMany(Calendar, {

    foreignKey: {
        name: 'recipeID', // Ensure the foreign key name matches the one in the Calendar model
        allowNull: true, // Should be true to match the model's setting
    },
    onDelete: 'SET NULL', // This specifies what happens when the related patient is deleted
});
