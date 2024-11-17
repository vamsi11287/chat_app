const express = require("express")
const cors = require('cors')
require('dotenv').config();


const conncetDb = require("./config/connectDb")
const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

const PORT = process.env.PORT || 4000
app.get("/",(req,res)=>{
    res.json({
        message:"server"
    })
})
conncetDb().then(()=>{

app.listen(PORT,()=>{console.log(`Server running on ${PORT}`)})
})