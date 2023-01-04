import express from "express"
import dotenv from "dotenv"
import route from "./route/route.js"
import bodyParser from 'body-parser'
import cors from "cors"

const app = express()
dotenv.config()

// body-parser setup
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors()) 


app.listen(8800, ()=> {
    console.log("Connected, App is running!")
})

app.use("/api/", route) 