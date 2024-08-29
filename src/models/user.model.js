import { DataTypes } from "sequelize";
import db from "../db.js";

import Nutricionist from "./nutricionist.model.js";
import Recipe from "./recipe.model.js";
import Pacient from "./pacient.model.js";

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

User.hasOne(Nutricionist, {
    foreignKey: 'userID',
    as: 'nutricionist'
});

User.hasOne(Pacient, {
    foreignKey: 'userID',
    as: 'pacient'
});

User.hasMany(Recipe, {
    foreignKey: 'userID',
    as: 'recepies'
});

export default User;
