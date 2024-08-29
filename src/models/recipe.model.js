import { DataTypes } from "sequelize";
import db from "../db.js";
import User from "./user.model.js";

import RecipeIngredient from "./ingredient.model.js";
import RecipeSteps from "./steps.model.js";

const Recipe = db.define(
    "Recipe",
    {
        recipeID: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },

        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userID'
            }
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }
);


Recipe.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user'
});


Recipe.hasMany(RecipeIngredient, {
    foreignKey: 'recipeID',
    as: 'ingredients'
});

Recipe.hasMany(RecipeSteps, {
    foreignKey: 'recipeID',
    as: 'ingredients'
});

export default Recipe;

