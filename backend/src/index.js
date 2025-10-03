import app from "./app.js"

import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})


try {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`)
    });
} catch (error) {
    console.error("Error starting server:", error);
}

