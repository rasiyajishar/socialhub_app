const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()
// mongoose.connect("mongodb://127.0.0.1:27017/socialhub")
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

.then(()=>{
    console.log("mongodb connected")
})
.catch((error)=>{
    console.error("failed to connect mongodb",error.message)
})
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


//authroutes
const authRouter = require("./routes/auth")
app.use("/auth",authRouter)
//userroutes
const userRouter = require("./routes/user")

app.use("/user",userRouter)


//commentroutes
const commentRouter = require("./routes/comment")

app.use("/comment",commentRouter)

//postroutes
const postRouter = require("./routes/post")
app.use("/post",postRouter)

app.listen(process.env.PORT,()=>console.log('server has been started')

)