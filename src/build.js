import "dotenv/config"
import db from "./db.js";
import crypt from "bcryptjs"

import "./models/user.model.js";
import "./models/recipe.model.js";
import "./models/ingredient.model.js";
import "./models/steps.model.js";
import "./models/diet.model.js";
import "./models/nutricionist.model.js";
import "./models/baseRecipe.model.js";
import "./models/pacient.model.js";
import "./models/associations.js";
import User from "./models/user.model.js";


async function build() {
    await db.sync();

    const password = crypt.hashSync("admin123")

    await User.create({
        name: "admin", 
        email: "admin@mail.com",
        password: password,
        userType: 0
    });

    console.log("admin, admin@mail.com, admin123");
}

build();



