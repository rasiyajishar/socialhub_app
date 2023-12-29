const express = require("express")
const mongoose = require("mongoose")

const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3003;
require('dotenv').config();

// app.use(cors())

const corsOptions = {
  origin: "*", // Allow all origins (for testing only)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};



app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/socialhub")
mongoose.connect(process.env.MONGODB_URI )

.then(()=>{
    console.log("mongodb connected")
})
.catch((error)=>{
    console.error("failed to connect mongodb",error.message)
})
 




app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/images",express.static("public/images"))


//authroutes
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const commentRouter = require("./routes/comment")
const postRouter = require("./routes/post")
app.use("/post",postRouter)
const userRouter = require("./routes/user")
const uploadRouter = require("./controllers/uploadRouter")

app.use("/comment",commentRouter)

app.use("/user",userRouter)
app.use("/upload",uploadRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('mongodb connected');
});;