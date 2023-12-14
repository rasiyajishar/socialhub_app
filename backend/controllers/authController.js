const User = require('../models/User')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async(req,res) => {
    console.log('helloo'); // Log a message to the console

    try {
        // Check if any required field in req.body is missing
        const isMissingField = Object.values(req.body).some((value) => !value);
        if (isMissingField) {
            throw new Error("Fill in all fields!");
        }

        // Check if a user with the provided username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            throw new Error("Account already registered");
        }

        console.log(req.body); // Log the request body to the console
       
        // Hash the password using bcrypt with a cost factor of 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new User instance with the hashed password
        const user = new User({ ...req.body, password: hashedPassword });

        // Save the user to the database
        await user.save();

        // Create a JWT payload with user information
        const payload = { id: user._id, username: user.username };

        // Exclude the password from the user object
        const { password, ...userInfo } = user._doc;

        // Sign the JWT token using the payload and a secret key
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        // Return a JSON response with the token and user information
        return res.status(201).json({ token, userInfo });
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error with the error message
        return res.status(500).json(error.message);
    }
}


const login = async(req,res) =>{
try {
    const isMissingField = Object.values(req.body).some((value) => !value);
    if (isMissingField) {
        throw new Error("Fill in all fields!");
    }

    const user = await User.findOne({email:req.body.email})
    if(!user){
        throw new Error("wrong credentials")
    }
// Create a JWT payload with user information
const payload = { id: user._id, username: user.username };

// Exclude the password from the user object
const { password, ...userInfo } = user._doc;

// Sign the JWT token using the payload and a secret key
const token = jwt.sign(payload, process.env.JWT_SECRET);

// Return a JSON response with the token and user information
return res.status(201).json({ token, userInfo });

} catch (error) {
    return res.status(500).json(error.message);  
}
}




module.exports = {
    register,login
}