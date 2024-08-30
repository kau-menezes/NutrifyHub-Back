import { DataTypes } from "sequelize";
import db from "../db.js";

const RecipeSteps = db.define(
    "RecipeSteps",
    {
        RecipeStepstID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        description: {
            type: DataTypes.STRING(30), 
            allowNull: false
        }, 

    }
);



export default RecipeSteps;
