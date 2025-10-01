import express from "express"

import cors from "cors"

const app = express()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                // Allow cookies/auth headers
}));






export default app;