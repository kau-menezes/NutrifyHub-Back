import { DataTypes } from "sequelize";
import db from "../db.js";


const Planner = db.define(
    "Planner",
    {
        plannerID: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        }, 

        pacientID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 

        startOfWeek: {
            type: DataTypes.DATE, 
            allowNull: false
        }
    }
);


export default Planner;