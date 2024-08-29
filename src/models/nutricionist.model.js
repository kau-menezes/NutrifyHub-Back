import { DataTypes } from "sequelize";
import db from "../db.js";
import User from "./user.model.js";
import Diet from "./diet.model.js";

const Nutricionist = db.define(
    "Nutricionist",
    {
        nutricionistID: {
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

        CRN: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }
);


Nutricionist.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user'
});

Nutricionist.hasMany(Diet, {
    foreignKey: 'dietID', 
    as: 'diets'
})

export default Nutricionist;

