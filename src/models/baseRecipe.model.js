import { DataTypes } from "sequelize";
import db from "../db.js";

const BaseRecipe = db.define(
    "BaseRecipe",
    {
        BaseRecipeID: {
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

export default BaseRecipe;
