import { DataTypes } from "sequelize";
import db from "../db.js";

const RecipeSteps = db.define(
    "RecipeSteps",
    {
        recipeStepsID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        stepNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING(30), 
            allowNull: false
        }, 

    }
);



export default RecipeSteps;
