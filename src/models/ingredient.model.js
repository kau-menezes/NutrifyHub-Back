import { DataTypes } from "sequelize";
import db from "../db.js";

import Recipe from "./recipe.model.js";

const RecipeIngredient = db.define(
    "RecipeIngredient",
    {
        RecipeIngredientID: {
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

        name: {
            type: DataTypes.STRING(30), 
            allowNull: false
        }, 

        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false           
        }
    }
);


// Define the association after model definition
RecipeIngredient.belongsTo(Recipe, {
    foreignKey: 'recipeID',
    as: 'recipe'
});

export default RecipeIngredient;
