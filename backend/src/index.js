import app from "./app.js"
import connectdb from "./db/db.js"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

connectdb().then(()=>
{
    app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
}).catch((err)=>{
    console.log( "error in listening after database connection",err);
})