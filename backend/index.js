const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()

require('dotenv').config();

// app.use(cors())

const corsOptions = {
  origin: "*", // Allow all origins (for testing only)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

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



//authroutes
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const commentRouter = require("./routes/comment")
const postRouter = require("./routes/post")
const userRouter = require("./routes/user")

app.use("/comment",commentRouter)
app.use("/post",postRouter)
app.use("/user",userRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});