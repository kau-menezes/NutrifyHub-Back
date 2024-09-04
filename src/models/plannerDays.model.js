import { DataTypes } from "sequelize";
import db from "../db.js";


const PlannerDays = db.define(
    "PlannerDays",
    {
        plannerDaysID: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        }, 

        dayOfWeek: {
            type: DataTypes.DATE, 
            allowNull: false
        },

        period: {
            type: DataTypes.STRING(20), 
            allowNull: false
        }

    }
);


export default PlannerDays;