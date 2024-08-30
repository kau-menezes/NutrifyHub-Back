import "dotenv/config";

import app from "./app.js";
import db from "./db.js";

import "./models/user.model.js";
import "./models/recipe.model.js";
import "./models/ingredient.model.js";
import "./models/steps.model.js";
import "./models/diet.model.js";
import "./models/nutricionist.model.js";
import "./models/dietRecipe.model.js";
import "./models/pacient.model.js";
import "./models/associations.js";


async function startApp() {
    await db.sync();

    const PORT = Number(process.env.APP_PORT) || 3000;

    app.listen(PORT, () => {
        console.log(`Server running at: http://localhost:${PORT}`);
    });
}

startApp();
