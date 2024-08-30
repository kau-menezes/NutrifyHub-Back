import Diet from "./diet.model.js";
import Nutricionist from "./nutricionist.model.js";
import Pacient from "./pacient.model.js";
import User from "./user.model.js";

User.hasOne(Pacient, {
    foreignKey: {
        name: "userID",
        allowNull: true,
    }
})

User.hasOne(Nutricionist, {
    foreignKey: {
        name: "userID",
        allowNull: true,
    }
})


Nutricionist.hasMany(Diet, {
    foreignKey: {
        name: "nutricionistID",
        allowNull: false,
    }
})