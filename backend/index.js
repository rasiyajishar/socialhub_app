const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()
const PORT=8000
// mongoose.connect("mongodb://127.0.0.1:27017/socialhub")
mongoose.connect("mongodb://127.0.0.1:27017/socialhub", { useNewUrlParser: true, useUnifiedTopology: true })

.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.error("failed to connect mongodb",error.message)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


//authroutes
const authRouter = require("./routes/auth")
app.use("/auth",authRouter)

app.listen(process.env.PORT,()=>console.log('server has been started')

)