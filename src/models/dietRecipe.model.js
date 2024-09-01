import { DataTypes } from "sequelize";
import db from "../db.js";

// colocar id na pk

const DietRecipe = db.define(
    "DietRecipe",
    {
        dietRecipe: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        
        period: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }
);

export default DietRecipe;
