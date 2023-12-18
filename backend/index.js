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
const commentRouter = require("./routes/comment")
const postRouter = require("./routes/post")
const userRouter = require("./routes/user")
app.use("/auth",authRouter)
app.use("/comment",commentRouter)
app.use("/post",postRouter)
app.use("/user",userRouter)
app.listen(process.env.PORT,()=>console.log('server has been started')

)