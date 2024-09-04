import { DataTypes } from "sequelize";
import db from "../db.js";

const Calendar = db.define(
  "Calendar",
  {
    calendarID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    week: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    day: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    period: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        fields: ["pacientID", "day"],
      },
    ],
  }
);

export default Calendar;
