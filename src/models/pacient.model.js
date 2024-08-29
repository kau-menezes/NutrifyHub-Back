import { DataTypes } from "sequelize";
import db from "../db.js";
import User from "./user.model.js";
import Diet from "./diet.model.js";

const Pacient = db.define(
    "Pacient",
    {
        pacientID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userID: {
            type: DataTypes.INTEGER,
            unique: true, 
            allowNull: false,
            references: {
                model: User,
                key: 'userID'
            }
        },

        medicalRecord: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);

Pacient.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user'
});

Pacient.hasOne(Diet, {
    foreignKey: 'pacientID',
    as: 'diet'
});

export default Pacient;

