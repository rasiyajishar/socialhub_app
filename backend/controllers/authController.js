const User = require('../models/User')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authSchema = require("./validation")
// const register = async(req,res) => {
//     console.log('helloo'); // Log a message to the console

//     try {
//         // Check if any required field in req.body is missing
//         const isMissingField = Object.values(req.body).some((value) => !value);
//         if (isMissingField) {
//             throw new Error("Fill in all fields!");
//         }

//         // Check if a user with the provided username already exists
//         const existingUser = await User.findOne({ username: req.body.username });
//         if (existingUser) {
//             throw new Error("Account already registered");
//         }

//         console.log(req.body); // Log the request body to the console
       
//         // Hash the password using bcrypt with a cost factor of 10
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         // Create a new User instance with the hashed password
//         const user = new User({ ...req.body, password: hashedPassword });

//         // Save the user to the database
//         await user.save();

//         // Create a JWT payload with user information
//         const payload = { id: user._id, username: user.username };

//         // Exclude the password from the user object
//         const { password, ...userInfo } = user._doc;

//         // Sign the JWT token using the payload and a secret key
//         const token = jwt.sign(payload, process.env.JWT_SECRET);

//         // Return a JSON response with the token and user information
//         return res.status(201).json({ token, userInfo });
//     } catch (error) {
//         // If an error occurs, return a 500 Internal Server Error with the error message
//         return res.status(500).json(error.message);
//     }
// }



// USER REGISTRATION
const register = async (req, res) => {
    const { error, value } = authSchema.validate(req.body);
    const { username, email, password } = value;
    const findUser = await User.findOne({ email: email });
   console.log(findUser)
    if (error) {
      res.status(422).json({
        status: "error",
        message: error.details[0].message,
      });
    } else if (findUser) {
      res.status(409).json({
        status: "error",
        message: "User with this email already exists",
      });
    } else {
      await User.create({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      res.status(200).json({
        status: "success",
        message: "successfully register",
      });
    }
  };
  
  
  

// const login = async(req,res) =>{
// try {
//     const isMissingField = Object.values(req.body).some((value) => !value);
//     if (isMissingField) {
//         throw new Error("Fill in all fields!");
//     }

//     const user = await User.findOne({email:req.body.email})
//     if(!user){
//         throw new Error("wrong credentials")
//     }
// // Create a JWT payload with user information
// const payload = { id: user._id, username: user.username };

// // Exclude the password from the user object
// const { password, ...userInfo } = user._doc;

// // Sign the JWT token using the payload and a secret key
// const token = jwt.sign(payload, process.env.JWT_SECRET);

// // Return a JSON response with the token and user information
// return res.status(201).json({ token, userInfo });

// } catch (error) {
//     return res.status(500).json(error.message);  
// }
// }

// USER OR ADMIN LOGIN

const login = async (req, res) => {
  try {
    const adminEmail = "admin@gmail.com";
    const { error, value } = authSchema.validate(req.body);

    if (!error) {
      const { email, password } = value;

      if (email === adminEmail && password === process.env.ADMIN_PASSWORD) {
        const adminToken = jwt.sign({ email: adminEmail, role: 'admin' }, process.env.ADMIN_SECRET_KEY);
        res.status(200).json({
          auth: true,
          message: "Successfully admin logged in",
          adminEmail: email,
          token: adminToken,
        });
      } else {
        const registeredUser = await User.findOne({ email });

        if (!registeredUser) {
          return res.status(401).json({
            status: "failed",
            message: "User not found. Please register first.",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, registeredUser.password);

        if (isPasswordValid) {
          const userToken = jwt.sign({ id: registeredUser._id, email: registeredUser.email }, process.env.ACCESS_TOKEN_SECRET);

          return res.status(200).json({
            auth: true,
            message: "Successfully logged in",
            token: userToken,
          });
        } else {
          return res.status(401).json({
            status: "failed",
            message: "Incorrect password. Login failed.",
          });
        }
      }
    } else {
      return res.status(422).json({
        status: "error",
        message: error.details[0].message,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



module.exports = {
    register,login
}