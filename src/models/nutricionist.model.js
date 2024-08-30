import { DataTypes } from "sequelize";
import db from "../db.js";

const Nutricionist = db.define(
    "Nutricionist",
    {
        nutricionistID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        CRN: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }
);


export default Nutricionist;

