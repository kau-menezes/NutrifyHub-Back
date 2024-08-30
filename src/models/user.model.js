import { DataTypes } from "sequelize";
import db from "../db.js";

const User = db.define(
    "User",
    {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        userType: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }
);


export default User;
