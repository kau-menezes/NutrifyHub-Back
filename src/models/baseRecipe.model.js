import { DataTypes } from "sequelize";
import db from "../db.js";
import Diet from "./diet.model.js";
import Nutricionist from "./nutricionist.model.js";
import Recipe from "./recipe.model.js";

const BaseRecipe = db.define(
    "BaseRecipe",
    {
        BaseRecipeID: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        dietID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Diet,
                key: 'dietID'
            }
        },
        nutricionistID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Nutricionist,
                key: 'nutricionistID'
            }
        },
        recipeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recipe,
                key: 'recipeID'
            }
        },
        period: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }
);


BaseRecipe.belongsTo(Diet, {
    foreignKey: 'dietID',
    as: 'diet'
});


export default BaseRecipe;
