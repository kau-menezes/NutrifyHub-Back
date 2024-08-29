import { DataTypes } from "sequelize";
import db from "../db.js";

import Pacient from "./pacient.model.js";
import BaseRecipe from "./baseRecipe.model.js";
import Nutricionist from "./nutricionist.model.js";

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

Diet.belongsTo(Pacient, {
    foreignKey: 'pacientID',
    as: 'pacient'
});

Diet.belongsTo(Nutricionist, {
    foreignKey: 'nutricionistID',
    as: 'nutricionist'
});

Diet.hasMany(BaseRecipe, {
    foreignKey: 'dietID',
    as: 'baseRecipes'
});

export default Diet;
