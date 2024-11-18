require('dotenv').config()
const express = require("express")
const cors = require('cors')
const cookiesParser = require("cookie-parser")
const router = require("./router/UserRouter")


const app = express()
const conncetDb = require("./config/connectDb")

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = 4000
app.get("/",(req,res)=>{
    res.json({
        message:"server"
    })
})

app.use("/api",router)
conncetDb().then(()=>{

app.listen(PORT,()=>{console.log(`Server running on ${PORT}`)})
})