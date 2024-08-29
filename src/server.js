import "dotenv/config";

import app from "./app.js";
import db from "./db.js";

async function startApp() {
    await db.sync();

    const PORT = Number(process.env.APP_PORT) || 3000;

    app.listen(PORT, () => {
        console.log(`Server running at: http://localhost:${PORT}`);
        
    });

}

startApp();
