import { DataTypes } from "sequelize";
import db from "../db.js";

const Diet = db.define(
    "Diet",
    {
        dietID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        totalCalories: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        waterIntake: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        protein: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        carbs: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        fat: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }
);

export default Diet;
