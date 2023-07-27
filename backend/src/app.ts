

import express,{Request, Response, NextFunction,Application} from "express"
import {Server} from "http"
import { config } from "dotenv"
import bodyParser from 'body-parser';
import cors from 'cors'
const {logger}=require("./middleware/logger")



import { router } from "./routes/route"
import connects from "./config/db"
const app:Application = express()

config()
connects()


app.use(cors());
app.use(bodyParser.json());
app.use(logger)

app.get("/",(req: Request,res: Response)=>{
    res.send("hellow form ts")
})

// Add the routes
app.use("/",router)


// Start the server
const PORT:Number = Number(process.env.PORT) || 6010
const server: Server = app.listen(PORT,()=> console.log(`runig on port  ${PORT}`))








