import { DataTypes } from "sequelize";
import db from "../db.js";

import Recipe from "./recipe.model.js";

const RecipeSteps = db.define(
    "RecipeSteps",
    {
        RecipeStepstID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        recipeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recipe, 
                key: 'recipeID'
            }
        },

        description: {
            type: DataTypes.STRING(30), 
            allowNull: false
        }, 

    }
);


// Define the association after model definition
RecipeSteps.belongsTo(Recipe, {
    foreignKey: 'recipeID',
    as: 'recipe'
});

export default RecipeSteps;
