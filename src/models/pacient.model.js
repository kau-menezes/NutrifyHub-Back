import { DataTypes } from "sequelize";
import db from "../db.js";


const Pacient = db.define(
    "Pacient",
    {
        pacientID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        medicalRecord: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);


export default Pacient;

