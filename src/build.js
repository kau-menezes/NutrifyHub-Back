import "dotenv/config"
import db from "./db.js";
import crypt from "bcryptjs"

import "./models/user.model.js";
import "./models/recipe.model.js";
import "./models/ingredient.model.js";
import "./models/steps.model.js";
import "./models/diet.model.js";
import "./models/nutricionist.model.js";
import "./models/dietRecipe.model.js";
import "./models/pacient.model.js";
import "./models/associations.js";
import User from "./models/user.model.js";
import Nutricionist from "./models/nutricionist.model.js";


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

    const password1 = crypt.hashSync("neusa123")

    await User.create({
        name: "Neusa Saladino",
        email: "neusa@mail.com",
        password: password1,
        userType: 1
    });
    
    await Nutricionist.create({
        userID: 2, 
        CRN: "12345/SP"
    });

    console.log("Neusa Saladino, neusa@mail.com, neusa123");

    const password2 = crypt.hashSync("adri123")

    await User.create({
        name: "Adriana Menezes",
        email: "adri@mail.com",
        password: password2,
        userType: 1
    });

    await Nutricionist.create({
        userID: 3, 
        CRN: "67890/PR"
    });

    console.log("Adriana Menezes, adri@mail.com, adri123");

}

build();



