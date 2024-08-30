import { DataTypes } from "sequelize";
import db from "../db.js";


const RecipeIngredient = db.define(
    "RecipeIngredient",
    {
        recipeIngredientID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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


export default RecipeIngredient;
